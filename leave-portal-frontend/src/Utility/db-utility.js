// operation:
//     apply leave ---
//     view leave requests/next-prev action ---
//     action on leave request ---
//     delete request ---
//     select leave request (get detailed leave request) ---
//     login/logout

import { BACKEND_URL } from "./constants";

export const login=async ()=>{

}

export const logout=async ()=>{

}

export const fetchCall=async (url, method, body)=>{
    const response=await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return await response.json();
}

export const applyLeave=async (data)=>{
    const url=BACKEND_URL+`apply-leave`;
    const response=await fetchCall(url, 'POST', data);

    return response;
}

export const getLeaveRequestList=async (email, page)=>{

    const url=BACKEND_URL+`get-leave-requests/${page}`;
    const body={
        "useremail": email
    }

    const response=await fetchCall(url, 'POST', body);

    return response;
}

export const getLeaveRequestDetails=async (id)=>{
    const url=BACKEND_URL+`get-leave-request/${id}`;
    const response=await fetchCall(url, 'GET');

    return response;
}

export const takeActionOnLeaveRequest=async (id, action)=>{
    const url=BACKEND_URL+`action-leave`;
    const body={
        id,
        action
    }

    const response=await fetchCall(url, 'POST', body);
    
    return response;
}

export const deleteLeaveRequest=async (id)=>{
    const url=BACKEND_URL+`delete-leave-request/${id}`;
    const response=await fetchCall(url, 'GET');
    
    return response;
}