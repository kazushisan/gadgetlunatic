type heading = {
  value: string,
  depth: int,
  id: string,
}

@module("../hooks/useTableOfContentsActiveItem")
external useTableOfContentsActiveItem: Js.Array.t<heading> => string =
  "useTableOfContentsActiveItem"

@react.component
let make = (~headings: Js.Array.t<heading>) => {
  let activeId = useTableOfContentsActiveItem(headings)
  <ul className="p-4 sticky mt-32 top-32">
    {headings
    ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
    ->Js.Array2.map(heading =>
      <li
        key={heading.id}
        className={`list-none my-2 block ${switch (heading.depth, heading.id === activeId) {
          | (2, true) => "border-l-4 border-slate-200 pl-4"
          | (2, false) => "pl-5"
          | (_, true) => "border-l-4 border-slate-200 pl-6"
          | (_, false) => "pl-7"
          }}`}>
        <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
      </li>
    )
    ->React.array}
  </ul>
}
