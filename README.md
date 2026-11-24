# Ventilador — Short 3D Low-Poly (90s, 1080×1920)

Vídeo educativo vertical no formato **problema → solução** explicando como funciona um ventilador axial residencial.

## Pipeline

1. **GitHub Actions** renderiza automaticamente no push para `main`
2. Baixe o artifact `ventilador-final` (MP4 normalizado -14 LUFS)

## Render Local (opcional)

```bash
npm ci
npm run dev                    # Abre Remotion Studio
npx remotion render Ventilador out/ventilador.mp4 --gl=angle --concurrency=4 --crf=17
python scripts/loudnorm.py out/ventilador.mp4 out/ventilador-final.mp4
```

## Estrutura

```
src/
├── data/scenes.ts      # 16 cenas, 2700 frames, contratos tipados
├── components/World.tsx # Diorama persistente (grade, hélice, motor, fluxo, vórtice, sala)
├── scenes/VentiladorScenes.tsx # Stage/Overlay por cena
├── utils/timing.ts     # Cortes derivados da narração real (word-level)
└── audio/Soundtrack.tsx # Narração + SFX + trilha com ducking
scripts/
├── narration.json      # Texto das 14 falas
├── voiceover.py        # Gera áudio (edge-tts / ElevenLabs)
├── prepare_vo.py       # Normaliza, apara, gera vo.json
├── sfx.py              # Efeitos sintetizados
├── music.py            # Trilha procedural
├── loudnorm.py         # -14 LUFS / -1.5 dBTP
└── audiocheck.py       # Métricas de áudio
```

## Especificação do Vídeo

| Item | Valor |
|------|-------|
| Duração | 90s (2700 frames) |
| Resolução | 1080×1920 (9:16) |
| FPS | 30 |
| Codec | H.264 / AAC |
| Loudness | -14 LUFS |
| TTS | edge-tts `pt-BR-AntonioNeural` +20% |

## Cenas (resumo)

1. **Gancho** — Mergulho na grade, revela hélice em corte
2. **Perfil aerodinâmico** — Pá = asa, ∆P alta/baixa pressão
3. **Motor** — Indução (campo girante) vs BLDC (ímãs + comutação)
4. **Fluxo + vórtice** — Jato frontal + vórtice de ponta (perda)
5. **Geometria da pá** — Torção (twist) + afilamento (taper)
6. **Térmico** — Calor no cobre, convecção, ventoinha interna
7. **Grade** — Split screen: com grade (laminar) vs sem (turbulento)
8. **Oscilação** — Cremalheira + pinhão, varre a sala
9. **Velocidade** — Capacitor (CA) / PWM (BLDC), ruído ∝ velocidade
10. **Sala** — Convecção forçada mistura ar quente/frio
11. **Manutenção** — Limpeza, lubrificação, aperto
12. **Recap 360°** — Vista explodida completa
13. **Experimento** — Papel na frente (sopra) / trás (suga)
14. **Encerramento** — "Não é mágica, é física do conforto"

## GitHub Actions

O workflow `.github/workflows/render.yml` roda em `ubuntu-latest` (x64 nativo) e faz:
- `npm ci` + `tsc --noEmit`
- `npx remotion render` (GPU via ANGLE)
- `ffprobe` + `loudnorm.py` + `audiocheck.py`
- Upload do `ventilador.mp4` final como artifact (30 dias)