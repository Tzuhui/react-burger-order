import React from 'react';
import PropTypes from 'prop-types';

import SaladSvg from './../../../assets/images/salad.svg';
import TomatoSvg from './../../../assets/images/tomato.svg';
import CheeseSvg from './../../../assets/images/cheese.svg';
import MeatSvg from './../../../assets/images/meat.svg';
import BaconSvg from './../../../assets/images/bacon.svg';
import BreadBottom from './../../../assets/images/bread-bottom.svg';
import BreadTop from './../../../assets/images/bread-top.svg';
import './BurgerIngredient.css';

const burgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={'each-ingredient each-ingredient-bread-bottom'}>
      <img src={BreadBottom} alt="bread-bottom" />
    </div>;
      break;
    case 'bread-top':
      ingredient = <div className={'each-ingredient each-ingredient-bread-top'}>
      <img src={BreadTop} alt="bread-top" />
    </div>;
      break;
    case 'meat':
      ingredient = <div className={'each-ingredient each-ingredient-meat'}>
      <img src={MeatSvg} alt="meat" />
    </div>;
      break;
    case 'cheese':
      ingredient =  <div className={'each-ingredient each-ingredient-cheese'}>
        <img src={CheeseSvg} alt="salad" />
      </div>;
      break;
    case 'bacon':
      ingredient = <div className={'each-ingredient each-ingredient-bacon'}>
      <img src={BaconSvg} alt="bacon" />
    </div>;
      break;
    case 'tomato':
      ingredient = <div className={'each-ingredient each-ingredient-tomato'}>
      <img src={TomatoSvg} alt="tomato" />
    </div>;
      break;
    case 'salad':
      ingredient = <div className={'each-ingredient each-ingredient-salad'}>
        <img src={SaladSvg} alt="salad" />
      </div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
