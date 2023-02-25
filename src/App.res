@react.component
let make = () => {
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
}
