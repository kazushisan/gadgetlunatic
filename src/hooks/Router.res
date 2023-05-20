@module("react") external startTransition: ((. unit) => unit) => unit = "startTransition"

let track: unit => unit = %raw(`
function track() {
  if (window.location.host === 'gadgetlunatic.com') {
    gtag('event', 'page_view');
  } else {
    console.log('page_view');
  }
}
`)

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

// from https://github.com/rescript-lang/rescript-react/blob/f8964f29a38f2301afcf02277ce5ee4caf970f54/src/RescriptReactRouter.res#L143
let urlNotEqual = (a: RescriptReactRouter.url, b: RescriptReactRouter.url) => {
  let rec listNotEqual = (aList, bList) =>
    switch (aList, bList) {
    | (list{}, list{}) => false
    | (list{}, list{_, ..._})
    | (list{_, ..._}, list{}) => true
    | (list{aHead, ...aRest}, list{bHead, ...bRest}) =>
      if aHead !== bHead {
        true
      } else {
        listNotEqual(aRest, bRest)
      }
    }
  a.hash !== b.hash || (a.search !== b.search || listNotEqual(a.path, b.path))
}

// modified based on https://github.com/rescript-lang/rescript-react/blob/f8964f29a38f2301afcf02277ce5ee4caf970f54/src/RescriptReactRouter.res#L185
// to add React.startTransition
// should be called only once
let useUrl = () => {
  let serverUrl = context->React.useContext

  let (url, setUrl) = React.useState(() => serverUrl)

  let done = React.useRef(false)

  React.useEffect0(() => {
    switch done.current {
    | false => {
        track()
        done.current = true
      }

    | true => ()
    }

    let watcherId = RescriptReactRouter.watchUrl(url => {
      startTransition(
        (. ()) => {
          setUrl(_ => url)
          track()
        },
      )
    })

    // check for updates that may have occured between the initial state and
    // the subscribe above
    let newUrl = RescriptReactRouter.dangerouslyGetInitialUrl()
    if urlNotEqual(newUrl, url) {
      startTransition((. ()) => {
        setUrl(_ => newUrl)
      })
    }

    Some(() => RescriptReactRouter.unwatchUrl(watcherId))
  })

  url
}

let push = string => RescriptReactRouter.push(string)
