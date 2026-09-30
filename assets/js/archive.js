/* --------------------------------------------------------------------------
   archive filter — the only JavaScript in the site.
   Progressive: the catalogue is fully readable with this file absent.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var form = document.querySelector("[data-filters]");
  var catalogue = document.querySelector("[data-catalogue]");
  if (!form || !catalogue) return;

  var buttons = Array.prototype.slice.call(form.querySelectorAll("[data-filter]"));
  var input = form.querySelector("input[type='search']");
  var status = form.querySelector("[data-filter-status]");
  var empty = document.querySelector("[data-empty]");
  var rows = Array.prototype.slice.call(catalogue.querySelectorAll("[role='listitem']"));
  var reset = document.querySelector("[data-reset]");

  var active = "all";
  var term = "";

  function haystack(row) {
    return (row.textContent || "").toLowerCase();
  }

  function apply() {
    var shown = 0;

    rows.forEach(function (row) {
      var entry = row.firstElementChild;
      var okCat = active === "all" || entry.dataset.category === active;
      var okTerm = !term || haystack(row).indexOf(term) !== -1;
      var visible = okCat && okTerm;
      row.hidden = !visible;
      if (visible) shown++;
    });

    if (status) {
      status.textContent = shown === rows.length
        ? "showing all " + rows.length + " entries"
        : "showing " + shown + " of " + rows.length + " entries";
    }
    if (empty) empty.hidden = shown !== 0;
  }

  function setCategory(value) {
    active = value;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filter === value));
    });
    apply();
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      setCategory(button.dataset.filter);
    });
  });

  if (input) {
    input.addEventListener("input", function () {
      term = input.value.trim().toLowerCase();
      apply();
    });
    // "/" focuses the search field, the way most archives and code hosts do.
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== input && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  if (reset) {
    reset.addEventListener("click", function () {
      if (input) input.value = "";
      term = "";
      setCategory("all");
      if (input) input.focus();
    });
  }

  // Reveal the controls only once we know they work.
  form.hidden = false;
  if (empty) empty.hidden = true;
  apply();
})();
