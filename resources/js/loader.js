import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
    return (
        <div className="vBlock">
            <CircularProgress size={68} style={{ color: '#2ba748', position: 'absolute', top: '41%', left: '38%', zIndex: 1, }} />
        </div>
    )
}

export default Loader;