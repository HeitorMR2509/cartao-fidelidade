function init2() {
  if (
    document.querySelector("#addPoint") &&
    document.querySelector("#reactivePoints") &&
    document.querySelector("#remPoint") &&
    document.querySelector("#remU")
  ) {
    const addP = document.querySelector("#addPoint");
    const RP = document.querySelector("#remPoint");
    const RU = document.querySelector("#remU");
    const cardId = addP.getAttribute("data-cardid");
    const e = document.querySelector("#reactivePoints");
    const t = (p) => `Pontuação: ${p}`;

    function update(np) {
      e.innerText = t(np);
    }

    addP.addEventListener("click", async () => {
      const res = await fetch(`${window.location.origin}/api/addPoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId,
        }),
      }).then((res) => res.text());
      update(res);
    });

    RP.addEventListener("click", async () => {
      const res = await fetch(`${window.location.origin}/api/remPoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId,
        }),
      }).then((res) => res.text());
      update(res);
    });

    RU.addEventListener("click", async () => {
      await fetch(`${window.location.origin}/api/delU`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardId,
        }),
      });
      window.location.replace("/");
    });
  }
}
// run once when page loads
if (document.readyState === "complete") {
  init2();
} else {
  document.addEventListener("DOMContentLoaded", () => init2());
}

// run after every additional navigation by swup
swup.on("contentReplaced", init2);
