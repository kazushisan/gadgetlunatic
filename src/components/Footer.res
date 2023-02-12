let year = Js.Date.getFullYear(Js.Date.make())->Js.Float.toString

@react.component
let make = () => {
  <footer>
    <div>
      <div>
        <h3> {React.string("gadgetlunatic")} </h3>
        <p>
          {React.string("Created by ")}
          <a href="https://twitter.com/kazushikonosu"> {React.string("@kazushikonosu")} </a>
        </p>
        <p>
          {React.string("Github ")}
          <a href="https://github.com/kazushisan"> {React.string("kazushisan")} </a>
        </p>
      </div>
      <div>
        <p>
          {React.string("This website is managed on ")}
          <a href="https://github.com/kazushisan/gadgetlunatic">
            {React.string("github.com/kazushisan/gadgetlunatic")}
          </a>
        </p>
      </div>
      <div>
        <p> {React.string(`© ${year} gadgetlunatic`)} </p>
      </div>
    </div>
  </footer>
}
