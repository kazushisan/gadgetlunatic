open Webapi.Dom

type heading = {
  name: string,
  url: string,
  sub: bool,
  currentPage: option<bool>,
}

let body = Utils.body

@react.component
let make = (~heading: heading, ~current: string) => {
  let onClick = React.useCallback0(_ =>
    Element.classList(body) -> DomTokenList.remove("show-menu") |> Utils.noop1
  )
  let linkClassName = React.useMemo2(() => {
    let currentPage = switch heading.currentPage {
    | Some(value) => value
    | None => false
    }

    let className = current == heading.url ? "toc__link toc__link--on" : "toc__link"

    currentPage ? j`$className toc__link--current-page` : className
  }, (heading, current))

  <li className={heading.sub ? "toc__sub-item" : "toc__item"}>
    <a className=linkClassName href=heading.url onClick> {React.string(heading.name)} </a>
  </li>
}
