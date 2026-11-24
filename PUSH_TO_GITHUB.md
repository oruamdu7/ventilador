# Como enviar para o GitHub e renderar

## Opção 1: Via GitHub Web (mais fácil)

1. Acesse https://github.com/new
2. Crie repo **público** chamado `ventilador` (não inicialize com README)
3. No Termux, execute:

```bash
cd /data/data/com.termux/files/home/ventilador

# Se git não estiver instalado, use o GitHub Web:
# 1. Baixe este folder como ZIP (no app de arquivos)
# 2. Arraste para github.com/<seu-user>/ventilador → "Add file" → "Upload files"
# 3. Commit

# OU se tiver git:
git init
git config user.email "seu@email.com"
git config user.name "Seu Nome"
git add .
git commit -m "Ventilador 3D low-poly - ready for render"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ventilador.git
git push -u origin main
```

## Opção 2: GitHub Codespaces (render na nuvem, grátis 60h/mês)

1. Após push, vá no repo → **Code** → **Codespaces** → **Create codespace on main**
2. No terminal do Codespace:
```bash
npm ci
npx remotion render Ventilador out/ventilador.mp4 --gl=angle --concurrency=4 --crf=17
python scripts/loudnorm.py out/ventilador.mp4 out/ventilador-final.mp4
```
3. Baixe o arquivo pela interface do Codespaces (arquivo → download)

## Opção 3: GitHub Actions (automático)

Após o push para `main`, a action roda sozinha:
1. Vá na aba **Actions** do repo
2. Clique no workflow "Render Ventilador Video"
3. Aguarde ~5-10 min
4. Baixe o artifact `ventilador-final` (clique no job → artifacts)

---

## Verificação pós-render

O artifact `ventilador-final` contém `ventilador.mp4` (90s, 1080×1920, 30fps, -14 LUFS).

Confira localmente:
```bash
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames -show_entries format=duration ventilador.mp4
python scripts/audiocheck.py ventilador.mp4
```

---

## Se der erro no Actions

- **Timeout**: Aumente `timeout-minutes: 60` no workflow
- **Memória**: Reduza `--concurrency=2`
- **Qualidade**: Aumente `--crf=23` (menor = melhor)

---

## Credenciais TTS (opcional)

Para ElevenLabs (voz melhor), adicione no repo:
**Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
- `ELEVENLABS_API_KEY` = sua chave

E mude no workflow a chamada do `voiceover.py` para usar `--provider elevenlabs`.