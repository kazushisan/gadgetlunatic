open Webapi.Dom

// render math equations in articles
module Katex = {
  @module("katex")
  external render: (string, Dom.element) => unit = "render"
}

let renderEquation = element => {
  let expression = Element.getAttribute(element, "data-expr")

  switch expression {
  | Some(string) => Katex.render(string, element)
  | None => ()
  }
}

Document.querySelectorAll(document, ".tex")
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

  Element.classList(body)->DomTokenList.toggle("show-menu") |> Utils.noop1
}

let useAsToggle = element =>
  switch element {
  | Some(element) => Element.addEventListener(element, "click", onClickMenu)
  | None => ()
  }

Document.querySelector(document, ".sp-header__button")->useAsToggle
Document.querySelector(document, ".sp-close-area")->useAsToggle

// handle table of contents react component
Document.getElementById(document, "table-of-contents")->(
  x =>
    switch x {
    | Some(element) => ReactDOM.render(<TableOfContents />, element)
    | None => ()
    }
)
