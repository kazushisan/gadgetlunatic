module RouteSwitch = {
  type route = {
    path: string,
    file: string,
  }

  @module("ssg:routes") external routes: array<route> = "default"

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
}

@react.component
let make = () => {
  <div className="flex flex-col min-h-screen">
    <div className="flex-none">
      <Header />
    </div>
    <div className="flex-auto">
      <RouteSwitch />
    </div>
    <div className="flex-none">
      <Footer />
    </div>
  </div>
}
