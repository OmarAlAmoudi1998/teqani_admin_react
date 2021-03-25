import React, { Component, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import './popup.css'
import { db } from "./config/fire";
import TextField from '@material-ui/core/TextField';
import './Home.css'
import { useAlert } from 'react-alert'

export default function PopUpCompEdit(props) {


    const alert = useAlert()
    const Title = props.Title;
    const Description = props.Description;
    const Images = props.Images;
    const postID = props.postID;
    let postId = ''
    const [newTitle, setNewTitle] = useState(Title)
    const [newDescription, setNewDescription] = useState(Description)
    const dbDirectory = props.dbDirectory;
    let [show,setShow] = useState(props.show)
    const handleShow = props.handleShow

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
        if (newTitle != "" && newDescription!="" && newTitle != Title && newDescription != Description){
        db.collection(dbDirectory).doc(postID)
            .update({
                "Title": newTitle,
                "Description": newDescription
            })
            alert.success('The title and description updated successfully !')
        } else if(newTitle !="" && newDescription != "" && newTitle != Title && newDescription==Description) {
            db.collection(dbDirectory).doc(postID)
            .update({
                "Title": newTitle,
                "Description": Description
            })
            alert.success('The title updated successfully !')
        } else if (newTitle!=""&&newDescription!=""&& newTitle == Title && newDescription!=Description){
            db.collection(dbDirectory).doc(postID)
            .update({
                "Title": Title,
                "Description": newDescription
            })
            alert.success('The description updated successfully !')
        } else if (newTitle == "" && newDescription == ""){
            alert.error('The fields are empty, The data has been reset to it default value')
        }
    }

    return (

        <Popup

            trigger={
                Title ? (<Button variant="info" className="butt mr-3"> Edit post</Button>) : (<></>)}
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
                            error={newTitle === "" }
                            helperText={newTitle === ""  ? 'Please fill the field' : ''}
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
                            error={newDescription === "" }
                            helperText={newDescription === ""  ? 'Please fill the field' : ''}
                            fullWidth

                        />
                        <hr></hr>
                        <div className="row">
                        <div className="arrangePopUpButtons"><Button variant="info" onClick={() => { 
                            EditPost(); 
                            handleShow();
                            close();
                            }}>Save</Button></div>
                            <div className="ml-3"><Button variant="danger" onClick={() => { 
                            setNewTitle(Title)
                            setNewDescription(Description)
                            close();
                            }}>Cancel</Button></div>
                            </div>
                    </form>
                </div>
            )}

        </Popup>

    );
}

