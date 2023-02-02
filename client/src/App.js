
import { BrowserRouter } from 'react-router-dom';
import './App.module.css';
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
