%%raw(`import './index.css'`)
%%raw(`import 'katex/dist/katex.min.css'`)

switch ReactDOM.querySelector("#root") {
| Some(container) => {
    let _ = ReactDOM.Client.hydrateRoot(
      container,
      <Router.Provider>
        <App />
      </Router.Provider>,
    )
  }

| None => ()
}
