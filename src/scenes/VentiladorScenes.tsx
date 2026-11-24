import { useCurrentFrame } from "remotion";
import { Arrow3D } from "../components/Arrow3D";
import { cameraPoseAt } from "../components/CameraController";
import { WorldLabel } from "../components/WorldLabel";
import { track } from "../data/scenes";
import { PALETTE } from "../theme";
import { clamp, progress } from "../utils/animation";
import { s } from "../utils/timing";
import type { SceneModule } from "./types";

const label = (point: [number, number, number], text: string, frame: number, start: number, dur: number, offset: [number, number] = [0, 0]) => {
  const appear = progress(frame, s(start), s(start + dur));
  return <WorldLabel pose={cameraPoseAt(frame)} point={point} text={text} appear={appear} offset={offset} />;
};

const pulseArrow = (from: [number, number, number], dir: [number, number, number], length: number, color: string, trackName: string, frame: number) => {
  const k = clamp(track(trackName, frame) * 1.2, 0, 1);
  return <Arrow3D from={from} dir={dir} length={length} color={color} scale={k} />;
};

const Scene01Gancho: SceneModule = {
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, 1.4, -1.5], "GRADE", frame, 1.0, 1.0, [0, -100])}
        {label([0, 0.5, 0], "HELICE", frame, 2.5, 1.0, [100, 50])}
        {label([0, -0.8, 0], "MOTOR", frame, 3.0, 1.0, [-120, 80])}
      </>
    );
  },
};

const Scene02Perfil: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    return (
      <>
        {pulseArrow([0, 0.5, -0.2], [0, 1, 0], 0.6, PALETTE.pressureHigh, "pressure.arrows", frame)}
        {pulseArrow([0, 0.5, 0.2], [0, -1, 0], 0.4, PALETTE.pressureLow, "pressure.arrows", frame)}
        {pulseArrow([0.3, 0.4, 0], [1, 0, 0], 0.8, PALETTE.positive, "lift.vector", frame)}
      </>
    );
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, 0.8, 0], "EXTRADORSO", frame, 2.0, 1.5, [150, -50])}
        {label([0, 0.2, 0], "INTRADORSO", frame, 3.0, 1.5, [-150, 50])}
        {label([0.8, 0.4, 0], "EMPUXO", frame, 4.0, 1.5, [0, -80])}
      </>
    );
  },
};

const Scene03Motor: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    const mag = track("magnetic.field", frame);
    return mag > 0.001 ? (
      <group rotation={[0, 0, frame * 0.02 * mag]}>
        {[...Array(24)].map((_, i) => {
          const angle = i / 24 * Math.PI * 2;
          const r = 0.7 + Math.sin(frame * 0.1 + i) * 0.2;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
              <sphereGeometry args={[0.02, 4, 4]} />
              <meshBasicMaterial color={PALETTE.accent} transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>
    ) : null;
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, -0.5, 0], "ROTOR", frame, 2.0, 1.5, [-150, 0])}
        {label([0, -1.2, 0], "ESTATOR", frame, 3.0, 1.5, [150, 50])}
        {label([0, -0.8, 0.5], "EIXO", frame, 4.0, 1.0, [0, -80])}
      </>
    );
  },
};

const Scene04Fluxo: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    const vortex = track("vortex.tip", frame) * track("vortex.decay", frame);
    return vortex > 0.001 ? (
      <group>
        {[...Array(40)].map((_, i) => {
          const t = i / 40;
          const angle = t * Math.PI * 4 + frame * 0.1;
          const r = 1.4 + t * 0.5;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.3, -0.5 + t * 1.5]} scale={0.03 * (1 - t) * vortex}>
              <sphereGeometry args={[1, 6, 6]} />
              <meshBasicMaterial color={PALETTE.vortex} transparent opacity={0.7 * vortex} />
            </mesh>
          );
        })}
      </group>
    ) : null;
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, 0, -1.5], "ENTRADA", frame, 0.5, 1.0, [-120, 50])}
        {label([0, 0, 1.5], "JATO FRONTAL", frame, 2.0, 1.5, [120, -50])}
        {label([1.5, 0.3, 0], "VÓRTICE PONTA", frame, 4.0, 1.5, [0, -80])}
      </>
    );
  },
};

