#!/usr/bin/env python3
"""Build/check the EU and US privacy site. No network access or deployment.

--release rejects drafts and unresolved placeholders; it is not legal review.
Requires Python 3.10+; uses only the standard library.
"""
import argparse
import html
import posixpath
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT
LANGUAGES = {"de": "Deutsch", "en": "English", "fr": "Français", "ko": "한국어", "ja": "日本語"}
POLICIES = [("eu", lang, label) for lang, label in LANGUAGES.items()] + [("us", "en", "English")]
PLACEHOLDER = re.compile(r"\[[A-Z][A-Z0-9_]+\]")
DRAFT = re.compile(r"ENTWURF|DRAFT|BROUILLON|초안|草案")


def inline(text):
    # HTML is escaped; only explicit HTTPS Markdown links are supported.
    parts = []
    position = 0
    for match in re.finditer(r"\[([^\]\n]+)\]\((https://[^\s)]+)\)", text):
        parts.append(html.escape(text[position:match.start()]))
        parts.append(f'<a href="{html.escape(match[2], quote=True)}" rel="noreferrer">{html.escape(match[1])}</a>')
        position = match.end()
    parts.append(html.escape(text[position:]))
    return "".join(parts)


def body(markdown):
    output = []
    for block in markdown.strip().split("\n\n"):
        if block.startswith("## "):
            output.append(f"<h2>{inline(block[3:])}</h2>")
        elif block.startswith("# "):
            output.append(f"<h1>{inline(block[2:])}</h1>")
        else:
            cls = ' class="draft"' if DRAFT.search(block) else ""
            output.append(f"<p{cls}>{inline(block)}</p>")
    return "\n".join(output)


def relative(page, target):
    value = posixpath.relpath(target, posixpath.dirname(page) or ".")
    return (value[:-10] or "./") if value.endswith("index.html") else value


def document(page, lang, title, content):
    links = [f'<a href="{relative(page, "index.html")}">Overview</a>']
    for region, code, label in POLICIES:
        target = f"privacy/{region}/{code}/index.html"
        current = ' aria-current="page"' if target == page else ""
        links.append(f'<a href="{relative(page, target)}" lang="{code}"{current}>{region.upper()} · {label}</a>')
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>{html.escape(title)}</title>
<link rel="stylesheet" href="{relative(page, 'style.css')}">
</head>
<body><header><nav aria-label="Region and language">{' | '.join(links)}</nav></header>
<main>{content}</main></body></html>
'''


class LinkAudit(HTMLParser):
    def __init__(self, page, files):
        super().__init__()
        self.page, self.files = page, files

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "iframe", "object", "form", "img"}:
            raise ValueError(f"Unexpected embedded content: {self.page}: {tag}")
        for key, value in attrs:
            if key not in {"href", "src"}:
                continue
            if value.startswith("https://"):
                if tag != "a":
                    raise ValueError(f"External resource: {value}")
                continue
            if value.startswith("/") or ":" in value:
                raise ValueError(f"Link is not portable: {value}")
            target = posixpath.normpath(posixpath.join(posixpath.dirname(self.page), value))
            if value.endswith("/"):
                target = posixpath.join(target, "index.html")
            target = posixpath.normpath(target)
            if target not in self.files:
                raise ValueError(f"Broken local link: {self.page} → {target}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verify generated files and navigation without writing")
    parser.add_argument("--release", action="store_true", help="Reject drafts and unresolved fields")
    args = parser.parse_args()
    expected, unresolved = {}, []
    for region, lang, label in POLICIES:
        source = ROOT / f"policies/{region}/privacy.{lang}.md"
        markdown = source.read_text(encoding="utf-8")
        markers = sorted(set(PLACEHOLDER.findall(markdown)))
        if markers or DRAFT.search(markdown):
            unresolved.append(f"{source.relative_to(ROOT)}: {len(markers)} open fields / draft")
        title = markdown.splitlines()[0].removeprefix("# ")
        page = f"privacy/{region}/{lang}/index.html"
        expected[page] = document(page, lang, title, body(markdown))
    if args.release and unresolved:
        parser.exit(1, "Publication blocked: complete and review EU and US notices.\n" + "\n".join(unresolved) + "\n")
    for page, region in (("index.html", None), ("privacy/index.html", None),
                         ("privacy/eu/index.html", "eu"), ("privacy/us/index.html", "us")):
        content = '<h1>PocketGotchi — Privacy notices</h1>'
        content += '<p>Choose a regional notice and language. This choice does not limit your legal rights.</p>'
        if unresolved:
            content += '<p class="draft">ENTWURF / DRAFT / BROUILLON / 초안 / 草案</p>'
        content += "<ul>"
        for area, lang, label in POLICIES:
            if region is None or area == region:
                target = f"privacy/{area}/{lang}/index.html"
                content += f'<li><a href="{relative(page, target)}" lang="{lang}">{area.upper()} · {label}</a></li>'
        content += "</ul>"
        expected[page] = document(page, "en", "PocketGotchi — Privacy notices", content)
    files = set(expected) | {"style.css", ".nojekyll"}
    for name, content in expected.items():
        audit = LinkAudit(name, files)
        audit.feed(content)
        audit.close()
        path = PUBLIC / name
        if args.check:
            if not path.exists() or path.read_text(encoding="utf-8") != content:
                parser.exit(1, f"Outdated HTML: {name}; run python3 tools/build_privacy_site.py\n")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
    for asset in ("style.css", ".nojekyll"):
        if not (PUBLIC / asset).is_file():
            parser.exit(1, f"Missing static asset: {asset}\n")
    actual = {str(p.relative_to(PUBLIC)) for p in (PUBLIC / "privacy").rglob("*") if p.is_file()}
    actual |= {asset for asset in ("index.html", "style.css", ".nojekyll") if (PUBLIC / asset).is_file()}
    if actual != files:
        parser.exit(1, f"Unexpected website files: {sorted(actual - files)}\n")
    print(f"PASS: {len(POLICIES)} notices, {len(expected)} HTML pages; relative navigation checked. " +
          ("DRAFT — not ready to publish." if unresolved else "Completeness checked; legal review remains separate."))


if __name__ == "__main__":
    main()
