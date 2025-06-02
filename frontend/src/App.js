import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Create from './components/Create/Create';
import Read from './components/Read/Read';
import Update from './components/Update/Update';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path = "/" element={<Home/>} />
          <Route exact path = "/create" element={<Create/>} />
          <Route path = "/all" element={<Read/>} />
          <Route path = "/:id" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
