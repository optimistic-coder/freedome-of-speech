
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { EthProvider } from './contexts/EthContext';
import Register from './components/Register';
import Login from './components/Login';
import AddPost from './components/AddPost';
import Logout from './components/LogOut';
import ViewPosts from './components/ViewPost';
import { FadeTransition } from './components/Transitions';

function AnimatedRoutes() {
  const location = useLocation();
  const isLogoutRoute = location.pathname === '/logout';

  return (
    <FadeTransition location={location}>
      <>

      <div className="container">
        {!isLogoutRoute && localStorage.getItem("userHash") ? (
          <Link to="/logout" className="auth-button">Logout</Link>
        ) : ""}
        <Routes location={location}>
          <Route path="/" element={<ViewPosts />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="post" element={<AddPost />} />
          <Route path="*" element={<ViewPosts />} />
        </Routes>
      </div>
      </>
    </FadeTransition>
  );
}

export default function App() {
  return (
    <Router>
      <EthProvider>
        <AnimatedRoutes />
      </EthProvider>
    </Router>
  );
}



// export default App;