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


export function arrayCheck<T>(array: T[] | null | undefined): array is T[] {
  return (array?.length ?? 0) > 0;
}