import React from "react"
import ReactDOM from "react-dom"

import Main from "./pages/main.jsx"


import 'react-multi-carousel/lib/styles.css';
import "./styles/main.scss"


function App() {
  return <Main />
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
