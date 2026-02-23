# Aifredo — Vision & Roadmap

> The platform where anyone can build, launch, sell, and monetize AI bots.
> Token: **$FREDO** on Solana. Domain: **aifredo.chat**

---

## What Aifredo Is

Aifredo is the Shopify of AI bots. It turns "I need to code an AI bot" into "configure, launch, monetize" — in under 10 minutes.

Three levels of value:

1. **Use** — Build a bot for yourself (save time, automate tasks)
2. **Launch** — Deploy it on channels your audience uses (Telegram, WhatsApp, websites)
3. **Monetize** — Charge end users, sell templates, build a bot business

---

## Current State — What's Built

### Platform (Live)
- [x] Bot creation wizard (name, model, channel, prompt, skills, test, done)
- [x] Dashboard with multi-bot management
- [x] Stripe integration (prepaid balance, pay-per-use)
- [x] Magic link login (passwordless, email-only)
- [x] Shareable public chat URLs (`aifredo.chat/bot/{id}`)
- [x] Embeddable website widget (one-line script tag)
- [x] Bot settings (BYOK API keys, channel tokens, gateway config)
- [x] Test chat before going live
- [x] Dark theme across entire platform
- [x] Landing page, token page, legal pages
- [x] Deployed on Hetzner with Caddy HTTPS

### Token Infrastructure (Live)
- [x] $FREDO reservation system (backend + frontend)
- [x] Solana wallet connect (Phantom) integrated
- [x] Claims table in database (user_id, wallet_address, amount, status)
- [x] Public claim counter API (`/api/claims/stats`)
- [x] Authenticated claim status API (`/api/claims/status`)
- [x] Reserve endpoint (`/api/claims/reserve`)
- [x] Interactive 3-step claim flow on `/token` page
- [x] Claim banner on Dashboard for eligible users
- [x] Progress bar with live reservation count

### What Users Can Do Today
- Create and configure AI bots
- Share bots via public URL or embed on websites
- Test bots before going live
- Pay for hosting via Stripe
- Reserve 1,000 $FREDO by connecting a Phantom wallet (first 10,000 users)

### What Users Cannot Do Yet
- Charge end users for bot access
- Sell bot templates to other users
- Discover other bots (marketplace)
- Use $FREDO for anything on-platform
- Transfer or trade $FREDO (token not minted yet)

---

## Roadmap

### Phase 1 — Token Value & Early Adopter Perks (Now → 4 weeks)

> Goal: Make reservations feel valuable. Reward early users. Build community.

**1.1 Feature Gating by Reservation**
- Users who reserve $FREDO get "Founder" badge on their profile and bots
- Founders get early access to new features before general release
- Founders get priority ranking when marketplace launches
- Visual: gold badge on bot cards, dashboard, and public chat pages

**1.2 Referral System**
- "Invite a friend" flow: unique referral link per user
- Referee creates a bot + reserves → referrer gets +500 $FREDO added to reservation
- Referee also gets their standard 1,000 $FREDO
- Referral tracking in `claims` table (referrer_id column)
- Dashboard widget: "X friends invited, X,XXX bonus $FREDO earned"

**1.3 Community Launch**
- Founders-only Telegram/Discord group
- Early access announcements, feedback loops, direct line to team
- Community members help shape roadmap priorities

**1.4 Token Creation (Devnet → Mainnet)**
- Create $FREDO SPL token on Solana devnet for testing
- Upload metadata + logo to Arweave (Metaplex standard)
- Test transfers, claim flow end-to-end on devnet
- When ready: mint on mainnet, revoke mint authority, fund claims wallet

**Deliverables:**
- [ ] Founder badge system (frontend + DB flag)
- [ ] Referral link generation + tracking
- [ ] Referral bonus logic in claim API
- [ ] Community channels created
- [ ] SPL token created on devnet
- [ ] End-to-end claim test on devnet

---

### Phase 2 — Bot Monetization (Weeks 4–8)

> Goal: Let bot owners make money. This is the core value proposition.

