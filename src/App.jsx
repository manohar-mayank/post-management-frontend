
import { RouterProvider } from 'react-router-dom';
import './App.css'
import Routes from './routes/Routes';
import { Toaster } from 'sonner';

function App() {
 return(
  <>
  <Toaster richColors closeButton position='top-right'/>
  <RouterProvider router={Routes}/>
  </>
 )
}

export default App;
