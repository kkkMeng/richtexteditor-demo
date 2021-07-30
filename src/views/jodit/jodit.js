/* eslint-disable */
import React, { useState, useRef,useEffect, useCallback } from "react";
import JoditEditor from "jodit-react";
import {Input,Divider} from 'antd';
import ReactDOM from "react-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function JoditDemo(){
    return <div>
        <h2>index</h2>
        <a href="../jodit.html">jodit editor demo~</a> <br></br>
        <a href="../draft.html">draft editor demo~</a> <br></br>
        <h3>Jodit React Editor</h3>
        <JoditApp />
    </div>;
}

//TODO:
//bug1： deserialize之后，如果不对editor进行onBlur,serialize无法更新textContent...
//原因：raw -> html依靠editor渲染。目前deserialize无法控制editor组件渲染。目前组件渲染只能通过setContent，这个在onBlur里。
//nonetheless... draft里面的textarea就很正常。。。。
//bug2：textarea每次input都会触发onChange，每个字母都会自动刷新组件，跳转到最上方...

//const { TextArea } = Input;
function JoditApp() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const config = {
        readonly: false,
        height: 400
    };
    const textContent = useState('');
    //load only once.
    useEffect(() => {
        textContent[1](content);
    },[]);

    function onChangeHandler(content){
        //setContent(content);
    }

    function serializeHandler(event){
        textContent[1](content);
        console.log("serialize")
    }

    function deserializeHandler(event){
        setContent(textContent[0]);
        console.log("deserialized ");
    }

    function onBlur(content){
        console.log("this is onBlur in jodit editor")
        setContent(content);
    }

    function inputChangeHandler(event){
        textContent[1](event.target.value);
        console.log("input handler in textarea");
    }

    function inputBlurHandler(event){
        //textContent[1](event.target.value);
        console.log("this is input blur handler");
    }

    return (
        <div >
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={newContent => onBlur(newContent)}
                onChange={(newContent) => {onChangeHandler(newContent)}}
            />
            <br></br>
            <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </label>
            <button onClick={event=>serializeHandler(event)}>serialize</button>
            <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </label>
            <button onClick={event=>deserializeHandler(event)}>deserialize</button>
            <br></br><br></br>
            {/*<TextArea
                state={textContent[0]}
                value={textContent[0]}
                onBlur={newContent => inputBlurHandler(newContent)}
                onChange={(value) => inputChangeHandler(value)}
                style={{height: 'calc(22vh)', minHeight: 'calc(19.8vh)', maxHeight: 'calc(50vh)', width: 'calc(80vh)'}}
            /> <br></br><br></br><br></br>*/}


            <textarea
                className="rdw-storybook-textarea"
                state = {textContent[0]}
                value = {textContent[0]}
                onChange={(event)=>inputChangeHandler(event)}
                style={{height: 'calc(22vh)', minHeight: 'calc(19.8vh)', maxHeight: 'calc(50vh)', width: 'calc(80vh)'}}
            />
        </div>
    );
}

ReactDOM.render(
    <JoditDemo />,
    document.getElementById('root')
);
