import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Register from './pages/register';
import CreateReciepes from './pages/create-reciepes';
import SavedReciepes from './pages/saved-reciepes';
import { Navbar } from './components/navbar';
import Login from './pages/login';


function App() {

  return (
    <div className="App">
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/create-reciepe' element={<CreateReciepes/>}/>
        <Route path='/saved-reciepes' element={<SavedReciepes/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
