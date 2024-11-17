import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { reloadPage } from "../Utility/utility";

function Header() {
  const role=localStorage.getItem('role') || 'employee';
  const navigate = useNavigate();

  const navigatePage=(path)=>{
    navigate(path);
  }

  const logout=()=>{
    if(role==='employee'){
      localStorage.setItem('role', 'supervisor');
      localStorage.setItem('email', 'karkare@gmail.com');
    }
    else{
      localStorage.setItem('role', 'employee');
      localStorage.setItem('email', 'ashish@gmail.com');
    }

    reloadPage();
  }

  return (
    <div className="header">
      <h1>
        Leave Portal
      </h1>

      <div style={{ width: "100%", display: "flex", justifyContent: "Space-between"}}>
        <div>
          <Button variant="contained" onClick={()=>navigatePage('./requests')} >All Requests</Button>
          {role==='employee' && <Button variant="contained" onClick={()=>navigatePage('./apply-leave')} >Apply Leave</Button>}
        </div>

        <Button variant="contained" onClick={()=>logout()} >LogOut</Button>
      </div>

      <h3>{role}</h3>
    </div>
  );
}

export default Header;
