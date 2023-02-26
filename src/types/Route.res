type t = {
  path: string,
  title: string,
  draft: bool,
  date: string,
  permalink?: string,
  modifiedDate?: string,
  hash?: string,
  weight: int,
  headings: Js.Array.t<Heading.t>,
  element: React.element,
}
