#!/usr/bin/env python3
"""Génère les pages légales de pixware.app depuis legal-src/ dans l'habillage du site.

    python3 tools/build_legal.py

Markdown → HTML via `npx marked@15` (node requis). Les fragments HTML sont insérés tels quels.
"""
import re, subprocess, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT, SITE = ROOT / "legal-src", ROOT / "docs", "https://pixware.app"

DATE = {"fr": "16 septembre 2026", "en": "16 September 2026", "de": "16. September 2026",
        "es": "16 de septiembre de 2026", "it": "16 settembre 2026", "pt": "16 de setembro de 2026"}
UPD = {"fr": "Dernière mise à jour", "en": "Last updated", "de": "Zuletzt aktualisiert",
       "es": "Última actualización", "it": "Ultimo aggiornamento", "pt": "Última atualização"}
LANGNAME = {"fr": "Français", "en": "English", "de": "Deutsch", "es": "Español", "it": "Italiano", "pt": "Português"}
SKIP = {"fr": "Aller au contenu", "en": "Skip to content", "de": "Zum Inhalt springen",
        "es": "Ir al contenido", "it": "Vai al contenuto", "pt": "Ir para o conteúdo"}
UI = {
    "fr": dict(home="Accueil", legal="Mentions légales", privacy="Confidentialité du site", policies="Politiques des apps",
               desc="Studio indépendant d'applications mobiles local-first, immatriculé en France.",
               langs="Autres langues"),
    "en": dict(home="Home", legal="Legal notice", privacy="Website privacy", policies="App policies",
               desc="Independent studio building local-first mobile apps, registered in France.",
               langs="Other languages"),
}

def marked(md: str) -> str:
    return subprocess.run(["npx", "--yes", "marked@15", "--gfm"], input=md, capture_output=True, text=True, check=True).stdout

def bi(fr, en):  # texte bilingue (pages à bascule)
    return f'<span lang="fr">{fr}</span><span lang="en">{en}</span>'

