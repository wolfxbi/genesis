import { PageCard } from "@/components/page-card";

export default function Page() {
  return <PageCard title="Settings" eyebrow="Platform Control" description="Configure workspace defaults, security posture, notifications, and integration readiness." stats={['Workspace config', 'Security settings', 'Integration slots']} />;
}
