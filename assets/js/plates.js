/* --------------------------------------------------------------------------
   plate view — opens a photograph full size without leaving the page.

   Progressive: every plate is an ordinary link to the full image, so with
   this file absent the browser simply shows the photograph. Nothing here
   is required to read the page.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var gallery = document.querySelector("[data-plates]");
  if (!gallery) return;

  var links = Array.prototype.slice.call(gallery.querySelectorAll("[data-plate]"));
  if (!links.length) return;

  var dialog = document.createElement("dialog");
  dialog.className = "plateview";
  dialog.innerHTML =
    '<div class="plateview__frame">' +
    '<button type="button" class="plateview__close" aria-label="close">close</button>' +
    '<img class="plateview__img" alt="">' +
    '<p class="plateview__caption" hidden>' +
    '<span class="plateview__no meta"></span>' +
    '<span class="plateview__text"></span>' +
    '<span class="plateview__where meta"></span>' +
    "</p>" +
    "</div>";
  document.body.appendChild(dialog);

  var img = dialog.querySelector(".plateview__img");
  var caption = dialog.querySelector(".plateview__caption");
  var no = dialog.querySelector(".plateview__no");
  var text = dialog.querySelector(".plateview__text");
  var where = dialog.querySelector(".plateview__where");
  var close = dialog.querySelector(".plateview__close");
  var opener = null;

  function open(link) {
    opener = link;

    var figure = link.closest(".plate__figure");
    var captionEl = figure ? figure.querySelector(".plate__caption") : null;

    img.src = link.getAttribute("href");
    img.alt = (link.querySelector("img") || {}).alt || "";

    var parts = [];
    if (captionEl) {
      var numEl = captionEl.querySelector(".plate__no");
      var textEl = captionEl.querySelector(".plate__text");
      var whereEl = captionEl.querySelector(".plate__where");
      if (numEl) parts.push(numEl.textContent.trim());
      if (textEl) parts.push(textEl.textContent.trim());
      no.textContent = parts.length ? parts[0] : "";
      text.textContent = textEl ? textEl.textContent.trim() : "";
      where.textContent = whereEl ? whereEl.textContent.trim() : "";
    }

    caption.hidden = !(no.textContent || text.textContent || where.textContent);

    if (typeof dialog.showModal === "function") dialog.showModal();
    else window.open(link.getAttribute("href"), "_blank", "noopener");
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      /* no JS features, no hijack: let the browser open the file */
      if (typeof dialog.showModal !== "function") return;
      /* a modified click means the reader asked for a new tab */
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      open(link);
    });
  });

  close.addEventListener("click", function () { dialog.close(); });

  /* clicking the backdrop closes; clicking the photograph does not */
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    img.removeAttribute("src");
    if (opener) opener.focus();
  });
})();