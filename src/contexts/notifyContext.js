import React, { createContext, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);

    function Open(text) {
        setText(text);
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <NotificationsContext.Provider value={{Open}}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={text}
                action={action}
            />
        </NotificationsContext.Provider>
    );
};

export { NotificationsProvider, NotificationsContext };
