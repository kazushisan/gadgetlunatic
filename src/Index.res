%%raw(`import './index.css'`)
%%raw(`import 'katex/dist/katex.min.css'`)

switch ReactDOM.querySelector("#root") {
| Some(container) => {
    let root = ReactDOM.Client.createRoot(container)
    root->ReactDOM.Client.Root.render(<App />)
  }

| None => ()
}
