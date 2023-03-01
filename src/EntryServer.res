let render = (~serverUrlString: string) => {
  ReactDOMServer.renderToString(
    <Router.Provider serverUrlString>
      <App />
    </Router.Provider>,
  )
}
