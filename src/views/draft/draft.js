/* eslint-disable */
import ReactDOM from 'react-dom';
import './style.css';
import React, { Component,useState } from 'react';
import { EditorState, convertToRaw,convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function DraftDemo(){
    return <div>
        <h2>index</h2>
        <a href="../jodit.html">jodit editor demo~</a> <br></br>
        <a href="../draft.html">draft editor demo~</a> <br></br>
        <h3>Draft-WYSIWYG Editor</h3>
        <DraftApp/>
    </div>
}

function DraftApp(){
    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const [rawContent,setRawContent] = useState("");

    function handleEditorChange(event){
        setEditorState(event);
    }

    function handleTextAreaChange(event){
        setRawContent(event.target.value)
    }

    function serializeJSONHandler(event){
        setRawContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        console.log("serialize")
        console.log(rawContent);
    }

    function deserializeJSONHandler(event){
        console.log("rawContent:");
        console.log(rawContent);
        var ob = JSON.parse(rawContent);
        console.log("JSON parsed Content:");
        console.log(ob);
        var ob2 = convertFromRaw(ob);
        setEditorState(EditorState.createWithContent(ob2))
    }

    return <div className="rdw-storybook-root">
        <Editor
            editorState={editorState}
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            onEditorStateChange={(event)=>handleEditorChange(event)}
        />
        <textarea
            readOnly
            className="rdw-storybook-textarea"
            value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        />
        <button onClick={event=>serializeJSONHandler(event)}>serializeTojson</button>
        <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </label>
        <button onClick={event=>deserializeJSONHandler(event)}>deserializeFromjson</button>
        <textarea
            className="rdw-storybook-textarea"
            state = {rawContent}
            value={rawContent}
            onChange = {(event)=>handleTextAreaChange(event)}
        />
    </div>
}

export class ConvertToRawDraftContent extends Component {
    state = {
        editorState: EditorState.createEmpty(),

    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
        console.log("editorState:")
        console.log(editorState);
        console.log("JSON version:")
        console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    render() {
        const { editorState } = this.state;
        return (<div className="rdw-storybook-root">
            <Editor
                editorState={editorState}
                toolbarClassName="rdw-storybook-toolbar"
                wrapperClassName="rdw-storybook-wrapper"
                editorClassName="rdw-storybook-editor"
                onEditorStateChange={this.onEditorStateChange}
                localization={{
                    locale: 'zh_tw',
                }}
            />
            <textarea
                readOnly
                className="rdw-storybook-textarea"
                value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>);
    }
}


function ConvertFromRawDraftContent2(){

    /*
    //load only once.
    useEffect(() => {
        textContent[1](content);
    },[]);
     */
    var rawContent = {"blocks":[{"key":"e1fmv","text":"hello john!!!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
    const contentState = convertFromRaw(rawContent);
    console.log("show raw content");
    console.log(rawContent)
    const [editorState,setEditorState] = useState(EditorState.createWithContent(contentState));

    function changeHandler(event){
        console.log(event);
        setEditorState(event);
    }
    return <div className="rdw-storybook-root">
        <Editor
            editorState={editorState}
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="rdw-storybook-editor"
            onEditorStateChange={(event)=>changeHandler(event)}
        />
    </div>;
}

class ConvertFromRawDraftContent extends Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw({"blocks":[{"key":"e1fmv","text":"hello john","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}});
        /*
        const contentState = convertFromRaw({
            "blocks": [
                {
                    "key": "637gr",
                    "text": "Initialized from content state.",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {
                        "text-align": "center"
                    }
                }
            ],
            "entityMap": {}
        });

         */
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState,
        }
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (<div className="rdw-storybook-root">
            <span>RAW Content: <pre>{'{"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'}</pre></span>
            <Editor
                editorState={editorState}
                toolbarClassName="rdw-storybook-toolbar"
                wrapperClassName="rdw-storybook-wrapper"
                editorClassName="rdw-storybook-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
        </div>);
    }
}


ReactDOM.render(
    <DraftDemo />,
    document.getElementById('root')
);