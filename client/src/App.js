//CSS imports
import './App.module.css';

//React imports
import { BrowserRouter } from 'react-router-dom';
import Router from './settings/Router';
import UserMenu from './components/UserMenu/UserMenu';


function App() {
  return (
    <div>
      <BrowserRouter>    
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
