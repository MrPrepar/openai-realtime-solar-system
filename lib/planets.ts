// Data for the lightweight 2D scene (?lite=1), used on devices whose GPU
// can't handle the Spline scene, like the Raspberry Pi 4 on the mirror.

export interface PlanetInfo {
  name: string;
  label: string;
  // CSS background for the planet disc
  surface: string;
  // Relative display size in the overview, 1 = Earth
  size: number;
  facts: [string, string][];
  ring?: boolean;
}

export const PLANET_INFO: Record<string, PlanetInfo> = {
  Sun: {
    name: "Sun",
    label: "Sola",
    surface: "radial-gradient(circle at 35% 35%, #fff6c2, #ffc400 45%, #ff7a00)",
    size: 3,
    facts: [
      ["Diameter", "1 392 700 km"],
      ["Overflate", "ca. 5 500 °C"],
      ["Alder", "ca. 4,6 milliarder år"],
      ["Type", "Gul dvergstjerne"],
    ],
  },
  Mercury: {
    name: "Mercury",
    label: "Merkur",
    surface: "radial-gradient(circle at 35% 35%, #d8d2ca, #8a837b 70%, #5c5650)",
    size: 0.6,
    facts: [
      ["Diameter", "4 879 km"],
      ["Avstand fra sola", "57,9 mill. km"],
      ["Ett døgn", "176 jorddøgn"],
      ["Ett år", "88 jorddøgn"],
    ],
  },
  Venus: {
    name: "Venus",
    label: "Venus",
    surface: "radial-gradient(circle at 35% 35%, #fbeac2, #d4ac63 65%, #9c7a3c)",
    size: 0.95,
    facts: [
      ["Diameter", "12 104 km"],
      ["Avstand fra sola", "108,2 mill. km"],
      ["Ett døgn", "117 jorddøgn"],
      ["Ett år", "225 jorddøgn"],
    ],
  },
  Earth: {
    name: "Earth",
    label: "Jorda",
    surface:
      "radial-gradient(ellipse 30% 22% at 62% 58%, #3f9e4d 60%, transparent 62%), radial-gradient(ellipse 18% 26% at 30% 40%, #4caf50 60%, transparent 62%), radial-gradient(circle at 35% 35%, #a6dcff, #2f7fe0 55%, #164a99)",
    size: 1,
    facts: [
      ["Diameter", "12 742 km"],
      ["Avstand fra sola", "149,6 mill. km"],
      ["Ett døgn", "24 timer"],
      ["Ett år", "365 døgn"],
    ],
  },
  Mars: {
    name: "Mars",
    label: "Mars",
    surface: "radial-gradient(circle at 35% 35%, #f6b08c, #c4542a 60%, #7f2e12)",
    size: 0.7,
    facts: [
      ["Diameter", "6 779 km"],
      ["Avstand fra sola", "227,9 mill. km"],
      ["Ett døgn", "24 t 37 min"],
      ["Ett år", "687 jorddøgn"],
    ],
  },
  Jupiter: {
    name: "Jupiter",
    label: "Jupiter",
    surface:
      "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), transparent 60%), repeating-linear-gradient(170deg, #e9d3b0 0 9%, #c69466 9% 14%, #f0e0c4 14% 22%, #b07d52 22% 26%)",
    size: 2.2,
    facts: [
      ["Diameter", "139 820 km"],
      ["Avstand fra sola", "778,5 mill. km"],
      ["Ett døgn", "9 t 56 min"],
      ["Ett år", "11,9 jordår"],
    ],
  },
  Saturn: {
    name: "Saturn",
    label: "Saturn",
    surface:
      "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), transparent 60%), repeating-linear-gradient(175deg, #f3e4b9 0 12%, #d6b77a 12% 18%)",
    size: 1.9,
    ring: true,
    facts: [
      ["Diameter", "116 460 km"],
      ["Avstand fra sola", "1,43 mrd. km"],
      ["Ett døgn", "10 t 34 min"],
      ["Ett år", "29,4 jordår"],
    ],
  },
  Uranus: {
    name: "Uranus",
    label: "Uranus",
    surface: "radial-gradient(circle at 35% 35%, #e0fbfc, #7fd3dc 60%, #3f97a3)",
    size: 1.4,
    facts: [
      ["Diameter", "50 724 km"],
      ["Avstand fra sola", "2,87 mrd. km"],
      ["Ett døgn", "17 t 14 min"],
      ["Ett år", "84 jordår"],
    ],
  },
  Neptune: {
    name: "Neptune",
    label: "Neptun",
    surface: "radial-gradient(circle at 35% 35%, #b4c8ff, #3d5ee0 60%, #1d2f8f)",
    size: 1.35,
    facts: [
      ["Diameter", "49 244 km"],
      ["Avstand fra sola", "4,5 mrd. km"],
      ["Ett døgn", "16 t 6 min"],
      ["Ett år", "165 jordår"],
    ],
  },
  Pluto: {
    name: "Pluto",
    label: "Pluto",
    surface: "radial-gradient(circle at 35% 35%, #efe1d3, #a88f7c 65%, #6e5a4c)",
    size: 0.45,
    facts: [
      ["Diameter", "2 377 km"],
      ["Avstand fra sola", "5,9 mrd. km"],
      ["Ett døgn", "6,4 jorddøgn"],
      ["Ett år", "248 jordår"],
    ],
  },
};

export const PLANET_ORDER = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

export const MOON_INFO: Record<string, { label: string; planet: string }> = {
  Io: { label: "Io", planet: "Jupiter" },
  Europa: { label: "Europa", planet: "Jupiter" },
  Ganymede: { label: "Ganymedes", planet: "Jupiter" },
  Callisto: { label: "Callisto", planet: "Jupiter" },
  Charon: { label: "Charon", planet: "Pluto" },
  Nix: { label: "Nix", planet: "Pluto" },
  Hydra: { label: "Hydra", planet: "Pluto" },
  Kerberos: { label: "Kerberos", planet: "Pluto" },
  Styx: { label: "Styx", planet: "Pluto" },
};
