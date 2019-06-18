import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.update !== nextProps.update && nextProps.update
    // };

    componentWillUpdate() {
        console.log('ordersummary will update')
    }
    render() {
        const ingredientSummary = Object.entries(this.props.ingredients)
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
                <p><strong>Total Price: </strong>{this.props.price}</p>
                <p>Continue to check out?</p>
                <Button btnType='Danger' clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;