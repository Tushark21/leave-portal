import Loading from './Loading';
import MessageSnackBar from '../Components/MessageSnackBar';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { applyLeave } from '../Utility/db-utility';
import { validate, validateEmail, generateLeaveRequestData, reloadPage } from '../Utility/utility';

const inputStyle={ width: "40%", margin: "10px" };

function LeaveRequestComponenet(props) {
  const [supervisorName, setSupervisorName]=useState("");
  const [supervisorEmail, setSupervisorEmail]=useState("");
  const [employeeName, setEmployeeName]=useState("");
  const [employeeEmail, setEmployeeEmail]=useState("");
  const [fromDate, setFromDate]=useState(null);
  const [toDate, setToDate]=useState(null);
  const [reason, setReason]=useState("");
  const [isLoading, setIsLoading]=useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const onSubmit=async ()=>{
    
    setIsLoading(true);
    if(!validate(supervisorName) || !validateEmail(supervisorEmail) || !validate(employeeName) || !validateEmail(employeeEmail) ||
      !validate(fromDate) || !validate(toDate) || !validate(reason)){
        setSnackBarMessage("invalid data");
        setShowSnackBar(true);

        setIsLoading(false);
        return;
    }

    const leaveData=generateLeaveRequestData(supervisorName, supervisorEmail, employeeName, employeeEmail, fromDate, toDate, reason);
    
    try{
      const response=await applyLeave(leaveData);
      
      if(response.message==="success"){
        setSnackBarMessage(response.message);
        setShowSnackBar(true);
        reloadPage();
      }
      else{
        setSnackBarMessage(response.message);
        setShowSnackBar(true);
      }
    }
    catch(e){
      setSnackBarMessage("something went wrong");
      setShowSnackBar(true);
    }

    setIsLoading(false);
  }

  return (
    <div className="row-fill-container" >
      {isLoading && <Loading />}
      <MessageSnackBar isOpen={showSnackBar} message={snackBarMessage} handleClose={()=>setShowSnackBar(false)}/>

      <TextField id="supervisor-name" label="Supervisor Name" onChange={(e)=>setSupervisorName(e.target.value)} sx={inputStyle} />

      <TextField id="supervisor-email" label="Supervisor Email" onChange={(e)=>setSupervisorEmail(e.target.value)} sx={inputStyle} />

      <TextField id="employee-name" label="Employee Name" onChange={(e)=>setEmployeeName(e.target.value)} sx={inputStyle} />

      <TextField id="employee-email" label="Employee Email" onChange={(e)=>setEmployeeEmail(e.target.value)} sx={inputStyle} />
        
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="From" value={fromDate} onChange={(d) => setFromDate(d)} sx={inputStyle} />
        <DatePicker label="To" value={toDate} onChange={(d) => setToDate(d)} sx={inputStyle} />
      </LocalizationProvider>
      
      <TextField
        id="leave-reason"
        label="Reason for Leave"
        multiline
        rows={2}
        sx={{ width: "80%", margin: "10px" }}
        onChange={(e)=>setReason(e.target.value)}
      />

      <Button variant="contained" onClick={()=>onSubmit()} >Submit</Button>
    </div>
  );
}

export default LeaveRequestComponenet;
