import vo from "../data/vo.json";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const SECONDS = 90;
export const DURATION = SECONDS * FPS;

export const f = (seconds: number) => Math.round(seconds * FPS);
export const s = (seconds: number) => Math.round(seconds * FPS);

export const VO_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14", "s15", "s16"] as const;
export type VoKey = (typeof VO_KEYS)[number];

const PLANNED_SECONDS = [
  4.50, 5.00, 5.25, 5.25, 5.25, 5.25, 5.25, 5.25,
  5.25, 5.25, 5.25, 5.25, 5.25, 5.25, 2.50, 15.00
];
const FIRST_VO = 0.45;
const LEAD = 0.25;
const GAPS: number[] = [
  0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55,
  0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55
];

type VoWord = { text: string; start: number; end: number };
type VoLine = { text: string; seconds: number; words: VoWord[] };
const VO_DATA = vo as unknown as Partial<Record<string, VoLine>>;

export const HAS_VO = VO_KEYS.every((k) => VO_DATA[k] !== undefined);

const voStart = {} as Record<VoKey, number>;
{
  let t = FIRST_VO;
  let planned = 0;
  VO_KEYS.forEach((key, i) => {
    const line = VO_DATA[key];
    voStart[key] = HAS_VO ? t : planned + LEAD;
    t += (line?.seconds ?? 0) + (GAPS[i] ?? 0);
    planned += PLANNED_SECONDS[i];
  });
  if (HAS_VO && t > SECONDS - 0.4) {
    throw new Error(`A narração (${t.toFixed(2)} s) não cabe em ${SECONDS} s: encurte o texto ou ajuste GAPS/SECONDS.`);
  }
}

export const VO_START: Readonly<Record<VoKey, number>> = voStart;

export const VO = VO_KEYS.filter((k) => VO_DATA[k]).map((id) => ({ id, at: VO_START[id], seconds: VO_DATA[id]!.seconds, text: VO_DATA[id]!.text }));

export const SCENE_FRAMES = VO_KEYS.map((key, i) => {
  const next = VO_KEYS[i + 1];
  if (!HAS_VO) {
    const from = f(PLANNED_SECONDS.slice(0, i).reduce((a, b) => a + b, 0));
    const to = next ? f(PLANNED_SECONDS.slice(0, i + 1).reduce((a, b) => a + b, 0)) : DURATION;
    return { from, durationInFrames: to - from };
  }
  const from = i === 0 ? 0 : f(VO_START[key] - LEAD);
  const to = next ? f(VO_START[next] - LEAD) : DURATION;
  return { from, durationInFrames: to - from };
});

export const voWords = (key: VoKey): VoWord[] => VO_DATA[key]?.words ?? [];

export const wordLocal = (key: VoKey, index: number) => {
  const scene = SCENE_FRAMES[VO_KEYS.indexOf(key)];
  const w = VO_DATA[key]?.words[index];
  const t = w ? w.start : index * (60 / 155);
  return f(VO_START[key] + t) - scene.from;
};

export const voLocal = (key: VoKey) => f(VO_START[key]) - SCENE_FRAMES[VO_KEYS.indexOf(key)].from;