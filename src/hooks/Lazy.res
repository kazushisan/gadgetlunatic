@module("../hooks/useLazy") external useLazyPage: string => Page.t = "useLazyPage"

type page = {
  path: string,
  title: string,
}

@module("../hooks/useLazy") external useLazyLatexPages: unit => array<page> = "useLazyLatexPages"

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
