module DateTimeFormat = {
  type options = {dateStyle?: string}
  type dateTimeFormat
  @new
  external make: (string, options) => dateTimeFormat = "Intl.DateTimeFormat"

  @send
  external format: (dateTimeFormat, Js.Date.t) => string = "format"
}
