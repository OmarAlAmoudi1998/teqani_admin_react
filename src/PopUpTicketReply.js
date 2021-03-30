import emailjs from "emailjs-com";
import React , {useState} from 'react';
import { propTypes } from "react-bootstrap/esm/Image";
import { db } from "./config/fire";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { useAlert } from 'react-alert'

export default function PopUpTicketReply(props) {
    const alert = useAlert()
    const [adminMessage, setAdminMessage] = useState("")
    const Message = props.Message;
    const UserEmail = props.UserEmail;
    const UserID = props.UserID;
    const [TicketID,setTicketID] = useState("")
    const dbDirectory = props.dbDirectory
    let show = props.show
    let handleShow = props.handleShow
    const [isMessageEmpty,setIsMessageEmpty] = useState(false)
    try {
        db.collection(dbDirectory).where("Message","==",Message).onSnapshot(snapshot => {
           
           snapshot.forEach(doc => {
            setTicketID(doc.id)
           })
           
           
           
       })

   } catch (e) {
       console.log('Failed to get data')
   }

   var templateParams  = {
    Message : Message,
    replyToCustomer : adminMessage,
    UserEmail : UserEmail
   }
   
   const handleChangeAdminMessage = e => {

    setAdminMessage(e.target.value);
    setIsMessageEmpty(false)
}

    function sendEmail() {
        

    emailjs.send('gmail', 'template_sow5hqp', templateParams , 'user_vGzRKQ72pgLB3lkXyFbco')
        .then((result) => {
            console.log(result.text);
            updateTicket();
            alert.success("Message has been sent successfully !")
        }, (error) => {
            console.log(error.text);
        });
        
    }

    function updateTicket() {
        db.collection(dbDirectory).doc(TicketID)
                .update({
                    "AdminMessage": adminMessage,
                    "isTicketClosed": true,
                    
                })
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
                            error={isMessageEmpty}
                            helperText={isMessageEmpty ? 'You can not send an empty message !' : ' '}
                        />
                        <Button variant="info" onClick={() => { 
                            if(adminMessage != ""){
                                sendEmail();
                                handleShow();
                                close();
                                
                                } else {
                                    setIsMessageEmpty(true)
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