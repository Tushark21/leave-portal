import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RequestViewPage from './Pages/RequestViewPage';
import LeaveRequestPage from './Pages/LeaveRequestPage';
import Error from './Pages/Error';

function App() {
  const role=localStorage.getItem('role');

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        
        <div className="main-container" >
          <Routes>
            <Route exact path="/login" element={<RequestViewPage />} />
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route exact path="/requests" element={<RequestViewPage />} />
            <Route exact path="/apply-leave" element={role==='employee' ? <LeaveRequestPage /> : <Navigate to="/requests" />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
      <br />
    </div>
  );
}

export default App;