const Scene05Geometria: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    return (
      <>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, i * Math.PI * 2 / 3]}>
            <Arrow3D from={[0, 0.4, 0]} dir={[0, 1, 0]} length={0.4} color={PALETTE.accent} scale={track("blade.twist", frame)} />
          </group>
        ))}
      </>
    );
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([1.5, 0.8, 0], "RAIZ LARGA", frame, 2.0, 1.5, [150, -50])}
        {label([2.5, 0.2, 0], "PONTA FINA", frame, 3.5, 1.5, [150, 50])}
        {label([0, 0.5, 0], "TORÇÃO PROGRESSIVA", frame, 4.5, 2.0, [0, -100])}
      </>
    );
  },
};

const Scene06Termico: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    return (
      <>
        {track("convection.arrows", frame) > 0.001 && (
          <group scale={track("convection.arrows", frame)}>
            <Arrow3D from={[0, -1.5, 0]} dir={[0, 1, 0]} length={1.5} color={PALETTE.motorHot} />
            <Arrow3D from={[-1, -1, 0]} dir={[0, 1, 0]} length={1} color={PALETTE.motorHot} />
            <Arrow3D from={[1, -1, 0]} dir={[0, 1, 0]} length={1} color={PALETTE.motorHot} />
          </group>
        )}
        {track("internal.fan", frame) > 0.001 && (
          <group position={[0, -0.3, 0]} rotation={[0, 0, frame * 0.05 * track("internal.fan", frame)]}>
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[Math.cos(i / 6 * Math.PI * 2) * 0.5, Math.sin(i / 6 * Math.PI * 2) * 0.5, 0]} rotation={[0, 0, i / 6 * Math.PI * 2 + Math.PI / 2]}>
                <boxGeometry args={[0.1, 0.5, 0.03]} />
                <meshStandardMaterial {...{ roughness: 0.88, metalness: 0, flatShading: true }} color={PALETTE.metal} />
              </mesh>
            ))}
          </group>
        )}
      </>
    );
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, -0.8, 0], "BOBINAS QUENTES", frame, 1.5, 1.5, [150, -50])}
        {label([0, -1.2, 0], "CONVECÇÃO", frame, 3.0, 1.5, [-150, 50])}
        {label([0, -1.5, 0], "VENTOINHA INTERNA", frame, 4.5, 1.5, [0, -80])}
      </>
    );
  },
};

const Scene07Grade: SceneModule = {
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([-1.5, 0, 0], "COM GRADE\nFLUXO LAMINAR", frame, 1.0, 2.0, [0, -100])}
        {label([1.5, 0, 0], "SEM GRADE\nJATO GIRATÓRIO", frame, 1.0, 2.0, [0, -100])}
      </>
    );
  },
};

const Scene08Oscilacao: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    return (
      <>
        <group position={[-0.5, -1.5, 0]}>
          <mesh position={[track("rack.pinion", frame) * 1.5, 0, 0]} castShadow>
            <boxGeometry args={[3, 0.1, 0.1]} />
            <meshStandardMaterial {...{ roughness: 0.38, metalness: 0.55, flatShading: true }} color={PALETTE.metal} />
          </mesh>
        </group>
        <mesh position={[-0.5, -1.4, 0]} rotation={[0, 0, -track("rack.pinion", frame) * 10]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial {...{ roughness: 0.38, metalness: 0.55, flatShading: true }} color={PALETTE.metal} />
        </mesh>
      </>
    );
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, -1.5, 0], "CREMALHEIRA", frame, 3.0, 1.5, [-150, 0])}
        {label([-0.5, -1.4, 0], "PINHÃO", frame, 4.0, 1.5, [150, -50])}
        {label([0, 1, -3], "MISTURA DO AR", frame, 6.0, 2.0, [0, -120])}
      </>
    );
  },
};

const Scene09Velocidade: SceneModule = {
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, -0.5, -2], "PAINEL 1/2/3", frame, 2.0, 1.0, [0, -80])}
        {label([-0.3, -0.5, -2], "CAPACITOR (CA)", frame, 3.0, 1.5, [-120, 50])}
        {label([0.3, -0.5, -2], "PWM (BLDC)", frame, 4.0, 1.5, [120, 50])}
        {label([0, 1.5, -1], "RUÍDO ∝ VELOCIDADE", frame, 5.0, 2.0, [0, -120])}
      </>
    );
  },
};

