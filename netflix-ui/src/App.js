import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";  
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from './pages/Player';
import Search from './components/Search'
import MyList from './pages/MyList';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Netflix />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/mylist" element={<MyList />} />

        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;