# Checklist complète de déploiement
## Site Kristine Barthe — kristinebarthe.fr
### Réalisé par CCFA · Version 1.0

---

## PHASE 1 — AVANT DE TOUCHER À L'HÉBERGEMENT
### Données à compléter (bloquant avant mise en ligne)

- [ ] **SIREN** — Obtenir le numéro SIREN et le compléter dans :
  - `mentions-legales.html` (section 1)
  - `cgv.html` (article 2)
- [ ] **Adresse exacte** — Adresse complète du cabinet à ajouter dans :
  - `contact.html`
  - `mentions-legales.html`
  - `seances.html` (section présentiel)
  - `index.html` (Schema.org LocalBusiness)
- [ ] **Photo de Kristine** — Remplacer les images Unsplash placeholder par les vraies photos :
  - `index.html` (section À propos)
  - `a-propos.html` (portrait principal)
  Format cible : JPG ou WebP, 800×600px, < 200ko
- [ ] **Témoignages** — Recueillir les accords écrits et compléter `temoignages.html`
- [ ] **Code APE/NAF** — Vérifier auprès de l'URSSAF et compléter les mentions légales

---

## PHASE 2 — OUTILS TIERS À CONFIGURER

### 2A — CALENDLY (prise de rendez-vous)
- [ ] Créer un compte Calendly : https://calendly.com
  - Email : kriss.barthe1560@gmail.com
  - Prénom Nom : Kristine Barthe
- [ ] Créer un type d'événement :
  - Nom : "Séance de travail transgénérationnel"
  - Durée : 1h30 (90 minutes)
  - Description : "Première séance ou séance suivante. Présentiel à Castelsarrasin ou visio."
  - Prix à afficher dans la description : 70€
- [ ] Configurer les disponibilités (jours/heures de travail de Kristine)
- [ ] Configurer le fuseau horaire : Europe/Paris
- [ ] Activer les notifications email (confirmation + rappel J-1)
- [ ] Options visioconférence :
  - Activer l'intégration Zoom OU Google Meet dans Calendly
  - Pour les séances visio : Calendly enverra automatiquement le lien au client
- [ ] Récupérer l'URL personnelle Calendly (format : https://calendly.com/kristine-barthe/seance)
- [ ] **Remplacer dans tarifs.html** l'URL `https://calendly.com/kristine-barthe/seance` par l'URL réelle
- [ ] Tester une réservation de bout en bout

### 2B — FORMSPREE (formulaire de contact)
- [ ] Créer un compte Formspree : https://formspree.io
  - Email : kriss.barthe1560@gmail.com
- [ ] Créer un nouveau formulaire
- [ ] Récupérer l'endpoint (format : https://formspree.io/f/XXXXXXXXX)
- [ ] **Remplacer dans contact.html** `https://formspree.io/f/XXXXX` par l'endpoint réel
- [ ] Activer la protection anti-spam (déjà configurée avec honeypot dans le formulaire)
- [ ] Tester l'envoi du formulaire

### 2C — DOMAINE (OVH)
- [ ] Vérifier la disponibilité sur https://www.ovhcloud.com/fr/domains/ :
  - `kristinebarthe.fr` ← recommandé
  - `kristine-barthe.fr` (alternative)
  - `arbre-emotionnel-generations.fr` (angle SEO)
