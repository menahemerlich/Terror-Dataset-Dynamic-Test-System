import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import DataPage from './pages/DataPage';
import { DataProvider } from './components/DataProvider';
import TestPage from './pages/TestPage';

function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DataPage />} />
          <Route path='/test' element={<TestPage/>}/>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