**2.1 End-User Billing**
- Bot owners set pricing on their public chat:
  - **Free** — anyone can chat (current behavior)
  - **Pay-per-message** — e.g., $0.05/message
  - **Subscription** — e.g., $9.99/month unlimited
  - **Credits** — e.g., 100 messages for $5
- End users see paywall on public chat page → Stripe Checkout
- After paying → unlimited or metered access

**2.2 Stripe Connect**
- Bot owners connect their own Stripe account
- End-user payments flow: end user → Stripe → bot owner (minus 10% platform fee)
- Automatic payouts (daily or weekly)

**2.3 Revenue Dashboard**
- New "Revenue" tab in dashboard
- Total earnings (today, week, month, all time)
- Per-bot breakdown
- End-user count and retention metrics
- Payout history

**2.4 $FREDO Fee Discounts (First Real Utility)**
- Reservation holders get reduced platform fees:
  - Builder (1,000 $FREDO): 10% fee (standard)
  - Creator (10,000): 7.5% fee
  - Pro (50,000): 5% fee
  - Partner (250,000): 3% fee + revenue share
- Tier determined by reservation amount (until token is live, then by wallet balance)

**Deliverables:**
- [ ] Pricing settings in Bot Settings page
- [ ] Stripe Connect onboarding flow
- [ ] End-user payment gate on public chat
- [ ] Revenue dashboard page
- [ ] Fee discount logic based on $FREDO tier
- [ ] Payout scheduling

---

### Phase 3 — Marketplace (Weeks 8–14)

> Goal: Network effects. More sellers attract more buyers. More buyers attract more sellers.

**3.1 Template Marketplace**
- `aifredo.chat/marketplace`
- Browse bot templates by category:
  - Customer Support, Lead Gen, Personal Assistant, Education, Health, Finance, Community, E-commerce, Content Creation
- Each listing: name, description, preview chat, rating, reviews, install count, price
- "Install" button → clones template into your account

**3.2 Seller Program**
- Package your bot as a template (system prompt, skills, suggested channels)
- Set price ($0 to $999) — in USDC or $FREDO
- Aifredo takes 20% commission on sales
- Seller profiles: `aifredo.chat/@username`

**3.3 $FREDO Marketplace Integration**
- Listing a bot requires Builder tier (1,000 $FREDO reserved/held)
- "Featured" placement costs $FREDO (spend utility)
- Template purchases can be made in $FREDO (at market rate)
- Sellers earn $FREDO rewards for top-rated templates

**3.4 Discovery**
- Staff picks, trending bots, new arrivals
- Category pages with filters (price, rating, channel, language)
- Search with AI-powered recommendations
- Case studies: "How [User] makes $X/month with their support bot"

**Deliverables:**
- [ ] Marketplace page with categories and search
- [ ] Template packaging flow for sellers
- [ ] Listing + purchase flow (Stripe + $FREDO)
- [ ] Review and rating system
- [ ] Seller profiles
- [ ] Featured placement (paid with $FREDO)

---

### Phase 4 — Bot Businesses & White-Label (Weeks 14–20)

> Goal: Power users build real businesses on Aifredo.

**4.1 White-Label**
- Remove all Aifredo branding from public chat
- Custom domain: `ai.theircompany.com`
- Custom logo, colors, favicon
- Custom email domain for magic links
- Gated behind Creator tier (10,000 $FREDO)

**4.2 Team Accounts**
- Invite team members (roles: owner, admin, viewer)
- Shared bot management and billing
- Activity log
- Gated behind Pro tier (50,000 $FREDO)

**4.3 API Access**
- RESTful API for bot interactions
- Webhooks for events (new message, user signup, payment)
- SDKs (JavaScript, Python)
- Rate limiting and usage analytics
- Gated behind Pro tier

**4.4 Enterprise Tier**
- SLA guarantees (99.9% uptime)
- Dedicated infrastructure
- Priority support, custom integrations
- Volume pricing

**Deliverables:**
- [ ] White-label settings page
- [ ] Custom domain provisioning (Caddy API)
- [ ] Team invitation and role management
- [ ] Public API with documentation
- [ ] JavaScript and Python SDKs
- [ ] Enterprise contact/onboarding flow