def shell(*, lang, langs, toggle, title, desc, canonical, alternates, eyebrow, h1, updated, lang_links, crumbs, body,
          title_en=None):
    ui = UI["fr" if lang == "fr" else "en"]
    T = lambda fr, en: bi(fr, en) if toggle else (fr if lang == "fr" else en)
    html_attrs = f'lang="{lang}" data-langs="{",".join(langs)}"'
    if toggle:
        html_attrs += f' data-lang="{lang}" data-title-fr="{title}" data-title-en="{title_en}"'
    alt = "".join(f'\n  <link rel="alternate" hreflang="{l}" href="{SITE}{h}">' for l, h in alternates)
    switch = ('<div class="lang-switch" role="group" aria-label="Langue / Language">'
              '<button type="button" data-lang-btn="fr" aria-pressed="true">FR</button>'
              '<button type="button" data-lang-btn="en" aria-pressed="false">EN</button></div>') if toggle else ""
    crumbs_html = ' <i></i> '.join(f'<a href="{h}">{t}</a>' if h else f"<span>{t}</span>" for t, h in crumbs)
    links_html = "".join(f'<span title="{LANGNAME[l]}">{l.upper()}</span>' if l == lang
                         else f'<a href="{h}" hreflang="{l}" title="{LANGNAME[l]}">{l.upper()}</a>' for l, h in lang_links)
    return f"""<!DOCTYPE html>
<html {html_attrs}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#06060A">
  <link rel="canonical" href="{SITE}{canonical}">{alt}
  <link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="../assets/img/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">
  <meta property="og:type" content="article"><meta property="og:site_name" content="Pixware Studio">
  <meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
  <meta property="og:url" content="{SITE}{canonical}"><meta property="og:image" content="{SITE}/assets/img/og.png">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/legal.css">
  <script src="../assets/js/lang.js"></script>
  <script src="../assets/js/site.js" defer></script>
</head>
<body>
  <a class="sr-only" href="#main">{bi(SKIP["fr"], SKIP["en"]) if toggle else SKIP.get(lang, SKIP["en"])}</a>
  <div id="progress" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="../" aria-label="Pixware Studio"><svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><rect class="px" style="--i:0;--dx:-2;--dy:-1" x="4" y="4" width="13" height="13" rx="2.5"/><rect class="px" style="--i:1;--dx:0;--dy:-2" x="19" y="4" width="13" height="13" rx="2.5"/><rect class="px" style="--i:2;--dx:2;--dy:-1" x="34" y="4" width="13" height="13" rx="2.5"/><rect class="px" style="--i:3;--dx:-2;--dy:0" x="4" y="19" width="13" height="13" rx="2.5"/><rect class="px" style="--i:4;--dx:2;--dy:0" x="47" y="19" width="13" height="13" rx="2.5"/><rect class="px" style="--i:5;--dx:-2;--dy:1" x="4" y="34" width="13" height="13" rx="2.5"/><rect class="px" style="--i:6;--dx:0;--dy:2" x="19" y="34" width="13" height="13" rx="2.5"/><rect class="px" style="--i:7;--dx:2;--dy:1" x="34" y="34" width="13" height="13" rx="2.5"/><rect class="px" style="--i:8;--dx:-1;--dy:2" x="4" y="49" width="13" height="13" rx="2.5"/><rect class="px lime" style="--i:9;--dx:1;--dy:2" x="47" y="49" width="13" height="13" rx="2.5"/></svg><span class="brand-word" aria-hidden="true"><span class="brand-pix"><i>P</i><i>i</i><i>x</i><i>w</i><i>a</i><i>r</i><i>e</i></span><span class="brand-studio"><i>S</i><i>t</i><i>u</i><i>d</i><i>i</i><i>o</i></span></span><span class="brand-scan" aria-hidden="true"></span></a>
    <nav class="site-nav" id="site-nav" aria-label="Navigation"><ul>
      <li><a href="../#studio">Studio</a></li><li><a href="../#apps">Apps</a></li><li><a href="../#documents">Documents</a></li><li><a href="../#contact">Contact</a></li>
    </ul></nav>
    <div class="header-right">{switch}<button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span></button></div>
  </header>
  <main id="main" class="legal-wrap">
    <nav class="legal-crumbs" aria-label="Fil d'Ariane">{crumbs_html}</nav>
    <header class="legal-head">
      <p class="eyebrow">{eyebrow}</p>
      <h1>{h1}</h1>
      <div class="legal-meta"><span class="updated">{updated}</span><nav class="lang-links" aria-label="{ui['langs']}">{links_html}</nav></div>
    </header>
    <article class="legal">
{body}
    </article>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-brand reveal" aria-hidden="true"><div class="footer-giant">PIXWARE</div><div class="footer-studio"><span>Studio</span></div></div>
      <div class="footer-cols">
        <div class="footer-col"><h4>Pixware Studio</h4><p>{T(UI['fr']['desc'], UI['en']['desc'])}</p></div>
        <div class="footer-col"><h4>Apps</h4><ul><li><a href="../dartrak/">Dartrak</a></li><li><a href="../grimoire/">Grimoire</a></li><li><a href="../multiplico/">Multiplico</a></li></ul></div>
        <div class="footer-col"><h4>Documents</h4><ul>
          <li><a href="../legal/mentions-legales.html">{T(UI['fr']['legal'], UI['en']['legal'])}</a></li>
          <li><a href="../legal/confidentialite.html">{T(UI['fr']['privacy'], UI['en']['privacy'])}</a></li>
          <li><a href="../#documents">{T(UI['fr']['policies'], UI['en']['policies'])}</a></li>
        </ul></div>
        <div class="footer-col"><h4>Contact</h4><ul><li><a href="mailto:contact@pixware.app">contact@pixware.app</a></li><li><a href="mailto:support@pixware.app">support@pixware.app</a></li><li><a href="mailto:privacy@pixware.app">privacy@pixware.app</a></li></ul></div>
      </div>
      <div class="footer-legal">
        <span>© 2026 Pixware Studio · <a href="../legal/mentions-legales.html">{T(UI['fr']['legal'], UI['en']['legal'])}</a></span>
        <span>France · <a href="https://pixware.app">pixware.app</a></span>
      </div>
    </div>
  </footer>
</body>
</html>
"""

def write(rel, html):
    p = OUT / rel; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(html); print(f"  {rel:48s} {len(html):6d} B")

