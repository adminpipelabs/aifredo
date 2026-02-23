# $FREDO Token Launch — Development Document

> Technical specification for the $FREDO token creation, presale, claim system, and DEX listing.
> Platform: **Aifredo** · Domain: **aifredo.chat** · Token: **$FREDO** on Solana

---

## 1. Token Specification

| Field | Value |
|-------|-------|
| **Name** | FREDO |
| **Symbol** | $FREDO |
| **Blockchain** | Solana (Mainnet) |
| **Token Standard** | SPL Token (Token-2022 compatible) |
| **Total Supply** | 1,000,000,000 (1 billion) |
| **Decimals** | 6 |
| **Mint Authority** | Revoked after initial mint |
| **Freeze Authority** | None |

### Token Creation

- Create SPL token using `@solana/spl-token` or Meteora Invent CLI
- Upload metadata (name, symbol, logo) to Metaplex Token Metadata standard
- Logo: SVG/PNG, hosted on Arweave or IPFS via Metaplex
- Mint full 1B supply to a creator-controlled multisig wallet
- Revoke mint authority immediately after minting (proves max supply is fixed)

---

## 2. Token Allocation

| Allocation | % | Tokens | Purpose | Lockup |
|-----------|---|--------|---------|--------|
| **Community Claims** | 1% | 10,000,000 | Free claim for first 10,000 bot creators | Unlocked at claim |
| **Token Sale (3 rounds)** | 10% | 100,000,000 | Capital raise via Meteora Presale Vault | Per-round vesting (see §4) |
| **Ecosystem & Rewards** | 30% | 300,000,000 | Creator rewards, referrals, usage incentives, airdrops | Released over 3 years |
| **Team & Founders** | 15% | 150,000,000 | Core team compensation | 6-month cliff, 2-year linear vest |
| **Development Fund** | 15% | 150,000,000 | Platform development, infrastructure, hiring | 12-month linear release |
| **DEX Liquidity** | 10% | 100,000,000 | Initial Raydium/Meteora pool + market making | Locked in LP for 12 months |
| **Partnerships & Marketing** | 10% | 100,000,000 | Exchange listings, integrations, KOLs, launchpad partners | Case-by-case, 6-month vest |
| **Treasury / Reserve** | 9% | 90,000,000 | Emergency fund, future opportunities, governance decisions | Locked 12 months, then DAO-governed |

### Visual Breakdown

```
Claims (1%)     ██
Sale (10%)      ██████████
Ecosystem (30%) ██████████████████████████████
Team (15%)      ███████████████
Dev Fund (15%)  ███████████████
DEX Liq (10%)   ██████████
Partnerships (10%) ██████████
Treasury (9%)   █████████
```

---

## 3. Community Claims — 10,000,000 $FREDO (1%)

### Mechanics

- **Eligibility**: Any user who creates a bot on the platform
- **Amount**: 1,000 $FREDO per user
- **Cap**: First 10,000 users (hard cap)
- **Cost**: Free (user only pays Solana tx fee ~$0.001)

### Claim Flow

```
1. User creates a bot (completes onboarding wizard)
2. Dashboard shows "Claim your 1,000 $FREDO" banner
3. User clicks → Phantom wallet connect prompt
4. User approves wallet connection
5. Backend verifies:
   - User has a bot on the platform
   - User hasn't claimed before (1 claim per user)
   - Claims < 10,000 total
6. Backend signs token transfer from Claims wallet → User wallet
7. User receives 1,000 $FREDO
8. Banner changes to "✓ 1,000 $FREDO claimed" with tx link
```

### Technical Implementation

| Component | Technology |
|-----------|-----------|
| Wallet adapter | `@solana/wallet-adapter-react` + `@solana/wallet-adapter-phantom` |
| Claim tracking | Platform database: `claims` table (user_id, wallet_address, tx_sig, claimed_at) |
| Token transfer | Server-side: keypair signs SPL token transfer instruction |
| Anti-sybil | 1 claim per platform account, email-verified, must have created a bot |

### Database Schema

