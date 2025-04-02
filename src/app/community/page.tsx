import { defaultViewport } from '@/app/metadata';
import { Metadata } from "next";
import ClientCommunityPage from "./client-page";

export const metadata: Metadata = {
  title: "Community - Educational Platform",
  description: "Join our vibrant community of developers learning and growing together",
};

export const viewport = defaultViewport;

export default function CommunityPage() {
  return <ClientCommunityPage />;
} 