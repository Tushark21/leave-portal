import List from '@mui/material/List';
import ListComponent from '../Components/ListComponent';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import RequestModal from '../Components/RequestModal';
import { Pagination, Stack } from '@mui/material';
import { getLeaveRequestList, getLeaveRequestDetails } from '../Utility/db-utility';
import Loading from '../Components/Loading';
import MessageSnackBar from '../Components/MessageSnackBar';

const useremail=localStorage.getItem('email');

function RequestViewPage(props) {
  const [open, setOpen] = useState(false);
  const [leaveRequestList, setLeaveRequestList] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [currPage, setCurrPage]=useState(1);
  const [leaveRequestData, setLeaveRequestData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  
  useEffect(()=>{
    const asyncFun=async ()=>{
      setIsLoading(true);

      try{
        const response=await getLeaveRequestList(useremail, currPage);
        console.log(response);
        if(response.result){
          setPageCount(response.pageCount);
          setLeaveRequestList(response.result);
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

    asyncFun();
  },[currPage]);

  const handleRequestSelect=async (id)=>{

    setIsLoading(true);
    
    try{
      const response=await getLeaveRequestDetails(id);
      if(response.result){
        setLeaveRequestData(response.result);
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
    
    setOpen(true);
    setIsLoading(false);
  }

  const handlePageChange = (event, value) => {
    setCurrPage(value);
  };

  return (
      <div className="list-container">
        {isLoading && <Loading />}
        <MessageSnackBar isOpen={showSnackBar} message={snackBarMessage} handleClose={()=>setShowSnackBar(false)}/>

        <h3>Leave Requests</h3>

        <List sx={{width: "100%"}}>
          {
            leaveRequestList.map((req)=>{
              return (<ListComponent key={req.id} handleClick={()=>handleRequestSelect(req.id)} id={req.id} sender={req.employeename} subject={req.leavereason} time={req.applieddate} action={req.action} />)
            })
          }
        </List>

        <br />
        <Stack spacing={2} >
          {pageCount>0 ? <Pagination count={pageCount} color="primary" onChange={handlePageChange} /> : 
          <div> No Requests</div>}
        </Stack>
        
        <Modal open={open} onClose={()=>setOpen(false)} >
          <RequestModal data={leaveRequestData} />
        </Modal>
    </div>
  );
}

export default RequestViewPage;
