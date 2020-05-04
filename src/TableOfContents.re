open Webapi.Dom;

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

type position = {
  y: float,
  url: string,
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

type exn +=
  | HeadingNotFound;

let calcBoundaryPosition = (heading: option(Dom.element)) => {
  let heading =
    switch (heading) {
    | Some(element) => element
    | None => raise(HeadingNotFound)
    };

  let top = Element.getBoundingClientRect(heading)->getTop;
  let marginTop =
    Window.getComputedStyle(heading, window)
    ->Utils.getComputedStyle("marginTop");

  Window.scrollY(window) +. top -. marginTop -. 60.0;
};

[@react.component]
let make = () => {
  let (headings, setHeadings) = React.useState(() => [||]);
  let (positions, setPositions) = React.useState(() => [||]);
  let (current, setCurrent) = React.useState(() => "");
  let (title, setTitle) = React.useState(() => "");

  let onScroll =
    React.useCallback1(
      _ => {
        let item =
          Belt.Array.reverse(positions)
          |> Js.Array.find(item => item.y <= Window.scrollY(window));

        switch (item) {
        | None => ()
        | Some(current) => setCurrent(_ => current.url)
        };
      },
      [|positions|],
    );

  React.useEffect0(() => {
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
      ->Js.Array.filter(heading => heading.enableScrollStatus, _)
      ->Belt.Array.map(heading => {
          let element = Document.querySelector(heading.url, document);
          {y: calcBoundaryPosition(element), url: heading.url};
        });

    setPositions(_ => positions);
    setHeadings(_ => jsonData.headings);

    switch (jsonData.title) {
    | Some(title) => setTitle(_ => title)
    | None => ()
    };

    Some(() => ());
  });

  React.useEffect1(
    () => {
      Window.addEventListener("scroll", onScroll, window);
      Some(() => Window.removeEventListener("scroll", onScroll, window));
    },
    [|onScroll|],
  );

  <div className="toc">
    <ul>
      {headings
       ->Belt.Array.mapWithIndex((_, heading) => {<Row heading on=true />})
       ->React.array}
    </ul>
  </div>;
};
