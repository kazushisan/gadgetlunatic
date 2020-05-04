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
