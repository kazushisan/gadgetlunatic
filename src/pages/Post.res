type heading = {
  value: string,
  depth: int,
  id: string,
}

@react.component
let make = (~title: string, ~headings: Js.Array.t<heading>, ~children: React.element) => {
  <div>
    <h1> {React.string(title)} </h1>
    <article className="prose"> {children} </article>
    <div>
      {headings
      ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
      ->Js.Array2.map(heading =>
        <li key={heading.value}>
          <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
        </li>
      )
      ->React.array}
    </div>
  </div>
}
