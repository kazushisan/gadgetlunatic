%%raw(`import './index.css'`)
%%raw(`import 'katex/dist/katex.min.css'`)

@react.component
let make = (~serverUrlString: string, ~context: option<Helmet.context>) => {
  <Helmet.Provider context>
    <Router.Provider serverUrlString>
      <App />
    </Router.Provider>
  </Helmet.Provider>
}
