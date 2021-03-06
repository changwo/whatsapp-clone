import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from "styled-components";
import db from "../../../firebase";
import {useHistory} from "react-router";

const Container = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
  
  :hover{
    background-color: #ebebeb;
  }
`

const CreateNewChat = ({handleHideBar}) => {
    const {push} = useHistory()
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState("");


    const createChat = (e) => {
        e.preventDefault()
        if (newName) {
            db.collection('rooms').add({
                name: newName
            }).then((docRef => {
                push(`/rooms/${docRef.id}`)
            }))
        }
        setNewName("")
        setOpen(false)
        handleHideBar()

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewName = e => {
        const value = e.currentTarget.value
        setNewName(value)
    }

    return (
        <>
            <Container onClick={handleClickOpen}>
                <h2>Add new Chat</h2>
            </Container>
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <form onSubmit={createChat}>
                        <DialogTitle id="form-dialog-title">Create</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a room name:
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Room name"
                                type="text"
                                onChange={handleNewName}
                                required
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </>
    );
};

export default CreateNewChat;
