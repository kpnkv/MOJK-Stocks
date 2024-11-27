import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Stocks from './pages/Stocks/Stocks';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PageNotFound from './pages/PageNotFound/PageNotFound';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<Home />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/stocks' element={<Stocks />}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Route>
    )
  );

  return (
      <div className="App">
        <RouterProvider router = {router} />;
      </div>
    );
}

export default App;