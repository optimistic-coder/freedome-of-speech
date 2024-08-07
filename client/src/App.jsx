
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EthProvider } from './contexts/EthContext';
import Register from './components/Register';
import Login from './components/Login';
import AddPost from './components/AddPost';
import Logout from './components/LogOut';
import ViewPosts from './components/ViewPost';

export default function App() {
  
  return (
    <div>
      <h1>Basic Example</h1>
      <Router>
      <EthProvider> 
       <Routes> 
         <Route path="/" element={<ViewPosts />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="post" element={<AddPost />} />
          <Route path="*" element={<ViewPosts />} />
      </Routes> 
      </EthProvider>
      </Router>
    </div>
  );
}

// function NoMatch() {
//   return (
//     <div>
//       <h2>Nothing to see here!</h2>
//       <p>
//         <Link to="/">Go to the home page</Link>
//       </p>
//     </div>
//   );
// }

// import React from 'react';
// import { EthProvider } from './contexts/EthContext';
// import Home from './components/Home';

// const App=()=>{
//   return(<EthProvider>
//     <Home/>
//   </EthProvider>)
// }





// export default App;