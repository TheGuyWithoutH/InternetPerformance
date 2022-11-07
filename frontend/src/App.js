import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Pages/Home'
import DataOverview from "./Pages/DataOverview";
import Redirect from './Components/Redirect';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
          <Route path="/data" element={<DataOverview/>}/>
          <Route path="/about"/>
        </Routes>
    </Router>
  );
}

export default App;