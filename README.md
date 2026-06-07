# Kristine Barthe — Site Internet
## Travail Transgénérationnel Émotionnel et Comportemental

Site statique HTML/CSS/JS — Développé par CCFA pour Kristine Barthe.

---

## Architecture du projet

```
kristine-barthe/
├── index.html                    ← Accueil
├── pratique.html                 ← La pratique
├── pour-qui.html                 ← Pour qui
├── seances.html                  ← Déroulement des séances
├── tarifs.html                   ← Tarifs & Prise de RDV (Calendly)
├── a-propos.html                 ← À propos de Kristine
├── temoignages.html              ← Témoignages
├── faq.html                      ← FAQ complète (30 questions)
├── contact.html                  ← Contact (Formspree)
├── mentions-legales.html         ← Mentions légales
├── cgv.html                      ← Conditions Générales de Vente
├── confidentialite.html          ← Politique de confidentialité RGPD
├── cookies.html                  ← Politique cookies
├── 404.html                      ← Page d'erreur
├── blog/
│   ├── index.html                ← Listing du blog
│   ├── article-1.html            ← "Comment les traumatismes façonnent votre vie"
│   ├── article-2.html            ← "Comment le trauma se transmet"
│   ├── article-3.html            ← "10 questions pour identifier votre héritage"
│   ├── article-4.html            ← "Méthodes pour briser les schémas négatifs"
│   └── article-5.html            ← "Transmettre autrement à nos enfants"
├── assets/
│   ├── css/main.css              ← Styles globaux (palette, layout, composants)
│   ├── js/main.js                ← Scripts (nav, FAQ, FALC, cookies, formulaire)
│   └── images/
│       └── favicon.svg           ← Favicon SVG
├── .htaccess                     ← Config Apache OVH (HTTPS, cache, sécurité)
├── sitemap.xml                   ← Sitemap pour les moteurs de recherche
├── robots.txt                    ← Instructions pour les robots
└── README.md                     ← Ce fichier
```

---

## Stack technique

- **HTML5 / CSS3 / JavaScript vanilla** — aucune dépendance framework
- **Google Fonts** : Cormorant Garamond (titres) + Inter (corps)
- **Calendly** : embed inline sur tarifs.html pour la prise de rendez-vous
- **Formspree** : formulaire de contact sans backend
- **Unsplash** : images libres de droit (liens directs)
- **Schema.org** : balisage structuré (LocalBusiness, Article, FAQPage, Service)
- **OVH** : hébergement web mutualisé (Apache → .htaccess)

---

## Fonctionnalités intégrées

| Fonctionnalité | Implémentation |
|---|---|
| Navigation responsive | Menu hamburger mobile + sticky header |
| Mode FALC | Toggle JavaScript + localStorage |
| FAQ accordion | JavaScript natif, accessible (aria) |
| Cookie banner | Consentement CNIL-conforme |
| Animations scroll | IntersectionObserver |
| Formulaire de contact | Formspree (à configurer) |
| Prise de rendez-vous | Calendly embed inline |
| SEO | Meta, Schema.org, sitemap, robots |
| Performance | Cache headers, Gzip, lazy loading |

---

## Configuration avant mise en ligne

### 1. Calendly
- Créer le compte Kristine sur https://calendly.com
- Créer un événement "Séance 1h30 — 70€"
- Remplacer `https://calendly.com/kristine-barthe/seance` dans `tarifs.html`

### 2. Formspree (formulaire de contact)
- Créer un compte sur https://formspree.io
- Créer un formulaire lié à kriss.barthe1560@gmail.com
- Remplacer `https://formspree.io/f/XXXXX` dans `contact.html`

### 3. Domaine et DNS
- Domaine recommandé : `kristinebarthe.fr` (vérifier disponibilité sur OVH)
- Alternative : `kristine-barthe.fr` ou `arbre-emotionnel-generations.fr`
- DNS : pointer le domaine vers l'hébergement OVH

### 4. SIREN et données légales
- Compléter le SIREN dans `mentions-legales.html` et `cgv.html`
- Compléter l'adresse exacte du cabinet
- Faire valider les documents juridiques par un juriste

### 5. Photo de Kristine
- Remplacer les URLs Unsplash placeholder par les vraies photos de Kristine
- Format recommandé : WebP, 800x600px minimum, < 200ko

### 6. Témoignages
- Remplacer les témoignages placeholder par les vrais (avec accord écrit)
- Format : prénom anonymisé + contexte + texte court

---

## Déploiement GitHub → OVH

```bash
# 1. Créer le dépôt GitHub (fourni par Samir)
# 2. Initialiser git dans ce dossier
git init
git add .
git commit -m "Initial commit — Site Kristine Barthe v1.0"
git branch -M main
git remote add origin https://github.com/[USER]/kristine-barthe-site.git
git push -u origin main

# 3. Sur OVH : activer le déploiement GitHub
# Panel OVH → Hébergement → Git → Connecter le dépôt

# 4. Ou déploiement FTP manuel
# Uploader tous les fichiers via FileZilla dans www/ ou public_html/
```

---

## Contacts projet

- **Praticienne** : Kristine Barthe — kriss.barthe1560@gmail.com — 07 80 17 64 03
- **Développeur** : Claude / CCFA — samir.chikhi@gmail.com
- **Hébergeur** : OVH
