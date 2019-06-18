import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformerIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    // let transformerIngredients = Object.entries(props.ingredients)
    // .map()
    // console.log(transformerIngredients)
    if (transformerIngredients.length === 0) {
        // alert('Please add ingredients.');
        transformerIngredients = <p>Please add ingredients</p>;
    };
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformerIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>

    );
};

export default burger;