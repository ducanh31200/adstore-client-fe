import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./route/route";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <Toaster
        reverseOrder={false}
        position="top-right"
        containerStyle={{ top: 145 }}
      />
    </div>
  );
}

export default App;
