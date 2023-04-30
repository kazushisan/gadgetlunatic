%%raw(`import './index.css'`)
%%raw(`import 'katex/dist/katex.min.css'`)

@react.component
let make = (~serverUrlString: string) => {
  <Router.Provider serverUrlString>
    <App />
  </Router.Provider>
}
