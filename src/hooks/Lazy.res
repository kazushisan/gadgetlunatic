type page = {
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

@module("../hooks/useLazy") external useLazyPage: string => page = "useLazyPage"

type latex = {
  path: string,
  title: string,
}

@module("../hooks/useLazy") external useLazyLatexList: unit => array<latex> = "useLazyLatexList"

type post = {
  path: string,
  title: string,
  draft: bool,
  date: string,
  permalink?: string,
  modifiedDate?: string,
  hash?: string,
  weight: int,
}

@module("../hooks/useLazy") external useLazyPostList: unit => array<post> = "useLazyPostList"
