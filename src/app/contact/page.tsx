import { Metadata } from "next";
import ContactForm from "./contact-form-component";

export const metadata: Metadata = {
  title: "Contact Us - Educational Platform",
  description: "Get in touch with our team for support or inquiries",
};

export default function ContactPage() {
  return <ContactForm />;
} 