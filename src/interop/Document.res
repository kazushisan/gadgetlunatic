type t

@val
external document: t = "document"

@send
external querySelectorAll: (t, string) => Js.Array2.array_like<Element.t> = "querySelectorAll"

let getElementById: (t, string) => option<Element.t> = %raw(`(d, i) => d.getElementById(i)`)
