"""Genera un video corto del sitio con kie.ai: primero la imagen inicial
(nano-banana-pro) y luego la anima con Kling 2.6 (image-to-video).

Uso:
  python3 herramientas/generar_video.py impermeabilizacion-capas

Los videos se describen en contenido/videos.json. Deja en images/ia/:
  <id>-poster-960.webp / -1600.webp  (portada y respaldo sin movimiento)
  <id>.mp4 y <id>.webm               (comprimidos para web, sin audio)
Requiere KIE_API_KEY en .env, Pillow y ffmpeg.
"""
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.request
from io import BytesIO

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generar_imagenes import API, RAIZ, SALIDA, pedir  # noqa: E402


def esperar(tarea, limite_min=20):
    limite = time.time() + limite_min * 60
    while time.time() < limite:
        time.sleep(8)
        info = pedir("GET", f"{API}/recordInfo?taskId={tarea}")
        if info["state"] == "success":
            return json.loads(info["resultJson"])["resultUrls"][0], info.get("creditsConsumed", "?")
        if info["state"] == "fail":
            raise RuntimeError(f"falló: {info.get('failMsg')}")
    raise RuntimeError(f"no terminó a tiempo (tarea {tarea})")


def hacer_bucle(entrada, salida, fundido=1.0):
    """El final se funde con el comienzo, así el video se repite sin salto."""
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", entrada],
                               capture_output=True, text=True, check=True).stdout)
    filtro = (f"[0]trim={fundido}:{dur},setpts=PTS-STARTPTS[a];[1]trim=0:{fundido},setpts=PTS-STARTPTS[b];"
              f"[a][b]xfade=transition=fade:duration={fundido}:offset={dur - 2 * fundido:.3f}[v]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", entrada, "-i", entrada, "-filter_complex", filtro,
                    "-map", "[v]", "-an", "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p", salida], check=True)


def main(vid_id):
    videos = json.load(open(os.path.join(RAIZ, "contenido", "videos.json"), encoding="utf-8"))
    v = next(x for x in videos["videos"] if x["id"] == vid_id)
    os.makedirs(SALIDA, exist_ok=True)

    print("1/3 imagen inicial…")
    tarea = pedir("POST", f"{API}/createTask", {"model": "nano-banana-pro", "input": {
        "prompt": v["imagen"], "aspect_ratio": v["ratio"], "resolution": "2K", "output_format": "jpg"}})["taskId"]
    url_img, cred = esperar(tarea)
    print(f"   lista ({cred} créditos)")
    with urllib.request.urlopen(url_img, timeout=120) as r:
        poster = Image.open(BytesIO(r.read())).convert("RGB")
    for ancho in (960, 1600):
        p = poster.copy()
        if p.width > ancho:
            p = p.resize((ancho, round(p.height * ancho / p.width)), Image.LANCZOS)
        p.save(os.path.join(SALIDA, f"{vid_id}-poster-{ancho}.webp"), "WEBP", quality=80, method=6)

    print("2/3 animación con Kling…")
    tarea = pedir("POST", f"{API}/createTask", {"model": "kling-2.6/image-to-video", "input": {
        "prompt": v["movimiento"], "image_urls": [url_img], "sound": False, "duration": str(v["duracion"])}})["taskId"]
    url_vid, cred = esperar(tarea)
    print(f"   listo ({cred} créditos)")

    print("3/3 compresión para web…")
    with tempfile.TemporaryDirectory() as tmp:
        descargado = os.path.join(tmp, "descargado.mp4")
        urllib.request.urlretrieve(url_vid, descargado)
        bruto = os.path.join(tmp, "bruto.mp4")
        hacer_bucle(descargado, bruto)
        escala = "scale='min(1280,iw)':-2"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", bruto, "-an", "-vf", escala, "-c:v", "libx264",
                        "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                        os.path.join(SALIDA, f"{vid_id}.mp4")], check=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", bruto, "-an", "-vf", escala, "-c:v", "libvpx-vp9",
                        "-b:v", "0", "-crf", "36", "-row-mt", "1", os.path.join(SALIDA, f"{vid_id}.webm")], check=True)
    for ext in ("mp4", "webm"):
        print(f"   {vid_id}.{ext}: {os.path.getsize(os.path.join(SALIDA, f'{vid_id}.{ext}')) // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Uso: python3 herramientas/generar_video.py <id>")
    main(sys.argv[1])
