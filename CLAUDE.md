# CLAUDE.md — Projet krissbarthe
> Mémoire unifiée : session Cowork (construction) + session Claude Code (design & ajustements).
> Mise à jour : 2026-06-09. **Toujours lire ce fichier en premier.**

---

## 1. VISION & POSITIONNEMENT

Site vitrine pour **Kristine Barthe**, praticienne en Travail Transgénérationnel Émotionnel et Comportemental.
Positionnement : **sérieux, doux, intelligent, premium** — sans ésotérisme ni template bien-être générique.

**Objectif principal :** prise de rendez-vous directe via le site.
**Objectifs secondaires :** pédagogie, crédibilité, visibilité SEO/IA, conformité juridique.

---

## 2. INFORMATIONS CLÉS SUR LA PRATICIENNE

| Champ | Valeur |
|---|---|
| Nom | Kristine Barthe |
| Email | kriss.barthe1560@gmail.com |
| Téléphone | 07 80 17 64 03 |
| Adresse cabinet | 12 rue Louis Victor Guilmin, 82100 Castelsarrasin |
| Tarif | 70 € / séance de 1h30 (parcours conseillé : 3 séances) |
| Modalités | **Présentiel exclusivement — aucune visioconférence** |
| Formation | École Jade Colline |
| SIRET | 94386198900011 |
| Rayonnement | Castelsarrasin + salons bien-être ~25 km |

---

## 3. RÈGLES DE CONTENU (décisions validées — ne pas revenir dessus)

- ❌ **"Visio" / "Visioconférence"** → supprimé partout (Kristine ne propose que le présentiel)
- ❌ **"Diplômée de l'École Jade Colline"** → uniquement dans `a-propos.html`, nulle part ailleurs
- ❌ **Prix dans les boutons CTA** ("— 70€") → trop lourd, supprimé de tous les boutons
- ✅ **Titre complet dans le hero** : TRAVAIL TRANSGÉNÉRATIONNEL ÉMOTIONNEL ET COMPORTEMENTAL
- ✅ **Localisation** : Castelsarrasin (82) / Tarn-et-Garonne
- ✅ **Tarif** affiché sur la page tarifs uniquement

---

## 4. STACK TECHNIQUE

```
Langage     : HTML5 / CSS3 / JavaScript vanilla (aucun framework)
Polices     : Google Fonts — Cormorant Garamond (titres) + Inter (corps)
RDV         : Calendly (embed inline sur tarifs.html — À CONFIGURER)
Formulaire  : Formspree (contact.html — À CONFIGURER)
Hébergement : OVH mutualisé (Apache + .htaccess)
Domaine     : kristinebarthe.fr (à commander chez OVH)
SEO         : Schema.org (LocalBusiness, Article, FAQPage, Service)
Repo GitHub : https://github.com/samir-chikhi/krissbarthe
Serveur dev : npx serve . -p 5500  (config : .claude/launch.json)
```

---

## 5. DESIGN TOKENS (palette actuelle — post refonte Claude Code)

```css
--violet-deep  : #2D1B69   /* violet sombre — header scrolled, footer */
--violet       : #5B3FA6   /* violet principal */
--violet-mid   : #7C5CBF
--lavande      : #F0EAF8   /* fond sections claires */
--gold         : #C9A84C   /* étoiles témoignages */

/* Hero background */
linear-gradient(150deg, ivory 0%, #F7F2FF 55%, #F0EAF8 100%)

/* Typographie */
html { font-size: 17px }   /* 15.5px @768px, 15px @480px */
body { line-height: 1.75 }

/* Boutons */
border-radius: 99px   /* pilule sur tous les .btn et .header-cta */
```

Note historique : la palette initiale Cowork était "sage/or/ivoire" — remplacée par violet/lavande lors de la refonte design.

---

## 6. STRUCTURE DES FICHIERS

