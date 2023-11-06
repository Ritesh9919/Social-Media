import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { getPosts } from '../api';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader } from './Loader';
import Navbar from './Navbar';
import { useAuth } from '../hooks/useProvideAuth';

// function PrivateRoute ({ children, ...rest })  {
//   const auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }
//         return <Navigate to={'/login'} />
//       }}
//     />
//   );
// };

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setting" element={<Settings />}/>
          <Route path="/user/:userId" element={<UserProfile/>}/>
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
