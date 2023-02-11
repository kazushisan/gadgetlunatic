/// <reference types="vite/client" />
import * as ReactDOM from "react-dom";
const pages = import.meta.glob("../content/**/*.{md,mdx}", { eager: true });

console.log({ pages });

const Root = Object.values(pages)[0].default;

ReactDOM.render(<Root />, document.getElementById("root"));
