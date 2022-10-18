---
title: just a experiment
published: true
---
<li><time>{{ post.date | date:"%d %b" }} - </time>
      <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
