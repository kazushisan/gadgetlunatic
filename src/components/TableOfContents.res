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
  <ul className="p-4 sticky mt-40 top-40">
    {headings
    ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
    ->Js.Array2.map(heading =>
      <li
        key={heading.id}
        className={`list-none py-1 block border-l-2 ${switch (
            heading.depth,
            heading.id === activeId,
          ) {
          | (2, true) => " border-blue-500 pl-4"
          | (2, false) => " border-slate-200 pl-4"
          | (_, true) => " border-blue-500 pl-6"
          | (_, false) => " border-slate-200 pl-6"
          }}`}>
        <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
      </li>
    )
    ->React.array}
  </ul>
}
