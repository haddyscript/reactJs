import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store'; 
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home/Home'; 
import Profile from './components/Profile/Profile'; 
import Login from './pages/Login'; 
import NavBar from "./components/NavBar";
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
        <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            {/* Protected Route */}
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
