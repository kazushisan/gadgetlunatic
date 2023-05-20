@react.component
let make = (~title: string, ~path: string) => {
  <Helmet>
    <title> {React.string(title)} </title>
    <link rel="canonical" href={`https://gadgetlunatic.com${path}`} />
  </Helmet>
}
