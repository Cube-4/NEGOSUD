import React, { useEffect } from "react";

export default function authHeader() {
    // return authorization header with jwt token
    let loggedUser;
    let token = "";
    if (typeof window !== 'undefined') {
        
    } 
    
    loggedUser = localStorage.getItem("loggedUser");
        if (loggedUser !== null ) {
            token = JSON.parse(loggedUser).token
        }
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}