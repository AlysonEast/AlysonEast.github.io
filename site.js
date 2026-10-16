/* =========================================================
   Alyson East — site behaviour
   No dependencies, no build step. Loaded in <head> on every page.
   =========================================================
   1. Marks <html> as script-enabled, so the scroll reveal only
      hides content when there is something to unhide it.
   2. Fades each .rise section in once as it enters the viewport.
   3. Lifts the bottom fade on a .scrollpanel once it is scrolled
      to the end, and fills in any [data-count-of] label.
   4. Stamps the current year into #year in the footer.
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.className += " js";

  var reduceMotion = window.matchMedia &&
                     window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Fade sections in once. Under reduced motion, or without
     IntersectionObserver, everything is simply shown. */
  function observeRise() {
    var items = document.querySelectorAll(".rise");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    Array.prototype.forEach.call(items, function (n) { io.observe(n); });
  }

  /* The fade at the foot of a scroll panel is an affordance, so it
     goes away once there is nothing left below. */
  function wireScrollPanels() {
    var panels = document.querySelectorAll(".scrollpanel");
    Array.prototype.forEach.call(panels, function (p) {
      function update() {
        var atEnd = p.scrollTop + p.clientHeight >= p.scrollHeight - 4;
        p.setAttribute("data-scrolled-end", atEnd ? "true" : "false");
      }
      p.addEventListener("scroll", update, { passive: true });
      update();
    });
  }

  /* <span data-count-of=".news-item">…</span> reports how many of those
     exist, so the count never goes stale as items are added. */
  function wireCounts() {
    var labels = document.querySelectorAll("[data-count-of]");
    Array.prototype.forEach.call(labels, function (label) {
      var n = document.querySelectorAll(label.getAttribute("data-count-of")).length;
      var noun = label.getAttribute("data-count-noun") || "items";
      label.textContent = n + " " + noun;
    });
  }

  function stampYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() {
    observeRise();
    wireScrollPanels();
    wireCounts();
    stampYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
