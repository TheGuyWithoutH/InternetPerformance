/**
 * @file Main App component
 * @author Ugo Balducci
 * @version 1.0.0
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Pages/Home'
import DataOverview from "./Pages/DataOverview";
import './Assets/Styles/Globals.css'
import Search from "./Pages/Search";
import Papers from "./Pages/Papers";
import About from "./Pages/About";
import Header from "./Components/Header";


function App() {
  return (
      <Router>
        <div className='page'>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/overview" element={<DataOverview/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/papers" element={<Papers/>}/>
              <Route path="/about" element={<About/>}/>
            </Routes>
        </div>
      </Router>
  );
}

export default App;