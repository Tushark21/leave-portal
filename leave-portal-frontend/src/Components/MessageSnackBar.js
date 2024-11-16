import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function MessageSnackBar(props){

    return (
        <Snackbar
            sx={{textTransform: "capitalize"}}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={props.isOpen}
            autoHideDuration={2000}
            onClose={props.handleClose}
        >
            <Alert severity={props.message==="success"?"success":"error"} variant="filled" >
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default MessageSnackBar;