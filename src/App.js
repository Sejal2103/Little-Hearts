import Home from './screens/Home';
import LandingPage from './screens/LandingPage';
import Register from './screens/Register';
import MyOrders from './screens/MyOrders';
import { CartProvider } from './components/CreateContext';
import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './screens/Login';
function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Register />} />
          <Route exact path='/myorders' element={<MyOrders />} />
          
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
