export const validate=(value)=>{
  if(!value && value.length===0){
      return false;
  }

  return true;
}

export const validateEmail=(value)=>{
  if(!value && value.length===0){
      return false;
  }

  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return pattern.test(value);
}

export const generateLeaveRequestData=(supervisorName, supervisorEmail, employeeName, employeeEmail, fromDate, toDate, reason)=>{
  console.log(new Date());
  return {
    employeename: employeeName,
    employeeemail: employeeEmail,
    supervisorname: supervisorName,
    supervisoremail: supervisorEmail,
    leavereason: reason,
    fromdate: fromDate.$d.toLocaleDateString('en-US'),
    todate: toDate.$d.toLocaleDateString('en-US'),
    applieddate: new Date(),
  }
}

export const reloadPage=()=>{
  setTimeout(()=>{
    window.location.reload(false);
  }, 1000);
}