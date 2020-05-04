open Webapi.Dom;

let andThen = (f: 'a => option('b)) =>
  fun
  | Some(v) => f(v)
  | None => None;

type domRect = {
  x: float,
  y: float,
  width: float,
  height: float,
  top: float,
  right: float,
  bottom: float,
  left: float,
};

let getDomRectValues: Dom.domRect => domRect = [%raw
  {|
function({
	x, y, width, height, top, right, bottom, left
}) {
	return {
		x, y, width, height, top, right, bottom, left
	};
}
|}
];

let getComputedStyle: (Dom.cssStyleDeclaration, string) => float = [%raw
  {|
function(style, key) {
  if (style[key]) {
    return style[key].replace('px', '');
  }

  return 0;
}
|}
];

let isAnchorLink: string => bool = [%raw
  {|
function(string) {
  return string.startsWith('#');
}
|}
];

type exn +=
  | AssertExistsError;

let assertExists: option('a) => 'a = element => {
    switch (element) {
    | Some(element) => element
    | None => raise(AssertExistsError)
    };
}

let noop1 = (_: 'a) => () 

let body =
  document
  |> Document.asHtmlDocument
  |> assertExists
  |> HtmlDocument.body
  |> assertExists;

let getTop = (rect: Dom.domRect) => getDomRectValues(rect).top;
let getY = (rect: Dom.domRect) => getDomRectValues(rect).y;
