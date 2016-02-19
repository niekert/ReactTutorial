/**
 * Created by NiekKruse on 2/18/16.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import routes from './config/routes';

ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('app')
);