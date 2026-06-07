"""
Script de recadrage automatique de la photo de Kristine Barthe
─────────────────────────────────────────────────────────────
Exécuter UNE FOIS après avoir placé la photo originale dans ce dossier.
Usage : python recadrer_photo.py

Ce script :
  1. Charge "photo-kristine-originale.jpg"
  2. La recadre en portrait 3:4 centré sur le haut de l'image (là où se trouve le visage)
  3. La redimensionne en 600×800px
  4. La sauvegarde en "photo-kristine.jpg" (optimisée pour le web, < 150ko)
  5. Ne touche pas à l'original
"""
from PIL import Image
import os, sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ORIGINAL   = os.path.join(SCRIPT_DIR, "photo-kristine-originale.jpg")
OUTPUT     = os.path.join(SCRIPT_DIR, "photo-kristine.jpg")

TARGET_W, TARGET_H = 600, 800   # format 3:4
TARGET_RATIO = TARGET_W / TARGET_H  # 0.75

if not os.path.exists(ORIGINAL):
    print(f"❌ Fichier introuvable : {ORIGINAL}")
    print("   → Enregistrez la photo sous le nom 'photo-kristine-originale.jpg' dans ce dossier")
    sys.exit(1)

img = Image.open(ORIGINAL).convert("RGB")
w, h = img.size
print(f"Photo originale : {w}×{h}px")

# ── Calcul du crop portrait 3:4 ──────────────────────────────────────────────
# La photo de Kristine : elle est assise, son visage est dans la moitié haute.
# On prend la zone centrée horizontalement, depuis le haut (face/buste visible).
img_ratio = w / h

if img_ratio > TARGET_RATIO:
    # Image plus large que haute → rogner les côtés
    crop_w = int(h * TARGET_RATIO)
    crop_h = h
    # Centrer horizontalement (Kristine est légèrement à droite du centre)
    left = max(0, (w - crop_w) // 2 + crop_w // 8)
    left = min(left, w - crop_w)
    top  = 0
else:
    # Image plus haute que large → rogner le bas (enlever table/sol)
    crop_w = w
    crop_h = int(w / TARGET_RATIO)
    left = 0
    # Partir du haut pour garder le visage
    top  = 0

right  = left + crop_w
bottom = top  + crop_h

# S'assurer qu'on ne dépasse pas les bords
right  = min(right, w)
bottom = min(bottom, h)

print(f"Recadrage : ({left}, {top}) → ({right}, {bottom})")
cropped = img.crop((left, top, right, bottom))

# ── Redimensionner en 600×800px ───────────────────────────────────────────────
resized = cropped.resize((TARGET_W, TARGET_H), Image.LANCZOS)

# ── Sauvegarder optimisé ──────────────────────────────────────────────────────
resized.save(OUTPUT, "JPEG", quality=85, optimize=True)
final_size = os.path.getsize(OUTPUT) // 1024
print(f"✓ Photo sauvegardée : {OUTPUT}")
print(f"  Taille : {TARGET_W}×{TARGET_H}px — {final_size}ko")
print(f"\n✓ Rafraîchissez la page À propos dans votre navigateur pour voir le résultat.")
