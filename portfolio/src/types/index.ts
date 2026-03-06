import type { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  stack: string;
  description: string;
  github?: string;
  demo?: string;
  icon: LucideIcon;
}