module HeadingProvider = {
  @module("./components/HeadingProvider") @react.component
  external make: (~children: React.element) => React.element = "HeadingProvider"
}

@react.component
let make = () => {
  <div>
    <HeadingProvider>
      <Header />
      <div>
        <Routes />
      </div>
    </HeadingProvider>
  </div>
}
