// Keep search engines and visitors on the canonical docs domain.
// The same site is also served on Mintlify's working hostnames
// (*.mintlify.app / .dev / .site); send those page views to docs.deapi.ai.
(function () {
  var CANONICAL_HOST = "docs.deapi.ai";
  var host = window.location.hostname;

  if (host === CANONICAL_HOST) return;
  if (!/\.mintlify\.(app|dev|site)$/.test(host)) return; // leave localhost alone

  // Tell crawlers that render JavaScript not to index this hostname.
  var robots = document.querySelector('meta[name="robots"]');
  if (!robots) {
    robots = document.createElement("meta");
    robots.name = "robots";
    document.head.appendChild(robots);
  }
  robots.content = "noindex, follow";

  // Don't redirect inside the Mintlify dashboard/editor preview iframe.
  if (window.top !== window.self) return;

  window.location.replace(
    "https://" + CANONICAL_HOST + window.location.pathname + window.location.search + window.location.hash
  );
})();
