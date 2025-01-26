import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './Components/AuthForm';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/signin" element={<AuthForm />} />
      <Route path="/signup" element={<AuthForm />} />
    </Route>
    </Routes>
  );
}

export default App;
