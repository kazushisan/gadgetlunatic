open Webapi.Dom;

[@bs.send] external filter: (array('a), 'a => bool) => array('a) = "filter";

type heading = {
  name: string,
  url: string,
  sub: bool,
  enableScrollStatus: bool,
  alwaysOn: option(bool),
};

type data = {
  title: option(string),
  headings: array(heading),
};

module Row = {
  [@react.component]
  let make = (~heading: heading, ~on: bool) => {
    <li className={heading.sub ? "toc__sub-item" : "toc__item"}>
      <a
        className={on ? "toc__link toc__link--on" : "toc__link"}
        href={heading.url}>
        {React.string(heading.name)}
      </a>
    </li>;
  };
};

[@bs.scope "JSON"] [@bs.val] external parseData: string => data = "parse";

let getTop = (rect: Dom.domRect) => Utils.getDomRectValues(rect).top;

type exn += | HeadingNotFound

let calcBoundaryPosition = (heading: option(Dom.element)) => {
  let heading = switch (heading) {
    | Some(element) => element
    | None => raise(HeadingNotFound) 
  };

  let top = Element.getBoundingClientRect(heading)->getTop;
  let marginTop = Window.getComputedStyle(heading, window)->Utils.getComputedStyle("marginTop");

  Window.scrollY(window) +. top -. marginTop -. 60.0
};


[@react.component]
let make = () => {
  let (headings, setHeadings) = React.useState(() => [||]);
  let (positions, setPositions) = React.useState(() =>[||]);
  let (title, setTitle) = React.useState(() => "");

  let loadData = () => {
    let jsonData =
      Document.getElementById("table-of-contents-data", document)
      ->(
          fun
          | Some(element) => Element.textContent(element)
          | None => ""
        )
      ->parseData;

    let positions =
      jsonData.headings
      ->filter(heading => heading.enableScrollStatus)
      ->Belt.Array.map(heading => {
          let heading = Document.querySelector(heading.url, document);

          calcBoundaryPosition(heading);
        });

    setPositions(_ => positions);
    setHeadings(_ => jsonData.headings);
    switch (jsonData.title) {
    | Some(title) => setTitle(_ => title)
    | None => ()
    };
    Some(() => ());
  };

  React.useEffect0(loadData);
  <div className="toc">
    <ul>
      {headings
       ->Belt.Array.mapWithIndex((_, heading) => {<Row heading on=true />})
       ->React.array}
    </ul>
  </div>;
};
