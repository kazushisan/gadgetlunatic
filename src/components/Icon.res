let orEmptyString = (value: option<string>) =>
  switch value {
  | Some(result) => result
  | None => ""
  }

module Menu = {
  @react.component
  let make = (~className: option<string>=?) =>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-6 h-6 ${orEmptyString(className)}`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
}

module Close = {
  @react.component
  let make = (~className: option<string>=?) => {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-6 h-6 ${orEmptyString(className)}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  }
}
