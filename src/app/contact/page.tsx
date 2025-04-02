import { defaultViewport } from '@/app/metadata';
import { Metadata } from "next";
import ContactForm from "./contact-form-component";

export const metadata: Metadata = {
  title: "Contact Us - Educational Platform",
  description: "Get in touch with our team for support or inquiries",
};

export const viewport = defaultViewport;

export default function ContactPage() {
  return <ContactForm />;
} 