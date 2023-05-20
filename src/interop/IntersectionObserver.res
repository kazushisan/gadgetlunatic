// todo: add support to use args in callback
@new external make: (unit => unit) => Dom.intersectionObserver = "IntersectionObserver"

@send external observe: (Dom.intersectionObserver, Dom.element) => unit = "observe"

@send external disconnect: Dom.intersectionObserver => unit = "disconnect"
