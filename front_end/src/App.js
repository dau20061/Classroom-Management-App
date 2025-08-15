import logo from './logo.svg';
import './App.css';
import AppRouter from "./Router"; 
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
     <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
export default App;
