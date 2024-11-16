import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RequestViewPage from './Pages/RequestViewPage';
import LeaveRequestPage from './Pages/LeaveRequestPage';
import Error from './Pages/Error';

function App() {
  localStorage.setItem('role', 'employee');
  localStorage.setItem('email', 'karkare@gmail.com');

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        
        <div className="main-container" >
          <Routes>
            <Route exact path="/login" element={<RequestViewPage />} />
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route exact path="requests" element={<RequestViewPage />} />
            <Route exact path="apply-leave" element={<LeaveRequestPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
      <br />
    </div>
  );
}

export default App;
