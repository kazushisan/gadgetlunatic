@react.component
let make = (~serverUrlString: string, ~context: option<Helmet.context>) => {
  <React.StrictMode>
    <Helmet.Provider context>
      <Router.Provider serverUrlString>
        <App />
      </Router.Provider>
    </Helmet.Provider>
  </React.StrictMode>
}
