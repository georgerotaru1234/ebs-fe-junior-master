import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  removeFromCartAction,
  incrementQntAction,
  decrementQntAction,
  orderProductsAction,
  orderByPriceAction,
} from '../redux/actions/actions';
import { Link } from 'react-router-dom';

class Cart extends Component {
  handleOrderButton(){
    this.props.dispatchOrderByPrice(false)
    this.props.dispatchOrderProducts(true)
  }
  handlePriceBtn(){
    this.props.dispatchOrderProducts(false)
    this.props.dispatchOrderByPrice(!this.props.orderByPrice)
  }
  render() {
    return (
      <div className="container">
        <header>
          <div>
            <button>
              <Link to="/">PRODUCTS</Link>
            </button>
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th className="sort-btn" onClick={() => this.handleOrderButton() }>
                Category <span className={this.props.orderType ? 'down' : 'up'}>^</span>
              </th>
              <th align="left">Name</th>
              <th align="left">Quantity</th>
              <th
                className="sort-btn"
                align="left"
                onClick={() => this.handlePriceBtn() }
              >
                Price <span className={this.props.orderByPrice ? 'down' : 'up'}>^</span>
              </th>
              <th align="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.filter((item) => item.quantity > 0).map((item) => {
              const { quantity, name, price, id } = item;
              return (
                <tr key={id}>
                  <td>{item.category.name}</td>
                  <td align="left">{name}</td>
                  <td align="left">{quantity}</td>
                  <td align="left">${price}</td>
                  <td align="center">
                    <button onClick={() => this.props.decrementQntDispatch(id)}>-</button>
                    <button onClick={() => this.props.removeFromCartDispatch(id)}>Remove</button>
                    <button onClick={() => this.props.incrementQntDispatch(id)}>+</button>
                  </td>
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
    incrementQntDispatch: (id) => dispatch(incrementQntAction(id)),
    decrementQntDispatch: (id) => dispatch(decrementQntAction(id)),
    removeFromCartDispatch: (id) => dispatch(removeFromCartAction(id)),
    dispatchOrderProducts: (value) => dispatch(orderProductsAction(value)),
    dispatchOrderByPrice: (value) => dispatch(orderByPriceAction(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
