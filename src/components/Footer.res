let year = Js.Date.getFullYear(Js.Date.make())->Js.Float.toString

@react.component
let make = () => {
  <footer className="overflow-hidden bg-slate-100">
    <div className="container max-w-4xl mx-auto xl:px-72 box-content my-16">
      <div className="my-4 px-4">
        <h3 className="font-bold text-lg"> {React.string("gadgetlunatic")} </h3>
        <p>
          <a href="https://github.com/kazushisan/gadgetlunatic">
            {React.string("github.com/kazushisan/gadgetlunatic")}
          </a>
        </p>
      </div>
      <div className="my-4 px-4">
        <p>
          {React.string(`© ${year} `)}
          <a href="https://twitter.com/kazushikonosu" className="text-blue-500 hover:text-blue"> {React.string("@kazushikonosu")} </a>
        </p>
      </div>
    </div>
  </footer>
}
