/**
 * Created by HelenYin on 2016/3/1.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';
import SearchContent from './SearchContent.js';

main();

function main() {
    if(!document.getElementById('app')){
        ReactDOM.render(<SearchContent />, document.getElementById('search'));
    }else{
        ReactDOM.render(<Content />, document.getElementById('app'));
    }

}