@module("virtual:routes") external routes: array<Route.t> = "default"

@react.component
let make = () => {
  let url = Router.useUrl()

  let path = `/${Belt.List.toArray(url.path)->Js.Array2.joinWith("/")}`

  let target = Js.Array2.find(routes, item => item.path == path)

  switch (target, url.path) {
  | (Some(res), list{"post", ..._}) => <Post file={res.file} />
  | (Some(res), list{"latex", ..._}) => <Latex file={res.file} path={res.path} />
  | (None, list{}) => <PostList />
  | (_, _) => <div> {React.string("page not found")} </div>
  }
}
