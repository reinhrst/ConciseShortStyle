const ELEMENT = document.documentElement;
const STYLE_VAR = "--progress-in-document";
const ERROR_MARGIN = 10;


const setProgress = () => {
  ELEMENT.style.setProperty(
    STYLE_VAR,
    Math.max(
      0,
      Math.min(
        1,
        ELEMENT.scrollTop / (ELEMENT.scrollHeight - ELEMENT.clientHeight)
      )
    ).toFixed(4)
  );

  const toc = document.querySelector("toc");
  if (toc) {
    const headerBarHeight = document
      .querySelector("header")
      .getBoundingClientRect().height;
    const headers = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
    const first_in_view = headers.findIndex(
      (h) => h.getBoundingClientRect().top >= headerBarHeight + ERROR_MARGIN
    ); // not the quickest way
    for (let i = first_in_view - 1; i >= 0; i--) {
      const id = headers[i].id;
      if (id != null) {
        const element = toc.querySelector(`a[data-toc-target-id="${id}"]`);
        if (element) {
          const parent = element.parentElement;
          if (!parent.classList.contains("active")) {
            toc
              .querySelectorAll(".active")
              .forEach((el) => el.classList.remove("active"));
            parent.classList.add("active");
          }
        }
        break;
      }
    }
  }
};
const resizeObserver = new ResizeObserver(() => setProgress());
resizeObserver.observe(ELEMENT);
document.addEventListener("scroll", setProgress);
export {};
