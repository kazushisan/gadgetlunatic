type load

type page = {
  title: string,
  date: string,
  permalink?: string,
  modifiedDate?: string,
  hash?: string,
  weight: int,
  headings: Js.Array.t<Heading.t>,
  element: React.element,
}

@module("./useLazy") external useLazyPage: (string, load) => page = "useLazyPage"

type latex = {
  path: string,
  title: string,
  date: string,
  modifiedDate?: string,
}

@module("./useLazy") external useLazyLatexList: unit => array<latex> = "useLazyLatexList"

type post = {
  path: string,
  title: string,
  date: string,
  permalink?: string,
  modifiedDate?: string,
  hash?: string,
  weight: int,
}

@module("./useLazy") external useLazyPostList: unit => array<post> = "useLazyPostList"
