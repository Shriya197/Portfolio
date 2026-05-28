import type {
  ExperienceItem,
  Project,
  SkillCategory,
  SocialLink,
} from "@/types";

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/shriya-singh19/",
    icon: "fa-brands fa-linkedin",
  },
  {
    name: "GitHub",
    link: "https://github.com/Shriya197",
    icon: "fa-brands fa-github",
  },
];

export const heroSocialLinks: SocialLink[] = [
  {
    name: "LeetCode",
    link: "https://leetcode.com/u/shriyasingh19/",
    icon: "fab fa-code",
    label: "LeetCode",
  },
  {
    name: "GitHub",
    link: "https://github.com/Shriya197",
    icon: "fa-brands fa-github",
    label: "GitHub",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/shriya-singh19/",
    icon: "fa-brands fa-linkedin",
    label: "LinkedIn",
  },
  {
    name: "HackerRank",
    link: "https://www.hackerrank.com/profile/shriyasingh197",
    icon: "fab fa-hackerrank",
    label: "HackerRank",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "Next.js",
      "Redux (Toolkit / Saga / Thunk)",
      "React Hooks",
      "Angular",
      "Rxjs",
      "React Query(TanStack Query)",
      "Context API",
      "Material UI",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Responsive Design",
    ],
  },
  {
    title: "Tools & workflow",
    items: [
      "Webpack",
      "Vite",
      "Storybook",
      "Git",
      "GitHub",
      "Jenkins",
      "Jira",
      "AWS",
      "Karma",
      "Jest",
      "Chrome DevTools",
      "CI/CD",
      "GitLab",
    ],
  },
  {
    title: "Backend & Database",
    items: [
      "RESTful APIs",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Neo4j",
      "MySQL",
      "Serverless",
      "AWS Lambda",
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    title: "Senior Engineer (SDE 2)",
    institution: "Cambium Networks",
    startDate: "Dec 2024",
    endDate: "Present",
    description: [
      "Leading the redesign of the cnMaestro navigation system by moving scattered menu items into a cleaner, more logical React-based layout. Implemented secure role-based access to ensure users only see the menus they are authorized to use. ",
      "Led the migration of the Monitor Module in enterprise-level Network Management Platform (cnMaestro) from AngularJS to React, architecting for 10k+ active network nodes.",
      "Optimized server-state management using TanStack Query, implementing caching and request deduplication to reduce network overhead.",
      "Developed a Design System with 40+ atomic React components as a private NPM package, ensuring 90%+ unit test coverage using Storybook and TDD.",
    ],
  },
  {
    title: "Software Engineer",
    institution: "Gemini Solutions",
    startDate: "Feb 2022",
    endDate: "Nov 2024",
    description: [
      "Led frontend development in Angular for internal HRIS tools, implementing dynamic hierarchies and MSAL authentication, reducing manual effort by 25%.",
      "Developed responsive and modular UI components using React and MUI, managing complex application state with Redux.",
      "Built scalable AWS Lambda functions with Node.js, leveraging Neo4J, MongoDB, and S3 for efficient asynchronous data management.",
    ],
  },
  {
    title: "Bachelor of Information Technology",
    institution: "RKGIT, Ghaziabad",
    startDate: "July, 2018",
    endDate: "June, 2022",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "DevPulse",
    description:
      "A developer dashboard using Next.js and TanStack Query featuring an optimised Hacker News feed and a GitHub profile search engine. Engineered independent parallel data fetching, seamless pagination caching via useQuery, and modular error handling.",
    tags: [
      { label: "Next.js", color: "#a3a3a3" },
      { label: "React", color: "#5eead4" },
      { label: "TypeScript", color: "#818cf8" },
      { label: "TanStack Query", color: "#f97316" },
    ],
    featured: true,
    liveUrl: "https://devpulse-sandy.vercel.app/",
    githubUrl: "https://github.com/Shriya197/devPulse",
  },
  {
    title: "NetflixGPT",
    description:
      "A responsive movie exploration platform combining React, Redux Toolkit, and Firebase for authentication and secure routing. Features a dynamic homepage with autoplaying YouTube trailers and GPT-powered search with multi-language support(WIP).",
    tags: [
      { label: "React", color: "#5eead4" },
      { label: "Redux Toolkit", color: "#818cf8" },
      { label: "Firebase", color: "#f59e0b" },
      { label: "Open AI", color: "#f43f5e" },
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Shriya197/NetflixGpt",
  },
  {
    title: "Organizational Hierarchy",
    description:
      "A dynamic visualization tool for mapping complex corporate structures with multi-level role segregation and custom views.",
    tags: [
      { label: "Angular", color: "#5eead4" },
      { label: "Node JS", color: "#5eead4" },
      { label: "AWS", color: "#64748b" },
    ],
    private: true,
  },
  {
    title: "Model Portfolio",
    description:
      "An analytics dashboard for tracking and visualising portfolios and market-specific stock performance.",
    tags: [
      { label: "React", color: "#818cf8" },
      { label: "React MUI", color: "#5eead4" },
      { label: "Redux Toolkit", color: "#818cf8" },
    ],
    private: true,
  },
];

export { arrayCheck } from "@/types";
