let getTime = (date: string) => {
  (Js.Date.fromString(date)->Js.Date.getTime /. 1000.)->Belt.Int.fromFloat
}
let query = (list: array<Extract.item>) =>
  list
  ->Js.Array2.map(Extract.extract)
  ->Js.Array2.filter(item => item.path->Js.String2.startsWith("/post"))
  ->Js.Array2.sortInPlaceWith((a, b) => getTime(b.date) - getTime(a.date))

let default = query
