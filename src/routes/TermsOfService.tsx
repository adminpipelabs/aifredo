import { Link } from 'react-router-dom';
import { PublicNav } from '../components/layout/PublicNav';

export default function TermsOfService() {
  return (
    <div className="min-h-full bg-[#0A0A0F]">
      <PublicNav />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 pt-24">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="mt-2 text-slate-300 text-sm">
            Aifredo.chat — Effective Date: February 13, 2026
          </p>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Welcome to Aifredo.chat ("Platform"), operated by Pipe Labs, LLC ("Company," "we," "us," or "our"). By accessing or using the Platform, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Platform.
          </p>

          {/* 1. Eligibility */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            1. Eligibility
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            You must be at least 18 years old and capable of forming a legally binding contract to use the Platform. By using Aifredo.chat, you represent and warrant that you meet these eligibility requirements.
          </p>

          {/* 2. Account Registration */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            2. Account Registration
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            To access certain features, you must create an account. You agree to:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Maintain the security of your password and account.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
            <li>Accept responsibility for all activities that occur under your account.</li>
          </ul>

          {/* 3. Description of Service */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            3. Description of Service
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Aifredo.chat provides a platform for creating, configuring, and deploying AI-powered chatbots ("Bots") across various messaging channels, including but not limited to Telegram, Discord, and web-based chat. The Platform enables users to:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Build and customize AI Bots using various language models.</li>
            <li>Deploy Bots to supported messaging platforms.</li>
            <li>Monitor Bot performance and usage analytics.</li>
            <li>Manage Bot configurations and integrations.</li>
          </ul>

          {/* 4. Subscriptions and Payment */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            4. Subscriptions and Payment
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            4.1 Plans and Pricing
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            The Platform offers various subscription plans, including free and paid tiers. Features, usage limits, and pricing are described on our pricing page and may change from time to time.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            4.2 Billing
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Paid plans are billed on a prepaid balance basis. You agree to pay all fees associated with your selected plan. All payments are processed through our third-party payment processor.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            4.3 Refunds
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            All fees are non-refundable unless otherwise required by applicable law or as expressly stated in these Terms.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            4.4 Free Tier
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            We may offer a free tier with limited features and usage. We reserve the right to modify or discontinue the free tier at any time without notice.
          </p>

          {/* 5. Acceptable Use */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            5. Acceptable Use
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            You agree not to use the Platform to:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Violate any applicable laws, regulations, or third-party rights.</li>
            <li>Generate, distribute, or facilitate harmful, abusive, harassing, defamatory, or illegal content.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation.</li>
            <li>Interfere with or disrupt the Platform's infrastructure or other users' access.</li>
            <li>Attempt to gain unauthorized access to any part of the Platform.</li>
            <li>Use the Platform for spam, phishing, or other deceptive practices.</li>
            <li>Reverse-engineer, decompile, or disassemble any part of the Platform.</li>
            <li>Use Bots to collect personal data without proper consent.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate these guidelines without notice.
          </p>

          {/* 6. Intellectual Property */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            6. Intellectual Property
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            6.1 Platform IP
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            The Platform, including its design, code, features, and content, is owned by Pipe Labs, LLC and protected by intellectual property laws. Nothing in these Terms grants you any right to use our trademarks, logos, or branding.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            6.2 Your Content
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            You retain ownership of the content you create using the Platform (e.g., Bot configurations, system prompts, custom responses). By using the Platform, you grant us a limited, non-exclusive license to host and process your content solely to provide the service.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            6.3 AI-Generated Content
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Content generated by AI models through the Platform is provided "as is." We make no claims of ownership over AI-generated outputs. You are responsible for reviewing and using AI-generated content in compliance with applicable laws.
          </p>

          {/* 7. Third-Party Services */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            7. Third-Party Services
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            The Platform integrates with third-party services, including:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>AI model providers (e.g., OpenAI, Anthropic, Google)</li>
            <li>Messaging platforms (e.g., Telegram, Discord)</li>
            <li>Payment processors (e.g., Stripe)</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Your use of these third-party services is subject to their respective terms of service and privacy policies. We are not responsible for the availability, accuracy, or conduct of any third-party service.
          </p>

          {/* 8. Privacy */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            8. Privacy
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Your use of the Platform is also governed by our{' '}
            <Link to="/privacy" className="text-indigo-400 hover:text-indigo-300 underline">
              Privacy Policy
            </Link>
            , which describes how we collect, use, and protect your personal information.
          </p>

          {/* 9. Disclaimers */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            9. Disclaimers
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We do not warrant that:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>The Platform will be uninterrupted, error-free, or secure.</li>
            <li>AI-generated outputs will be accurate, complete, or appropriate.</li>
            <li>The Platform will meet your specific requirements.</li>
          </ul>

          {/* 10. Limitation of Liability */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            10. Limitation of Liability
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, PIPE LABS, LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Your use of or inability to use the Platform.</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
            <li>Any interruption or cessation of transmission to or from the Platform.</li>
            <li>Any bugs, viruses, or similar issues transmitted through the Platform by any third party.</li>
            <li>Any errors or omissions in any content or AI-generated output.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Our total aggregate liability shall not exceed the greater of (a) the amount you paid us in the twelve (12) months preceding the claim, or (b) one hundred dollars ($100).
          </p>

          {/* 11. Indemnification */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            11. Indemnification
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            You agree to indemnify, defend, and hold harmless Pipe Labs, LLC, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising from:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Your use of the Platform.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any third-party rights.</li>
            <li>Content created, deployed, or distributed through your Bots.</li>
          </ul>

          {/* 12. Termination */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            12. Termination
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We may suspend or terminate your account and access to the Platform at any time, with or without cause, with or without notice. Upon termination:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Your right to use the Platform will immediately cease.</li>
            <li>We may delete your account data after a reasonable retention period.</li>
            <li>Provisions that by their nature should survive termination will survive (e.g., Limitation of Liability, Indemnification, Dispute Resolution).</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
          </p>

          {/* 13. Dispute Resolution */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            13. Dispute Resolution
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            13.1 Governing Law
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            13.2 Arbitration
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Any dispute arising from these Terms or your use of the Platform shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall take place in Wilmington, Delaware.
          </p>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed font-medium">
            13.3 Class Action Waiver
          </p>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            You agree that any dispute resolution proceedings will be conducted on an individual basis and not as a class action, consolidated action, or representative action.
          </p>

          {/* 14. General Provisions */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            14. General Provisions
          </h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>
              <span className="font-medium">Entire Agreement:</span> These Terms, together with the Privacy Policy, constitute the entire agreement between you and Pipe Labs, LLC regarding your use of the Platform.
            </li>
            <li>
              <span className="font-medium">Severability:</span> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
            </li>
            <li>
              <span className="font-medium">Waiver:</span> Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right or provision.
            </li>
            <li>
              <span className="font-medium">Assignment:</span> You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.
            </li>
          </ul>

          {/* 15. Changes to Terms */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            15. Changes to Terms
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on the Platform and updating the "Effective Date." Your continued use of the Platform after changes are posted constitutes acceptance of the modified Terms.
          </p>

          {/* 16. Contact */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            16. Contact
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            If you have questions about these Terms, please contact us at:
          </p>
          <div className="mt-3 text-slate-300 text-sm leading-relaxed">
            <p className="font-medium">Pipe Labs, LLC</p>
            <p>
              Email:{' '}
              <a href="mailto:legal@aifredo.chat" className="text-indigo-400 hover:text-indigo-300 underline">
                legal@aifredo.chat
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
