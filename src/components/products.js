import React, { Component } from 'react';
import {
  setProductsAction,
  addToCartAction,
  removeFromCartAction,
  orderProductsAction,
  orderByPriceAction,
  incrementQntAction,
  decrementQntAction,
} from '../redux/actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Products extends Component {
  getData() {
    if (!this.props.products.length) {
      fetch('http://localhost:3001/api/products/')
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((response) => {
          this.setState({ unorderedProducts: response });
          this.props.dispatchProducts(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  componentDidMount() {
    this.getData();
  }

  handleOrderButton() {
    this.props.dispatchOrderByPrice(false);
    this.props.dispatchOrderProducts(true);
  }
  handlePriceBtn() {
    console.log(this.props)
    this.props.dispatchOrderProducts(false);
    this.props.dispatchOrderByPrice(!this.props.orderByPrice);
  }

  render() {
    return (
      <div className="container">
        <header>
          <div>
            <button>
              <Link to="/cart">CART</Link>
            </button>
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th className="sort-btn" onClick={() => this.handleOrderButton()}>
                Category <span className={this.props.orderType ? 'down' : 'up'}>^</span>
              </th>
              <th align="left">Name</th>
              <th className="sort-btn" align="left" onClick={() => this.handlePriceBtn()}>
                Price <span className={this.props.orderByPrice ? 'down' : 'up'}>^</span>
              </th>
              <th align="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((item) => {
              const { price, name, id } = item;
              const itemIsInCart = 'quantity' in item;
              return (
                <tr key={id}>
                  <td>{item.category.name}</td>
                  <td align="left">{name}</td>
                  <td align="left">${price}</td>
                  <td align="center">
                    {itemIsInCart && item.quantity > 0 && (
                      <button onClick={() => this.props.decrementQntDispatch(id)}>-</button>
                    )}
                    {!itemIsInCart || item.quantity === 0 ? (
                      <button onClick={() => this.props.addToCartDispatch(id)}>Select</button>
                    ) : null}
                    {itemIsInCart && item.quantity > 0 && (
                      <button onClick={() => this.props.removeFromCartDispatch(id)}>Remove</button>
                    )}
                    {itemIsInCart && item.quantity > 0 && (
                      <button onClick={() => this.props.incrementQntDispatch(id)}>+</button>
                    )}
                  </td>
                  {itemIsInCart && item.quantity > 0 && <td>{item.quantity}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    orderType: state.products.orderType,
    orderByPrice: state.products.orderByPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchProducts: (products) => dispatch(setProductsAction(products)),
    addToCartDispatch: (id) => dispatch(addToCartAction(id)),
    removeFromCartDispatch: (id) => dispatch(removeFromCartAction(id)),
    dispatchOrderProducts: (value) => dispatch(orderProductsAction(value)),
    dispatchOrderByPrice: (value) => dispatch(orderByPriceAction(value)),
    incrementQntDispatch: (id) => dispatch(incrementQntAction(id)),
    decrementQntDispatch: (id) => dispatch(decrementQntAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
