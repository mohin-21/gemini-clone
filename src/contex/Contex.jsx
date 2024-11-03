import { createContext, useState } from "react";
import run from "../config/Gemini";
export const Context = createContext();

const ContextProvider = (props) =>{

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showRes, setShowRes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    //delay para function is here

    const newChat = () =>{
        setLoading(false);
        setShowRes(false);
    }

    const onSent = async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowRes(true);
        setPrevPrompt(prev => [...prev, input]);
        setRecentPrompt(input);
        const response = await run(input);
        let responseArr = response.split("**");
        let newResponse ="";
        for(let i=0; i<responseArr.length; i++){
            if( i === 0 || i%2 !== 1){
                newResponse += responseArr[i];
            }else{
                newResponse += "<b>"+responseArr[i]+ "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        setResultData(newResponse2);
        setLoading(false);
        setInput("");
    }

    
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showRes,
        setShowRes,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider