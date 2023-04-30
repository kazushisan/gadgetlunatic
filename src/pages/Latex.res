type page = {
  path: string,
  title: string,
}

@module("../hooks/useLazy") external useLazyLatexPages: unit => array<page> = "useLazyLatexPages"

@react.component
let make = (~file: string, ~path: string) => {
  let {title, date, ?modifiedDate, ?hash, ?permalink, headings, element} = Lazy.useLazyPage(file)

  let pages = useLazyLatexPages()

  let (show, setShow) = React.useState(() => false)

  <div className="xl:flex xl:justify-center">
    <div>
      <div className="container md:mx-auto max-w-4xl xl:hidden">
        <div className="p-4 flex justify-between">
          <div className="text-slate-700 font-bold">
            <span> {React.string("LaTeXのガイド")} </span>
            <span className="before:content-['/'] before:text-slate-300 before:m-1">
              {React.string(title)}
            </span>
          </div>
          <button onClick={_ => setShow(value => !value)}>
            <Icon.Bar3 className="w-6" />
          </button>
        </div>
      </div>
      {switch show {
      | true =>
        <div className="fixed inset-0 flex-col flex z-10 xl:hidden">
          <nav
            className=" bg-white shadow overflow-y-scroll m-4 rounded-md flex-initial md:mx-auto md:m-4 md:w-[calc(100%-2rem)] max-w-4xl">
            <div className="flex justify-between p-4">
              <div className="text-slate-700 font-bold"> {React.string("LaTeXのガイド")} </div>
              <button onClick={_ => setShow(value => !value)}>
                <Icon.XMark className="w-6" />
              </button>
            </div>
            <div className="m-4">
              {pages
              ->Js.Array2.map(page => {
                <div
                  key={page.path}
                  className={`${path === page.path ? "text-blue-500" : "text-slate-700"} my-2`}>
                  <Link to={page.path} onClick={_ => setShow(_ => false)}>
                    {React.string(page.title)}
                  </Link>
                </div>
              })
              ->React.array}
            </div>
          </nav>
        </div>

      | false => React.null
      }}
    </div>
    <div className="container md:mx-auto xl:mx-0  xl:pl-72 max-w-4xl flex-1 min-w-0 box-content">
      <div className="px-4">
        <header>
          <h1 className="font-bold text-3xl my-8"> {React.string(title)} </h1>
          <div className="my-8">
            <PostMeta ?modifiedDate ?hash ?permalink date />
          </div>
        </header>
        <article className="prose mb-16 max-w-none prose-slate"> {element} </article>
      </div>
    </div>
    <div className="hidden xl:block flex-none w-72">
      <div className="p-4 sticky mt-4 top-4">
        <nav className="mb-8 pb-8 border-b border-slate-100">
          <div className="font-bold"> {React.string("LaTeXのガイド")} </div>
          {pages
          ->Js.Array2.map(page => {
            <div
              key={page.path}
              className={`${path === page.path ? "text-blue-500" : "text-slate-700"} my-2`}>
              <Link to={page.path} onClick={_ => setShow(_ => false)}>
                {React.string(page.title)}
              </Link>
            </div>
          })
          ->React.array}
        </nav>
        <TableOfContents headings />
      </div>
    </div>
  </div>
}
