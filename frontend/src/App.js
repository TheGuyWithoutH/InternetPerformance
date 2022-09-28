import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Pages/Home'
import Redirect from './Components/Redirect';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
          <Route path="/data" element={<Redirect url={ "http://localhost:3000/api/query?long=0.1967691&lat=48.0074054&maxDistance=500000&start=1623354373&end=1623369600" } />}/>
          <Route path="/about"/>
        </Routes>
    </Router>
  );
}

export default App;