open Webapi.Dom;

type heading = {
  name: string,
  url: string,
  sub: bool,
  alwaysOn: option(bool),
};

type data = {
  title: option(string),
  headings: array(heading),
};

[@bs.scope "JSON"] [@bs.val] external parseData: string => data = "parse";

[@react.component]
let make = () => {
	let (headings, setHeadings) = React.useState(() => [||]);
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
	

	setHeadings(_ => jsonData.headings);
	switch(jsonData.title) {
		| Some(title) => setTitle(_ => title);
		| None => ();
	}
	Some(() => ());
};

  React.useEffect0(loadData);
  <div> {React.string("hello world")} </div>;
};
