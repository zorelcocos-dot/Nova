import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

/* ---------------- Stroke icon set ---------------- */

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16" />
    <path d="M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const IconChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5.5 15.5 12 9 18.5" />
  </svg>
);

export const IconChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 9 12 15.5 18.5 9" />
  </svg>
);

export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-4.6-4.6" />
  </svg>
);

export const IconCommand = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 9h6v6H9zM9 9H7.5A2.5 2.5 0 1 1 10 6.5V9M15 9h1.5A2.5 2.5 0 1 0 14 6.5V9M15 15h1.5a2.5 2.5 0 1 1-2.5 2.5V15M9 15H7.5a2.5 2.5 0 1 0 2.5 2.5V15" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 12.5 10 18 19.5 6.5" />
  </svg>
);

export const IconBell = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 9.5a6 6 0 1 0-12 0c0 4.8-1.8 6-1.8 6h15.6s-1.8-1.2-1.8-6" />
    <path d="M10.4 19.5a1.8 1.8 0 0 0 3.2 0" />
  </svg>
);

export const IconGear = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M12 2.8v2.6M12 18.6v2.6M4.2 4.2l1.9 1.9M17.9 17.9l1.9 1.9M2.8 12h2.6M18.6 12h2.6M4.2 19.8l1.9-1.9M17.9 6.1l1.9-1.9" />
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 20.5h17" />
    <path d="M6.5 16.5v-4M11.5 16.5v-8M16.5 16.5v-6M21 16.5V4.5" />
  </svg>
);

export const IconLayers = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8l8.5-4.5Z" />
    <path d="m3.5 13 8.5 4.5L20.5 13" />
    <path d="m3.5 17.2 8.5 4.3 8.5-4.3" opacity=".45" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M3.5 19.5c.6-3.2 2.8-4.8 5.5-4.8s4.9 1.6 5.5 4.8" />
    <path d="M15.8 4.9a3.4 3.4 0 0 1 0 6.4M17.6 14.9c1.7.7 2.7 2.1 3 4.6" />
  </svg>
);

/* 4-point AI star */
export const IconSpark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9 12 3.5Z" />
    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" opacity=".55" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.2 19 5.7v4.9c0 4.3-2.9 7.7-7 9.7-4.1-2-7-5.4-7-9.7V5.7l7-2.5Z" />
    <path d="m9 11.8 2.2 2.2 4-4.2" />
  </svg>
);

export const IconLock = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="9" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
);

export const IconKey = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="4" />
    <path d="m11 11 9 9M17 14l2.5 2.5M14 17l2.5 2.5" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5a12.8 12.8 0 0 1 0 17M12 3.5a12.8 12.8 0 0 0 0 17" />
  </svg>
);

export const IconLink = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10 13.5a4.7 4.7 0 0 0 7 .4l2.1-2.1a4.66 4.66 0 0 0-6.6-6.6l-1.1 1.1" />
    <path d="M14 10.5a4.7 4.7 0 0 0-7-.4l-2.1 2.1a4.66 4.66 0 0 0 6.6 6.6l1.1-1.1" />
  </svg>
);

export const IconFilter = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5.5h16l-6.2 7.4v4.6l-3.6 2v-6.6L4 5.5Z" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconCalendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
    <path d="M8 3v3.6M16 3v3.6M3.5 10h17" />
  </svg>
);

export const IconGrid = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </svg>
);

/* AI agent / cpu node */
export const IconAgent = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="6.5" y="6.5" width="11" height="11" rx="2.2" />
    <path d="M9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21M3 9h3.5M3 15h3.5M17.5 9H21M17.5 15H21" />
    <rect x="10.2" y="10.2" width="3.6" height="3.6" rx="1" />
  </svg>
);

export const IconPlay = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7.5 5.2v13.6L19 12 7.5 5.2Z" />
  </svg>
);

