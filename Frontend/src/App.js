import React from "react";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register'
import Test from './components/Test';
import Admin from './components/Admin/Admin'
import AdminCss from './components/AdminCss/AdminCss'
import AdminChat from './components/AdminChat/AdminChat'
import RoomsPanel from './components/RoomsPanel/RoomsPanel'
import Users from './components/Users/Users'
import Profile from './components/Profile/Profile'
import Monitoring from './components/Monitoring/Monitoring'
import EC2Panel from './components/EC2Panel/EC2Panel'
import S3Panel from './components/S3Panel/S3Panel'
import ElasticLoadBalancer from './components/ElasticLoadBalancer/ElasticLoadBalancer'

const App = () => (
    <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register}/>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/admin/chat" component={AdminChat}/>
        <Route exact path="/roomspanel" component={RoomsPanel}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/cssrequests" component={AdminCss}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/test" component={Test} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/monitoring" component={Monitoring} />
        <Route exact path="/monitoring/ec2" component={EC2Panel} />
        <Route exact path="/monitoring/s3" component={S3Panel} />
        <Route exact path="/monitoring/elb" component={ElasticLoadBalancer} />
    </Router>
)

export default App;