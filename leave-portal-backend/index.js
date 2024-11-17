const express=require('express');
const cors = require('cors');
const crypto = require('crypto');
const { UPDATE_QUERY, DELETE_QUERY, INSERT_QUERY, ITEMS_PER_PAGE } = require('./constants');
const { dbInit, insertRow, deleteRow, selectRow, selectAll, updateRow }=require('./DB/db-utility');
const { validate, validateEmail, validateAction } = require('./utility');

const app=express();
app.use(express.json());
app.use(cors());
const PORT=process.env | '8000';

dbInit();

app.post("/apply-leave", async(req, res)=>{
    console.log("POST: /apply-leave");

    const { employeename, employeeemail, fromdate, todate, applieddate, leavereason, supervisorname, supervisoremail }=req.body;
    
    if(!validate(employeename) || !validateEmail(employeeemail) || !validate(supervisorname) || !validateEmail(supervisoremail)
        || !validate(fromdate) || !validate(todate) || !validate(applieddate) || !validate(leavereason)){
        
        console.error("Invalid Data");
        res.status(400);
        res.send({
            "message": "invalid data",
        });
        return;
    }

    try{
        const id=crypto.randomBytes(16).toString('hex');
        const query=INSERT_QUERY['leaverequests'];

        const data=[id, employeename, employeeemail, supervisorname, supervisoremail, leavereason, fromdate, todate, applieddate, 'pending'];
        const result = await insertRow(query, data);

        res.status(result.statuscode);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send({
            "message": "something went wrong"
        });
    }
});

app.post("/get-leave-requests/:page", async (req, res)=>{
    console.log("POST: /get-leave-requests/:page");

    const { role, useremail }=req.body;
    const page=parseInt(req.params.page);

    if(!validate(role) || !validateEmail(useremail) || isNaN(page)){

        console.error("Invalid Data");
        res.status(400);
        res.send({
            "message": "invalid data",
        });
        return;
    }

    try{
        const countQuery=`SELECT COUNT(*) FROM leaverequests WHERE ${role}email = ?`;
        const data=[useremail];
        const countQueryResult = await selectAll(countQuery, data);
        const count=countQueryResult.result[0]['COUNT(*)'];

        const query=`SELECT * FROM leaverequests WHERE ${role}email = ? ORDER BY applieddate DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${(page-1)*ITEMS_PER_PAGE}`;
        let result = await selectAll(query, data);
        result.pageCount=Math.ceil(count/ITEMS_PER_PAGE);
        
        res.status(result.statuscode);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send({
            "message": "something went wrong"
        });
    }
});

app.get("/get-leave-request/:id", async (req, res)=>{
    console.log("GET: /get-leave-request/:id");

    const id=req.params.id;
    
    if(!validate(id)){
        console.error("Invalid Data");
        res.status(400);
        res.send({
            "message": "invalid data",
        });
        return;
    }

    try{
        const query=`SELECT * FROM leaverequests WHERE id = ?`;
        const data=[id];
        const result=await selectRow(query, data);
        res.status(result.statuscode);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send({
            "message": "something went wrong"
        });
    }
});

app.get("/delete-leave-request/:id", async (req, res)=>{
    console.log("GET: /delete-leave-request/:id");
    
    const id=req.params.id;
    
    if(!validate(id)){
        console.error("Invalid Data");
        res.status(400);
        res.send({
            "message": "invalid data",
        });
        return;
    }

    try{
        const query=DELETE_QUERY['leaverequests'];
        const data=[id];
        const result = await deleteRow(query, data);
        res.status(result.statuscode);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send({
            "message": "something went wrong"
        });
    }
});

app.post("/action-leave", async (req, res)=>{
    console.log("POST: /action-leave");
    
    const {id, action}=req.body;

    if(!validate(id) || !validateAction(action)){
        console.error("Invalid Data");
        res.status(400);
        res.send({
            "message": "invalid data",
        });
        return;
    }

    try{
        const query=UPDATE_QUERY['leaverequests'];
        const data=[action, id];
        const result = await updateRow(query, data);
        res.status(result.statuscode);
        res.send(result);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send({
            "message": "something went wrong"
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server up on Port: ${PORT}`)
})