const Scene10Sala: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    return track("convection.natural", frame) > 0.001 ? (
      <group>
        {[...Array(80)].map((_, i) => {
          const x = -8 + (i % 10) * 1.6;
          const z = -8 + Math.floor(i / 10) * 1.6;
          const t = (frame * 0.005 + i * 0.1) % 1;
          const y = -0.5 + t * 10;
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial {...{ roughness: 0.88, metalness: 0, flatShading: true }} color={t < 0.5 ? PALETTE.motorHot : PALETTE.pressureLow} transparent />
            </mesh>
          );
        })}
      </group>
    ) : null;
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    const temp = track("temp.drop", frame);
    return (
      <>
        {label([-2, 1, -5], `TERMÔMETRO: ${Math.round(temp)}°C`, frame, 3.0, 3.0, [-150, -50])}
        {label([2, 1, -5], `TERMÔMETRO: ${Math.round(temp)}°C`, frame, 3.0, 3.0, [150, -50])}
        {label([0, 2, -8], "JATO MISTURANDO", frame, 2.0, 2.0, [0, -100])}
      </>
    );
  },
};

const Scene11Manutencao: SceneModule = {
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, 0, -1.8], "ESCOVA NA GRADE", frame, 0.2, 1.3, [0, -100])}
        {label([0, -1.1, 0], "GOTA DE ÓLEO", frame, 1.7, 1.3, [0, -100])}
        {label([0.3, 0, 0.5], "APERTO PARAFUSO", frame, 3.2, 1.3, [120, -50])}
      </>
    );
  },
};

const Scene12Recap: SceneModule = {
  Stage: ({ scene }) => {
    const frame = useCurrentFrame() + scene.startFrame;
    return (
      <>
        {track("grade.pulse", frame) > 0.5 && <Arrow3D from={[0, 0, -3.5]} dir={[0, 1, 0]} length={0.5} color={PALETTE.accent} />}
        {track("blades.pulse", frame) > 0.5 && <Arrow3D from={[0, 0.5, -1]} dir={[0, 1, 0]} length={0.5} color={PALETTE.accent} />}
        {track("motor.pulse", frame) > 0.5 && <Arrow3D from={[0, -0.3, 0]} dir={[0, 1, 0]} length={0.5} color={PALETTE.accent} />}
        {track("base.pulse", frame) > 0.5 && <Arrow3D from={[0, -2.2, 1]} dir={[0, 1, 0]} length={0.5} color={PALETTE.accent} />}
      </>
    );
  },
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([0, 0, -3.5], "GRADE", frame, 1.2, 1.0, [0, -80])}
        {label([0, 0.5, -1], "PÁS", frame, 2.4, 1.0, [0, -80])}
        {label([0, -0.3, 0], "MOTOR", frame, 3.6, 1.0, [0, -80])}
        {label([0, -2.2, 1], "BASE", frame, 4.8, 1.0, [0, -80])}
        {label([0, 0.5, 0], "FLUXO CONTÍNUO", frame, 2.0, 4.0, [0, -150])}
      </>
    );
  },
};

const Scene13Experimento: SceneModule = {
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([-1, 0.5, -2.5], "PAPEL\nEMPURRADO", frame, 2.0, 1.5, [-150, -50])}
        {label([-1, 0, -1.5], "PAPEL\nSUGADO", frame, 5.0, 1.5, [-150, 50])}
        {label([0, 0, -2.5], "ALTA PRESSÃO", frame, 3.0, 1.5, [0, -100])}
        {label([0, 0, 2.5], "BAIXA PRESSÃO", frame, 6.0, 1.5, [0, -100])}
      </>
    );
  },
};

const Scene14Encerramento: SceneModule = {
  Overlay: ({ scene }) => {
    const local = useCurrentFrame();
    const frame = local + scene.startFrame;
    return (
      <>
        {label([-2, 0.5, -3], "PESSOA CONFORTÁVEL", frame, 3.0, 2.0, [-150, -50])}
        {label([0, 0.5, 0], "FÍSICA DO CONFORTO", frame, 4.0, 2.0, [0, -120])}
      </>
    );
  },
};

const Scene15Logo: SceneModule = {};

const Scene16Creditos: SceneModule = {};

export const SCENE_MODULES: Record<string, SceneModule> = {
  "scene-01-gancho": Scene01Gancho,
  "scene-02-perfil": Scene02Perfil,
  "scene-03-motor": Scene03Motor,
  "scene-04-fluxo": Scene04Fluxo,
  "scene-05-geometria": Scene05Geometria,
  "scene-06-termico": Scene06Termico,
  "scene-07-grade": Scene07Grade,
  "scene-08-oscilacao": Scene08Oscilacao,
  "scene-09-velocidade": Scene09Velocidade,
  "scene-10-sala": Scene10Sala,
  "scene-11-manutencao": Scene11Manutencao,
  "scene-12-recap": Scene12Recap,
  "scene-13-experimento": Scene13Experimento,
  "scene-14-encerramento": Scene14Encerramento,
  "scene-15-logo": Scene15Logo,
  "scene-16-creditos": Scene16Creditos,
};