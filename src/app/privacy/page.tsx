import { defaultViewport } from '@/app/metadata';
import { Metadata } from "next";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export const metadata: Metadata = {
  title: "Privacy Policy - Educational Platform",
  description: "Our privacy practices and information handling procedures",
};

export const viewport = defaultViewport;

export default function PrivacyPolicyPage() {
  return (
    <>
      <ScrollIndicator />
      <div className="container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Educational Platform ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Personal Data</h3>
          <p>
            We may collect personal identification information from you, including but not limited to:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Username and password</li>
            <li>Profile information</li>
            <li>Payment information (when making purchases)</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We may also collect information on how the service is accessed and used. This usage data may include:
          </p>
          <ul>
            <li>Your computer's Internet Protocol address (e.g., IP address)</li>
            <li>Browser type and version</li>
            <li>Pages of our service that you visit</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
            <li>Other diagnostic data</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide and maintain our service</li>
            <li>Notify you about changes to our service</li>
            <li>Allow you to participate in interactive features when you choose to do so</li>
            <li>Provide customer support</li>
            <li>Gather analysis or valuable information to improve our service</li>
            <li>Monitor the usage of our service</li>
            <li>Detect, prevent and address technical issues</li>
            <li>Provide you with news, special offers, and general information about other goods, services, and events</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>

          <h2>5. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.
          </p>
          <p>
            These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@educationalplatform.com.
          </p>
        </div>
      </div>
    </>
  );
} 