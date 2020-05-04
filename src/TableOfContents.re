open Webapi.Dom;

type heading = {
  name: string,
  url: string,
  sub: bool,
  currentPage: option(bool),
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
  let make = (~heading: heading, ~current: string) => {
    let linkClassName =
      React.useMemo2(
        () => {
          let currentPage =
            switch (heading.currentPage) {
            | Some(value) => value
            | None => false
            };

          let className =
            current == heading.url ? "toc__link toc__link--on" : "toc__link";

          currentPage ? {j|$className toc__link--current-page|j} : className;
        },
        (heading, current),
      );

    <li className={heading.sub ? "toc__sub-item" : "toc__item"}>
      <a className=linkClassName href={heading.url}>
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

let initTitle: unit => option(string) = () => None;

[@react.component]
let make = () => {
  let (headings, setHeadings) = React.useState(() => [||]);
  let (positions, setPositions) = React.useState(() => [||]);
  let (current, setCurrent) = React.useState(() => "");
  let (title, setTitle) = React.useState(initTitle);

  let onScroll =
    React.useCallback1(
      () => {
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

  React.useEffect1(
    () => {
      Window.addEventListener("scroll", _ => onScroll(), window);
      onScroll();
      Some(
        () => Window.removeEventListener("scroll", _ => onScroll(), window),
      );
    },
    [|onScroll|],
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
      ->Js.Array.filter(
          (heading: heading) => Utils.isAnchorLink(heading.url),
          _,
        )
      ->Belt.Array.map(heading => {
          let element = Document.querySelector(heading.url, document);
          {y: calcBoundaryPosition(element), url: heading.url};
        });

    setPositions(_ => positions);
    setHeadings(_ => jsonData.headings);
    setTitle(_ => jsonData.title);

    Some(() => ());
  });

  <div className="toc">
    {switch (title) {
     | Some(value) => <h1 className="toc__title"> {React.string(value)} </h1>
     | None => React.null
     }}
    <ul>
      {headings
       ->Belt.Array.mapWithIndex((_, heading) => {
           <Row heading current key={heading.url} />
         })
       ->React.array}
    </ul>
  </div>;
};
