let parentElement: Dom.element => option<Dom.element> = %raw(`e => e.parentElement || undefined`)

let previousElementSibling: Dom.element => option<
  Dom.element,
> = %raw(`e => e.previousElementSibling || undefined`)

@get external id: Dom.element => string = "id"

@send external getBoundingClientRect: Dom.element => Dom.domRect = "getBoundingClientRect"
