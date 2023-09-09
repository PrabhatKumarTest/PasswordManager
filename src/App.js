import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './component/Navbar';
import Homepage from './component/pages/Homepage';
import Login from './component/pages/Login';
import Signup from './component/pages/Signup';

function App() {


  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <section>
          <Routes>
            <Route exact path="/" element={<Homepage />}> </Route>
            <Route exact path="/login" element={<Login />}> </Route>
            <Route exact path="/signup" element={<Signup />}> </Route>
          </Routes>
        </section>
        <footer>
          <div className="footer container">

          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;