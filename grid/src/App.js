import './App.css';
import TextForm from './components/TextForm';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>

      <Navbar />


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TextForm heading="Employee Details" />} />
          <Route path="TextForm" element={<TextForm heading="Employee Details" />} />
          <Route path="Grid" element={<Grid heading="Employee Details"/>} />


        </Routes>
      </BrowserRouter>



    </>
  );
}

export default App;
