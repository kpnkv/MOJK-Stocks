import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stocks from './pages/Stocks';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<Home />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/stocks' element={<Stocks />}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/contact' element={<Contact/>}/>
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