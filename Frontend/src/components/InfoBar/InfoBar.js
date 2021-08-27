import React, { useState } from 'react';
import axios from 'axios';
import {url_upload_file} from './../Routes';
import './InfoBar.css'

const InfoBar = ( { room }) => {
    const [currentFile, setFile] = useState('');


    const onFileSubmit = () => {
        if (currentFile !== ''){
            const data = new FormData();
            data.append('file', currentFile);
            data.append('filename', currentFile.name);
            data.append('roomname', room);
            axios.post(url_upload_file, data, {})
                .then(res => {
                    console.log("RESPUESTA", res);
                })
        }

    }
    const onChangeHandler = (event) =>{
        console.log(event.target.files[0]);
        setFile(event.target.files[0])
    }


    return (
        <div className={'Bar'}>
            <div>
                <h3>Room: {room} |</h3>
            </div>
            <div>
                <p className={'inline load-file'} > Upload css </p>
                <input className={'inline load-file'} type={'file'} name="file" onChange={onChangeHandler} accept={'.css'}/>
                <button className={'inline load-file'} onClick={onFileSubmit} > Upload </button>
            </div>
            <div>
                <h3><a href='/'>Exit room</a></h3>
            </div>
        </div>
    )};




export default InfoBar;