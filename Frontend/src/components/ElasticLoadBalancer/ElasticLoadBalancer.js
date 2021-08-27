import React, { useState, useEffect } from "react";
import { url_get_elb_info } from "./../Routes";
import { useHistory } from 'react-router-dom';

import '../Monitoring/Monitoring.css'
import '../general.css'
import ScrollToBottom from 'react-scroll-to-bottom';

const ElasticLoadBalancer = () => {

    const history = useHistory();
    const [cpu, setCPU] = useState('');
    const [network, setNetwork] = useState('');
    const [failedStatus, setFailedStatus] = useState('');

    useEffect(() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(url_get_elb_info, requestOptions)
            .then(response => response.json())
            .then((result) => {
                let cpuLink = "data:image/png;base64," + result.cpu
                let networkLink = "data:image/png;base64," + result.network
                let failedStatusLink = "data:image/png;base64," + result.failed_status
                setCPU(cpuLink)
                setNetwork(networkLink)
                setFailedStatus(failedStatusLink)
            })
            .catch(error => console.log('error', error));

    }, [])

    const handleExitClick = () => {
        history.push('/monitoring')
    }

    return (
        <div className={'Full'}>
            <h3>Monitoring Elastic Load Balancer</h3>
            <div className={'Console'}>  
            <br></br>
            <ScrollToBottom className={'MessagesContainer'}>
                <img src={cpu} alt="graph" width="700"/>
                <img src={network} alt="graph" width="700"/>
                <img src={failedStatus} alt="graph" width="700"/>
            </ScrollToBottom>
            <br></br>
            <button type="submit"  onClick={handleExitClick}> Exit </button><br></br>
            </div>
            
        </div>
        

    )
}

export default ElasticLoadBalancer