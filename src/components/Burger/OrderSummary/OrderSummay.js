import React, { Fragment } from 'react';

const orderSummary = (props) => {
    const ingredientSummary = Object.entries(props.ingredients)
        .map(el => {
            return <li key={el[0]}><span style={{ textTransform: 'capitalize' }}>{el[0]}</span>: {el[1]}</li>
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to check out</p>
        </Fragment>
    )
};

export default orderSummary;