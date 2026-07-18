import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genesis | AI Operating Platform",
  description: "Genesis by WolfX BI unifies AI chat, documents, intelligence, agents, and automation in one command center.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
