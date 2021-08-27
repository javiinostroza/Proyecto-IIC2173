import React, { useState, useEffect } from "react";
import { url_get_s3_info } from "./../Routes";
import { useHistory } from 'react-router-dom';

import '../Monitoring/Monitoring.css'
import '../general.css'
import ScrollToBottom from 'react-scroll-to-bottom';

const S3Panel = () => {
    
    const history = useHistory();
    const [bucketSize, setBucketSize] = useState('');
    const [objectsNumber, setObjectsNumber] = useState('');

    useEffect(() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(url_get_s3_info, requestOptions)
            .then(response => response.json())
            .then((result) => {
                let bucketSizeLink = "data:image/png;base64," + result.bucket_size
                let objectsNumberLink = "data:image/png;base64," + result.objects_number
                setBucketSize(bucketSizeLink)
                setObjectsNumber(objectsNumberLink)
            })
            .catch(error => console.log('error', error));

    }, [])

    const handleExitClick = () => {
        history.push('/monitoring')
    }

    return (
        <div className={'Full'}>
            <h3>Monitoring S3</h3>
            <div className={'Console'}>  
            <br></br>
            <ScrollToBottom className={'MessagesContainer'}>
                <img src={bucketSize} alt="graph" width="700"/>
                <img src={objectsNumber} alt="graph" width="700"/>
            </ScrollToBottom>
            <br></br>
            <button type="submit"  onClick={handleExitClick}> Exit </button><br></br>
            </div>
            
        </div>
        

    )
}

export default S3Panel