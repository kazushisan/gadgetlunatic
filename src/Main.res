open Webapi.Dom

// render math equations in articles
module Katex = {
  @bs.module("katex")
  external render: (string, Dom.element) => unit = "render"
}

let renderEquation = element => {
  let expression = Element.getAttribute("data-expr", element)

  switch expression {
  | Some(string) => Katex.render(string, element)
  | None => ()
  }
}

Document.querySelectorAll(".tex", document)
|> NodeList.toArray
|> Js.Array.forEach((node: Dom.node) =>
  switch Element.ofNode(node) {
  | Some(element) => renderEquation(element)
  | None => ()
  }
)

// handle menu actions
let body = Utils.body

let onClickMenu = e => {
  Event.stopPropagation(e)

  Element.classList(body) |> DomTokenList.toggle("show-menu") |> Utils.noop1
}

let useAsToggle = element =>
  switch element {
  | Some(element) => Element.addEventListener("click", onClickMenu, element)
  | None => ()
  }

Document.querySelector(".sp-header__button", document)->useAsToggle
Document.querySelector(".sp-close-area", document)->useAsToggle

// handle table of contents react component
Document.getElementById("table-of-contents", document)->(
  x =>
    switch x {
    | Some(element) => ReactDOMRe.render(<TableOfContents />, element)
    | None => ()
    }
)
