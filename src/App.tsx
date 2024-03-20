import { RouterProvider } from "react-router-dom";
import routes from "./config/routes";
import "./App.css"

function App() {

  return (
    <>
      <main className="App">
        <RouterProvider router={routes} />
      </main>
    </>
  );
}

export default App;