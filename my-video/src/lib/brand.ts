import { loadFont } from "@remotion/google-fonts/SourceSans3";

export const COLORS = {
  primary: "#006FEE",
  primaryLight: "#339AF0",
  secondary: "#7828C8",
  secondaryLight: "#9750DD",
  pink: "#F31260",
  pinkLight: "#FF4ECD",
  success: "#17C964",
  warning: "#F5A524",
  cyan: "#7EE7FC",
  darkBg: "#000000",
  darkCard: "#0D0D0D",
  darkSurface: "#141414",
  darkBorder: "#222222",
  white: "#FFFFFF",
  whiteAlpha80: "rgba(255,255,255,0.8)",
  whiteAlpha60: "rgba(255,255,255,0.6)",
  whiteAlpha40: "rgba(255,255,255,0.4)",
  whiteAlpha20: "rgba(255,255,255,0.2)",
  whiteAlpha10: "rgba(255,255,255,0.1)",
  whiteAlpha05: "rgba(255,255,255,0.05)",
  textMuted: "#71717A",
  foreground100: "#1A1A1A",
  foreground200: "#252525",
  foreground50: "#111111",
} as const;

export const GRADIENT = {
  brand: "linear-gradient(135deg, #FFFFFF, #999999)",
  brandHorizontal: "linear-gradient(90deg, #FFFFFF, #AAAAAA)",
  brandText: "linear-gradient(90deg, #FFFFFF, #CCCCCC)",
  /** Primary → secondary spectrum for accents (lines, flashes) */
  brandSpectrum: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondaryLight}, ${COLORS.cyan})`,
  brandSpectrumVertical: `linear-gradient(180deg, ${COLORS.primary}33, transparent 55%, ${COLORS.secondary}22)`,
  glow: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
  glowPurple: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
  darkVignette: `radial-gradient(ellipse at center, transparent 40%, ${COLORS.darkBg} 100%)`,
} as const;

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const FONT = {
  family: fontFamily,
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const STAGE_COLORS = {
  briefing: "#006FEE",
  production: "#7828C8",
  review: "#F5A524",
  delivered: "#17C964",
} as const;

export const BOARD_DATA = {
  projectName: "Spring Campaign",
  subtitle: "Tasks board \u00B7 4 stages",
  columns: [
    {
      id: "briefing",
      label: "Briefing",
      color: STAGE_COLORS.briefing,
      tasks: [
        {
          id: "t1",
          title: "Write campaign brief",
          owner: "Alex",
          avatarSeed: "alex",
          commentCount: 3,
          hasMedia: true,
        },
        {
          id: "t2",
          title: "Collect brand assets",
          owner: "Sam",
          avatarSeed: "sam",
          commentCount: 1,
          hasMedia: true,
        },
      ],
    },
    {
      id: "production",
      label: "Production",
      color: STAGE_COLORS.production,
      tasks: [
        {
          id: "t3",
          title: "Edit hero video v3",
          owner: "Jordan",
          avatarSeed: "jordan",
          commentCount: 5,
          hasMedia: true,
        },
      ],
    },
    {
      id: "review",
      label: "Client Review",
      color: STAGE_COLORS.review,
      tasks: [
        {
          id: "t4",
          title: "Final cut sign-off",
          owner: "Taylor",
          avatarSeed: "taylor",
          commentCount: 2,
          hasMedia: false,
        },
        {
          id: "t5",
          title: "Social media cutdowns",
          owner: "Casey",
          avatarSeed: "casey",
          commentCount: 4,
          hasMedia: true,
        },
      ],
    },
    {
      id: "delivered",
      label: "Delivered",
      color: STAGE_COLORS.delivered,
      tasks: [
        {
          id: "t6",
          title: "Teaser trailer v2",
          owner: "Morgan",
          avatarSeed: "morgan",
          commentCount: 2,
          hasMedia: true,
        },
      ],
    },
  ],
} as const;
