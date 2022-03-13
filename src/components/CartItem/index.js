import React, { useState } from "react";
import Button from "../../components/Button";
import Attributes from "../Product/Attributes";
import { Link } from "react-router-dom";

import "./style.scss";

import { connect } from "react-redux";
import { adjustItemQty } from "../../redux/Shopping/shopping-actions";

function CartItem({
  products,
  cartItem,
  adjustQty,
  isMiniCart = false,
  currency,
}) {
  const [qty, setQty] = useState(cartItem.qty);
  const incrementQty = () => {
    const updatedQty = qty + 1;
    setQty(updatedQty);
    adjustQty(cartItem.id, updatedQty);
  };
  const decrementQty = () => {
    const updatedQty = qty - 1;
    setQty(updatedQty);
    adjustQty(cartItem.id, updatedQty);
  };

  const productAllDetails = products.find(
    (product) => product.id === cartItem.id
  );

  const attributeHandler = () => {};

  const sym = cartItem.prices.find(
    (price) => price.currency.symbol === currency.symbol
  );

  return (
    <div
      className={`row d-flex justify-content-between align-items-center ${
        isMiniCart ? "minicart-item" : "cart-item pt-5 pb-5"
      }`}
    >
      <div className={isMiniCart ? "col-lg-5" : "col-lg-9"}>
        <Link to={`/product/${productAllDetails.id}`}>
          <span className="text-uppercase d-block mt-5">
            <h2>{cartItem.name}</h2>
          </span>
        </Link>
        <span className="text-uppercase text-muted d-block mt-2">
          <h3>{cartItem.brand}</h3>
        </span>
        <span className="text-uppercase d-block mt-2">
          <h3 className="pb-2">
            {sym.currency.symbol} {sym.amount}
          </h3>
        </span>
        <Attributes
          attributes={productAllDetails.attributes}
          onChangeAttribute={attributeHandler}
          productId={productAllDetails.id}
          cartSelectedAttributes={cartItem.attributes}
        />
      </div>
      <div className="col-lg-1">
        <Button onClick={incrementQty}>
          <i className="fas fa-plus"></i>
        </Button>
        <div className="qty-input d-block">{qty}</div>
        <Button className="btn" onClick={decrementQty}>
          <i className="fas fa-minus"></i>
        </Button>
      </div>
      <div className={isMiniCart ? "col-lg-5" : "col-lg-2"}>
        <Link to={`/product/${productAllDetails.id}`}>
          <img
            src={cartItem.gallery[0]}
            className="img-fluid rounded-3"
            alt={cartItem.name}
          />
        </Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
  };
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
    currency: state.shop.currency,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
