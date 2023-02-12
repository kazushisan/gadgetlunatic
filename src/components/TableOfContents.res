type heading = {
  value: string,
  depth: int,
  id: string,
}

@react.component
let make = (~headings: Js.Array.t<heading>) => {
  let (show, setShow) = React.useState(_ => false)

  <div className="fixed top-[60px] left-0 right-0 shadow-sm bg-white">
    <button
      onClick={unit => setShow(_ => !show)}
      className="w-full flex justify-between items-center p-4">
      <div className="flex-none"> {React.string("目次")} </div>
      {switch show {
      | false => <Icon.Menu className="fill-slate-900 flex-none" />
      | true => <Icon.Close className="stroke-slate-900 flex-none" />
      }}
    </button>
    {switch show {
    | true =>
      <ul className="p-4">
        {headings
        ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
        ->Js.Array2.map(heading =>
          <li key={heading.id} className={`list-none my-2 block ${heading.depth == 2 ? "" : "ml-4"}`}>
            <a href={`#${heading.id}`} onClick={_ => setShow(_ => !show)}>
              {React.string(heading.value)}
            </a>
          </li>
        )
        ->React.array}
      </ul>
    | false => React.null
    }}
  </div>
}
