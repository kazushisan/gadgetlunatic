let context = React.createContext(RescriptReactRouter.dangerouslyGetInitialUrl())

module ContextProvider = {
  let make = React.Context.provider(context)
}

module Provider = {
  @react.component
  let make = (~children: React.element, ~serverUrlString=?) => {
    let url = RescriptReactRouter.dangerouslyGetInitialUrl(~serverUrlString?, ())
    <ContextProvider value={url}> {children} </ContextProvider>
  }
}

let useUrl = () => {
  let url = context->React.useContext

  RescriptReactRouter.useUrl(~serverUrl=url, ())
}

@module("react") external startTransition: ((. unit) => unit) => unit = "startTransition"

let push = string => {
  startTransition((. ()) => {
    RescriptReactRouter.push(string)
  })
}
