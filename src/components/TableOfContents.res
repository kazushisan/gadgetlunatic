type heading = {
  value: string,
  depth: int,
  id: string,
}

@react.component
let make = (~headings: Js.Array.t<heading>) => {
  <ul className="p-4 sticky mt-32 top-32">
    {headings
    ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
    ->Js.Array2.map(heading =>
      <li key={heading.id} className={`list-none my-2 block ${heading.depth == 2 ? "" : "ml-4"}`}>
        <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
      </li>
    )
    ->React.array}
  </ul>
}
