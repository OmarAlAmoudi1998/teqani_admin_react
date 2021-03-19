import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';

export default function PopUpCompEdit(props) {



    const Title = props.Title;
    const Description = props.Description;
    const Images = props.Images;
    const postID = props.postID;
    let postId = ''
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const dbDirectory = props.dbDirectory;

    const handleChangeTitle = e => {

        setNewTitle(e.target.value);
        console.log(e.target.value)
    }

    const handleChangeDesc = e => {

        setNewDescription(e.target.value);

    }

    // async function getPostId() {

    //     db.collection(dbDirectory).where("postID", "==", postID)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 postId = doc.id

    //             });
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         });

    // }

    async function EditPost() {
        if (newTitle != "" && newDescription!=""){
        db.collection(dbDirectory).doc(postID)
            .update({
                "Title": newTitle,
                "Description": newDescription
            })
        } else if(newTitle !="" && newDescription == "") {
            db.collection(dbDirectory).doc(postID)
            .update({
                "Title": newTitle,
                "Description": Description
            })
        } else if (newTitle==""&&newDescription!=""){
            db.collection(dbDirectory).doc(postID)
            .update({
                "Title": Title,
                "Description": newDescription
            })
        }
    }

    return (

        <Popup

            trigger={
                Title ? (<Button variant="info" className="butt"> Edit post</Button>) : (<></>)}
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
                            multiline={true}
                            rows={10}
                            defaultValue={Description}
                            variant="outlined"
                            onChange={handleChangeDesc}
                            fullWidth

                        />
                        <hr></hr>
                        <div className="center"><Button variant="info" onClick={() => { 
                            EditPost(); 
                            close();
                            }}>Save</Button></div>
                    </form>
                </div>
            )}

        </Popup>

    );
}