def strip_md_head(md):
    """Retire commentaire HTML d'en-tête, le titre `# …` et la ligne de date ; renvoie (titre, corps)."""
    md = re.sub(r"\A\s*<!--.*?-->\s*", "", md, flags=re.S)
    title = re.search(r"^# (.+)$", md, re.M).group(1).strip()
    md = re.sub(r"^# .+\n", "", md, count=1, flags=re.M)
    md = re.sub(r"^(\*\*|_)(Dernière mise à jour|Last updated|Zuletzt aktualisiert|Última actualización|Ultimo aggiornamento|Última atualização)[^\n]*\n", "", md, count=1, flags=re.M)
    return title, md.strip()

# ───────────────────────────── Dartrak ─────────────────────────────
print("Dartrak")
crumb_home = lambda l: ("Accueil" if l == "fr" else "Home", "../")
for l in ("fr", "en"):
    s = (SRC / "dartrak" / f"privacy-policy.{l}.html").read_text()
    inner = re.search(r'<div class="wrap">(.*)</div>\s*</body>', s, re.S).group(1)
    inner = re.sub(r'<p class="lang">.*?</p>\s*', "", inner, flags=re.S)
    h1 = re.search(r"<h1>(.*?)</h1>", inner, re.S).group(1); inner = re.sub(r"<h1>.*?</h1>\s*", "", inner, count=1, flags=re.S)
    upd = re.search(r'<p class="updated">(.*?)</p>', inner, re.S).group(1); inner = re.sub(r'<p class="updated">.*?</p>\s*', "", inner, count=1, flags=re.S)
    inner = inner.replace(f"{SITE}/legal/mentions-legales.html", "../legal/mentions-legales.html")
    links = [(x, f"privacy-policy.{x}.html") for x in ("fr", "en")]
    write(f"dartrak/privacy-policy.{l}.html", shell(
        lang=l, langs=[l], toggle=False, title=f"{h1} · Pixware Studio",
        desc="Politique de confidentialité de l'application Dartrak (compteur de fléchettes local-first)." if l == "fr" else "Privacy policy of the Dartrak app (local-first darts scorer).",
        canonical=f"/dartrak/privacy-policy.{l}.html", alternates=[(x, f"/dartrak/privacy-policy.{x}.html") for x in ("fr", "en")],
        eyebrow="Dartrak · Pixware Studio", h1=h1, updated=upd, lang_links=links,
        crumbs=[crumb_home(l), ("Dartrak", "./"), ("Politique de confidentialité" if l == "fr" else "Privacy policy", None)], body=inner.strip()))
for l in ("fr", "en"):
    title, md = strip_md_head((SRC / "dartrak" / f"terms-of-service.{l}.md").read_text())
    body = marked(md).replace(f"{SITE}/legal/mentions-legales.html", "../legal/mentions-legales.html").replace(f"{SITE}/dartrak/", "")
    links = [(x, f"terms-of-service.{x}.html") for x in ("fr", "en")]
    write(f"dartrak/terms-of-service.{l}.html", shell(
        lang=l, langs=[l], toggle=False, title=f"{title} · Pixware Studio",
        desc="Conditions d'utilisation et licence (CGU / EULA) de l'application Dartrak." if l == "fr" else "Terms of Service and End-User License Agreement of the Dartrak app.",
        canonical=f"/dartrak/terms-of-service.{l}.html", alternates=[(x, f"/dartrak/terms-of-service.{x}.html") for x in ("fr", "en")],
        eyebrow="Dartrak · Pixware Studio", h1=title, updated=f"{UPD[l]} : {DATE[l]}" if l == "fr" else f"{UPD[l]}: {DATE[l]}", lang_links=links,
        crumbs=[crumb_home(l), ("Dartrak", "./"), ("Conditions d'utilisation" if l == "fr" else "Terms of service", None)], body=body.strip()))

# ───────────────────────────── Grimoire ─────────────────────────────
print("Grimoire")
for l in ("fr", "en"):
    body = (SRC / "grimoire" / f"privacy-policy.{l}.html").read_text().strip()
    h1 = "Politique de confidentialité — Grimoire" if l == "fr" else "Privacy Policy — Grimoire"
    write(f"grimoire/privacy-policy.{l}.html", shell(
        lang=l, langs=[l], toggle=False, title=f"{h1} · Pixware Studio",
        desc="Politique de confidentialité de l'application Grimoire (livre de recettes local-first)." if l == "fr" else "Privacy policy of the Grimoire app (local-first cookbook).",
        canonical=f"/grimoire/privacy-policy.{l}.html", alternates=[(x, f"/grimoire/privacy-policy.{x}.html") for x in ("fr", "en")],
        eyebrow="Grimoire · Pixware Studio", h1=h1, updated=f"{UPD[l]} : {DATE[l]}" if l == "fr" else f"{UPD[l]}: {DATE[l]}",
        lang_links=[(x, f"privacy-policy.{x}.html") for x in ("fr", "en")],
        crumbs=[crumb_home(l), ("Grimoire", "./"), ("Politique de confidentialité" if l == "fr" else "Privacy policy", None)], body=body))

