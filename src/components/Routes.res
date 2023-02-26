type options = {eager?: bool}

type file = {
  title?: string,
  draft?: bool,
  date?: string,
  permalink?: string,
  modifiedDate?: string,
  hash?: string,
  headings: Js.Array.t<TableOfContents.heading>,
  default: React.component<{.}>,
}

@val
external importMetaGlob: (~glob: string, ~options: options) => Js.Dict.t<file> = "import.meta.glob"

let files = importMetaGlob(~glob="../../content/**/*.{md,mdx}", ~options={eager: true})

exception InvalidFile(string)

type route = {
  path: string,
  title: string,
  draft: bool,
  date: string,
  permalink?: string,
  modifiedDate?: string,
  hash?: string,
  headings: Js.Array.t<TableOfContents.heading>,
  element: React.element,
}

let routes = Js.Dict.entries(files)->Js.Array2.map(((key, value)) => {
  let title = switch value.title {
  | Some(title) => title
  | None => raise(InvalidFile(`title not found for ${key}`))
  }

  let draft = switch value.draft {
  | Some(draft) => draft
  | None => raise(InvalidFile(`draft not found for ${key}`))
  }

  let date = switch value.date {
  | Some(date) => date
  | None => raise(InvalidFile(`date not found for ${key}`))
  }

  let path =
    key |> Js.String.replaceByRe(%re("/^\.\.\/\.\.\/content(.+?)(\/index|)\.(md|mdx)$/"), "$1")

  {
    path,
    title,
    draft,
    date,
    permalink: ?value.permalink,
    modifiedDate: ?value.modifiedDate,
    hash: ?value.hash,
    headings: value.headings,
    element: React.createElement(value.default, Js.Obj.empty()),
  }
})

@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let path = `/${Belt.List.toArray(url.path)->Js.Array2.joinWith("/")}`

  let target = Js.Array2.find(routes, item => item.path == path)

  switch (target, url.path) {
  | (Some(res), list{"post", ..._}) =>
    <Post
      title={res.title}
      headings={res.headings}
      date={res.date}
      permalink=?{res.permalink}
      modifiedDate=?{res.modifiedDate}
      hash=?{res.hash}>
      {res.element}
    </Post>
  | (Some(res), list{"latex", ..._}) =>
    <Latex
      title={res.title}
      headings={res.headings}
      date={res.date}
      permalink=?{res.permalink}
      modifiedDate=?{res.modifiedDate}
      hash=?{res.hash}>
      {res.element}
    </Latex>
  | (Some(res), _) =>
    <div>
      <h1> {React.string("default page")} </h1>
      <div> {res.element} </div>
    </div>
  | (None, _) => <div> {React.string("page not found")} </div>
  }
}
