@react.component
let make = (
  ~title: string,
  ~headings: Js.Array.t<TableOfContents.heading>,
  ~children: React.element,
) => {
  <div>
    <TableOfContents headings />
    <header>
      <h1 className="max-w-4xl px-4 mx-auto font-bold text-3xl my-8"> {React.string(title)} </h1>
    </header>
    <article className="prose px-4 mb-16 max-w-4xl mx-auto prose-slate"> {children} </article>
  </div>
}
