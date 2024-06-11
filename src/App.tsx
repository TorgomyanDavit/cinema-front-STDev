import RoutesProvider from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss"

function App() {

  return (
    <Router>
      {/* <Notifications/> */}
      <RoutesProvider />
    </Router>
  );

}

export default App;