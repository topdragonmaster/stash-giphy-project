import React, { useState, useContext, useEffect, useRef, useCallback } from "react"

function Spinner() {
  return (
    <div class="lds-ripple"><div></div><div></div></div>
  )
}

export default Spinner