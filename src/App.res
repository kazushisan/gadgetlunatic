type route = {
  pathname: string,
  title: string,
  draft: bool,
  date: string,
  element: React.element,
}

@module("./routes") external routes: Js.Array.t<route> = "routes"

@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let path = `/${Belt.List.toArray(url.path)->Js.Array2.joinWith("/")}`

  let target = Js.Array2.find(routes, item => {
    let extensionTrimmed = item.pathname |> Js.String.replaceByRe(%re("/\.(md|mdx)$/"), "")

    let indexTrimmed = extensionTrimmed |> Js.String.replaceByRe(%re("/\/index$/"), "")

    Js.Console.log(indexTrimmed)
    indexTrimmed == path
  })

  switch target {
  | Some(res) => {
    <div>
      <h1>{React.string(res.title)}</h1>
      <div>{res.element}</div>
    </div>
  }
  | None => <div> {React.string("page not found")} </div>
  }
}
