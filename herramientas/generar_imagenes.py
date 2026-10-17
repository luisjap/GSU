"""Genera las imágenes del sitio con kie.ai a partir de contenido/imagenes.json.

Uso:
  python3 herramientas/generar_imagenes.py                 # genera las que faltan
  python3 herramientas/generar_imagenes.py --solo ID [ID…] # solo esas
  python3 herramientas/generar_imagenes.py --forzar        # vuelve a generar aunque existan

La clave se lee de KIE_API_KEY (variable de entorno o archivo .env, que git ignora).
Cada imagen se guarda en images/ia/<id>-480.webp, -960.webp y -1600.webp.
Requiere Pillow (pip install pillow).
"""
import json
import os
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://api.kie.ai/api/v1/jobs"
ANCHOS = (480, 960, 1600)
SALIDA = os.path.join(RAIZ, "images", "ia")


def clave():
    if os.environ.get("KIE_API_KEY"):
        return os.environ["KIE_API_KEY"]
    ruta = os.path.join(RAIZ, ".env")
    if os.path.exists(ruta):
        for linea in open(ruta, encoding="utf-8"):
            if linea.startswith("KIE_API_KEY="):
                return linea.split("=", 1)[1].strip()
    sys.exit("Falta KIE_API_KEY: agrégala al archivo .env del proyecto.")


def pedir(metodo, url, cuerpo=None):
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    req = urllib.request.Request(url, data=datos, method=metodo, headers={
        "Authorization": f"Bearer {clave()}",
        "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        res = json.load(r)
    if res.get("code") != 200:
        raise RuntimeError(f"kie.ai respondió {res.get('code')}: {res.get('msg')}")
    return res["data"]


def prompt_completo(img, manifiesto):
    return f"{img['prompt']}. {img['ubicacion']} {manifiesto['movil']} {manifiesto['estilo']}"


def generar(img, manifiesto):
    tarea = pedir("POST", f"{API}/createTask", {
        "model": manifiesto["modelo"],
        "input": {
            "prompt": prompt_completo(img, manifiesto),
            "aspect_ratio": img["ratio"],
            "resolution": manifiesto["resolucion"],
            "output_format": "jpg",
        },
    })["taskId"]
    limite = time.time() + 600
    while time.time() < limite:
        time.sleep(5)
        info = pedir("GET", f"{API}/recordInfo?taskId={tarea}")
        if info["state"] == "success":
            url = json.loads(info["resultJson"])["resultUrls"][0]
            with urllib.request.urlopen(url, timeout=120) as r:
                original = Image.open(BytesIO(r.read())).convert("RGB")
            for ancho in ANCHOS:
                copia = original.copy()
                if copia.width > ancho:
                    copia = copia.resize((ancho, round(copia.height * ancho / copia.width)), Image.LANCZOS)
                copia.save(os.path.join(SALIDA, f"{img['id']}-{ancho}.webp"), "WEBP", quality=78, method=6)
            return f"{img['id']}: lista ({info.get('creditsConsumed', '?')} créditos)"
        if info["state"] == "fail":
            raise RuntimeError(f"{img['id']}: falló ({info.get('failMsg')})")
    raise RuntimeError(f"{img['id']}: no terminó en 10 minutos (tarea {tarea})")


def main():
    manifiesto = json.load(open(os.path.join(RAIZ, "contenido", "imagenes.json"), encoding="utf-8"))
    os.makedirs(SALIDA, exist_ok=True)
    args = sys.argv[1:]
    forzar = "--forzar" in args
    solo = args[args.index("--solo") + 1:] if "--solo" in args else None
    pendientes = [
        img for img in manifiesto["imagenes"]
        if (solo is None or img["id"] in solo)
        and (forzar or not os.path.exists(os.path.join(SALIDA, f"{img['id']}-1600.webp")))
    ]
    if not pendientes:
        print("No hay imágenes por generar.")
        return
    print(f"Generando {len(pendientes)} imágenes…")
    errores = 0
    with ThreadPoolExecutor(max_workers=4) as pool:
        for futuro in [pool.submit(generar, img, manifiesto) for img in pendientes]:
            try:
                print(futuro.result())
            except Exception as e:  # una imagen fallida no detiene las demás
                errores += 1
                print(f"ERROR {e}")
    if errores:
        sys.exit(f"{errores} imágenes fallaron; vuelve a ejecutar el script para reintentarlas.")


if __name__ == "__main__":
    main()
