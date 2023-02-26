let formatDateFromIso = value => {
  open Intl.DateTimeFormat
  let date = Js.Date.fromString(value)
  let options = {dateStyle: "long"}

  make("en-US", options)->format(date)
}

@react.component
let make = (
  ~date: string,
  ~permalink: option<string>=?,
  ~modifiedDate: option<string>=?,
  ~hash: option<string>=?,
) => {
  <div className="text-sm text-slate-500 items-center">
    <span> {date->formatDateFromIso->React.string} </span>
    {modifiedDate->Belt.Option.mapWithDefault(React.null, d =>
      <span className="before:content-['·'] before:px-1">
        {`last updated ${formatDateFromIso(d)}`->React.string}
      </span>
    )}
    {switch (permalink, hash) {
    | (Some(l), Some(h)) =>
      <>
        <span className="before:content-['·'] before:px-1">
          {"latest commit "->React.string}
        </span>
        <a
          target="_blank"
          rel="noreferrer"
          href={l}
          className="bg-slate-50 inline- text-sm text-slate-700 inline-block border-slate-200 border rounded-sm px-1 font-mono ml-1 align-top">
          {Js.String2.slice(h, ~from=0, ~to_=7)->React.string}
        </a>
      </>
    | (_, _) => React.null
    }}
  </div>
}
