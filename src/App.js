import Canvas from "./Canvas";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1 id="title">United States Educational Attainment</h1>
        <h4 id="description">
          Percentage of adults age 25 and older with a bachelor's degree or
          higher (2010-2014)
        </h4>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
