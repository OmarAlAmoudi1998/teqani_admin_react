import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default function PopUpCompEdit(props) {


    const Title = props.Title;
    const Description = props.Description;
    const Images = props.Images;
    let postId = ''
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }));
    const handleChangeTitle = e => {

        setNewTitle(e.target.value);
        console.log(e.target.value)
    }

    const handleChangeDesc = e => {

        setNewDescription(e.target.value);

    }

    async function getPostId() {

        db.collection("posts/Computer/posts").where("Title", "==", Title)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    postId = doc.id

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }

    async function EditPost() {

        db.collection("posts/Computer/posts").doc(postId)
            .update({
                "Title": newTitle,
                "Description": newDescription
            })

    }

    return (

        <Popup

            trigger={
                Title ? (<Button variant="info" className="butt" onClick={getPostId()}> Edit post</Button>) : (<></>)}
            modal
        >

            {close => (

                <div className="popup">

                    <form>

                        <p className="mainT"><strong>Title</strong></p>

                        <TextField
                            id="outlined-full-width"
                            style={{ margin: 2 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            defaultValue={Title}
                            onChange={handleChangeTitle}
                        />
                        <hr></hr>
                        <p className="mainT"><strong>Description</strong></p>
                        
                        <TextField
                            id="outlined-multiline-static"
                            style={{ margin: 2 }}
                            label="Description"
                            multiline
                            rows={4}
                            defaultValue={Description}
                            variant="outlined"
                            onChange={handleChangeDesc}
                            hieght
                        />
                        <hr></hr>
                        <div className="center"><Button variant="info" onClick={() => { EditPost(); }}>Save</Button></div>
                    </form>
                </div>
            )}

        </Popup>

    );
}

