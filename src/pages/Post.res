type heading = {
  value: string,
  depth: int,
  id: string,
}

@react.component
let make = (~title: string, ~headings: Js.Array.t<heading>, ~children: React.element) => {
  <div>
		<header>
		    <h1 className="max-w-4xl px-4 mx-auto font-bold text-3xl my-8"> {React.string(title)} </h1>
		</header>
    <article className="prose px-4 max-w-4xl mx-auto prose-slate"> {children} </article>
    <div>
      {headings
      ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
      ->Js.Array2.map(heading =>
        <li key={heading.id}>
          <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
        </li>
      )
      ->React.array}
    </div>
  </div>
}
