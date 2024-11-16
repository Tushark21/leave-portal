import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ACTION_COLOR } from '../Utility/constants';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function ListComponent(props) {

  return (
    <ListItem disablePadding sx={{boxShadow: 1, backgroundColor: ACTION_COLOR[props.action] }}>
        <ListItemButton onClick={()=>props.handleClick()} >
            <ListItemIcon>
              {props.action==="accept" && <DoneIcon color='success' /> }
              {props.action==="reject" && <CloseIcon color='error' /> }
              {props.action==="pending" && <QuestionMarkIcon color='primary' /> }
            </ListItemIcon>
            
            <ListItemText primary={props.sender} sx={{ width: "10%" }} />
            <ListItemText primary={props.subject} sx={{ width: "50%", textWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} />
            {/* <ListItemText primary={props.time} sx={{ width: "10%" }} />
            <ListItemText primary={"-"} sx={{ width: "2%" }} />
            <ListItemText primary={props.time} sx={{ width: "10%" }} /> */}
            <ListItemText primary={props.time} sx={{ width: "10%", textAlign: "right" }} />
        </ListItemButton>
    </ListItem>
  );
}

export default ListComponent;
