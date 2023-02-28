type t

let parentElement: t => option<t> = %raw(`e => e.parentElement || undefined`)

let previousElementSibling: t => option<t> = %raw(`e => e.previousElementSibling || undefined`)

@get
external id: t => string = "id"

type boundingClientRect = {
  top: float,
  right: float,
  bottom: float,
  left: float,
  x: float,
  y: float,
  width: float,
  height: float,
}

@send
external getBoundingClientRect: t => boundingClientRect = "getBoundingClientRect"
