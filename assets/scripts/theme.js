if ("localStorage" in window || "matchMedia" in window) {
  document.firstElementChild.classList.add(
    localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
} else {
  console.log(
    "> [THEME] localStorage e/ou matchMedia não suportados. Fallback para modo light."
  );
}