# ───────────────────────────── Multiplico ─────────────────────────────
print("Multiplico")
ML = ["fr", "en", "de", "es", "it", "pt"]
MDESC = {"fr": "Politique de confidentialité de l'application Multiplico (tables de multiplication, 7-9 ans).",
         "en": "Privacy policy of the Multiplico app (times tables, ages 7-9).",
         "de": "Datenschutzerklärung der App Multiplico (Einmaleins, 7-9 Jahre).",
         "es": "Política de privacidad de la aplicación Multiplico (tablas de multiplicar, 7-9 años).",
         "it": "Informativa sulla privacy dell'app Multiplico (tabelline, 7-9 anni).",
         "pt": "Política de privacidade da aplicação Multiplico (tabuada, 7-9 anos)."}
MCRUMB = {"fr": "Politique de confidentialité", "en": "Privacy policy", "de": "Datenschutzerklärung",
          "es": "Política de privacidad", "it": "Informativa sulla privacy", "pt": "Política de privacidade"}
for l in ML:
    raw = (SRC / "multiplico" / f"privacy-policy.{l}.md").read_text()
    title, md = strip_md_head(raw)
    sep = " : " if l == "fr" else ": "
    write(f"multiplico/privacy-policy.{l}.html", shell(
        lang=l, langs=[l], toggle=False, title=f"{title} · Pixware Studio", desc=MDESC[l],
        canonical=f"/multiplico/privacy-policy.{l}.html", alternates=[(x, f"/multiplico/privacy-policy.{x}.html") for x in ML],
        eyebrow="Multiplico · Pixware Studio", h1=title, updated=f"{UPD[l]}{sep}{DATE[l]}",
        lang_links=[(x, f"privacy-policy.{x}.html") for x in ML],
        crumbs=[("Accueil" if l == "fr" else "Home", "../"), ("Multiplico", "./"), (MCRUMB[l], None)], body=marked(md).strip()))

# ───────────────────────────── Site ─────────────────────────────
print("Site")
write("legal/mentions-legales.html", shell(
    lang="fr", langs=["fr"], toggle=False, title="Mentions légales · Pixware Studio",
    desc="Mentions légales du site pixware.app — Pixware Studio, Simon Farail, entrepreneur individuel (SIRET 513 691 238 00044).",
    canonical="/legal/mentions-legales.html", alternates=[], eyebrow="pixware.app", h1="Mentions légales",
    updated=f"{UPD['fr']} : {DATE['fr']}", lang_links=[("fr", "mentions-legales.html")],
    crumbs=[("Accueil", "../"), ("Mentions légales", None)], body=(SRC / "site" / "mentions-legales.fr.html").read_text().strip()))
write("legal/confidentialite.html", shell(
    lang="fr", langs=["fr", "en"], toggle=True, title="Politique de confidentialité du site · Pixware Studio",
    title_en="Website privacy policy · Pixware Studio",
    desc="Politique de confidentialité du site pixware.app : aucun cookie, aucune mesure d'audience, journaux techniques de l'hébergeur, e-mails.",
    canonical="/legal/confidentialite.html", alternates=[("fr", "/legal/confidentialite.html"), ("en", "/legal/confidentialite.html")],
    eyebrow="pixware.app", h1=bi("Politique de confidentialité du site", "Website privacy policy"),
    updated=bi(f"{UPD['fr']} : {DATE['fr']}", f"{UPD['en']}: {DATE['en']}"), lang_links=[],
    crumbs=[(bi("Accueil", "Home"), "../"), (bi("Confidentialité du site", "Website privacy"), None)],
    body=(SRC / "site" / "confidentialite.html").read_text().strip()))
print("OK")
