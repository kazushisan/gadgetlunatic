let year = Js.Date.getFullYear(Js.Date.make())->Js.Float.toString

@react.component
let make = () => {
  <footer className="bg-slate-100 overflow-hidden">
    <div className="container mx-auto max-w-4xl my-8 px-4">
      <div className="my-4">
        <h3 className="font-bold"> {React.string("gadgetlunatic")} </h3>
        <p>
          {React.string("Created by ")}
          <a href="https://twitter.com/kazushikonosu"> {React.string("@kazushikonosu")} </a>
        </p>
        <p>
          {React.string("Github ")}
          <a href="https://github.com/kazushisan"> {React.string("kazushisan")} </a>
        </p>
      </div>
      <div className="my-4">
        <p>
          {React.string("This website is managed on ")}
          <a href="https://github.com/kazushisan/gadgetlunatic">
            {React.string("github.com/kazushisan/gadgetlunatic")}
          </a>
        </p>
      </div>
      <div className="my-4">
        <p> {React.string(`© ${year} gadgetlunatic`)} </p>
      </div>
    </div>
  </footer>
}
