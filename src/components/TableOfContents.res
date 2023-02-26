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
        className={`list-none px-2 py-1 my-1 block text-sm ${switch (
            heading.depth,
            heading.id === activeId,
          ) {
          | (2, true) => "bg-blue-100 text-blue-500 rounded font-bold"
          | (2, false) => "text-slate-700"
          | (_, true) => "bg-blue-100 text-blue-500 rounded ml-2 font-bold"
          | (_, false) => "text-slate-700 ml-2"
          }}`}>
        <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
      </li>
    )
    ->React.array}
  </ul>
}
