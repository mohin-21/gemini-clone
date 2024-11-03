
import "./Sidebar.css";
import {assets} from "../../assets/assets.js"
import { useContext, useState } from "react";
import { Context } from "../../contex/Contex.jsx";

export default function Sidebar(){
    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context);
    return(
        <div className="sidebar">
           <div className="top">
             <img onClick={()=> setExtended(prev => !prev)} className="manu" src={assets.menu_icon} alt="" />
             <div onClick={()=> newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended ? <p>New Chat</p> : null}
             </div>
            {extended ?
                 <div className="recent">
                 <p className="recent-title">Recent</p>
                 {prevPrompt.map((item, index) =>{
                    return (
                        <div className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0, 18)}...</p>
                        </div>
                    )
                 })}
                
              </div>: null}
           </div>
           <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
               {extended?  <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
               {extended?  <p>Acitvity</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
               {extended ?  <p>Setting</p> : null}
            </div>
           </div>
        </div>
    )
}