export const IconPause = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8.5 5.5v13M15.5 5.5v13" />
  </svg>
);

export const IconWorkflow = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="5.5" cy="6" r="2.4" />
    <circle cx="18.5" cy="18" r="2.4" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1.4" />
    <path d="M7.9 6H13a2 2 0 0 1 2 2v1.5M16.1 18H11a2 2 0 0 1-2-2v-1.5" />
  </svg>
);

export const IconInbox = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 13.2 6.4 6h11.2L20 13.2v5.1a1.8 1.8 0 0 1-1.8 1.7H5.8A1.8 1.8 0 0 1 4 18.3v-5.1Z" />
    <path d="M4 13.2h5l1.5 2h3l1.5-2h5" />
  </svg>
);

export const IconDoc = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3.5h7.5L18 8v12.5H6V3.5Z" />
    <path d="M13 3.5V8.5h5M9 12.5h6M9 15.8h6" />
  </svg>
);

export const IconLogout = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9.5 21H6.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3M15.5 17l4.5-5-4.5-5M20 12H9" />
  </svg>
);

export const IconX = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7.2h16M4 12h16M4 16.8h16" />
  </svg>
);

export const IconCopy = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
  </svg>
);

export const IconRefresh = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 11.5a8 8 0 1 1-2.3-5.4M20.4 3.4v4h-4" />
  </svg>
);

export const IconSend = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m21.5 2.5-9.8 9.8M21.5 2.5 14.8 21.5l-3.1-8.6-8.7-3.2 18.5-7.2Z" />
  </svg>
);

export const IconTerminal = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 7 5.5 5L5 17M12.5 18.5H19" />
  </svg>
);

export const IconSliders = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7.2h8.4M17.6 7.2H20M4 16.8h2.4M11.6 16.8H20" />
    <circle cx="14.8" cy="7.2" r="2.2" />
    <circle cx="8.8" cy="16.8" r="2.2" />
  </svg>
);

export const IconBolt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2.5 4.5 14H11l-1 7.5L18.5 10H12l1-7.5Z" />
  </svg>
);

export const IconCard = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
    <path d="M3 9.6h18M6.5 14.5h4" />
  </svg>
);

export const IconBook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.5 5.2A2.2 2.2 0 0 1 6.7 3h12.8v15.5H6.7a2.2 2.2 0 0 0-2.2 2.2V5.2Z" />
    <path d="M4.5 20.7A2.2 2.2 0 0 1 6.7 18.5h12.8M9 7.5h6.5" />
  </svg>
);

export const IconChat = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 11.8a7.5 7.5 0 0 1-7.5 7.5c-1.3 0-2.5-.3-3.6-.8L4 20l1.5-5.9a7.5 7.5 0 1 1 15.5-2.3Z" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
    <path d="m4.5 7.5 7.5 5.6 7.5-5.6" />
  </svg>
);

/* NOVA logo mark — an N cut from a rounded square */
export const LogoMark = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={className}
  >
    <rect width="24" height="24" rx="6" fill="currentColor" />
    <path
      d="M7.4 17.5V6.5h2.2l7 8.3V6.5h1.9v11h-2.1l-7.1-8.4v8.4H7.4Z"
      fill="var(--bg, #fff)"
    />
  </svg>
);

/* ---------------- Brand marks (monochrome) ---------------- */

function brand({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    ...props,
  };
}

export const BrandSlack = (p: IconProps) => (
  <svg {...brand(p)}>
    <rect x="9.9" y="2" width="4.2" height="8.4" rx="2.1" />
    <rect x="2" y="9.9" width="8.4" height="4.2" rx="2.1" />
    <rect x="9.9" y="13.6" width="4.2" height="8.4" rx="2.1" />
    <rect x="13.6" y="9.9" width="8.4" height="4.2" rx="2.1" />
  </svg>
);

