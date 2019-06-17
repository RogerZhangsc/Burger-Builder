import React from 'react';

const charComponent = (props) => {
    const charStyle = {
        display: 'inline-block',
        padding: '16px',
        textAlign: 'center',
        margin: '16px',
        border: '1px solid black',            
    };
    return <p style={charStyle} onClick={props.click}>{props.charactor}</p>
}

export default charComponent;