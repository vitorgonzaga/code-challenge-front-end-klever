import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import AddToken from '../pages/AddToken';
import EditToken from '../pages/EditToken';
import Home from '../pages/Home';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/addtoken" element={<AddToken />} />
        <Route exact path="/editpage" element={<EditToken />} />
      </Routes>
    </BrowserRouter>
  );
}
