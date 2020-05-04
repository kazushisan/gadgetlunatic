open Webapi.Dom;

let andThen = (f: 'a => option('b)) =>
  fun
  | Some(v) => f(v)
  | None => None;

// render math equations in articles
let renderEquation = element => {
  let expression = Element.getAttribute("data-expr", element);

  switch (expression) {
  | Some(string) => Katex.render(string, element)
  | None => ()
  };
};

Document.querySelectorAll(".tex", document)
|> NodeList.toArray
|> Js.Array.forEach((node: Dom.node) => {
     switch (Element.ofNode(node)) {
     | Some(element) => renderEquation(element)
     | None => ()
     }
   });

// handle menu actions
let body = document |> Document.asHtmlDocument |> andThen(HtmlDocument.body);

let onClickMenu = e => {
  Event.stopImmediatePropagation(e);

  switch (body) {
  | Some(element) =>
    Element.classList(element)
    |> DomTokenList.toggle("show-menu")
    |> (_ => ())
  | None => ()
  };
};

let useAsToggle = element =>
  switch (element) {
  | Some(element) => Element.addEventListener("click", onClickMenu, element)
  | None => ()
  };

Document.querySelector(".sp-header__button", document)->useAsToggle;
Document.querySelector(".sp-close-area", document)->useAsToggle;

// handle scrolling
[@bs.val] external parseFloat: string => float = "parseFloat";

let calcOffset = anchor => {
  Window.getComputedStyle(anchor, window)
  ->CssStyleDeclaration.marginTop
  ->Js.String.replace("px", "", _)
  ->parseFloat;
};

let scroll =
  SmoothScroll.createScroll("a[href*=\"#\"]", {"offset": calcOffset});

// handle table of contents react component
Document.querySelector("#table-of-contents", document)
->(
    fun
    | Some(element) => ReactDOMRe.render(<TableOfContents />, element)
    | None => ()
  );
