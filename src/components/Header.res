@react.component
let make = (~isArticle: bool) => {
  <header>
    <div className={`container md:mx-auto max-w-4xl box-content ${isArticle ? "xl:pr-72" : ""}`}>
      <div className="p-4 flex justify-start items-center">
        <Link to="/">
          <h1 className="font-bold text-lg"> {React.string("gadgetlunatic")} </h1>
        </Link>
        <Link to="/" className="text-slate-700 ml-4 text-sm"> {React.string("ブログ")} </Link>
        <div className="text-slate-300 mx-1 text-sm"> {React.string("/")} </div>
        <Link to="/latex/introduction" className="text-slate-700 text-sm">
          {React.string("LaTeXのガイド")}
        </Link>
      </div>
    </div>
  </header>
}
