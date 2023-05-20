@react.component
let make = () => {
  let postList = Lazy.useLazyPostList()

  <div className="xl:flex xl:justify-center">
    <Head title="gadgetlunatic" />
    <div className="container md:mx-auto xl:mx-0 max-w-4xl flex-1 min-w-0">
      <div className="px-4">
        {postList
        ->Js.Array2.map(post => {
          <div
            key={post.path}
            className="mt-8 pt-8 first-of-type:border-t-0 border-t border-slate-100">
            <Link to={post.path}>
              <h1 className="font-bold text-xl mb-4"> {React.string(post.title)} </h1>
            </Link>
            <PostMeta
              modifiedDate=?{post.modifiedDate}
              hash=?{post.hash}
              permalink=?{post.permalink}
              date={post.date}
            />
          </div>
        })
        ->React.array}
      </div>
    </div>
  </div>
}
