/// <reference types="vite/client" />
import * as ReactDOM from "react-dom/client";
const pages = import.meta.glob("../content/**/*.{md,mdx}", { eager: true });

console.log({ pages });

const App = Object.values(pages)[0].default;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