```
krissbarthe/                          ← Repo GitHub (source de vérité)
├── index.html                        ✅ Page d'accueil
├── pratique.html                     ✅ La pratique / méthode
├── pour-qui.html                     ✅ Pour qui
├── seances.html                      ✅ Déroulement (section visio supprimée)
├── tarifs.html                       ✅ Tarifs (Calendly à configurer)
├── a-propos.html                     ✅ À propos (seule page avec diplôme Jade Colline)
├── temoignages.html                  ✅ Témoignages (vrais témoignages à intégrer)
├── faq.html                          ✅ 30 questions (questions visio supprimées)
├── contact.html                      ✅ Contact (Formspree à configurer)
├── mentions-legales.html             ✅ (SIREN à compléter)
├── cgv.html                          ✅ (validation juriste requise)
├── confidentialite.html              ✅
├── cookies.html                      ✅
├── 404.html                          ✅
├── blog/
│   ├── index.html                    ✅
│   ├── article-1.html                ✅ Image : arbre-genealogique.png (local)
│   ├── article-2.html à 5.html       ✅
├── assets/
│   ├── css/main.css                  ✅ Feuille principale (très modifiée — cf. §5)
│   ├── js/main.js                    ✅ Navigation, FAQ, FALC, cookies, scroll
│   └── images/
│       ├── logo-kristine.png
│       ├── photo-kristine.jpg        ✅ Photo réelle intégrée
│       ├── arbre-genealogique.png    ⚠️ force-ajouté (gitignored par défaut)
│       └── favicon.svg
├── .htaccess                         ✅ Apache OVH (HTTPS, cache, sécurité)
├── sitemap.xml                       ✅
├── robots.txt                        ✅
└── CLAUDE.md                         ← CE FICHIER

Dossier Cowork local (sources & docs) :
C:\Users\samir\Desktop\site internet Kris\site internet kris\
├── SYNTHESE_PROJET.md                ← Synthèse Cowork (historique construction)
├── Strategie_Site_Transgénérationnel_Complet.docx
├── Copywriting_Complet_Kristine_Barthe.docx
├── Documents_Juridiques_Kristine_Barthe.docx
├── 📝 ARTICLE 1.odt à 5.odt         ← Sources blog
├── photo-kristine.jpeg               ← Photo originale
└── arbre généalogique.png            ← Image originale arbre
```

---

## 7. FONCTIONNALITÉS INTÉGRÉES

- Navigation responsive + menu hamburger mobile
- Header glassmorphism sticky (backdrop-filter: blur)
- Logo : image 52px + "Kristine Barthe" + "Travail Transgénérationnel"
- Mode FALC (lecture simplifiée) — toggle JS
- FAQ accordion (30 questions, accessible aria)
- Bannière cookies CNIL-conforme
- Animations scroll (IntersectionObserver, fade-in progressif)
- Formulaire contact (Formspree — à configurer)
- Prise de RDV Calendly inline (à configurer)
- Schema.org complet (LocalBusiness, Article, FAQPage, Service)
- .htaccess : HTTPS forcé, Gzip, cache, headers sécurité
- Étoiles témoignages en gold (CSS ::before)

---

## 8. CE QUI RESTE À FAIRE

### 🔴 Bloquants (avant mise en ligne)
1. **SIREN** — Compléter dans `mentions-legales.html` et `cgv.html`
2. **Calendly** — Créer compte + configurer événement + remplacer URL dans `tarifs.html`
3. **Formspree** — Créer compte + remplacer endpoint dans `contact.html`
4. **Domaine** — Commander `kristinebarthe.fr` chez OVH
5. **Validation juridique** — Faire relire CGV, mentions légales, confidentialité par un juriste

### 🟡 Importants
6. **Vrais témoignages** — Remplacer les exemples dans `temoignages.html` (avec accords écrits)
7. **Adresse complète** — Vérifier dans Schema.org de `index.html`, `contact.html`, `seances.html`

### 🟢 Post-lancement
8. **Google My Business** — Créer/revendiquer la fiche
9. **Google Search Console** — Vérifier propriété + soumettre sitemap
10. **Analytics** — Envisager Matomo (RGPD-friendly, sans cookie)

---

## 9. HISTORIQUE DES COMMITS

| Commit | Auteur | Description |
|---|---|---|
| `cb60579` | Cowork/CC | Photo Kristine — remplacement placeholder Unsplash |
| `9dcefc6` | Claude Code | Refonte design : apparence professionnelle et bienveillante |
| `6a647b9` | Claude Code | Corrections UX/contenu : lisibilité, logo, CTAs, cohérence |
| `a3832ec` | Claude Code | Responsive mobile : audit et corrections complètes |
| `e99e6b4` | Claude Code | Fix image arbre généalogique dans le blog |
| `d914176` | Claude Code | Suppression complète mentions visio/visioconférence (16 fichiers) |
| `f55a19f` | Claude Code | Ajout CLAUDE.md — mémoire projet |

---

## 10. POINTS D'ATTENTION TECHNIQUES

- `arbre-genealogique.png` est dans `.gitignore` → ajouté en force (`git add -f`). Si re-clone : recopier depuis `C:\Users\samir\Desktop\site internet Kris\site internet kris\arbre généalogique.png`
- `faq.html` a un encodage détecté comme binaire par grep — éditer avec précaution (utiliser l'outil Edit, pas sed)
- Les classes CSS `.visio-*` existent encore dans `seances.html` (CSS mort, inoffensif — à nettoyer)
- `tarifs.html` : le widget Calendly est en placeholder, vérifier l'URL avant mise en ligne

---

## 11. DÉPLOIEMENT OVH (quand tout est prêt)

```bash
# Option A — via GitHub + OVH Git
git push origin main
# Puis connecter le dépôt dans le panel OVH (onglet Git)

# Option B — FTP via FileZilla
# Uploader tout le contenu du repo dans www/ sur le serveur OVH
```

---

*Document fusionné : Cowork (CCFA, construction initiale) + Claude Code (design & ajustements) — Juin 2026*
