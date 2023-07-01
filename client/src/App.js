import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Service from './components/service/Service';
// import About from './components/about/About';
import Contact from './components/contact/Contact';
import Register from './components/register/register';
import NotFound from './components/notFound/NotFound';
import Loading from './components/loading/Loading';
import HomeDash from './components/dashboard/home/HomeDash';

const LazyAbout = React.lazy(()=>import('./components/about/About'))

function App() {
  return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home/> } />
        <Route path='login' element={<Login/> } />
        <Route path='register' element={<Register/> } />
        <Route path='services' element={<Service/> } />
        <Route path='about' element={<React.Suspense fallback={<Loading/>}>
          <LazyAbout></LazyAbout>
        </React.Suspense> } />
        <Route path='contact' element={<Contact/> } />
        <Route path='dashboard' element={<HomeDash/>} />
        <Route path='*' element={<NotFound/> } />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
