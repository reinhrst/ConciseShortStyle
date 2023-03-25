document.addEventListener("DOMContentLoaded", () => {
  console.log("ready")
  document.querySelectorAll("toc a").forEach(el => {
    el.addEventListener("click", (event) => {
      const target = document.querySelector(el.getAttribute("href"))
      if (!target) {
        return;
      }
    const headerBarHeight = document.querySelector("header").getBoundingClientRect().height
      document.documentElement.scrollBy({top: target.getBoundingClientRect().top - headerBarHeight, left: 0, behavior: "smooth"})
      event.preventDefault()
    })
  })
})

export {}
