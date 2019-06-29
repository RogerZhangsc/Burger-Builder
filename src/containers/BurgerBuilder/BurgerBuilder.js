import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummay';
import axios from '../../hoc/axios-order';
import Spinner from '../../components/UI/Spinneer/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchase: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // this.setState({totalPrice:0})
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
                console.log(response)
            })
            .catch(error => {
                this.setState({error:true})
            })
    }

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
        // alert('Now continue');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Roger',
                address: {
                    street: 'Fieldthorn',
                    zipcode: '92127'
                },
                email: 'shenchaozhang@gmail.com'
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({ loading: false, purchase: false }))
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false, purchase: false })
            })
    }
    render() {
        const disabledInfo = { ...this.state.ingredients };
        // console.log(Object.values(this.state.ingredients));
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        // console.log(this.state.purchase)
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner />

        if (this.state.ingredients) {
            burger =
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        clicked={this.purchasingHandler} />
                </Fragment>
            orderSummary = <OrderSummary
                update={this.state.purchase}
                price={this.state.totalPrice.toFixed(2)}
                ingredients={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchase} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}

                </Modal>
                {burger}
                {/* <withErrorHandler/> */}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);