import React from 'react';
import { QueryPayload } from 'server';

const App = () => {
  const a = 'aa';
  return (
    <div className="App">
      <button
        onClick={() => {
          fetch('http://localhost:3001/data', {})
            .then((res) => res.json())
            .then((data: QueryPayload) => console.log(data.foo));
        }}>
        Click me
      </button>
    </div>
  );
};

export default App;
