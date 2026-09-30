---
layout: page
title: Colophon
permalink: /colophon/
subtitle: How this box was assembled, and why it looks the way it does.
handwritten: written on the inside of the cover, in a different hand
description: >-
  The RESTLESS SOUL archive: how the numbers work, how the shelves work,
  what a status means, and how to file something new.
---

## What this is

A private archive of writing that was never intended to be read by anyone,
least of all by the person who wrote it. It is filed, numbered and stamped
because filing was the only way it stayed manageable &mdash; not because
filing makes it finished.

Nothing has been edited for an audience. Where a sentence stops, it stops.
Where a page is blank, the page is blank.

## The numbering

Every document is stamped `ARCHIVE 000`. The number is **not** typed into the
writing &mdash; it is generated from the order of the documents themselves,
oldest first. That means:

- ARCHIVE 001 is the oldest writing in the box.
- Numbers never shift, as long as the dates are not rewritten.
- Adding a new writing changes nothing about the existing numbers.

If you file a new document dated earlier than everything else, it becomes
ARCHIVE 001 and every other document shifts up. That is the only thing that
can renumber the archive.

## The seven shelves

Documents are filed by **category** in the front matter, using one of:

`love` &middot; `grief` &middot; `anger` &middot; `existential` &middot; `dreams` &middot; `unfinished` &middot; `fragments`

Each shelf carries a small visual variation &mdash; a different paper tone, a
different mark &mdash; but they are all the same archive. A category that is
not on this list still works; it simply gets the default look.

## Status

`status` is a free-text stamp on the document, set by hand, meaning whatever
the author decided it meant. It has been used here for things like
`UNRESOLVED`, `UNFINISHED`, `RECANTED`, `SENT`, `NEVER SENT`, `FIRST DRAFT`.
It is optional. Not every document has one.

## Filing something new

Create one Markdown file in `_posts`, named `YYYY-MM-DD-a-short-slug.md`.
That is the whole process &mdash; the catalogue, the shelves, the numbers, the
keywords and the previous/next links all follow from it.

```yaml
---
title: "The Last Trick"
date: 2025-03-12 09:00:00 +0000
category: existential
status: unresolved
tags: [freedom, philosophy]
excerpt: "Perhaps freedom was never the absence of chains..."
poem: true        # keeps your line breaks without trailing spaces
note: "Written the morning after."
---
```

Then write. If `poem: true` is set, single newlines are kept as line breaks
and stanza breaks are blank lines. If it is left off, the text is treated as
ordinary prose.

## How it was built

Jekyll, plain CSS, and roughly one kilobyte of JavaScript that only ever
filters the catalogue. No trackers, no fonts fetched from anyone, no
analytics, no cookies. The build runs in GitHub Actions; push to `main` and
the site is rebuilt and published.
