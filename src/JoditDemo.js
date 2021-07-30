/* eslint-disable */
import React, { useState, useRef,useEffect } from "react";
import JoditEditor from "jodit-react";
import {Input,Divider} from 'antd';
//import {debounce} from "./baidu";

export function JoditDemo(){
    return <div>
        <label>Hello, this is Jodit!</label>
        <JoditApp />
    </div>;
}
const { TextArea } = Input;

export function JoditApp() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const config = {
        readonly: false,
        height: 400
    };
    const tmp = useState('');
    const inputTmp = useState('');
    //load only once.
    useEffect(() => {
        tmp[1](content);
        inputTmp[1](content);
    },[]);


    function onChangeHandler(content){
        const JSONcontent = JSON.stringify(content)
        console.log("content:");
        console.log(content);
        console.log("JSONcontent:");
        console.log(JSONcontent);
    }

    function clickHandler(event){
        tmp[1](content);
        inputTmp[1](content);
    }

    function clickHandlerDe(event){
        setContent(inputTmp[0]);
    }

    function onBlur(content){
        setContent(content);
    }

    function inputEventHandler(event){
        inputTmp[1](event.target.value);
        console.log("input handler");
        console.log(inputTmp[0]);
    }

    return (
        <div >
            <h1>React Editors</h1>
            <h2>Start editing to see some magic happen!</h2>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={newContent => onBlur(newContent)}
                onChange={(newContent) => {onChangeHandler(newContent)}}
            />
            <button onClick={event=>clickHandler(event)}>serialize</button>
            <label>    </label>
            <button onClick={event=>clickHandlerDe(event)}>deserialize</button>
            <br></br>
            {/*<textarea rows="20" cols="100" value={tmp[0]}/><br></br>*/}
            <TextArea
                state = {inputTmp[0]}
                value = {inputTmp[0]}
                onChange={(value)=>inputEventHandler(value)}
                style={{height: 'calc(22vh)', minHeight: 'calc(19.8vh)',maxHeight:'calc(50vh)',width:'calc(80vh)'}}
            />
        </div>
    );
}