---

### Phase 5 — Full Token Economy (Weeks 20–30)

> Goal: $FREDO becomes the native currency of the AI bot economy.

**5.1 Token Launch**
- Mint $FREDO on Solana mainnet (1B supply, 6 decimals)
- Revoke mint authority (max supply proven fixed)
- Distribute reservations: batch transfer 1,000 $FREDO to each reserved wallet
- Status in `claims` table moves from `reserved` → `distributed`

**5.2 Token Sale (3 Rounds via Meteora Presale Vault)**

| | Round 1 — Seed | Round 2 — Community | Round 3 — Public |
|---|---|---|---|
| Tokens | 10M (1%) | 30M (3%) | 60M (6%) |
| Mode | Fixed Price | Prorata | Prorata |
| Price | $0.005 | $0.005–$0.01 | $0.017–$0.05 |
| Raise | $50K | $150K–$300K | $1M–$3M |
| Duration | 7 days | 48 hours | 72 hours |
| Access | Whitelist (founders) | Open | Open |
| Vesting | 25% TGE / 75% 90d | 50% TGE / 50% 60d | 100% unlocked |

- Round 1 filling guarantees DEX listing
- Reservation holders get whitelist priority for Round 1

**5.3 DEX Listing**
- Meteora DAMM v2 or Raydium CPMM pool
- $FREDO / USDC pair
- 100M tokens (10%) seeded as initial liquidity
- LP locked for 12 months

**5.4 On-Chain Staking**
- Lock $FREDO in staking contract to maintain tier status
- Tiers unlock platform features (as defined in Phase 2-4)
- Partner-tier holders receive revenue share from buyback

**5.5 Buyback & Burn**
- 10% of all platform fees (USDC) → buy $FREDO from DEX
- 50% distributed to Partner-tier stakers
- 50% burned permanently (supply reduction)

**5.6 Governance**
- Token-weighted voting on:
  - New feature priorities
  - Fee structure changes
  - Marketplace policies
  - Treasury allocation
- Snapshot-style voting (no gas cost)

**Deliverables:**
- [ ] SPL token creation + metadata on mainnet
- [ ] Batch distribution script for reservations
- [ ] Presale vault creation (3 rounds via Meteora SDK)
- [ ] DEX pool creation and LP locking
- [ ] Staking contract
- [ ] Buyback mechanism
- [ ] Governance portal
- [ ] Vesting dashboard for sale participants

---

## Token Allocation

| Allocation | % | Tokens | Purpose | Lockup |
|-----------|---|--------|---------|--------|
| Community Claims | 1% | 10,000,000 | Free claim for first 10,000 bot creators | Unlocked at distribution |
| Token Sale | 10% | 100,000,000 | Capital raise (3 rounds) | Per-round vesting |
| Ecosystem & Rewards | 30% | 300,000,000 | Creator rewards, referrals, usage incentives | 3-year release |
| Team & Founders | 15% | 150,000,000 | Core team | 6-month cliff, 2-year vest |
| Development Fund | 15% | 150,000,000 | Platform dev, infrastructure, hiring | 12-month linear |
| DEX Liquidity | 10% | 100,000,000 | Initial pool + market making | LP locked 12 months |
| Partnerships | 10% | 100,000,000 | Integrations, exchanges, KOLs | Case-by-case, 6-month vest |
| Treasury | 9% | 90,000,000 | Emergency fund, future opportunities | 12-month lock, then DAO |

Total supply: **1,000,000,000 $FREDO** (fixed, mint authority revoked)

---

## The Two-Layer Economy

| Layer | Purpose | Currency |
|-------|---------|----------|
| **Infrastructure** | API calls, hosting, messages, compute | USDC / fiat (Stripe) |
| **Value** | Create, sell, share, earn, unlock features | $FREDO token |

Infrastructure is the cost layer — predictable, covers real expenses.
$FREDO is the value layer — where network effects, incentives, and growth happen.

