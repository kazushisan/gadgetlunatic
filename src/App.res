module HeadingProvider = {
  @module("./components/HeadingProvider") @react.component
  external make: (~children: React.element) => React.element = "HeadingProvider"
}

@react.component
let make = () => {
  <div>
    <HeadingProvider>
      <h1> {React.string("gadgetlunatic")} </h1>
      <div>
        <Routes />
      </div>
    </HeadingProvider>
  </div>
}
