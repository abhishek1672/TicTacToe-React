import React, { useState } from "react";

const UseStateHook = () => {

    const [count, setCount] = useState(0);
    return (

        <div>
            <h1>{count}</h1>
            <button onClick={() => { setCount(count + 1) }}>Increament</button>
        </div>


    )
}

export default UseStateHook;

// import React from 'react'

// const UseStateHook = () => {


//   return (
//     <div>UseStateHook</div>
//   )
// }

// export default UseStateHook