---

## $FREDO Utility Summary

### Spend
- List bots on marketplace
- Promote to "Featured" placement
- Buy premium templates
- Purchase advanced skills/integrations

### Hold (Staking Tiers)

| Tier | Amount | Unlocks |
|------|--------|---------|
| **Builder** | 1,000 | Marketplace listing, community access, basic analytics |
| **Creator** | 10,000 | White-label, custom domain, 7.5% fee (vs 10%), priority support |
| **Pro** | 50,000 | API access, team accounts, 5% fee, advanced analytics |
| **Partner** | 250,000+ | Revenue share, governance votes, 3% fee, early features |

### Earn
- Usage-based creator rewards (bots that get used)
- Referral bonuses
- Template sales on marketplace
- Community contributions (docs, tutorials, feedback)

---

## Pricing Model

### Infrastructure (Stripe / USDC)
- $0.50/day per bot hosting
- $0.002/message (first 100/day free)
- $0.25/day per premium channel
- 10% platform fee on end-user payments (reduced by $FREDO tier)

### Platform Plans (Future)
- **Free** — Create bots, test chat, basic features
- **Creator** ($29/mo) — Monetization, Stripe Connect, revenue dashboard, custom branding
- **Business** ($99/mo) — White-label, custom domain, team accounts, API access
- **Enterprise** (custom) — SLA, dedicated infra, priority support

---

## Competitive Position

| Platform | What they do | Aifredo advantage |
|----------|-------------|-------------------|
| ChatGPT GPT Store | Custom GPTs | Multi-channel, monetization, white-label, token economy |
| Botpress | Bot builder | Simpler, marketplace-first, monetization built-in |
| ManyChat | Chat marketing | AI-native, not rule-based |
| Intercom | Customer support | 10x cheaper, creator-friendly |
| Zapier | Automation | Conversation-first, not workflow-first |

**Moat**: The only platform where you can build an AI bot AND sell it AND charge end users AND embed it everywhere — in under 10 minutes. Powered by a token economy that aligns incentives between platform, creators, and users.

---

## Partnership Strategy

The $FREDO reservation system is **token-agnostic by design**. This enables:

1. **Community partnerships** — Onboard existing crypto/AI communities. Their members create bots, reserve $FREDO, become platform users.
2. **Token swaps** — Partner projects could offer $FREDO rewards to their communities in exchange for Aifredo integration.
3. **White-label partners** — Agencies and SaaS companies use Aifredo infra, pay in $FREDO for premium features.
4. **Ecosystem grants** — Fund community bot builders from the Ecosystem allocation (30%).

The reservation list (wallet addresses + user accounts) is the partnership asset — it proves real users, real bots, real engagement.

---

## North Star Metrics

1. **Reservations** — $FREDO claims (target: 10,000)
2. **Bots created** — Total bots on platform
3. **Active bots** — Bots that handled messages in last 7 days
4. **Creator revenue** — Total earned by bot owners (USDC + $FREDO)
5. **Marketplace GMV** — Template sales volume
6. **Token holders** — Unique wallets holding $FREDO
7. **Buyback volume** — USDC spent on $FREDO buybacks (proves real revenue)

---

## Summary

Aifredo is not a bot builder. It's the **economy for AI bots**, powered by $FREDO.

| Phase | Status | Focus |
|-------|--------|-------|
| Foundation | **Done** | Build and deploy bots, dark UI, Stripe payments |
| Token Infra | **Done** | Reservation system, wallet connect, claim flow |
| Phase 1 | **Now** | Founder perks, referrals, community, devnet token |
| Phase 2 | Next | Bot monetization, Stripe Connect, revenue dashboard |
| Phase 3 | Planned | Marketplace, templates, seller program |
| Phase 4 | Planned | White-label, teams, API, enterprise |
| Phase 5 | Planned | Token launch, sale, DEX, staking, governance |

The agent economy runs on two layers: execution in stables, value in $FREDO. Every bot created, every message sent, every template sold — feeds the token economy.

**Build. Launch. Earn. $FREDO.**
