import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { deleteLeaveRequest, takeActionOnLeaveRequest } from '../Utility/db-utility';
import Loading from './Loading';
import MessageSnackBar from '../Components/MessageSnackBar';
import { reloadPage } from '../Utility/utility';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
const role=localStorage.getItem('role');

function RequestModal(props) {
  const [isLoading, setIsLoading]=useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleActionClick=async (id, action)=>{
    setIsLoading(true);

    try{
      const response=action==="delete" ? await deleteLeaveRequest(props.data.id) : await takeActionOnLeaveRequest(id, action);
      
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
    <Box sx={style}>
      {isLoading && <Loading />}
      <MessageSnackBar isOpen={showSnackBar} message={snackBarMessage} handleClose={()=>setShowSnackBar(false)}/>

      <h2>Leave Request</h2>

      <div>Employee Name: {props.data.employeename}</div>
      <br />
      <div>Employee Email: {props.data.employeeemail}</div>
      <br />
      <div>Leave Duration: {props.data.fromdate + " - " + props.data.todate}</div>
      <br />
      <div>Reasoon for Leave: {props.data.leavereason}</div>
      <br />
      <div>Action: {props.data.action}</div>

      <div style={{ margin: "20px", display: "flex", justifyContent: "space-evenly" }}>
          {props.data.action==='pending' && role==='supervisor' && <Button variant="contained" onClick={()=>{handleActionClick(props.data.id, 'accept')}} >Approve</Button>}
          {props.data.action==='pending' && role==='supervisor' && <Button variant="contained" onClick={()=>{handleActionClick(props.data.id, 'reject')}} >Reject</Button>}
          <Button variant="contained" onClick={()=>{handleActionClick(props.data.id, 'delete')}} >Delete</Button>
      </div>
    </Box>
  );
}

export default RequestModal;