export const BrandNotion = (p: IconProps) => (
  <svg {...brand(p)}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7.2 17.4V6.8h2.3l7.2 8.6V6.8h2.1v10.6h-2.2l-7.3-8.7v8.7H7.2Z" />
  </svg>
);

export const BrandDrive = (p: IconProps) => (
  <svg {...brand(p)} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M9.2 4.4h5.6l7 12.4-2.8 4.8H5L2.2 16.8 9.2 4.4Z" strokeLinecap="round" />
    <path d="M8.3 12.2h9.2M12.1 4.6l2.9 4.6" opacity=".85" />
  </svg>
);

export const BrandGitHub = (p: IconProps) => (
  <svg {...brand(p)}>
    <path
      fillRule="evenodd"
      d="M12 2.2C6.5 2.2 2.1 6.7 2.1 12.3c0 4.5 2.9 8.3 6.9 9.7.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.2 3 .9.1-.8.4-1.3.7-1.6-2.2-.3-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.8-.1-.3-.4-1.4.1-2.9 0 0 .8-.3 2.7 1.1a9.5 9.5 0 0 1 5.1 0c1.9-1.4 2.7-1.1 2.7-1.1.5 1.5.2 2.6.1 2.9.6.8 1 1.7 1 2.8 0 4-2.4 4.8-4.6 5.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.7.5a10.2 10.2 0 0 0 6.9-9.7C21.9 6.7 17.5 2.2 12 2.2Z"
    />
  </svg>
);

export const BrandLinear = (p: IconProps) => (
  <svg {...brand(p)} fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="8.6" strokeWidth="1.8" />
    <path d="m5.2 5.2 13.6 13.6" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const BrandHubSpot = (p: IconProps) => (
  <svg {...brand(p)} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="7" cy="17" r="3.1" />
    <circle cx="16.6" cy="6.4" r="2.6" />
    <circle cx="17.9" cy="17.1" r="2.9" />
    <path d="M9.9 16.2 14.6 8M9.4 14.9l5.9.6" />
  </svg>
);

export const BrandDiscord = (p: IconProps) => (
  <svg {...brand(p)}>
    <path d="M6.4 6.2C8.5 5.2 10.2 4.8 12 4.8s3.5.4 5.6 1.4c2.1 3.9 3 7.6 2.6 10.9-1.2 1.2-2.7 2.1-4.6 2.6l-1-1.8c1.4-.4 2.6-1.1 3.2-1.7-1.7 1-3.6 1.5-5.8 1.5s-4.1-.5-5.8-1.5c.6.6 1.8 1.3 3.2 1.7l-1 1.8c-1.9-.5-3.4-1.4-4.6-2.6-.4-3.3.5-7 2.6-10.9Z" />
    <circle cx="9.3" cy="13" r="1.2" fill="var(--bg, #fff)" />
    <circle cx="14.7" cy="13" r="1.2" fill="var(--bg, #fff)" />
  </svg>
);

export const BrandJira = (p: IconProps) => (
  <svg {...brand(p)}>
    <path fillRule="evenodd" d="M12 3.4 20.2 20H3.8L12 3.4Zm0 6.6L15.6 17h-7.2L12 10Z" />
  </svg>
);

export const BrandGoogle = (p: IconProps) => (
  <svg {...brand(p)}>
    <path d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.6Z" />
    <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H3v2.7A10 10 0 0 0 12 22Z" />
    <path d="M6.4 13.8a6 6 0 0 1 0-3.9V7.2H3a10 10 0 0 0 0 9.3l3.4-2.7Z" />
    <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.2l3.4 2.7C7.2 7.7 9.4 5.9 12 5.9Z" />
  </svg>
);

export const brandIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  slack: BrandSlack,
  notion: BrandNotion,
  googledrive: BrandDrive,
  github: BrandGitHub,
  linear: BrandLinear,
  hubspot: BrandHubSpot,
  discord: BrandDiscord,
  jira: BrandJira,
};
