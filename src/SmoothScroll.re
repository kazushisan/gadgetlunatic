type options = {. "offset": Dom.element => float};

type scroll;

[@bs.new] [@bs.module]
external createScroll: (string, options) => scroll = "smooth-scroll";

[@bs.send]
external animateScroll: scroll => unit = "animateScroll";
