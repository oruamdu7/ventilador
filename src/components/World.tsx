import { useCurrentFrame } from "remotion";
import { isVisible, track } from "../data/scenes";
import { MATTE, METAL, PLASTIC, PALETTE } from "../theme";
import { Arrow3D } from "./Arrow3D";

export const World: React.FC = () => {
  const frame = useCurrentFrame();

  const gradeScale = track("grade.scale", frame);
  const gradeReveal = track("grade.reveal", frame);
  const bladeHighlight = track("blade.highlight", frame);
  const bladeExplode = track("blade.explode", frame);
  const pressureArrows = track("pressure.arrows", frame);
  const liftVector = track("lift.vector", frame);
  const motorCutaway = track("motor.cutaway", frame);
  const rotorSpin = track("rotor.spin", frame);
  const shaftTorque = track("shaft.torque", frame);
  const bladeOpacity = track("blade.opacity", frame);
  const vortexTip = track("vortex.tip", frame);
  const vortexDecay = track("vortex.decay", frame);
  const bladesExplode = track("blades.explode", frame);
  const heatMap = track("heat.map", frame);
  const convectionArrows = track("convection.arrows", frame);
  const internalFan = track("internal.fan", frame);
  const bearingWear = track("bearing.wear", frame);
  const split = track("split", frame);
  const yaw = track("yaw", frame);
  const rackPinion = track("rack.pinion", frame);
  const speedStage1 = track("speed.stage1", frame);
  const speedStage2 = track("speed.stage2", frame);
  const speedStage3 = track("speed.stage3", frame);
  const capacitorSwitch = track("capacitor.switch", frame);
  const pwmDuty = track("pwm.duty", frame);
  const noiseWaves = track("noise.waves", frame);
  const dustClean = track("dust.clean", frame);
  const oilDrop = track("oil.drop", frame);
  const boltTighten = track("bolt.tighten", frame);
  const check1Pop = track("check1.pop", frame);
  const check2Pop = track("check2.pop", frame);
  const check3Pop = track("check3.pop", frame);
  const explodeAll = track("explode.all", frame);
  const gradePulse = track("grade.pulse", frame);
  const bladesPulse = track("blades.pulse", frame);
  const motorPulse = track("motor.pulse", frame);
  const basePulse = track("base.pulse", frame);
  const paperBlow = track("paper.blow", frame);
  const paperSuck = track("paper.suck", frame);
  const pressureFront = track("pressure.front", frame);
  const pressureRear = track("pressure.rear", frame);
  const comfortParticles = track("comfort.particles", frame);
  const personRelax = track("person.relax", frame);
  const logoFade = track("logo.fade", frame);
  const fade = track("fade", frame);

  return (
    <group>
      {isVisible("grade", frame) && gradeScale > 0.001 && (
        <group scale={gradeScale}>
          <group rotation={[0, 0, (1 - gradeReveal) * Math.PI / 2]}>
            <mesh position={[0, 0, -1.8]} receiveShadow castShadow>
              <cylinderGeometry args={[1.6, 1.6, 0.08, 32, 1, true, 0, Math.PI]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.grade} side={2} transparent opacity={0.9} />
            </mesh>
          </group>
        </group>
      )}

      {isVisible("blade", frame) && bladeOpacity > 0.001 && (
        <group>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, 0, i * Math.PI * 2 / 3 + rotorSpin * Math.PI / 180]}>
              <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[0.2, 0.8, 0.1]} />
                <meshStandardMaterial {...MATTE} color={bladeHighlight > 0.5 ? PALETTE.accent : PALETTE.blade} emissive={bladeHighlight > 0.5 ? PALETTE.accent : "#000"} emissiveIntensity={bladeHighlight * 0.5} />
              </mesh>
              {bladeExplode > 0 && (
                <group position={[bladeExplode * 0.3, 0, 0]}>
                  <Arrow3D from={[0, 0.4, 0]} dir={[0, 1, 0]} length={0.5} color={PALETTE.pressureHigh} scale={bladeExplode} />
                  <Arrow3D from={[0, 0.4, 0]} dir={[0, -1, 0]} length={0.3} color={PALETTE.pressureLow} scale={bladeExplode} />
                </group>
              )}
            </group>
          ))}
        </group>
      )}

      {isVisible("housing", frame) && (
        <group>
          <mesh position={[0, 0, -0.5]} castShadow receiveShadow>
            <cylinderGeometry args={[1.8, 1.8, 2.5, 32, 1, true, 0, Math.PI]} />
            <meshStandardMaterial {...PLASTIC} color={PALETTE.plastic} side={2} />
          </mesh>
          <mesh position={[0, 0, 1.5]} castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
            <meshStandardMaterial {...PLASTIC} color={PALETTE.plasticDark} />
          </mesh>
        </group>
      )}

      {isVisible("motor", frame) && (
        <group position={[0, -0.3, 0]}>
          <group scale={1 - motorCutaway * 0.3}>
            <mesh position={[0, -0.8, 0]} castShadow>
              <cylinderGeometry args={[1.2, 1.2, 1.6, 24]} />
              <meshStandardMaterial {...METAL} color={heatMap > 0.5 ? PALETTE.motorHot : PALETTE.motor} emissive={heatMap > 0.3 ? PALETTE.motorHot : "#000"} emissiveIntensity={heatMap * 0.4} />
            </mesh>
          </group>
          {motorCutaway > 0.3 && (
            <group>
              <mesh position={[0, -0.8, 0]} castShadow>
                <cylinderGeometry args={[0.6, 0.6, 1.6, 12]} />
                <meshStandardMaterial {...MATTE} color={PALETTE.metal} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {isVisible("shaft", frame) && (
        <mesh position={[0, -0.3, -0.2]} scale={[1, 1, shaftTorque * 0.2 + 0.8]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2.2, 16]} />
          <meshStandardMaterial {...METAL} color={PALETTE.metal} />
        </mesh>
      )}

      {isVisible("rearGrade", frame) && (
        <mesh position={[0, 0, 1.8]} receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 0.08, 32, 1, true, 0, Math.PI]} />
          <meshStandardMaterial {...MATTE} color={PALETTE.grade} side={2} transparent opacity={0.9} />
        </mesh>
      )}

      {isVisible("pressureArrows", frame) && pressureArrows > 0.001 && (
        <group scale={pressureArrows}>
          <Arrow3D from={[0, 0.5, -0.2]} dir={[0, 1, 0]} length={0.6} color={PALETTE.pressureHigh} />
          <Arrow3D from={[0, 0.5, 0.2]} dir={[0, -1, 0]} length={0.4} color={PALETTE.pressureLow} />
        </group>
      )}

      {isVisible("liftVector", frame) && liftVector > 0.001 && (
        <Arrow3D from={[0.3, 0.4, 0]} dir={[1, 0, 0]} length={0.8} color={PALETTE.positive} scale={liftVector} />
      )}

      {isVisible("vortexTip", frame) && vortexTip > 0.001 && (
        <group>
          <mesh position={[1.4, 0, -0.5]} scale={vortexTip * vortexDecay}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial {...MATTE} color={PALETTE.vortex} transparent opacity={0.7} />
          </mesh>
        </group>
      )}

      {isVisible("blades", frame) && bladesExplode > 0.001 && (
        <group>
          {[0, 1, 2].map((i) => (
            <group key={i} position={[bladesExplode * Math.cos(i * 2.1) * 1.5, bladesExplode * Math.sin(i * 2.1) * 1.5, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.2, 0.8, 0.1]} />
                <meshStandardMaterial {...MATTE} color={PALETTE.blade} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {isVisible("heatMap", frame) && heatMap > 0.001 && (
        <mesh position={[0, -0.3, 0]} scale={[1, heatMap, 1]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 1.2, 24]} />
          <meshStandardMaterial {...MATTE} color={PALETTE.motorHot} emissive={PALETTE.motorHot} emissiveIntensity={heatMap * 0.5} transparent opacity={0.5} />
        </mesh>
      )}

      {isVisible("convection", frame) && convectionArrows > 0.001 && (
        <group scale={convectionArrows}>
          <Arrow3D from={[0, -1.5, 0]} dir={[0, 1, 0]} length={1.5} color={PALETTE.motorHot} />
          <Arrow3D from={[-1, -1, 0]} dir={[0, 1, 0]} length={1} color={PALETTE.motorHot} />
          <Arrow3D from={[1, -1, 0]} dir={[0, 1, 0]} length={1} color={PALETTE.motorHot} />
        </group>
      )}

      {isVisible("internalFan", frame) && internalFan > 0.001 && (
        <group position={[0, -0.3, 0]} rotation={[0, 0, frame * 0.05 * internalFan]}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} position={[Math.cos(i / 6 * Math.PI * 2) * 0.5, Math.sin(i / 6 * Math.PI * 2) * 0.5, 0]} rotation={[0, 0, i / 6 * Math.PI * 2 + Math.PI / 2]} castShadow>
              <boxGeometry args={[0.1, 0.5, 0.03]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.metal} />
            </mesh>
          ))}
        </group>
      )}

      {isVisible("bearings", frame) && bearingWear > 0.001 && (
        <group position={[0, -1.1, 0]} scale={1 - bearingWear}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <mesh key={i} position={[Math.cos(i / 8 * Math.PI * 2) * 0.15, Math.sin(i / 8 * Math.PI * 2) * 0.15, 0]} castShadow>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial {...METAL} color={PALETTE.metal} />
            </mesh>
          ))}
        </group>
      )}

      {isVisible("leftWorld", frame) && split > 0.001 && (
        <group position={[-1.5, 0, 0]} scale={split}>
          <mesh position={[0, 0, -1.8]} receiveShadow>
            <cylinderGeometry args={[1.6, 1.6, 0.08, 32, 1, true, 0, Math.PI]} />
            <meshStandardMaterial {...MATTE} color={PALETTE.grade} side={2} transparent opacity={0.9} />
          </mesh>
        </group>
      )}

      {isVisible("rightWorld", frame) && split > 0.001 && (
        <group position={[1.5, 0, 0]} scale={split}>
        </group>
      )}

      {isVisible("housing", frame) && yaw !== 0 && (
        <group rotation={[0, yaw * Math.PI / 180, 0]}>
          <mesh position={[0, 0, -0.5]} castShadow receiveShadow>
            <cylinderGeometry args={[1.8, 1.8, 2.5, 32, 1, true, 0, Math.PI]} />
            <meshStandardMaterial {...PLASTIC} color={PALETTE.plastic} side={2} />
          </mesh>
        </group>
      )}

      {isVisible("rack", frame) && rackPinion > 0.001 && (
        <group position={[-0.5, -1.5, 0]}>
          <mesh position={[rackPinion * 1.5, 0, 0]} castShadow>
            <boxGeometry args={[3, 0.1, 0.1]} />
            <meshStandardMaterial {...METAL} color={PALETTE.metal} />
          </mesh>
        </group>
      )}

      {isVisible("pinion", frame) && rackPinion > 0.001 && (
        <mesh position={[-0.5, -1.4, 0]} rotation={[0, 0, -rackPinion * 10]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial {...METAL} color={PALETTE.metal} />
        </mesh>
      )}

      {isVisible("panel", frame) && (
        <group position={[0, -0.5, -2]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1, 0.6, 0.1]} />
            <meshStandardMaterial {...PLASTIC} color={PALETTE.plasticDark} />
          </mesh>
          {speedStage1 > 0 && (
            <mesh position={[-0.3, 0, 0.06]} scale={[speedStage1, 1, 1]}>
              <boxGeometry args={[0.2, 0.1, 0.05]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.positive} emissive={PALETTE.positive} emissiveIntensity={speedStage1 * 0.5} />
            </mesh>
          )}
          {speedStage2 > 0 && (
            <mesh position={[0, 0, 0.06]} scale={[speedStage2, 1, 1]}>
              <boxGeometry args={[0.2, 0.1, 0.05]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.warning} emissive={PALETTE.warning} emissiveIntensity={speedStage2 * 0.5} />
            </mesh>
          )}
          {speedStage3 > 0 && (
            <mesh position={[0.3, 0, 0.06]} scale={[speedStage3, 1, 1]}>
              <boxGeometry args={[0.2, 0.1, 0.05]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.negative} emissive={PALETTE.negative} emissiveIntensity={speedStage3 * 0.5} />
            </mesh>
          )}
        </group>
      )}

      {isVisible("capacitor", frame) && capacitorSwitch > 0.001 && (
        <mesh position={[-0.3, -0.5, -2]} scale={[capacitorSwitch, 1, 1]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
          <meshStandardMaterial {...METAL} color={PALETTE.metal} emissive={PALETTE.accent} emissiveIntensity={capacitorSwitch} />
        </mesh>
      )}

      {isVisible("pwmDriver", frame) && pwmDuty > 0.001 && (
        <group position={[0.3, -0.5, -2]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshStandardMaterial {...PLASTIC} color={PALETTE.plasticDark} />
          </mesh>
          <mesh position={[0, 0, 0.06]} scale={[pwmDuty, 1, 1]}>
            <boxGeometry args={[0.25, 0.1, 0.05]} />
            <meshStandardMaterial {...MATTE} color={PALETTE.accent} emissive={PALETTE.accent} emissiveIntensity={pwmDuty * 0.5} />
          </mesh>
        </group>
      )}

      {isVisible("noiseWaves", frame) && noiseWaves > 0.001 && (
        <group position={[0, 1.5, -1]}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, 0, i * 0.1]} scale={[noiseWaves * 0.5, 1, 1]}>
              <ringGeometry args={[0.1, 0.3, 16]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.negative} transparent opacity={0.3 * noiseWaves} side={2} />
            </mesh>
          ))}
        </group>
      )}

      {isVisible("grade", frame) && dustClean < 1 && (
        <group position={[0, 0, -1.8]} scale={dustClean}>
          <mesh castShadow>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshStandardMaterial {...MATTE} color={PALETTE.metalDark} />
          </mesh>
        </group>
      )}

      {isVisible("bearing", frame) && oilDrop > 0.001 && (
        <group position={[0, -1.1, 0]} scale={oilDrop}>
          <mesh position={[0, -oilDrop * 0.5, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial {...MATTE} color={PALETTE.motor} transparent opacity={0.8} />
          </mesh>
        </group>
      )}

      {isVisible("bolt", frame) && boltTighten > 0.001 && (
        <mesh position={[0.3, 0, 0.5]} rotation={[0, 0, boltTighten * Math.PI * 4]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 6]} />
          <meshStandardMaterial {...METAL} color={PALETTE.metal} />
        </mesh>
      )}

      {isVisible("check1", frame) && check1Pop > 0.001 && (
        <mesh position={[0, 0, -1.8]} scale={check1Pop}>
          <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.05, 0.15, 32]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.positive} side={2} />
            </mesh>
          </group>
        </mesh>
      )}

      {isVisible("check2", frame) && check2Pop > 0.001 && (
        <mesh position={[0, -1.1, 0]} scale={check2Pop}>
          <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.05, 0.15, 32]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.positive} side={2} />
            </mesh>
          </group>
        </mesh>
      )}

      {isVisible("check3", frame) && check3Pop > 0.001 && (
        <mesh position={[0.3, 0, 0.5]} scale={check3Pop}>
          <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.05, 0.15, 32]} />
              <meshStandardMaterial {...MATTE} color={PALETTE.info} side={2} />
            </mesh>
          </group>
        </mesh>
      )}

      {isVisible("grade", frame) && explodeAll > 0.001 && (
        <group position={[0, 0, -1.8 - explodeAll * 2]} scale={1 - explodeAll * 0.2}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.6, 1.6, 0.08, 32, 1, true, 0, Math.PI]} />
            <meshStandardMaterial {...MATTE} color={gradePulse > 0.5 ? PALETTE.accent : PALETTE.grade} emissive={gradePulse > 0.5 ? PALETTE.accent : "#000"} emissiveIntensity={gradePulse * 0.5} side={2} transparent opacity={0.9} />
          </mesh>
        </group>
      )}

      {isVisible("blades", frame) && explodeAll > 0.001 && (
        <group position={[0, 0, -explodeAll * 1.5]}>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, 0, i * Math.PI * 2 / 3 + rotorSpin * Math.PI / 180]} position={[explodeAll * Math.cos(i * 2.1) * 1, 0, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.2, 0.8, 0.1]} />
                <meshStandardMaterial {...MATTE} color={bladesPulse > 0.5 ? PALETTE.accent : PALETTE.blade} emissive={bladesPulse > 0.5 ? PALETTE.accent : "#000"} emissiveIntensity={bladesPulse * 0.5} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {isVisible("motor", frame) && explodeAll > 0.001 && (
        <group position={[0, -0.3, explodeAll * 1.5]} scale={1 - explodeAll * 0.2}>
          <mesh castShadow>
            <cylinderGeometry args={[1.2, 1.2, 1.6, 24]} />
            <meshStandardMaterial {...METAL} color={motorPulse > 0.5 ? PALETTE.accent : PALETTE.motor} emissive={motorPulse > 0.5 ? PALETTE.accent : "#000"} emissiveIntensity={motorPulse * 0.5} />
          </mesh>
        </group>
      )}

      {isVisible("base", frame) && explodeAll > 0.001 && (
        <group position={[0, -2.2, explodeAll * 1]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[2.5, 2.5, 0.4, 32]} />
            <meshStandardMaterial {...MATTE} color={basePulse > 0.5 ? PALETTE.accent : PALETTE.pedestal} emissive={basePulse > 0.5 ? PALETTE.accent : "#000"} emissiveIntensity={basePulse * 0.5} />
          </mesh>
        </group>
      )}

      {isVisible("paper", frame) && (
        <mesh position={[-1, 0.5 - paperBlow * 0.5, -2 + paperBlow * 1.5]} rotation={[0, 0, paperBlow * 0.3]} scale={[1, paperSuck > 0 ? 0.3 : 1, 1]} castShadow>
          <planeGeometry args={[0.3, 0.4]} />
          <meshStandardMaterial {...MATTE} color="#f0f0f0" side={2} />
        </mesh>
      )}

      {isVisible("frontGrade", frame) && (
        <mesh position={[0, 0, -1.8]} receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 0.08, 32, 1, true, 0, Math.PI]} />
          <meshStandardMaterial {...MATTE} color={PALETTE.grade} side={2} transparent opacity={0.9} />
        </mesh>
      )}

      {isVisible("rearGrade", frame) && (
        <mesh position={[0, 0, 1.8]} receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 0.08, 32, 1, true, 0, Math.PI]} />
          <meshStandardMaterial {...MATTE} color={PALETTE.grade} side={2} transparent opacity={0.9} />
        </mesh>
      )}

      {isVisible("pressureFront", frame) && pressureFront > 0.001 && (
        <Arrow3D from={[0, 0, -2.5]} dir={[0, 0, 1]} length={1} color={PALETTE.pressureHigh} scale={pressureFront} />
      )}

      {isVisible("pressureRear", frame) && pressureRear > 0.001 && (
        <Arrow3D from={[0, 0, 2.5]} dir={[0, 0, -1]} length={1} color={PALETTE.pressureLow} scale={pressureRear} />
      )}

      {isVisible("fan", frame) && (
        <group>
          <mesh position={[0, 0, -0.5]} castShadow receiveShadow>
            <cylinderGeometry args={[1.8, 1.8, 2.5, 32, 1, true, 0, Math.PI]} />
            <meshStandardMaterial {...PLASTIC} color={PALETTE.plastic} side={2} />
          </mesh>
          <group rotation={[0, 0, rotorSpin * Math.PI / 180]}>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, 0, 0]} castShadow>
                <boxGeometry args={[0.2, 0.8, 0.1]} />
                <meshStandardMaterial {...MATTE} color={PALETTE.blade} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {isVisible("person", frame) && personRelax > 0.001 && (
        <group position={[-2, -1, -3]} scale={personRelax}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
            <meshStandardMaterial {...MATTE} color="#d4a88a" />
          </mesh>
          <mesh position={[0, 1.6, 0]} castShadow>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial {...MATTE} color="#d4a88a" />
          </mesh>
        </group>
      )}

      {isVisible("comfortParticles", frame) && comfortParticles > 0.001 && (
        <mesh position={[0, 1, -3]} castShadow>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial {...MATTE} color={PALETTE.comfort} emissive={PALETTE.comfort} emissiveIntensity={0.5} transparent opacity={0.5} />
        </mesh>
      )}

      {isVisible("logo", frame) && logoFade > 0.001 && (
        <mesh position={[0, 0.5, 0]} scale={logoFade} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <planeGeometry args={[2, 0.5]} />
          <meshStandardMaterial {...MATTE} color={PALETTE.accent} emissive={PALETTE.accent} emissiveIntensity={0.3} transparent opacity={0.9} side={2} />
        </mesh>
      )}

      {fade > 0.001 && (
        <mesh position={[0, 0, 0]} scale={[100, 100, 1]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial color="#050b14" transparent opacity={fade} depthTest={false} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
};