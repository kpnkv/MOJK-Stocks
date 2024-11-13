import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stocks from './pages/Stocks';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<Home />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/stocks' element={<Stocks />}/>
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