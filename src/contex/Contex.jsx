import { createContext, useState } from "react";
import run from "../config/Gemini";
import { marked } from 'marked';

export const Context = createContext();

const ContextProvider = (props) =>{

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showRes, setShowRes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    //for typing effect
    const dealyPara = (index, nextWord) =>{
        setTimeout(()=>{
            setResultData(prev => prev+nextWord)
        }, 75*index)
    }

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
        const newResponse2 = marked(response);
        const newResponseArray =  newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            dealyPara(i, nextWord+ " ");
        }
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