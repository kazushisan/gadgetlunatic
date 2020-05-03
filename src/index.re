// load styles
%raw
{|
import './scss/style.scss'
import 'katex/dist/katex.min.css'
|};

open Webapi.Dom;

let equationNodes =
  Document.querySelectorAll(".tex", document)->NodeList.toArray;

let renderEquation = element => {
  let expression = Element.getAttribute("data-expr", element);

  switch (expression) {
  | Some(string) => Katex.render(string, element)
  | None => ()
  };
};

Js.Array.forEach(
  (node: Dom.node) => {
    switch (Element.ofNode(node)) {
    | Some(element) => renderEquation(element)
    | None => ()
    }
  },
  equationNodes,
);
