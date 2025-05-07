import './App.css';
import Homepage from './component/Homepage';
import Result from './component/Result';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/result/:gameId' element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
