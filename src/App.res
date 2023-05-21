module Layout = {
  @react.component
  let make = (~children: React.element, ~isArticle: bool) => {
    <div className="flex flex-col min-h-screen">
      <div className="flex-none">
        <Header isArticle />
      </div>
      <div className="flex-auto"> {children} </div>
      <div className="flex-none">
        <Footer isArticle />
      </div>
    </div>
  }
}

type route = {
  path: string,
  load: Lazy.load,
}

@module("content:routes") external routes: array<route> = "default"

@react.component
let make = () => {
  let url = Router.useUrl()

  let path = `/${Belt.List.toArray(url.path)->Js.Array2.joinWith("/")}`

  let target = Js.Array2.find(routes, item => item.path == path)

  switch (target, url.path) {
  | (Some(res), list{"post", ..._}) =>
    <Layout isArticle={true}>
      <Post load={res.load} path={res.path} />
    </Layout>
  | (Some(res), list{"latex", ..._}) =>
    <Layout isArticle={true}>
      <Latex load={res.load} path={res.path} />
    </Layout>
  | (None, list{}) =>
    <Layout isArticle={false}>
      <PostList />
    </Layout>
  | (_, _) => <Layout isArticle={false}> {React.string("page not found")} </Layout>
  }
}
