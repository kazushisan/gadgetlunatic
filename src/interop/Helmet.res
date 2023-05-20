@react.component @module("react-helmet-async")
external make: (~children: React.element) => React.element = "Helmet"

type context

module Provider = {
  @react.component @module("react-helmet-async")
  external make: (~children: React.element, ~context: option<context>) => React.element =
    "HelmetProvider"
}
