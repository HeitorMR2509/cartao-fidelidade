function init() {
  if (document.querySelector("#return"))
    document
      .querySelector("#return")
      .addEventListener("click", () => window.history.back());
}
// run once when page loads
if (document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => init());
}

// run after every additional navigation by swup
swup.on("contentReplaced", init);
