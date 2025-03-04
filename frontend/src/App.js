import logo from './logo.svg';
import './App.css';
import {Routes, Route, Router} from "react-router-dom"
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<LandingPage/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/Register" element={<Register/>}> </Route>
        <Route path="/Profile" element={<Profile/>}> </Route>
        <Route path="*" element={<NotFound/>}> </Route>
        </Routes>

      </div>
  );
}

export default App;
