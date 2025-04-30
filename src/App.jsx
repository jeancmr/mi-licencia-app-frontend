import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Loginpage';
import Home from './pages/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
