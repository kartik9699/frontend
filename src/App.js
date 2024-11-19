
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'

//import Navbar from './Components/Navbar';
//import Card from './Components/Card';
// import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
//import Slider from './Components/Slider';
import Home from './Screens/Home';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from './Screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
    <div className="App ">
      <Routes>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
     
      <Route path='myorder' element={<MyOrder />} />
      
      
      </Routes>
    </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
