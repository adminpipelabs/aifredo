import { Link } from 'react-router-dom';
import { PublicNav } from '../components/layout/PublicNav';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-full bg-[#0A0A0F]">
      <PublicNav />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 pt-24">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-2 text-slate-300 text-sm">
            Aifredo.chat — Effective Date: February 13, 2026
          </p>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Pipe Labs, LLC ("Company," "we," "us," or "our") operates Aifredo.chat (the "Platform"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Platform.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            By using Aifredo.chat, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          {/* 1. Information We Collect */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            1. Information We Collect
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            1.1 Information You Provide
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Account Information:</span> Name, email address, and password when you create an account.</li>
            <li><span className="font-medium">Payment Information:</span> Billing details processed through our third-party payment processor (Stripe). We do not store your full credit card information.</li>
            <li><span className="font-medium">Bot Configuration Data:</span> System prompts, bot names, settings, and configurations you create.</li>
            <li><span className="font-medium">Communications:</span> Messages you send to us for support or feedback.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            1.2 Information Collected Automatically
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Usage Data:</span> Pages visited, features used, Bot interactions, and usage patterns.</li>
            <li><span className="font-medium">Device Information:</span> Browser type, operating system, device identifiers, and IP address.</li>
            <li><span className="font-medium">Cookies and Tracking:</span> We use cookies and similar technologies as described in our <Link to="/cookies" className="text-indigo-400 hover:text-indigo-300 underline">Cookie Policy</Link>.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            1.3 Information from Third Parties
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">OAuth Providers:</span> If you sign in using a third-party service (e.g., Google), we receive basic profile information as authorized by you.</li>
            <li><span className="font-medium">Messaging Platforms:</span> When you deploy Bots, we may receive data from connected platforms (e.g., Telegram, Discord) as necessary to operate the Bot.</li>
          </ul>

          {/* 2. How We Use Your Information */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            2. How We Use Your Information
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Provide, maintain, and improve the Platform.</li>
            <li>Process transactions and manage your account.</li>
            <li>Deploy and operate your AI Bots across connected channels.</li>
            <li>Send you service-related communications (e.g., account verification, billing, security alerts).</li>
            <li>Provide customer support.</li>
            <li>Monitor and analyze usage trends to improve user experience.</li>
            <li>Detect, prevent, and address technical issues, fraud, or abuse.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          {/* 3. How We Share Your Information */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            3. How We Share Your Information
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Service Providers:</span> Third-party vendors who assist in operating the Platform (e.g., hosting, payment processing, analytics).</li>
            <li><span className="font-medium">AI Model Providers:</span> To process Bot interactions, we send relevant data to AI providers (e.g., OpenAI, Anthropic, Google). This data is governed by the respective provider's terms.</li>
            <li><span className="font-medium">Messaging Platforms:</span> Data necessary to operate Bots on connected channels.</li>
            <li><span className="font-medium">Legal Requirements:</span> When required by law, court order, or governmental regulation.</li>
            <li><span className="font-medium">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets.</li>
            <li><span className="font-medium">With Your Consent:</span> When you explicitly authorize us to share your information.</li>
          </ul>

          {/* 4. Data Retention */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            4. Data Retention
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain information as required by law or for legitimate business purposes, such as:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Resolving disputes.</li>
            <li>Enforcing our agreements.</li>
            <li>Complying with legal and regulatory obligations.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.
          </p>

          {/* 5. Data Security */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            5. Data Security
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We implement industry-standard security measures to protect your personal information, including:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Encryption of data in transit (TLS/SSL) and at rest.</li>
            <li>Secure authentication mechanisms.</li>
            <li>Regular security assessments.</li>
            <li>Access controls limiting data access to authorized personnel.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            However, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
          </p>

          {/* 6. Your Rights and Choices */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            6. Your Rights and Choices
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Access:</span> Request a copy of your personal information.</li>
            <li><span className="font-medium">Correction:</span> Request correction of inaccurate or incomplete information.</li>
            <li><span className="font-medium">Deletion:</span> Request deletion of your personal information.</li>
            <li><span className="font-medium">Portability:</span> Request your data in a portable format.</li>
            <li><span className="font-medium">Opt-Out:</span> Opt out of certain data processing activities, including marketing communications.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@aifredo.chat" className="text-indigo-400 hover:text-indigo-300 underline">
              privacy@aifredo.chat
            </a>
            . We will respond to your request within 30 days.
          </p>

          {/* 7. International Data Transfers */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            7. International Data Transfers
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. We take appropriate safeguards to ensure your information is protected in accordance with this Privacy Policy, including standard contractual clauses where applicable.
          </p>

          {/* 8. Children's Privacy */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            8. Children's Privacy
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            The Platform is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information promptly.
          </p>

          {/* 9. Third-Party Links */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            9. Third-Party Links
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            The Platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you access through the Platform.
          </p>

          {/* 10. Changes to This Privacy Policy */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            10. Changes to This Privacy Policy
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Platform and updating the "Effective Date." Your continued use of the Platform after changes are posted constitutes acceptance of the updated Privacy Policy.
          </p>

          {/* 11. Contact Us */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            11. Contact Us
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-3 text-slate-300 text-sm leading-relaxed">
            <p className="font-medium">Pipe Labs, LLC</p>
            <p>
              Email:{' '}
              <a href="mailto:privacy@aifredo.chat" className="text-indigo-400 hover:text-indigo-300 underline">
                privacy@aifredo.chat
              </a>
            </p>
            <p>131 Continental Dr Suite 305</p>
            <p>Newark, DE 19713</p>
          </div>
        </div>
      </div>
    </div>
  );
}
