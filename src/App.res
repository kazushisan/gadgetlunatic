module HeadingProvider = {
  @module("./components/HeadingProvider") @react.component
  external make: (~children: React.element) => React.element = "HeadingProvider"
}

@react.component
let make = () => {
  <HeadingProvider>
    <div className="flex flex-col min-h-screen">
      <div className="flex-none">
        <Header />
      </div>
      <div className="flex-auto">
        <Routes />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  </HeadingProvider>
}
