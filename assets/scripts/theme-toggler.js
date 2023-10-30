const themeToggler = document.querySelector(".theme-toggle");

// bg-blue-400/30 text-transparent

if ("localStorage" in window) {
  const theme = window.localStorage.getItem("theme") ?? "system";
  switch (theme) {
    case "dark": {
      themeToggler.classList.add("theme-toggle--toggled");
      break;
    }
    case "light": {
      themeToggler.classList.remove("theme-toggle--toggled");
      break;
    }
    case "system": {
      if ("matchMedia" in window) {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (isDark) {
          themeToggler.classList.add("theme-toggle--toggled");
        } else {
          themeToggler.classList.remove("theme-toggle--toggled");
        }
      } else {
        console.log(
          "> [Theme Toggler] Seu navegador não possui matchMedia, fallback para tema light."
        );
      }
      break;
    }
  }

  const a = setTimeout(() => {
    themeToggler.classList.remove("bg-blue-400/30");
    themeToggler.classList.remove("text-transparent");
    clearTimeout(a);
  }, 300);

  themeToggler.addEventListener("click", () => {
    const theme = window.localStorage.getItem("theme") ?? "system";
    switch (theme) {
      case "dark": {
        document.firstElementChild.classList.remove("dark");
        document.firstElementChild.classList.add("light");
        localStorage.setItem("theme", "light");
        themeToggler.classList.remove("theme-toggle--toggled");
        break;
      }
      case "light": {
        document.firstElementChild.classList.add("dark");
        document.firstElementChild.classList.remove("light");
        localStorage.setItem("theme", "dark");
        themeToggler.classList.add("theme-toggle--toggled");
        break;
      }
      case "system": {
        if ("matchMedia" in window) {
          const isDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          if (isDark) {
            document.firstElementChild.classList.remove("dark");
            localStorage.setItem("theme", "light");
            themeToggler.classList.remove("theme-toggle--toggled");
          } else {
            document.firstElementChild.classList.add("dark");
            localStorage.setItem("theme", "dark");
            themeToggler.classList.add("theme-toggle--toggled");
          }
        } else {
          console.log(
            "> [Theme Toggler] Seu navegador não possui matchMedia, fallback para tema light."
          );
        }
        break;
      }
    }
  });
} else {
  console.log(
    "> [Theme Toggler] Seu navegador não possui localStorage, o theme-toggler não irá funcionar."
  );
}
