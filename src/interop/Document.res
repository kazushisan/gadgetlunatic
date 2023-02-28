@val
external document: Dom.document = "document"

@send
external querySelectorAll: (Dom.document, string) => Js.Array2.array_like<Dom.element> =
  "querySelectorAll"

let getElementById: (
  Dom.document,
  string,
) => option<Dom.element> = %raw(`(d, i) => d.getElementById(i)`)
