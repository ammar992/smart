import Home from './views/home/home';
import { RouterProvider } from 'react-router-dom';
import About from './views/about/about';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from './views/MainPage/mainPage';
import CreateForm from './views/create/create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:'/about',
        element:<About />
      },{
        path:"/create",
        element:<CreateForm />
      }
    ]
  },{
    
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
