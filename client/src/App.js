import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/register';

function App() {
  return (
      <BrowserRouter>
      <Header/>
      </BrowserRouter>
  );
}

export default App;
