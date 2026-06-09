# CLAUDE.md — Projet krissbarthe
> Mémoire partagée entre sessions. Mise à jour : 2026-06-09.

## Contexte général

Site vitrine pour **Kristine Barthe**, praticienne en Travail Transgénérationnel Émotionnel et Comportemental.  
Repo GitHub : https://github.com/samir-chikhi/krissbarthe  
Serveur local de preview : `npx serve . -p 5500` (config dans `.claude/launch.json`)

**Important :** Le site a deux histoires distinctes :
- **Construction initiale** → faite dans une session Cowork séparée (à synchroniser)
- **Refonte design + ajustements** → faite dans la session Claude Code (résumée ici)

---

## Stack technique

- Vanilla HTML / CSS / JS (aucun framework)
- CSS custom properties (design tokens) dans `assets/css/main.css`
- Fonts : Cormorant Garamond (titres) + Inter (corps)
- `IntersectionObserver` pour les animations scroll (fade-in)
- Breakpoints responsive : 900px, 768px, 480px
- Serveur de preview : `npx serve` sur le port 5500

---

## Structure des fichiers

```
krissbarthe/
├── index.html               # Page d'accueil
├── a-propos.html            # À propos de Kristine (seule page avec mention diplôme Jade Colline)
├── pratique.html            # La pratique / méthode
├── pour-qui.html            # Pour qui
├── seances.html             # Déroulement des séances
├── tarifs.html              # Tarifs & prise de RDV
├── temoignages.html         # Témoignages
├── faq.html                 # FAQ complète
├── contact.html             # Contact
├── blog/
│   ├── index.html           # Liste des articles
│   ├── article-1.html       # Traumatismes ancestraux (image : arbre-genealogique.png)
│   ├── article-2.html       # Comment le trauma se transmet
│   ├── article-3.html       # 10 questions schémas familiaux
│   ├── article-4.html       # Briser les schémas négatifs
│   └── article-5.html       # Choisir son héritage
├── cgv.html / confidentialite.html / mentions-legales.html / cookies.html
├── assets/
│   ├── css/main.css         # Feuille de style principale (très modifiée)
│   ├── js/main.js           # Scripts (scroll, FAQ, IntersectionObserver)
│   └── images/
│       ├── logo-kristine.png
│       ├── photo-kristine.jpg
│       ├── arbre-genealogique.png  # Image blog article 1 (force-ajouté, gitignored par défaut)
│       └── favicon.svg
└── .claude/
    └── launch.json          # Config serveur preview
```

---

## Décisions de design (session Claude Code)

### Palette de couleurs (tokens CSS)
- `--violet-deep` : #2D1B69 (violet sombre)
- `--violet` : #5B3FA6 (violet principal)
- `--violet-mid` : #7C5CBF
- `--lavande` : #F0EAF8
- `--gold` : #C9A84C (étoiles témoignages)
- Fond hero : `linear-gradient(150deg, ivory 0%, #F7F2FF 55%, lavande 100%)`

### Typographie
- `html { font-size: 17px }` (15.5px à 768px, 15px à 480px)
- `body { line-height: 1.75 }`
- Titres : Cormorant Garamond, serif
- Corps : Inter, sans-serif

### Composants modifiés
- **Header** : glassmorphism `rgba(255,255,255,0.92)` + `backdrop-filter: blur(12px)`
- **Logo** : image 52px + nom "Kristine Barthe" + sous-titre "Travail Transgénérationnel"
- **Boutons** : `border-radius: 99px` (pilule) sur tous les `.btn` et `.header-cta`
- **Hero eyebrow** : badge violet avec `box-shadow`
- **Témoignages** : étoiles `★★★★★` en gold via `::before`
- **Footer** : `linear-gradient(160deg, var(--violet-deep), var(--violet))`
- **CTA section** : gradient violet avec orbes décoratifs

### Animations
- `.fade-in { opacity: 0; transform: translateY(20px) }` + `.fade-in.visible { opacity:1; transform:none }`
- Délai progressif : `Math.min(idx * 80, 320)ms` pour les éléments siblings

---

## Règles de contenu (décisions validées)

### Ce qui NE doit PAS apparaître (sauf exceptions)
- ❌ **"Diplômée de l'École Jade Colline"** → uniquement dans `a-propos.html`
- ❌ **"— 70€"** dans les boutons CTA (trop lourd pour le visiteur)
- ❌ **"Visio" / "Visioconférence"** → supprimé partout (juin 2026, Kristine ne propose plus de séances à distance)

### Ce qui DOIT apparaître
- ✅ Localisation : **Castelsarrasin (82)** / Tarn-et-Garonne
- ✅ Tarif affiché uniquement sur la page tarifs : **70€ / 1h30**
- ✅ Titre complet dans le hero : **TRAVAIL TRANSGÉNÉRATIONNEL ÉMOTIONNEL ET COMPORTEMENTAL**

---

## Historique des commits (session Claude Code)

| Commit | Description |
|--------|-------------|
| `9dcefc6` | Refonte design : apparence professionnelle et bienveillante |
| `6a647b9` | Corrections UX/contenu : lisibilité, logo, CTAs, cohérence |
| `a3832ec` | Responsive mobile : audit et corrections complètes |
| `e99e6b4` | Fix image arbre généalogique dans le blog |
| `d914176` | Suppression complète mentions visio/visioconférence |

---

## Points d'attention pour futures sessions

- `arbre-genealogique.png` est dans `.gitignore` (ajouté en force avec `git add -f`). Si le repo est re-cloné, l'image devra être re-copiée depuis le Desktop de Samir.
- Le fichier `tarifs.html` contient un widget Calendly (à vérifier si le lien est actif)
- `faq.html` a un encodage particulier (détecté comme fichier binaire par grep) — éditer avec précaution
- Les classes CSS `.visio-*` existent encore dans `seances.html` (CSS mort, inoffensif mais à nettoyer un jour)

---

## Contact / accès
- Email Kristine : kriss.barthe1560@gmail.com
- Tél : 07 80 17 64 03
- SIRET : 94386198900011
- GitHub repo owner : samir-chikhi
