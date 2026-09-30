# RESTLESS SOUL

*Fragments from a mind that never learned to be quiet.*

A private literary archive: poems, monologues, letters and unfinished
thoughts, filed by number. Jekyll, plain CSS, one small script. Built and
published by GitHub Actions.

---

## Publish it

The site is built in CI, not on your machine. There is nothing to install
locally.

1. Create an empty repository on GitHub and push this one:

   ```sh
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```

2. In the repository: **Settings → Pages → Source → GitHub Actions**.

3. The first push builds the site and publishes it at
   `https://<you>.github.io/<repo>/`. Every later push to `main` replaces it.

If the workflow fails, the log is on the Actions tab. The build is
`bundle exec jekyll build`, so any error in a post or layout shows up there
with the file and line.

## Add a writing

Create one file in `_posts/`, named `YYYY-MM-DD-a-short-slug.md`. That is the
whole process — the catalogue, the archive numbers, the shelves, the keyword
index, the excerpt, the RSS feed and the previous/next links all follow from
it.

```yaml
---
title: "The Last Trick"
date: 2025-03-12 09:00:00 +0000
category: existential
status: unresolved
tags: [freedom, philosophy]
excerpt: "Perhaps freedom was never the absence of chains..."
poem: true
note: "Written the morning after."
---

the body of the writing
```

| key | required | what it does |
| --- | --- | --- |
| `title` | yes | the title of the document |
| `date` | yes | filing date; also the URL. Always write it in UTC with `+0000` |
| `category` | yes | one of `love` `grief` `anger` `existential` `dreams` `unfinished` `fragments` |
| `status` | no | any free text: `UNRESOLVED`, `RECANTED`, `NEVER SENT`, `FIRST DRAFT`… |
| `tags` | no | any words. They get an anchor on `/tags/` automatically |
| `excerpt` | no | the catalogue line. The first paragraph is used if you leave it out |
| `poem` | no | `true` keeps your line breaks and indentation. See below |
| `note` | no | printed under the writing as **AUTHOR'S NOTE** |

### Poems

Set `poem: true`. A single newline stays a line break, indentation is kept,
and a blank line is a stanza break. No trailing spaces, no `<br>`, no
`&nbsp;`:

```
---
poem: true
---

one chair, borrowed
one cup with a chip that catches the lip

six weeks of dust
arranged by someone
```

Leave `poem` off and the text is rendered as ordinary prose, where a single
newline is just a space.

## How the numbering works

`ARCHIVE 000` is not written anywhere. It is derived from the order of the
posts, oldest first, in `_includes/archive_number.html`. So:

- `ARCHIVE 001` is the oldest writing, always.
- Adding a document at the end changes no existing number.
- The only thing that renumbers the archive is filing a document dated
  *earlier* than everything already in the box.

The `entry--plate` catalogue, the shelf pages and the previous/next links all
use the same include, so they cannot disagree with each other.

## How categories work

`category:` in the front matter puts a document on a shelf. The seven shelves
are declared in `_data/categories.yml`, which holds each shelf's display
name, its one-line note, and the `mood` that shifts its paper tone, its mark
and its accent by a small amount. Same archive, opened differently.

Each shelf has a page in `_pages/category/<slug>.html` — six lines of front
matter each, because **Jekyll 4 no longer generates category pages** and
GitHub Pages will not run a plugin to do it. A new shelf needs one more file
in that folder, plus an entry in `_data/categories.yml`. A category used in a
post but not declared still counts correctly on `/categories/`; it simply
gets no shelf page and no link.

`/categories/` shows every declared shelf with its count, including empty
ones.

## How tags work

Tags are free text and unbounded, so they do not get pages. `/tags/` lists
every tag as an anchored section, and each tag link on a document points at
its anchor. Everything is generated from `site.tags`; nothing is listed by
hand.

## Layout of the repository

```
_data/           shelf names and notes, navigation, the hero line
_includes/       seal, catalogue row, archive number, previous/next, chrome
_layouts/        default, page, post, shelf
_pages/          the standalone pages (opted in via `include:` in _config.yml)
  category/      one file per shelf
_posts/          the writings themselves
_sass/           one partial per area; assets/css/main.scss just @use's them
assets/          the stylesheet entry point, one script, the favicon
.github/         the workflow that builds and deploys
```

## Dependencies

Four gems, all of which GitHub Pages itself uses: `jekyll`, `jekyll-feed`,
`jekyll-seo-tag`, `jekyll-sitemap`. There is no JavaScript framework, no web
font, no analytics and no third-party request. The only script is
`assets/js/archive.js`, which filters the catalogue; the site is fully
readable without it.

## Editing the design

`_sass/_tokens.scss` holds the palette, the type stacks and the spacing
scale. Every colour used for text there was measured against the background
it sits on and meets WCAG AA; the ones below that are for rules and rules
only. The seven category moods are at the bottom of the same file.
