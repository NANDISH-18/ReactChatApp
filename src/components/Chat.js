import React, { useContext } from "react"
import video from '../images/video-camera.png';
import add from '../images/add-user.png';
import more from '../images/more.png';
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";

const Chat = () => {

    const {data} = useContext(ChatContext)

    return(
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={video} alt="Video" />
                    <img src={add} alt="add-friend" />
                    <img src={more} alt="more" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat;