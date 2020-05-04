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

let loadData = () => {
  let data =
    Document.getElementById("table-of-contents-data", document)
    ->(
        fun
        | Some(element) => Element.textContent(element)
        | None => ""
      )
		->parseData;
	
	Js.log(data);

	Some(() => ());
};

[@react.component]
let make = () => {
  React.useEffect0(loadData);
  <div> {React.string("hello world")} </div>;
};