- [ ] Commander le domaine
- [ ] Configurer les DNS vers l'hébergement OVH (automatique si tout est chez OVH)
- [ ] Activer le SSL/TLS HTTPS (gratuit chez OVH via Let's Encrypt)

### 2D — HÉBERGEMENT OVH
- [ ] Choisir une offre d'hébergement mutualisé OVH :
  - **Recommandé : Perso** (2,99€/mois) — adapté pour un site vitrine statique
  - Alternative : Pro (5,99€/mois) si on prévoit un formulaire + analytics
- [ ] Accéder au panel OVH : https://www.ovh.com/manager
- [ ] Identifier le répertoire racine (`www/` ou `public_html/`)

---

## PHASE 3 — DÉPLOIEMENT GITHUB

### 3A — Préparer le dépôt GitHub
- [ ] Créer un compte GitHub (ou utiliser le compte CCFA)
- [ ] Créer un nouveau dépôt : `kristine-barthe-site` (peut être privé)
- [ ] Ouvrir un terminal dans le dossier `site/`
- [ ] Initialiser et pousser :
```bash
git init
git add .
git commit -m "feat: site initial Kristine Barthe v1.0"
git branch -M main
git remote add origin https://github.com/[VOTRE_USERNAME]/kristine-barthe-site.git
git push -u origin main
```

### 3B — Connecter GitHub à OVH (déploiement automatique)
- [ ] Dans le panel OVH : aller dans "Hébergement" → votre domaine → onglet "Git"
- [ ] Cliquer "Associer un dépôt Git"
- [ ] Renseigner :
  - URL du dépôt GitHub
  - Branche : `main`
  - Répertoire de déploiement : `/` (racine)
- [ ] OVH déploiera automatiquement à chaque push sur `main`

> **Alternative FTP** (si GitHub non disponible sur l'offre) :
> - Télécharger FileZilla : https://filezilla-project.org
> - Hôte FTP : fourni par OVH dans le panel
> - Uploader tous les fichiers dans `www/`

---

## PHASE 4 — VALIDATION JURIDIQUE

- [ ] **Faire lire et valider par un juriste :**
  - `mentions-legales.html`
  - `cgv.html` (notamment : clause d'annulation, droit de rétractation, responsabilité)
  - `confidentialite.html`
  - La formulation du cadre non-médical de la pratique (sur toutes les pages)
- [ ] **CNIL** : s'assurer que la bannière cookies est conforme (consentement requis pour analytics)
- [ ] **Formspree** : vérifier la mention RGPD sous le formulaire de contact

---

## PHASE 5 — TESTS AVANT LANCEMENT

### Performance
- [ ] Tester la vitesse sur https://pagespeed.web.dev (cible : > 85/100)
- [ ] Vérifier le chargement mobile (tester avec Chrome DevTools → mode mobile)
- [ ] Vérifier que toutes les images se chargent correctement

### SEO et balisage
- [ ] Tester les données structurées sur https://search.google.com/test/rich-results
- [ ] Vérifier le sitemap sur https://kristinebarthe.fr/sitemap.xml
- [ ] Vérifier robots.txt sur https://kristinebarthe.fr/robots.txt

### Fonctionnalités
- [ ] Tester la réservation Calendly de bout en bout (créer et recevoir la confirmation)
- [ ] Tester le formulaire de contact (envoi + réception de l'email)
- [ ] Tester le toggle FALC (lecture simplifiée) sur toutes les pages
- [ ] Tester la bannière cookies (accepter / refuser)
- [ ] Tester la navigation mobile (menu hamburger)
- [ ] Tester les 30 questions FAQ (accordion)
- [ ] Tester tous les liens internes (aucun lien cassé)

### Compatibilité
- [ ] Tester sur Chrome, Firefox, Safari, Edge
- [ ] Tester sur iPhone (Safari) et Android (Chrome)

---

## PHASE 6 — RÉFÉRENCEMENT LOCAL

### Google My Business
- [ ] Créer ou revendiquer la fiche Google My Business de Kristine Barthe
  - Nom : "Kristine Barthe — Travail Transgénérationnel"
  - Catégorie : "Thérapeute" ou "Praticienne en bien-être"
  - Adresse : Castelsarrasin (82)
  - Téléphone : 07 80 17 64 03
  - Site web : https://kristinebarthe.fr
  - Horaires de travail
  - Photos (cabinet, portrait)
- [ ] Soumettre la fiche à validation Google (carte postale ou téléphone)

### Google Search Console
- [ ] Créer un compte Search Console : https://search.google.com/search-console
- [ ] Ajouter et vérifier la propriété `kristinebarthe.fr`
- [ ] Soumettre le sitemap : https://kristinebarthe.fr/sitemap.xml
- [ ] Surveiller les impressions et clics dans les 30 premiers jours

---

## PHASE 7 — SUIVI POST-LANCEMENT

### Semaine 1
- [ ] Vérifier que le site est indexé (Google : `site:kristinebarthe.fr`)
- [ ] Vérifier la réception des emails de formulaire et Calendly
- [ ] Corriger les éventuels bugs signalés

### Mois 1
- [ ] Ajouter les vrais témoignages (une fois reçus avec accord)
- [ ] Compléter le SIREN dans les mentions légales
- [ ] Publier 1 article de blog supplémentaire

### Mois 3
- [ ] Analyser les pages les plus visitées (Search Console)
- [ ] Enrichir la FAQ selon les vraies questions posées
- [ ] Envisager l'ajout d'analytics (Matomo recommandé — RGPD-friendly)

---

## RÉCAPITULATIF — Points bloquants avant mise en ligne

| Priorité | Action | Responsable |
|---|---|---|
| 🔴 BLOQUANT | Obtenir le SIREN | Kristine |
| 🔴 BLOQUANT | Configurer Calendly + tester | CCFA + Kristine |
| 🔴 BLOQUANT | Configurer Formspree | CCFA |
| 🔴 BLOQUANT | Valider les textes juridiques par un juriste | Kristine |
| 🔴 BLOQUANT | Commander le domaine kristinebarthe.fr | CCFA |
| 🟡 IMPORTANT | Vraie photo de Kristine | Kristine |
| 🟡 IMPORTANT | Adresse complète du cabinet | Kristine |
| 🟡 IMPORTANT | Témoignages avec accords écrits | Kristine |
| 🟢 SOUHAITABLE | Google My Business | Kristine + CCFA |
| 🟢 SOUHAITABLE | Search Console | CCFA |

---

## Note sur la visioconférence

Le site est d'ores et déjà configuré pour les séances en visio :

1. **Calendly** gère automatiquement l'envoi du lien visio (Zoom ou Google Meet) aux clients qui réservent un créneau visio
2. **Les deux modes** (présentiel et visio) peuvent être proposés dans le même type d'événement Calendly
3. Pour séparer les créneaux : créer 2 types d'événements Calendly ("Séance en présentiel" + "Séance en visio") et intégrer les 2 widgets dans tarifs.html

---

*Checklist réalisée par CCFA — Dernière mise à jour : juin 2025*
