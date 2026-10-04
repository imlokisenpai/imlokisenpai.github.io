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

**Actions → new writing → Run workflow.** Fill in the form.

Two fields are required: a title and a shelf. Everything else is optional —
leave the date blank and it files today (UTC), leave the excerpt blank and
the first paragraph is used, leave the writing blank and you get an empty
document with an edit link. Status, tags and poem mode are switches.

The `note` box takes Markdown, and the line breaks you type in it are kept.
It is written into the front matter as a `|-` block, which is the only form
that can carry them — see [Author's notes](#authors-notes).

It writes `_posts/<date>-<slug>.md`, commits it, and publishes. The front
matter is generated rather than pasted, so it cannot come out malformed,
and it refuses a duplicate filename, a title with no usable characters, or a
date that is not a real date.

From a terminal:

```sh
gh workflow run new-writing.yml \
  -f title="The Chair" -f shelf=grief \
  -f status=UNFINISHED -f tags="rooms, the kept" -f poem=true
```

Or edit a document in place at any time — the form is only a shortcut.

### By hand

Create one file in `_posts/`, named `YYYY-MM-DD-a-short-slug.md`. That is the
whole process — the catalogue, the archive numbers, the shelves, the keyword
index, the excerpt, the RSS feed and the previous/next links all follow from
it. `title` and `category` are the only two keys the archive actually needs;
`date` belongs in the filename.

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
| `note` | no | printed under the writing as **AUTHOR'S NOTE**. See below |

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

### Author's notes

`note` is a piece of Markdown printed under the writing, beside a rule and a
small label. It is meant for the things a reader would not get from the piece
itself: what it is really about, or what you left out on purpose.

```
---
note: |-
  A note with **bold**, *italic* and [a link](https://example.com).

  A second paragraph, after a blank line.
---
```

It works the way the poems do. Line breaks are kept as they were typed, a blank
line is a paragraph break, and Markdown is rendered, so `**bold**` is bold.

**Write it as a `|-` block.** This is the one piece of front matter where the
obvious thing is quietly wrong: a note in double quotes spread over several
lines comes out as one run-on sentence. YAML treats a line break inside quotes
as a space — it is folding, not a newline — so the lines are lost before the
page ever sees them:

```yaml
note: "To love is to leave the door open,
knowing someone may enter
with the key to your wounds."   # -> one line. All three lines become one.
```

Use `|-` instead. The form does this for you: type the note into the `note`
box, line breaks and all, and the workflow writes it as a `|-` block.

## Add a photograph

`/elsewhere/` is the photographs. There is nothing to configure.

**To add one, drop the file into `assets/img/plates/` and commit.** Every
`.jpg`, `.jpeg`, `.png` or `.webp` in that folder is listed on the page,
numbered in filename order. Name the file `01-`, `02-`, `03-` and the order
is the order they were taken. That is the whole procedure.

To put words under a photograph, add it to `_data/plates.yml` as well:

```yaml
- src: assets/img/plates/01-rome-kitchen.jpg
  caption: The window in the flat, early morning.
  place: Rome
  when: autumn 2024
```

`caption` is one line of Markdown and it becomes the alt text, so write it
for someone who cannot see the photograph. `place` and `when` are optional
and print on a second line in the small mono type. **Once that file lists
anything, it is the only thing shown** — the folder is not consulted again,
so keep the list complete.

Two things worth doing to a photograph before committing it:

- **Resize it.** Long edge about 1600px, progressive JPEG, roughly
  300–500KB. Pages serves the file you commit, with no resizing and no
  thumbnails, and it loads every one of them on the page.
- **Strip the location data.** A phone photograph carries the exact spot it
  was taken, in the file, and this is a public site. Most phones can be told
  not to save it; if the file already has it, strip it before committing.

The photographs are the only colour in the archive, so they are mounted
rather than displayed: a hairline mat, a number, a caption, and slightly
held-back saturation until a reader goes looking. Clicking one opens it full
size; without JavaScript the link simply opens the image.

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
_data/           shelf names and notes, navigation, the hero line, plates
_includes/       seal, catalogue row, archive number, one plate, chrome
_layouts/        default, page, post, shelf
_pages/          the standalone pages (opted in via `include:` in _config.yml)
  category/      one file per shelf
_posts/          the writings themselves
_sass/           one partial per area; assets/css/main.scss just @use's them
assets/          the stylesheet entry point, scripts, the favicon
  img/plates/    drop a photograph here and it appears on /elsewhere/
.github/         the workflow that builds and deploys
```

## Dependencies

Four gems, all of which GitHub Pages itself uses: `jekyll`, `jekyll-feed`,
`jekyll-seo-tag`, `jekyll-sitemap`. There is no JavaScript framework, no web
font, no analytics and no third-party request.

Two scripts, both enhancements rather than requirements.
`assets/js/archive.js` filters the catalogue and `assets/js/plates.js` opens
a photograph full size; every plate is an ordinary link to the image, so the
site is complete without either file.

## Editing the design

`_sass/_tokens.scss` holds the palette, the type stacks and the spacing
scale. Every colour used for text there was measured against the background
it sits on and meets WCAG AA; the ones below that are for rules and rules
only. The seven category moods are at the bottom of the same file.
