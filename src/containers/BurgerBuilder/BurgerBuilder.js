import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummay';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchase: false,
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        }, this.updatePurchasable);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        } else {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSubstraction = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubstraction;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice,
            }, this.updatePurchasable);
        }
    }

    purchasingHandler = () => {
        this.setState({ purchase: true });
    }

    updatePurchasable = () => {
        const ingredients = { ...this.state.ingredients }
        // console.log(ingredients)
        const purchasable = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // console.log(purchasable);
        this.setState({ purchasable: purchasable })
    };

    // componentDidUpdate() {
    //     this.updatePurchasable()
    // }

    purchaseCancelHandler = () => {
        this.setState({ purchase: false });
    }

    purchaseContinueHandler = () => {
        alert('Now continue');
    }
    render() {
        const disabledInfo = { ...this.state.ingredients };
        // console.log(Object.values(this.state.ingredients));
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        console.log(this.state.purchase)
        return (
            <Fragment>
                <Modal show={this.state.purchase} modalClose={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice.toFixed(2)}
                        ingredients={this.state.ingredients}
                        cancel={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler} />

                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    clicked={this.purchasingHandler} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;