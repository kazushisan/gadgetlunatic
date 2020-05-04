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

module Row = {
	[@react.component]
	let make = (~heading: heading) => {
		<li className="table-of-contents__item">
			<a
				className="table-of-contents__link"
				href={heading.url}
			>
			{React.string(heading.name)}
			</a>
		</li>
	}
}

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
  <div className="table-of-contents">
		<ul>
			{headings->Belt.Array.mapWithIndex((_, heading) => {
				<Row heading={heading} />
			})->React.array}
		</ul>
	</div>;
};
