@react.component
let make = () => {
  <div className="sticky top-0 left-0 right-0 bg-white">
    <div className="container px-4 max-w-4xl mx-auto flex justify-start gap-4 py-4 items-center">
      <h1 className="font-bold text-lg"> {React.string("gadgetlunatic")} </h1>
      <Link to="/post" className="text-slate-500"> {React.string("Post")} </Link>
      <Link to="/latex" className="text-slate-500"> {React.string("LaTeX")} </Link>
    </div>
  </div>
}
