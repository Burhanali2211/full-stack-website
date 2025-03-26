import { Metadata } from "next";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export const metadata: Metadata = {
  title: "Terms of Service - Educational Platform",
  description: "Terms and conditions for using the Educational Platform",
};

export default function TermsPage() {
  return (
    <>
      <ScrollIndicator />
      <div className="container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Educational Platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            The Educational Platform provides online programming tutorials, interactive coding exercises, and educational resources for users looking to learn programming skills.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
          </p>

          <h2>4. Content and Conduct</h2>
          <p>
            Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
          </p>
          <p>
            When you post content to the site, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Educational Platform and its licensors.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Educational Platform.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Educational Platform, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
          <p>
            By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@educationalplatform.com.
          </p>
        </div>
      </div>
    </>
  );
} 