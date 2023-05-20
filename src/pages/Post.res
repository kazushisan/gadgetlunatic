@react.component
let make = (~path: string, ~load: Lazy.load) => {
  let {title, date, ?modifiedDate, ?hash, ?permalink, headings, element} = Lazy.useLazyPage(
    path,
    load,
  )

  <div className="xl:flex xl:justify-center">
    <Head title={`${title} | gadgetlunatic`} path />
    <div className="container md:mx-auto xl:mx-0 xl:pl-72 max-w-4xl box-content flex-1 min-w-0">
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
      <div className="p-4 sticky mt-40 top-40">
        <TableOfContents headings />
      </div>
    </div>
  </div>
}
