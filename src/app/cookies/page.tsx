import { defaultViewport } from '@/app/metadata';
import { Metadata } from "next";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export const metadata: Metadata = {
  title: "Cookie Policy - Educational Platform",
  description: "Our cookie policy and how we use tracking technologies",
};

export const viewport = defaultViewport;

export default function CookiePolicyPage() {
  return (
    <>
      <ScrollIndicator />
      <div className="container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            When you use and access our service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
          </p>
          <ul>
            <li>To enable certain functions of the service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>To enable advertisements delivery, including behavioral advertising</li>
          </ul>
          <p>
            We use both session and persistent cookies on the service and we use different types of cookies to run the service:
          </p>
          <ul>
            <li>Essential cookies. We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
            <li>Preferences cookies. We may use preferences cookies to remember information that changes the way the service behaves or looks, such as the "remember me" functionality or a user's language preference.</li>
            <li>Analytics cookies. We may use analytics cookies to track information about how the service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the service to see how our users react to them.</li>
            <li>Targeting cookies. These types of cookies are used to deliver advertisements on and through the service and track the performance of these advertisements. These cookies may also be used to enable third-party advertising networks to deliver ads that may be relevant to you based upon your activities or interests.</li>
          </ul>

          <h2>3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. These may include:
          </p>
          <ul>
            <li>Google Analytics: Used to track website usage and user behavior</li>
            <li>Stripe: Used for processing payments securely</li>
            <li>Hotjar: Used to understand how users interact with our website</li>
            <li>Social media cookies: Allow you to share content directly on social media platforms</li>
          </ul>

          <h2>4. What Are Your Choices Regarding Cookies</h2>
          <p>
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
          </p>
          <p>
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
          <ul>
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/kb/PH21411" target="_blank" rel="noopener noreferrer">https://support.apple.com/kb/PH21411</a></li>
          </ul>
          <p>
            For any other web browser, please visit your web browser's official web pages.
          </p>

          <h2>5. More Information About Cookies</h2>
          <p>
            You can learn more about cookies at the following third-party websites:
          </p>
          <ul>
            <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer">http://www.networkadvertising.org/</a></li>
            <li>AllAboutCookies: <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">http://www.allaboutcookies.org/</a></li>
          </ul>

          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
          </p>
          <p>
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at privacy@educationalplatform.com.
          </p>
        </div>
      </div>
    </>
  );
} 