import React from "react";
import "./notFound.css";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const naviagte = useNavigate();

    const handleGoBack = () => {
        naviagte(-1);
    };
    return (
        <div className="container">
            <div className="not-found">
                <h1>404</h1>
                <p className="goBack" onClick={handleGoBack}>
                    <i class="bx bx-chevrons-left"></i>Go back
                </p>
            </div>
        </div>
    );
};

export default NotFound;
