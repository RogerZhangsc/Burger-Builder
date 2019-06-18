import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';


const logo = (props) => {
    return (
        <div className={classes.Logo} style={{ height: props.height }}>
            <img src={burgerlogo} alt='MyBurger'></img>
        </div>
    )
}

export default logo;