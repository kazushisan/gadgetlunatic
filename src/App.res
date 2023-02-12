module HeadingProvider = {
  @module("./components/HeadingProvider") @react.component
  external make: (~children: React.element) => React.element = "HeadingProvider"
}

@react.component
let make = () => {
  <HeadingProvider>
    <Header />
    <div className="flex flex-col min-h-screen">
      <div className="flex-none h-[116px]" />
      <div className="flex-auto overflow-hidden">
        <Routes />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  </HeadingProvider>
}
