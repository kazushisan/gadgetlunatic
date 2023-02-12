%%raw(`import './index.css'`)

switch ReactDOM.querySelector("#root") {
| Some(container) => {
    let root = ReactDOM.Client.createRoot(container)
    root->ReactDOM.Client.Root.render(<App />)
  }

| None => ()
}
