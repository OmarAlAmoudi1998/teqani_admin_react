import emailjs from "emailjs-com";
import React , {useState} from 'react';
import { propTypes } from "react-bootstrap/esm/Image";
import { db } from "./config/fire";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'

export default function PopupContactUs(props) {
    const alert = useAlert()
    const [adminMessage, setAdminMessage] = useState("")
    const Message = props.Message;
    const UserEmail = "sidrozzg@gmail.com";
    const UserID = props.UserID;
    const dbDirectory = "users/Customer/users"
    let show = props.show
    let handleShow = props.handleShow



   var templateParams  = {
    Message : Message,
    replyToCustomer : adminMessage,
    UserEmail : UserEmail
   }
   
   const handleChangeAdminMessage = e => {

    setAdminMessage(e.target.value);

}

    function sendEmail() {
        

    emailjs.send('gmail', 'template_sow5hqp', templateParams , 'user_vGzRKQ72pgLB3lkXyFbco')
        .then((result) => {
            console.log(result.text);
            alert.success("Message has been sent successfully !")
        }, (error) => {
            console.log(error.text);
        });
        
    }

    

    return(

        <Popup
        closeOnDocumentClick={false}
        trigger={
            UserEmail ? (<Button className="butt" variant="info" >View and reply</Button>) : (<></>)}
        modal
    >
        {close => (
                
                <div className="popup">
                    <p className="mainT"><strong>Message info</strong></p>
                    <p><strong>Customer email : </strong>{UserEmail}</p>
                    <p><strong>Message content : </strong></p>
                    <p>{Message}</p>
                    <hr></hr>
                    <p><strong>Reply  :</strong></p>
                    <div className="center">
                    
                    <TextField
                            style={{ margin: 2 }}
                            label="Reply message"
                            multiline={true}
                            rows={10}
                            variant="outlined"
                            onChange={handleChangeAdminMessage}
                            fullWidth
                        />
                        <Button variant="info" onClick={() => { 
                            if(adminMessage != ""){
                                sendEmail();
                                handleShow();
                                close();
                                
                                } else {
                                    alert.error('You can not send an empty reply !')
                                } 
                                }}>Send reply</Button>
                            <Button className="ml-3" variant="info" onClick={() => { 
                                close();
                                }}>Close</Button>                   
                        </div>
                        
                </div>
            )}
    </Popup>
        
    )
}