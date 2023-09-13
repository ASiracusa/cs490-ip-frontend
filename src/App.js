import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/hello").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, []);

  return (
    <div>
      <h3>{
        (typeof backendData.hello === 'undefined') ?
          "Loading..." : backendData.hello
      }</h3>
    </div>
  )
}

export default App