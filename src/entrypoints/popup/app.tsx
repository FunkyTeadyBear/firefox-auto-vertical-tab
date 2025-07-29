import { useState } from "react";
import EnabledToggle from "@/components/enabled-toggle";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./app.css";
import { useIsFirstRender } from "@/hooks/is-first-render";

function App() {
  const [count, setCount] = useState(0);

  const [enabled, setEnabled] = useState<boolean>(true);
  const [widthThreshold, setWidthThreshold] = useState<number>(1080);

  const isFirstRender = useIsFirstRender();

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <EnabledToggle />
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
