import { loadFont } from "@remotion/google-fonts/Montserrat";

export const { fontFamily: FONT } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const PALETTE = {
  positive: "#20b85a",
  negative: "#e5383b",
  info: "#2f7df6",
  warning: "#f8c815",
  text: "#ffffff",
  outline: "#0a1420",
  accent: "#53d6ff",
  air: "#4fd1ff",
  airLight: "#8fe3ff",
  airDark: "#1a8fc4",
  motor: "#e87a2a",
  motorHot: "#d6301a",
  metal: "#a2abb5",
  metalDark: "#7a858f",
  plastic: "#c8ccd0",
  plasticDark: "#9aa3ab",
  pedestal: "#1a2230",
  grade: "#3a4450",
  blade: "#2d8fc4",
  bladeTip: "#1a6b9e",
  pressureHigh: "#e5383b",
  pressureLow: "#2f7df6",
  vortex: "#ff8800",
  comfort: "#20e87a",
} as const;

export const MATTE = { roughness: 0.88, metalness: 0, flatShading: true } as const;
export const METAL = { roughness: 0.38, metalness: 0.55, flatShading: true } as const;
export const PLASTIC = { roughness: 0.7, metalness: 0, flatShading: true } as const;

export const LIGHTING = {
  ambient: 0.55,
  hemisphere: { sky: "#dff2ff", ground: "#6b5a48", intensity: 1.05 },
  key: { position: [9, 16, 12] as [number, number, number], intensity: 2.5, color: "#fff4e2" },
  fill: { position: [-12, 6, 8] as [number, number, number], intensity: 0.75, color: "#cfe6ff" },
  rim: { position: [-4, 8, -12] as [number, number, number], intensity: 0.6, color: "#ffffff" },
  shadowMapSize: 2048,
} as const;

export const CAMERA = { fov: 24, near: 0.5, far: 400 } as const;

export const SAFE = {
  top: 250,
  bottom: 1540,
  side: 90,
  badgeTop: 262,
  captionCenterY: 1418,
} as const;

export const SKY = {
  surface: ["#86c9ef", "#c5e7f6", "#eef3ea"],
  underground: ["#16304f", "#1d3f63", "#0e2036"],
} as const;

export const KEYWORD_COLOR: Record<string, string> = {
  VENTO: PALETTE.accent,
  HELICE: PALETTE.blade,
  ASA: PALETTE.positive,
  PRESSÃO: PALETTE.info,
  CURVO: PALETTE.blade,
  FRENTE: PALETTE.pressureHigh,
  TRÁS: PALETTE.pressureLow,
  MOTOR: PALETTE.motor,
  INDUÇÃO: PALETTE.info,
  BLDC: PALETTE.positive,
  TORQUE: PALETTE.motor,
  CAMPO: PALETTE.accent,
  ROTOR: PALETTE.motor,
  FLUXO: PALETTE.air,
  PONTA: PALETTE.bladeTip,
  VÓRTICE: PALETTE.vortex,
  EFICIÊNCIA: PALETTE.positive,
  TORÇÃO: PALETTE.positive,
  AFILAMENTO: PALETTE.info,
  RAIZ: PALETTE.blade,
  ÂNGULO: PALETTE.info,
  ADERIDO: PALETTE.positive,
  CALOR: PALETTE.negative,
  ROLAMENTOS: PALETTE.warning,
  COBRE: PALETTE.metal,
  ISOLAMENTO: PALETTE.plastic,
  VENTILAÇÃO: PALETTE.air,
  GRADE: PALETTE.grade,
  ENDIREITA: PALETTE.positive,
  LAMINAR: PALETTE.air,
  TURBULENTO: PALETTE.vortex,
  ALCANCE: PALETTE.info,
  OSCILAÇÃO: PALETTE.positive,
  CREMALHEIRA: PALETTE.info,
  PINHÃO: PALETTE.metal,
  VARRE: PALETTE.air,
  MISTURA: PALETTE.positive,
  EXTREMIDADES: PALETTE.warning,
  VELOCIDADE: PALETTE.info,
  CAPACITOR: PALETTE.metal,
  PWM: PALETTE.positive,
  VAZÃO: PALETTE.air,
  RUÍDO: PALETTE.warning,
  CIRCULA: PALETTE.air,
  QUENTE: PALETTE.motorHot,
  CIMA: PALETTE.airLight,
  FRIO: PALETTE.pressureLow,
  BAIXO: PALETTE.pressureLow,
  CONFORTO: PALETTE.comfort,
  LIMPEZA: PALETTE.positive,
  LUBRIFICAÇÃO: PALETTE.positive,
  APERTO: PALETTE.info,
  DÉCADAS: PALETTE.positive,
  PÁ: PALETTE.blade,
  AR: PALETTE.air,
  TESTE: PALETTE.warning,
  PAPEL: PALETTE.plastic,
  SUCÇÃO: PALETTE.pressureLow,
  REAL: PALETTE.positive,
  FÍSICA: PALETTE.info,
  MÁGICA: PALETTE.warning,
  TRABALHANDO: PALETTE.positive,
} as const;
export const KEYWORD_DEFAULT = "#4fdcff";