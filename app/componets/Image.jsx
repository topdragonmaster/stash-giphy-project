import React from "react"
import LazyLoad from "react-lazyload";
import Spinner from "./spinner.jsx";


function Image({ src, alt }) {
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <div className="main-results__item">
      <div className="main-results__item placeholder">
        <Spinner />
      </div>
      <LazyLoad>
        <img src={src} alt={alt} onLoad={removePlaceholder}
          onError={removePlaceholder}></img>
      </LazyLoad>
    </div>
  )
}

export default Image