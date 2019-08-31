"use strict";

import "../scss/style.scss";
import TableNav from "./TableNav.js";

const SmoothScroll = require("smooth-scroll");

const navHeight = 61;
const scroll = new SmoothScroll('a[href*="#"]', {
  offset: (anchor, toggle) =>
    parseInt(
      document.defaultView.getComputedStyle(anchor).marginTop.replace("px", "")
    ) + navHeight
});

const toc_element = document.getElementById("table-of-contents");
const tfd_element = document.getElementById("table-for-documentation");
let tablenav = null;
if (toc_element) {
  tablenav = new TableNav({
    element: toc_element,
    li_list: document.querySelectorAll("#table-of-contents li"),
    headers_list: document.querySelectorAll(
      "section.post-content h2, section.post-content h3"
    )
  });
} else if (tfd_element) {
  tablenav = new TableNav({
    element: tfd_element,
    li_list: document.querySelectorAll("#table-for-documentation li.h2"),
    headers_list: document.querySelectorAll("section.post-content h2")
  });
}

if (tablenav) {
  window.addEventListener("scroll", () => {
    tablenav.manage();
  });
}

const menu_button = document.querySelector(".sp-header__button");
const sp_header_close = document.querySelector(".sp-close-area");
menu_button.onclick = e => {
  document.body.classList.toggle("show-menu");
  e.stopPropagation();
};
sp_header_close.onclick = e => {
  document.body.classList.remove("show-menu");
  e.stopPropagation();
};
document.addEventListener("scrollStop", () => {
  document.body.classList.remove("show-menu");
});
let ticking = false;
window.addEventListener("scroll", () => {
  if (window.innerWidth < 932 || !tablenav || ticking) return;
  ticking = true;
  const footerRect = document
    .querySelector("footer.global-footer")
    .getBoundingClientRect();
  const table_element = toc_element || tfd_element;

  const bottom =
    footerRect.y < window.innerHeight
      ? window.innerHeight - footerRect.y + "px"
      : "";

  window.requestAnimationFrame(function() {
    table_element.style.bottom = bottom;
    ticking = false;
  });
});

const content = document.getElementById("content");
const global_footer = document.querySelector(".global-footer");
window.addEventListener("resize", () => {
  content.style.minHeight =
    window.innerHeight - global_footer.offsetHeight - 61 + "px";
});
content.style.minHeight =
  window.innerHeight - global_footer.offsetHeight - 61 + "px";
