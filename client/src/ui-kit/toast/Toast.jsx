import React, { useEffect, useState } from 'react';
import './toast.css'
const Toast = ({ type, message }) => {
    const [style, setStyle] = useState({ background: "", borderBottom: "" });
    const diffTypes = () => {
        switch (type) {
            case 'success':
                setStyle({
                    background: " #3bd994",
                    borderBottom: "5px solid " + " #00ff4d"
                })
                break;
            case 'error':
                setStyle({
                    background: " #e8274e",
                    borderBottom: "5px solid " + " #ff0000"
                })
                break;
            case 'warnning':
                setStyle({
                    background: " #d7e055",
                    borderBottom: "5px solid " + " #ffcc00"
                })
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        diffTypes();
    }, []);
    return (
        <p className='toast' style={style}>{message}</p>
    );
}

export default Toast;
