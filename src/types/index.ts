export type ScrollDirection = "up" | "down" | "top";
export type Theme = "light" | "dark";

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  link: string;
  icon: string;
  label?: string;
  customIcon?: React.ReactNode;
}

export interface ExperienceItem {
  title: string;
  institution: string;
  startDate?: string;
  endDate?: string;
  description?: string[];
}

export interface Project {
  name: string;
  description: string[];
}
export interface SkillCategory {
  title: string;
  items: string[];
}


export function arrayCheck<T>(array: T[] | null | undefined): array is T[] {
  return (array?.length ?? 0) > 0;
}