import {
  Bot,
  BrainCircuit,
  Building2,
  FileText,
  Gauge,
  Languages,
  MessageSquare,
  Settings,
  UserCircle,
  Workflow,
} from "lucide-react";

export const brand = {
  icon: BrainCircuit,
};

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "AI Chat", href: "/chat", icon: MessageSquare },
  { label: "AI Agents", href: "/agents", icon: Bot },
  { label: "Automation", href: "/automation", icon: Workflow },
  { label: "Business Intelligence", href: "/business-intelligence", icon: Building2 },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Knowledge Base", href: "/knowledge-base", icon: BrainCircuit },
  { label: "Languages", href: "/languages", icon: Languages },
  { label: "Profile", href: "/profile", icon: UserCircle },
  { label: "Settings", href: "/settings", icon: Settings },
];
