import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import '../general.css'

const Monitoring = () => {
    const history = useHistory();

    const handleEC2Click = () => {
        history.push('/monitoring/ec2')
    }

    const handleS3Click = () => {
        history.push('/monitoring/s3')
    }

    const handleLoadBalancerClick = () => {
        history.push('/monitoring/elb')
    }

    const handleExitClick = () => {
        history.push('/admin')
    }



    return (
        <div className={'Full'}>
            <div className={'Console'}>
                <div className={'Inputs'}>
                    <h1> Monitoring Panel </h1>
                    <button type="submit"  onClick={handleEC2Click}> EC2 panel</button><br></br>
                    <button type="submit"  onClick={handleS3Click}> S3 panel </button><br></br>
                    <button type="submit"  onClick={handleLoadBalancerClick}> Elastic Load Balancer panel</button><br></br>
                    <button type="submit"  onClick={handleExitClick}> Exit </button><br></br>
                </div>
            </div>
        </div>
    )
}



export default Monitoring