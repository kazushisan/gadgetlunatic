@react.component
let make = (~title: string) => {
  <Helmet>
    <title> {React.string(title)} </title>
  </Helmet>
}
