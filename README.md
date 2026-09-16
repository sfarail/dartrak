# pixware.app — site de Pixware Studio

Site statique de **Pixware Studio** (Simon Farail, EI) : présentation du studio, pages des applications
(Dartrak, Grimoire, Multiplico), politiques de confidentialité, CGU, mentions légales.

- **Prod** : https://pixware.app — Cloudflare Pages, branche `main`, dossier de sortie `docs/`, aucun build.
- **Miroir historique** : https://sfarail.github.io/dartrak/ (GitHub Pages sur le même dossier ; les
  anciennes URL `legal/privacy-policy.*.html` y restent servies par des stubs qui renvoient vers pixware.app).

## Arborescence

```
docs/                    ← ce qui est publié
  index.html             accueil (FR/EN, un seul DOM, bascule sans rechargement)
  dartrak/ grimoire/ multiplico/   page projet + politiques (+ CGU pour Dartrak)
  legal/                 mentions légales, confidentialité du site, stubs des anciennes URL
  assets/{css,js,fonts,img}        zéro dépendance externe, polices auto-hébergées
  _redirects _headers    Cloudflare Pages (redirections 301, CSP, cache)
  404.html robots.txt sitemap.xml site.webmanifest
legal-src/               sources des pages légales (voir legal-src/README.md)
tools/build_legal.py     génère les pages légales depuis legal-src/
```

## Modifier

- **Contenu de l'accueil / pages projet** : éditer le HTML directement. Chaque texte existe en `<span lang="fr">` et
  `<span lang="en">` ; la langue est choisie par `assets/js/lang.js` avant le premier rendu.
- **Une politique** : modifier la source dans `legal-src/`, puis `python3 tools/build_legal.py`.
- **Effets** : `assets/js/site.js` (tout est neutralisé sous `prefers-reduced-motion`).

Aperçu local : `python3 -m http.server -d docs 8765` → http://localhost:8765
