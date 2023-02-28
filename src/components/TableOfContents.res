let getPosition = element => {
  let sibling =
    element
    ->Element.parentElement
    ->Belt.Option.mapWithDefault(None, e => e->Element.previousElementSibling)

  sibling->Belt.Option.getWithDefault(element)->Element.getBoundingClientRect->DomRect.bottom
}

let getHeadingElements = (headings: array<Heading.t>) => {
  open Document

  let selector = headings->Js.Array2.map(heading => `#${heading.id}`)->Js.Array2.joinWith(",")
  document->querySelectorAll(selector)->Js.Array.from
}

type target = {
  position: float,
  id: string,
}

let useTableOfContentsActiveItem = (headings: array<Heading.t>) => {
  let (activeId, setActiveId) = React.useState(() => None)

  React.useEffect1(() => {
    switch headings->Js.Array2.length {
    | 0 => Some(() => ())
    | _ => {
        open IntersectionObserver
        let observer = make(() => {
          let headingElements = getHeadingElements(headings)

          if headingElements->Js.Array2.length > 0 {
            let target = headingElements->Js.Array2.reduce(
              (acc, cur) => {
                let position = cur->getPosition

                switch position > 0. || acc.position > position {
                | true => acc
                | false => {
                    position,
                    id: cur->Element.id,
                  }
                }
              },
              {
                position: getPosition(headingElements[0]),
                id: headingElements[0]->Element.id,
              },
            )

            if activeId !== Some(target.id) {
              setActiveId(_ => Some(target.id))
            }
          }
        })

        headings->Js.Array2.forEach(({id}) => {
          open Document
          let element = document->getElementById(`${id}`)
          let sibling =
            element
            ->Belt.Option.mapWithDefault(None, e => e->Element.parentElement)
            ->Belt.Option.mapWithDefault(None, e => e->Element.previousElementSibling)

          switch (sibling, element) {
          | (Some(s), _) => observer->observe(s)
          | (None, Some(e)) => observer->observe(e)
          | (None, None) => ()
          }
        })

        Some(() => observer->disconnect)
      }
    }
  }, [headings])

  activeId
}

@react.component
let make = (~headings: Js.Array.t<Heading.t>) => {
  let activeId = useTableOfContentsActiveItem(headings)
  <ul>
    {headings
    ->Js.Array2.filter(heading => heading.depth == 2 || heading.depth == 3)
    ->Js.Array2.map(heading =>
      <li
        key={heading.id}
        className={`list-none px-2 py-1 my-1 block text-sm ${switch (
            heading.depth,
            Some(heading.id) === activeId,
          ) {
          | (2, true) => "bg-blue-100 text-blue-500 rounded font-bold"
          | (2, false) => "text-slate-700"
          | (_, true) => "bg-blue-100 text-blue-500 rounded ml-2 font-bold"
          | (_, false) => "text-slate-700 ml-2"
          }}`}>
        <a href={`#${heading.id}`}> {React.string(heading.value)} </a>
      </li>
    )
    ->React.array}
  </ul>
}