```sql
CREATE TABLE claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
  wallet_address TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 1000,
  tx_signature TEXT,
  status TEXT DEFAULT 'pending', -- pending | completed | failed
  claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_claims_wallet ON claims(wallet_address);
CREATE INDEX idx_claims_status ON claims(status);
```

### API Endpoints

```
GET  /api/claims/status          → { eligible: bool, claimed: bool, remaining: number, total_claimed: number }
POST /api/claims/initiate        → { wallet_address } → { tx_signature, amount }
GET  /api/claims/verify/:txSig   → { confirmed: bool }
```

### Claim Counter (Public)

Display on token page and dashboard:
```
8,247 / 10,000 claimed
```

---

## 4. Token Sale — 100,000,000 $FREDO (10%)

### Overview

Three-round sale using [Meteora Presale Vault](https://docs.meteora.ag/overview/other-products/presale-vault/what-is-presale-vault) on Solana.

| | Round 1 — Seed | Round 2 — Community | Round 3 — Public |
|---|---|---|---|
| **Tokens** | 10,000,000 | 30,000,000 | 60,000,000 |
| **Mode** | Fixed Price | Prorata (Dynamic) | Prorata (Dynamic) |
| **Price** | $0.005 fixed | $0.005–$0.01 dynamic | $0.017–$0.05 dynamic |
| **Min Cap** | $50,000 | $150,000 | $1,000,000 |
| **Max Cap** | $50,000 | $300,000 | $3,000,000 |
| **Raise** | $50,000 | $150K–$300K | $1M–$3M |
| **FDV at price** | $5M | $5M–$10M | $17M–$50M |
| **Duration** | 7 days | 48 hours | 72 hours |
| **Quote Token** | USDC | USDC | USDC |
| **Access** | Permissioned (whitelist) | Permissionless | Permissionless |
| **Vesting** | 25% TGE, 75% over 90 days | 50% TGE, 50% over 60 days | 100% unlocked |
| **Listing trigger** | ✅ Filling R1 guarantees DEX listing | — | — |

### Round Sequencing

```
Round 1 fills ($50K)
    ↓
DEX listing guaranteed — announce publicly
    ↓
Round 2 opens (48h window)
    ↓
Round 2 closes → tokens distributed prorata
    ↓
Round 3 opens (72h window)
    ↓
Round 3 closes → tokens distributed prorata
    ↓
TGE: All rounds' immediate-release tokens unlock
    ↓
DEX pool created on Raydium/Meteora with initial liquidity
    ↓
Vesting schedules begin for R1 and R2 participants
```

### Meteora Presale Vault Integration

**SDK**: `@meteora-ag/presale` ([GitHub](https://github.com/MeteoraAg/presale-sdk))

**Program ID**: `presSVxnf9UU8jMxhgSMqaRwNiT36qeBdNeTRKjTdbj`

#### Round 1 — Fixed Price Presale

```typescript
import Presale from "@meteora-ag/presale";
import { PRESALE_PROGRAM_ID } from "@meteora-ag/presale";

// Round 1: Fixed Price, Permissioned (Merkle whitelist)
const round1Args = {
  presaleMaximumCap: new BN(50_000 * 1e6),     // $50,000 USDC (6 decimals)
  presaleMinimumCap: new BN(50_000 * 1e6),     // Must fill completely
  presaleStartTime: new BN(ROUND_1_START),
  presaleEndTime: new BN(ROUND_1_START + 7 * 24 * 3600), // 7 days
  whitelistMode: WhitelistMode.MerkleTree,
  unsoldTokenAction: UnsoldTokenAction.Refund,
  disableEarlierPresaleEndOnceCapReached: false, // End early when filled
};

const round1Registry = [{
  presaleSupply: new BN(10_000_000 * 1e6),      // 10M tokens (6 decimals)
  buyerMaximumDepositCap: new BN(5_000 * 1e6),  // Max $5,000 per wallet
  buyerMinimumDepositCap: new BN(100 * 1e6),    // Min $100 per wallet
  depositFeeBps: new BN(0),                      // No fees
}];

const round1Vesting = {
  immediateReleaseBps: new BN(2500),             // 25% unlocked at TGE
  lockDuration: new BN(0),                       // No additional lock
  vestDuration: new BN(90 * 24 * 3600),          // 75% vests over 90 days
  immediateReleaseTimestamp: TGE_TIMESTAMP,
};

const tx = await Presale.createFixedPricePresale(connection, PRESALE_PROGRAM_ID, {
  baseMintPubkey: FREDO_MINT,
  quoteMintPubkey: USDC_MINT,
  basePubkey: round1BaseKeypair.publicKey,
  creatorPubkey: creatorKeypair.publicKey,
  feePayerPubkey: creatorKeypair.publicKey,
  presaleArgs: round1Args,
  presaleRegistries: round1Registry,
  lockedVestingArgs: round1Vesting,
});
```

#### Round 2 — Prorata (Dynamic) Presale

```typescript
// Round 2: Prorata, Permissionless
const round2Args = {
  presaleMaximumCap: new BN(300_000 * 1e6),     // Max $300K USDC
  presaleMinimumCap: new BN(150_000 * 1e6),     // Min $150K (or refund all)
  presaleStartTime: new BN(ROUND_2_START),       // After R1 fills
  presaleEndTime: new BN(ROUND_2_START + 48 * 3600), // 48 hours
  whitelistMode: WhitelistMode.Permissionless,
  unsoldTokenAction: UnsoldTokenAction.Burn,
  disableEarlierPresaleEndOnceCapReached: true,  // Stay open full 48h for prorata
};

const round2Registry = [{
  presaleSupply: new BN(30_000_000 * 1e6),       // 30M tokens
  buyerMaximumDepositCap: new BN(10_000 * 1e6),  // Max $10K per wallet
  buyerMinimumDepositCap: new BN(50 * 1e6),      // Min $50 per wallet
  depositFeeBps: new BN(0),
}];

const round2Vesting = {
  immediateReleaseBps: new BN(5000),             // 50% unlocked at TGE
  lockDuration: new BN(0),
  vestDuration: new BN(60 * 24 * 3600),          // 50% vests over 60 days
  immediateReleaseTimestamp: TGE_TIMESTAMP,
};

const tx = await Presale.createProrataPresale(connection, PRESALE_PROGRAM_ID, {
  baseMintPubkey: FREDO_MINT,
  quoteMintPubkey: USDC_MINT,
  basePubkey: round2BaseKeypair.publicKey,
  creatorPubkey: creatorKeypair.publicKey,
  feePayerPubkey: creatorKeypair.publicKey,
  presaleArgs: round2Args,
  presaleRegistries: round2Registry,
  lockedVestingArgs: round2Vesting,
});
```

#### Round 3 — Prorata (Dynamic) Presale

```typescript
// Round 3: Prorata, Permissionless, fully unlocked
const round3Args = {
  presaleMaximumCap: new BN(3_000_000 * 1e6),   // Max $3M USDC
  presaleMinimumCap: new BN(1_000_000 * 1e6),   // Min $1M (or refund all)
  presaleStartTime: new BN(ROUND_3_START),       // After R2 closes
  presaleEndTime: new BN(ROUND_3_START + 72 * 3600), // 72 hours
  whitelistMode: WhitelistMode.Permissionless,
  unsoldTokenAction: UnsoldTokenAction.Burn,
  disableEarlierPresaleEndOnceCapReached: true,
};

const round3Registry = [{
  presaleSupply: new BN(60_000_000 * 1e6),       // 60M tokens
  buyerMaximumDepositCap: new BN(50_000 * 1e6),  // Max $50K per wallet
  buyerMinimumDepositCap: new BN(50 * 1e6),      // Min $50 per wallet
  depositFeeBps: new BN(0),
}];

// No vesting — 100% unlocked at TGE
const round3Vesting = {
  immediateReleaseBps: new BN(10000),            // 100% immediate
  lockDuration: new BN(0),
  vestDuration: new BN(0),
  immediateReleaseTimestamp: TGE_TIMESTAMP,
};
```

### Price Discovery (Prorata Rounds)

In Prorata mode, token price is **determined by total contributions**:

```
Effective Price = Total USDC Deposited / Tokens Available

Round 2 example:
- If $150K deposited (min cap):  price = $150K / 30M = $0.005
- If $300K deposited (max cap):  price = $300K / 30M = $0.01
- If $450K deposited (oversubscribed): price = $300K / 30M = $0.01
  → Excess $150K refunded proportionally to all participants

Round 3 example:
- If $1M deposited (min cap):   price = $1M / 60M = ~$0.017
- If $3M deposited (max cap):   price = $3M / 60M = $0.05
- If $5M deposited:             price = $3M / 60M = $0.05
  → Excess $2M refunded proportionally
```

### What Happens If a Round Fails?

- If Round 1 doesn't fill $50K → all contributors get full USDC refund, no listing
- If Round 2 min cap ($150K) not met → all contributors refunded, Round 3 still possible
- If Round 3 min cap ($1M) not met → all contributors refunded
- Meteora handles all refund logic automatically on-chain

---

## 5. DEX Listing

### Trigger

Round 1 fills completely ($50K raised) → listing is guaranteed.

### Liquidity Pool Creation

| Parameter | Value |
|-----------|-------|
| DEX | Meteora DAMM v2 or Raydium CPMM |
| Pair | $FREDO / USDC |
| Initial liquidity | 100M $FREDO (10% allocation) + USDC from raise |
| Listing price | ~$0.005 (aligned with Round 1 price) |
| LP lock | 12 months (locked via Meteora) |

### Using Meteora Invent CLI

```bash
# Create the pool after presale completes
pnpm studio damm-v2-create-balanced-pool --baseMint <FREDO_MINT>
```

Or via Raydium if preferred — both work with standard SPL tokens.

### Post-Listing

- Trading goes live after TGE
- R1 participants have 25% unlocked to trade immediately
- R2 participants have 50% unlocked
- R3 participants have 100% unlocked
- Vested tokens stream linearly after lock periods end

---

## 6. Frontend Implementation

### 6.1 Token Sale Page (`/token`)

Complete redesign of current page to show live sale progress.

#### Layout

```
┌─────────────────────────────────────────┐
│  Fixed PublicNav                         │
├─────────────────────────────────────────┤
│  Hero: "$FREDO — The AI Bot Economy"    │
│  Token stats: Supply, Claimed, Sold     │
├─────────────────────────────────────────┤
│  ┌─── Round 1 (Seed) ───────────────┐  │
│  │ Status: LIVE / FILLED / UPCOMING  │  │
│  │ Price: $0.005 (fixed)             │  │
│  │ Progress: ████████░░ 80% filled   │  │
│  │ Raised: $40,000 / $50,000         │  │
│  │ Ends in: 2d 14h 32m              │  │
│  │ [Connect Wallet] [Deposit USDC]   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─── Round 2 (Community) ──────────┐  │
│  │ Status: UPCOMING                  │  │
│  │ Price: Dynamic ($0.005–$0.01)     │  │
│  │ Opens after Round 1 fills         │  │
│  │ 48h window · Prorata · Fair       │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─── Round 3 (Public) ────────────┐   │
│  │ Status: UPCOMING                  │  │
│  │ Price: Dynamic ($0.017–$0.05)     │  │
│  │ Opens after Round 2 closes        │  │
│  │ 72h window · Prorata · No vest    │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  Claim Section (for bot creators)       │
│  "Created a bot? Claim 1,000 $FREDO"    │
│  [Connect Wallet & Claim]               │
│  Counter: 8,247 / 10,000 claimed        │
├─────────────────────────────────────────┤
│  Tokenomics breakdown (bar + legend)    │
├─────────────────────────────────────────┤
│  Staking Tiers                          │
├─────────────────────────────────────────┤
│  How It Connects (flow diagram)         │
├─────────────────────────────────────────┤
│  FAQ                                    │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

#### Sale Card States

Each round card has 4 possible states:

| State | Visual |
|-------|--------|
| **Upcoming** | Grayed out, countdown to open, "Coming Soon" |
| **Live** | Highlighted border (indigo glow), progress bar animating, deposit button active |
| **Filled / Closed** | Green checkmark, final stats shown, "Completed" badge |
| **Failed** | Red/amber, "Min cap not reached — refunds processing" |

#### Real-Time Data

Read from Meteora Presale accounts on-chain:

```typescript
import Presale, { PresaleWrapper, PresaleRegistryWrapper } from "@meteora-ag/presale";

// Fetch presale state
const presale = await Presale.create(connection, presaleAddress, PRESALE_PROGRAM_ID);
const wrapper = new PresaleWrapper(presale);

// Display data
wrapper.totalBaseTokenSold     // Tokens sold so far
wrapper.presaleProgressPct     // Progress percentage
wrapper.canDeposit             // Whether deposits are open
wrapper.canClaim               // Whether claiming is available
wrapper.status                 // "active" | "completed" | "failed"
```

### 6.2 Wallet Connect Integration

**Package**: `@solana/wallet-adapter-react`

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-phantom @solana/wallet-adapter-react-ui @solana/web3.js
```

#### Wallet Provider Setup (App.tsx or layout)

```typescript
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network); // or custom RPC
const wallets = [new PhantomWalletAdapter()];

// Wrap app
<ConnectionProvider endpoint={endpoint}>
  <WalletProvider wallets={wallets} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
```

#### Connect Wallet Button Component

```typescript
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Use <WalletMultiButton /> or custom:
const { publicKey, connected, connect, disconnect } = useWallet();
```

### 6.3 Dashboard Claim Banner

When user is logged in and hasn't claimed:

```
┌─────────────────────────────────────────────────┐
│  🎁  Claim your 1,000 $FREDO                    │
│  You created a bot — you've earned free tokens.  │
│  8,247 / 10,000 users have claimed.              │
│                                                   │
│  [Connect Phantom Wallet]                         │
│  or if connected: [Claim 1,000 $FREDO →]         │
└─────────────────────────────────────────────────┘
```

After claimed:

```
┌─────────────────────────────────────────────────┐
│  ✓  1,000 $FREDO claimed                        │
│  Wallet: 7xKX...3nFp · View on Solscan ↗       │
│  Hold 10,000+ to unlock Creator tier             │
└─────────────────────────────────────────────────┘
```

### 6.4 Vesting Dashboard (`/token/vesting`)

For sale participants to track their token unlocks:

```
Your $FREDO Vesting

Round 1 (Seed)
├─ Purchased: 10,000 $FREDO at $0.005
├─ Unlocked:  2,500 $FREDO (25%)     [Claim]
├─ Vesting:   7,500 $FREDO over 90 days
├─ Next unlock: 83 $FREDO/day
└─ Fully vested: June 15, 2026

Round 2 (Community)
├─ Purchased: 5,000 $FREDO at $0.008
├─ Unlocked:  2,500 $FREDO (50%)     [Claim]
├─ Vesting:   2,500 $FREDO over 60 days
└─ Fully vested: May 20, 2026
```

---

## 7. Dependencies

### NPM Packages (Frontend)

```json
{
  "@solana/web3.js": "^1.95",
  "@solana/spl-token": "^0.4",
  "@solana/wallet-adapter-react": "^0.15",
  "@solana/wallet-adapter-phantom": "^0.9",
  "@solana/wallet-adapter-react-ui": "^0.9",
  "@meteora-ag/presale": "latest"
}
```

### Backend/CLI Tools

```json
{
  "@meteora-ag/presale": "latest",
  "@solana/web3.js": "^1.95",
  "@solana/spl-token": "^0.4",
  "bn.js": "^5.2"
}
```

### Infrastructure

| Need | Solution |
|------|----------|
| Solana RPC | Helius or QuickNode (free tier for dev, paid for prod) |
| Token metadata hosting | Arweave via Metaplex |
| Whitelist server (R1) | Platform backend serves Merkle proofs |
| Creator wallet | Hardware wallet (Ledger) for mainnet operations |

---

## 8. Security Considerations

1. **Mint authority revoked** — No one can create more tokens after initial mint
2. **LP locked** — Initial liquidity locked for 12 months (verifiable on-chain)
3. **Team vesting** — 6-month cliff + 2-year vest, enforced on-chain via Meteora vesting
4. **Anti-sybil claims** — 1 claim per email-verified account with an active bot
5. **Presale smart contract** — Meteora's presale program is audited ([audit reports](https://github.com/MeteoraAg/audits))
6. **No admin keys on presale** — Once created, presale parameters are immutable
7. **Automatic refunds** — If min cap not met, Meteora auto-refunds all contributors

---

## 9. Implementation Phases

### Phase A — Token Creation (Day 1-2)

- [ ] Create SPL token on devnet for testing
- [ ] Upload token metadata + logo to Arweave
- [ ] Test token transfers
- [ ] Create mainnet token (when ready for launch)
- [ ] Revoke mint authority
- [ ] Distribute tokens to allocation wallets

### Phase B — Wallet Connect (Day 2-3)

- [ ] Install `@solana/wallet-adapter-*` packages
- [ ] Add Solana providers to app layout
- [ ] Build WalletConnect button component
- [ ] Store wallet address in user profile (backend)
- [ ] Test connect/disconnect flow with Phantom

### Phase C — Claim System (Day 3-5)

- [ ] Create `claims` database table
- [ ] Build claim API endpoints
- [ ] Build claim banner component for dashboard
- [ ] Build claim flow on token page
- [ ] Server-side: sign and send SPL transfer on claim
- [ ] Test full claim flow on devnet
- [ ] Add claim counter (public)

### Phase D — Presale Vaults (Day 5-8)

- [ ] Create Round 1 presale vault on devnet (Fixed Price, Merkle)
- [ ] Create Round 2 presale vault on devnet (Prorata, Permissionless)
- [ ] Create Round 3 presale vault on devnet (Prorata, Permissionless)
- [ ] Build whitelist/Merkle tree for Round 1
- [ ] Test deposit, withdraw, claim, refund flows
- [ ] Build presale monitoring (read on-chain state)

### Phase E — Token Sale Page (Day 5-8, parallel with D)

- [ ] Redesign `/token` page with sale round cards
- [ ] Real-time progress bars (read from Meteora on-chain)
- [ ] Deposit flow (wallet → USDC → presale vault)
- [ ] Round state management (upcoming, live, filled, failed)
- [ ] Countdown timers
- [ ] Participant dashboard (your deposits, allocations, vesting)
- [ ] Mobile responsive

### Phase F — DEX Listing (Day 8-10)

- [ ] Create Meteora DAMM v2 or Raydium pool
- [ ] Seed initial liquidity ($FREDO + USDC from raise)
- [ ] Lock LP tokens for 12 months
- [ ] Verify pool on DEX aggregators (Jupiter, etc.)
- [ ] Update token page with "Now Trading" state + DEX links

### Phase G — Mainnet Launch

- [ ] Audit all smart contract interactions
- [ ] Create mainnet presale vaults
- [ ] Prepare marketing (announcement, whitelist, countdown)
- [ ] Go live Round 1
- [ ] Monitor, support, iterate

---

## 10. Key Decisions Still Open

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Platform name | **Aifredo** (aifredo.chat) | Done |
| Token ticker | $FREDO or new ticker matching new name | May want to align |
| RPC provider | Helius, QuickNode, Alchemy, Triton | Helius (free tier + good Metaplex support) |
| Whitelist criteria for R1 | Early community, bot creators, manual curation | Manual curation + Merkle tree |
| R1 wallet cap | $5,000 per wallet (current spec) | Review based on whitelist size |
| Listing DEX | Meteora DAMM v2 vs Raydium CPMM | Meteora (already using their presale) |
| Multisig | Squads Protocol for treasury | Recommended for trust |

---

## 11. Links & References

- [Meteora Presale Vault Docs](https://docs.meteora.ag/overview/other-products/presale-vault/what-is-presale-vault)
- [Meteora Presale SDK](https://github.com/MeteoraAg/presale-sdk) — `@meteora-ag/presale`
- [Meteora Invent (Launch Toolkit)](https://github.com/MeteoraAg/meteora-invent)
- [Meteora Audit Reports](https://github.com/MeteoraAg/audits)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Metaplex Token Metadata](https://developers.metaplex.com/token-metadata)
- [SPL Token Program](https://spl.solana.com/token)
- [Squads Multisig](https://squads.so/) — for treasury management
