@react.component
let make = () => {
  <div>
    <h1> {React.string("gadgetlunatic")} </h1>
    <Link to="/post"> {React.string("Post")} </Link>
    <Link to="/latex"> {React.string("LaTeX")} </Link>
  </div>
}
