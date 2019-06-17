import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Ingredient from './components/Burger/BurgerIngredient/BurgerIngredient';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
        <Ingredient type='meat'></Ingredient>
      </Layout>
    </div>
  );
}

export default App;
