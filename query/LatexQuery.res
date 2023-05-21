type result = {
  title: string,
  path: string,
  date: string,
  modifiedDate: option<string>,
}

let query = (list: array<Extract.item>) =>
  list
  ->Js.Array2.map(Extract.extract)
  ->Js.Array2.filter(item => item.path -> Js.String2.startsWith("/latex"))
  ->Js.Array2.sortInPlaceWith((a, b) => a.weight - b.weight)
  ->Js.Array2.map(({title, path, date, modifiedDate}) => {
    title,
    path,
    date,
    modifiedDate,
  })

let default = query
