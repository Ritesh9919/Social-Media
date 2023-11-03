import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getPosts } from '../api';
import { Home, Login, Signup, Settings } from '../pages';
import { Loader } from './Loader';
import Navbar from './Navbar';
import { useAuth } from '../hooks/useProvideAuth';

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
          <Route path="/setting" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
