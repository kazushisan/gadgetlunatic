let year = Js.Date.getFullYear(Js.Date.make())->Js.Float.toString

@react.component
let make = (~isArticle: bool) => {
  <footer>
    <div
      className={`container md:mx-auto max-w-4xl box-content py-16 ${isArticle ? "xl:pr-72" : ""}`}>
      <div className="p-4">
        <div>
          <h3 className="font-bold text-lg"> {React.string("gadgetlunatic")} </h3>
          <p>
            <a href="https://github.com/kazushisan/gadgetlunatic">
              {React.string("github.com/kazushisan/gadgetlunatic")}
            </a>
          </p>
        </div>
        <div className="mt-4">
          <p>
            {React.string(`© ${year} `)}
            <a href="https://twitter.com/kazushikonosu" className="text-blue-500 hover:text-blue">
              {React.string("@kazushikonosu")}
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
}
