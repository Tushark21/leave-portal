const sqlite3 = require('sqlite3');
const { LEAVE_REQUEST_TABLE_QUERY, EMPLOYEES_TABLE_QUERY, INSERT_QUERY, DELETE_QUERY, UPDATE_QUERY } = require("../constants");
const { getResponse } = require('../utility');

const execute=async (db, query, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            db.get(query, data, (err, res) => {
                if(err) {
                    reject(err); 
                }
                    
                resolve(res || true);
            });
        }
        catch(e){
            reject(e);
        }
    });
}

const executeAll=async (db, query, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            db.all(query, data, (err, res) => {
                if(err) {
                    reject(err); 
                }
                
                resolve(res || true);
            });
        }
        catch(e){
            reject(e);
        }
    });
}

const executeQuery= async (query, data)=>{
    try{
        const db = new sqlite3.Database('./DB/portal-db.db');
        const result= await execute(db, query, data);
        
        db.close((err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Database connection closed');
        });

        return getResponse(result);
    }
    catch(e){
        console.error(e);
        return getResponse(e);
    }
}

const dbInit=async ()=>{
    try{
        const db = new sqlite3.Database('./DB/portal-db.db');

        db.run(LEAVE_REQUEST_TABLE_QUERY, function (err) {
            if (err) {
                return console.error('Error creating leaverequests table', err);
            }
            console.log('leaverequests table created successfully');
        });

        db.run(EMPLOYEES_TABLE_QUERY, function (err) {
            if (err) {
                return console.error('Error creating employees table', err);
            }
            console.log('employees table created successfully');
        });

        db.close((err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Database connection closed');
        });
    }
    catch(e){
        console.error(e);
    }
}

const selectAll=async (query, data)=>{
    try{
        const db = new sqlite3.Database('./DB/portal-db.db');
        const result = await executeAll(db, query, data);
    
        db.close((err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Database connection closed');
        });
    
        return getResponse(result);
    }
    catch(e){
        console.error(e);
        return getResponse(e);
    }
}

const selectRow=async (query, data)=>{
    try{
        const db = new sqlite3.Database('./DB/portal-db.db');

        const result = await execute(db, query, data);

        db.close((err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Database connection closed');
        });

        return getResponse(result);
    }
    catch(e){
        console.error(e);
        return getResponse(e);
    }
}

const insertRow=async (query, data)=>{
    const result = await executeQuery(query, data);
    return result;
}

const getRow=async (query, data)=>{
    const result = await executeQuery(query, data);
    return result;
}

const deleteRow=async (query, data)=>{
    const result = await executeQuery(query, data);
    return result;
}

const updateRow=async (query, data)=>{
    const result = await executeQuery(query, data);
    return result;
}

module.exports={ dbInit, selectAll, selectRow, insertRow, getRow, deleteRow, updateRow };