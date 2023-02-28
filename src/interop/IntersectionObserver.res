type t

@new
external make: (unit => unit) => t = "IntersectionObserver"

@send
external observe: (t, Element.t) => unit = "observe"

@send
external disconnect: t => unit = "disconnect"
