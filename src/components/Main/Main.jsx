
import "./Main.css"
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../contex/Contex";

export default function Main() {

    const { onSent, recentPrompt, showRes, loading, resultData, input, setInput } = useContext(Context);

    const handleSubmit = (e)=>{
        e.preventDefault();
        onSent();
    }

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.profile} alt="" />
            </div>
            <div className="main-container">
                {!showRes
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming read trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planing</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className="result">
                        <div className="result-title">
                            <img src={assets.profile} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>

                            }

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" name="" id="" placeholder="Ask Gemini" required />
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input ?
                                    <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                                    : null}
                            </div>
                        </form>

                    </div>
                    <p className="bottom-info">Gemini can make mistakes, so double-check it</p>

                </div>
            </div>
        </div>
    )
}