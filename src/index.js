/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {Input,Divider} from 'antd';
import {DraftDemo} from './DraftDemo';
import {JoditDemo} from './JoditDemo';
import './index.css';

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);

function Demo(){
    return <div>
        <div>
            <DraftDemo />
        </div>
        <Divider />
        <div>
            <JoditDemo />
        </div>
        {/*<Divider/>
            <div>
            <Hello />
            </div>*/}
    </div>;
}
