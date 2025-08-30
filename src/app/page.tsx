"use client";

import { useState  } from "react";

export default function home(){
  const [count, SetCount] = useState(0);
  return (
    <div>
    <h1>count : {count}</h1>
    <button onClick={() => SetCount(count+1)}> Increment</button>
    </div>
  );
}