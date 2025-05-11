---
layout: page
title: Codex
---

<section>
  {% assign codex_entries = site.codex | sort: 'date' | reverse %}
  {% if codex_entries[0] %}

    {% capture currentyear %}{{ 'now' | date: "%Y" }}{% endcapture %}
    {% capture firstentryyear %}{{ codex_entries[0].date | date: '%Y' }}{% endcapture %}
    {% if currentyear == firstentryyear %}
        <h3>This year's entries</h3>
    {% else %}  
        <h3>{{ firstentryyear }}</h3>
    {% endif %}

    {% for entry in codex_entries %}
      {% assign next = codex_entries[forloop.index] %}
      {% unless next %}
        <ul>
      {% else %}
        {% capture year %}{{ entry.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ next.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
          </ul>
          <h3>{{ entry.date | date: '%Y' }}</h3>
          <ul>
        {% endif %}
      {% endunless %}
        <li><time>{{ entry.date | date:"%d %b" }} - </time>
          <a href="{{ entry.url | relative_url }}">
            {{ entry.title }}
          </a>
        </li>
    {% endfor %}
    </ul>

  {% endif %}
</section>
