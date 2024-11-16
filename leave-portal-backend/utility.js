const validate=(value)=>{
    if(value && value.length>0){
        return true;
    }

    return false;
}

const validateEmail=(value)=>{
    if(!validate(value)){
        return false;
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(value);
}

const validateAction=(value)=>{
    if(!validate(value)){
        return false;
    }

    if(value==='accept' || value==='reject'){
        return true;
    }

    return false;
}

const getResponse=(result)=>{
    if(result && result.stack && result.message){
        return {
            statuscode: 500,
            message: "cannot execute db query",
        }
    }

    if(result===true){
        return {
            statuscode: 200,
            message: "success",
        }
    }

    return {
        statuscode: 200,
        message: "success",
        result
    }
}

module.exports={ validate, validateEmail, validateAction, getResponse }