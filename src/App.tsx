import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const test = (): string => {
    let str = 'hello world';
    console.log(`${str}`);
    return str;
  };

  function test2(): string {
    let str = 'hello world again';
    return str;
  }

  test();
  console.log(test2());

  function test4(v1: string, v2: string) {
    //等价于 test4(String v1, String v2)
  }

  function test5(v1: string, v2: string = 'default') {
    //等价于 test5(String v1, [String v2 = 'default'])
  }

  function test1(v1: string, v2?: string) {
    //等价于 test5(String v1, [String? v2])
  }

  function test6(
    v1: string,
    {
      v2, //默认值为undefined
      v3 = 'default',
    }: {
      v2?: string;
      v3?: string;
    } = {},
  ) {
    //等价于 test6(String v1, {String? v2, String v2 = 'default'})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>CI/CD test</p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
