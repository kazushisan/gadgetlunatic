%%raw(`import './index.css'`)
%%raw(`import 'katex/dist/katex.min.css'`)

switch ReactDOM.querySelector("#root") {
| Some(container) => {
    let _ = ReactDOM.Client.hydrateRoot(
      container,
      <Helmet.Provider context={None}>
        <Router.Provider>
          <App />
        </Router.Provider>
      </Helmet.Provider>,
    )
  }

| None => ()
}
