import { PublicNav } from '../components/layout/PublicNav';

export default function CookiePolicy() {
  return (
    <div className="min-h-full bg-[#0A0A0F]">
      <PublicNav />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 pt-24">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
          <p className="mt-2 text-slate-300 text-sm">
            Aifredo.chat — Effective Date: February 13, 2026
          </p>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Pipe Labs, LLC ("Company," "we," "us," or "our") uses cookies and similar technologies on Aifredo.chat (the "Platform"). This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.
          </p>

          {/* 1. What Are Cookies */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            1. What Are Cookies
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain on your device for a set period or until you delete them).
          </p>

          {/* 2. How We Use Cookies */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            2. How We Use Cookies
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We use cookies for the following purposes:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Essential Cookies:</span> Required for the Platform to function properly (e.g., authentication, security).</li>
            <li><span className="font-medium">Functional Cookies:</span> Remember your preferences and settings to enhance your experience.</li>
            <li><span className="font-medium">Analytics Cookies:</span> Help us understand how users interact with the Platform so we can improve it.</li>
            <li><span className="font-medium">Performance Cookies:</span> Monitor Platform performance and identify issues.</li>
          </ul>

          {/* 3. Cookies We Use */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            3. Cookies We Use
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            The following table describes the main cookies used on our Platform:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left border border-white/10 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Cookie Name</th>
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Type</th>
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-white border-b border-white/10">Duration</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-mono text-xs">session_token</td>
                  <td className="px-4 py-3">Essential</td>
                  <td className="px-4 py-3">Maintains your login session</td>
                  <td className="px-4 py-3">Session</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-mono text-xs">csrf_token</td>
                  <td className="px-4 py-3">Essential</td>
                  <td className="px-4 py-3">Prevents cross-site request forgery</td>
                  <td className="px-4 py-3">Session</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-mono text-xs">user_preferences</td>
                  <td className="px-4 py-3">Functional</td>
                  <td className="px-4 py-3">Stores your display preferences</td>
                  <td className="px-4 py-3">1 year</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-mono text-xs">_ga</td>
                  <td className="px-4 py-3">Analytics</td>
                  <td className="px-4 py-3">Google Analytics — distinguishes users</td>
                  <td className="px-4 py-3">2 years</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                  <td className="px-4 py-3">Analytics</td>
                  <td className="px-4 py-3">Google Analytics — maintains session state</td>
                  <td className="px-4 py-3">2 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">cookie_consent</td>
                  <td className="px-4 py-3">Essential</td>
                  <td className="px-4 py-3">Records your cookie consent choice</td>
                  <td className="px-4 py-3">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4. Third-Party Cookies */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            4. Third-Party Cookies
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Some cookies are placed by third-party services that appear on our pages. We use the following third-party services that may set cookies:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Google Analytics:</span> For website usage analytics.</li>
            <li><span className="font-medium">Stripe:</span> For payment processing.</li>
          </ul>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We do not control these third-party cookies. Please refer to the respective third-party privacy policies for more information.
          </p>

          {/* 5. Your Cookie Choices */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            5. Your Cookie Choices
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            You can manage your cookie preferences in the following ways:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li><span className="font-medium">Browser Settings:</span> Most browsers allow you to block or delete cookies through their settings. Refer to your browser's help documentation for instructions.</li>
            <li><span className="font-medium">Cookie Consent Banner:</span> When you first visit our Platform, you can choose which non-essential cookies to accept or reject.</li>
            <li><span className="font-medium">Opt-Out Links:</span> For Google Analytics, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Google Analytics Opt-Out Browser Add-on</a>.</li>
          </ul>

          {/* 6. Impact of Disabling Cookies */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            6. Impact of Disabling Cookies
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            If you disable or reject cookies, some features of the Platform may not function properly. Essential cookies cannot be disabled as they are necessary for the Platform to operate. Disabling non-essential cookies may affect:
          </p>
          <ul className="mt-2 space-y-1 text-slate-300 text-sm leading-relaxed list-disc list-inside marker:text-slate-400">
            <li>Your personalized settings and preferences.</li>
            <li>Our ability to improve the Platform based on usage analytics.</li>
            <li>Certain interactive features that rely on cookies.</li>
          </ul>

          {/* 7. Cookie Consent */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            7. Cookie Consent
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            By continuing to use our Platform, you consent to the use of essential cookies. For non-essential cookies, we will request your consent through our cookie consent banner. You can change your cookie preferences at any time through your browser settings or by contacting us.
          </p>

          {/* 8. Updates to This Cookie Policy */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            8. Updates to This Cookie Policy
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We will post the updated policy on this page and update the "Effective Date." We encourage you to review this policy periodically.
          </p>

          {/* 9. Contact Us */}
          <h2 className="text-xl font-semibold text-white border-t border-white/10 pt-6 mt-8">
            9. Contact Us
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            If you have questions about our use of cookies, please contact us at:
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
