// lib/experience.ts

export function calculateExperience(
  startMonth: number,
  startYear: number,
): string {
  const now = new Date();
  const start = new Date(startYear, startMonth - 1, 1);

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}.${months + 1}+`;
}
