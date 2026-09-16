# legal-src — sources des pages légales de pixware.app

`python3 tools/build_legal.py` régénère `docs/**/privacy-policy.*.html`, `docs/dartrak/terms-of-service.*.html`,
`docs/legal/mentions-legales.html` et `docs/legal/confidentialite.html` (nécessite `node`/`npx` pour `marked`).

| Dossier | Provenance | Format |
| --- | --- | --- |
| `dartrak/` | copie de `dartrak/docs/legal/` (repo git.smile.fr) — **source de vérité côté app** | HTML complet (on extrait `.wrap`) + Markdown (CGU) |
| `multiplico/` | copie de `multiplication/docs/legal/`, e-mail remplacé par `privacy@pixware.app`, date bumpée | Markdown, 6 langues |
| `grimoire/` | rédigé ici (aucune politique n'existait dans le repo) | fragment HTML (corps seul) |
| `site/` | mentions légales + confidentialité du site pixware.app | fragment HTML |

Quand une politique change côté app : recopier le fichier ici, relancer le build, vérifier le diff dans `docs/`.
