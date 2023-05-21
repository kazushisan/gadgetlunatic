type data = {
  title: option<string>,
  date: option<string>,
  permalink: string,
  modifiedDate: option<string>,
  hash: string,
  weight: option<int>,
}

type item = {
  data: data,
  path: string,
}

type result = {
  path: string,
  title: string,
  date: string,
  permalink: string,
  modifiedDate: option<string>,
  hash: string,
  weight: int,
}

exception InvalidDataException(string)

let extract = ({path, data}): result => {
  if data.title === None {
    Js.Exn.raiseError(`invalid data for ${path}`)
  }

  if data.date === None {
    Js.Exn.raiseError(`invalid data for ${path}`)
  }

  {
    path,
    title: Belt.Option.getWithDefault(data.title, ""),
    date: Belt.Option.getWithDefault(data.date, ""),
    permalink: data.permalink,
    modifiedDate: data.modifiedDate,
    hash: data.hash,
    weight: Belt.Option.getWithDefault(data.weight, 0),
  }
}
