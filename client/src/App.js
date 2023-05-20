import './App.css';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/register';
import FloatingLabel from './ui-kit/floating-label/FloatingLabel';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root /> }>
        <Route index element={<Home /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/register' element={<Register /> } />
      </Route>
    )
  )

  return (
    <>
      <Header />
      <main className="main">
        <RouterProvider router={router} />
      </main>
    </>
  );
}

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
