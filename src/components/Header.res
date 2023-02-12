@react.component
let make = () => {
  <div>
    <div className="container max-w-4xl mx-auto xl:px-72 box-content">
      <div className="p-4 flex justify-start gap-4 items-center">
        <Link to="/">
          <h1 className="font-bold text-lg"> {React.string("gadgetlunatic")} </h1>
        </Link>
        <Link to="/latex" className="text-slate-700"> {React.string("LaTeX")} </Link>
      </div>
    </div>
  </div>
}
