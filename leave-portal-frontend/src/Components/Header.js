import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const role=localStorage.getItem('role');

function Header() {
  const navigate = useNavigate();

  const navigatePage=(path)=>{
    navigate(path);
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

        <Button variant="contained">LogOut</Button>
      </div>
    </div>
  );
}

export default Header;
