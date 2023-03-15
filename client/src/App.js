//CSS imports
import './App.module.css';

//React imports
import { BrowserRouter } from 'react-router-dom';
import Router from './settings/Router';



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
