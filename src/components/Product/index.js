import React, { useState } from "react";
import Button from "../Button";
import ProductGallary from "./ProductGallary";
import "./style.scss";

import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";

const Product = ({ product, addToCart, currency }) => {
  const renderHTML = (rawHTML) =>
    React.createElement("p", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const { id, gallery, name, prices, description, brand, attributes, inStock } =
    product;

  const defaultAttribute = [
    {
      key: attributes[0].id,
      name: attributes[0].id,
      type: attributes[0].type,
      value: attributes[0].value,
    },
  ];

  const [selectedAttributes, setSelectedAttributes] =
    useState(defaultAttribute);

  const onRadioChangeHandler = (e) => {
    setSelectedAttributes(() => {
      selectedAttributes[e.target.name] = {
        key: e.target.name,
        name: e.target.name,
        type: e.target.dataset.attributetype,
        value: e.target.value,
      };
      return selectedAttributes;
    });
  };
  const sym = prices.find((price) => price.currency.symbol === currency.symbol);
  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-8">
              <ProductGallary gallery={gallery} productName={name} />
            </div>
            <div className="col-md-4">
              <div className="product p-4">
                <div className="mt-4 mb-3">
                  <span className="text-uppercase d-block mt-5">
                    <h2>{name}</h2>
                  </span>
                  <span className="text-uppercase text-muted d-block mt-5">
                    <h3>{brand}</h3>
                  </span>
                  {attributes.map((attribute) => (
                    <div className="d-block mt-5" key={attribute.id}>
                      <h3 className="text-uppercase">{attribute.name}</h3>
                      {attribute.items.map((item, i) =>
                        i === 0 ? (
                          <label className="radio" key={item.id}>
                            <input
                              type="radio"
                              name={attribute.name}
                              value={item.value}
                              data-attributetype={attribute.type}
                              onChange={onRadioChangeHandler}
                              checked
                            />
                            {attribute.type === "swatch" ? (
                              <span
                                style={{ backgroundColor: item.value }}
                              ></span>
                            ) : (
                              <span>{item.value}</span>
                            )}
                          </label>
                        ) : (
                          <label className="radio" key={item.id}>
                            <input
                              type="radio"
                              name={attribute.name}
                              value={item.value}
                              data-attributetype={attribute.type}
                              onChange={onRadioChangeHandler}
                            />
                            {attribute.type === "swatch" ? (
                              <span
                                style={{ backgroundColor: item.value }}
                              ></span>
                            ) : (
                              <span>{item.value}</span>
                            )}
                          </label>
                        )
                      )}
                    </div>
                  ))}
                  <div className="price d-block mt-5">
                    <h3 className="text-uppercase">Prize:</h3>
                    <span>
                      {sym.currency.symbol} {sym.amount}
                    </span>
                  </div>
                </div>

                <div className="cart align-items-center mt-5">
                  {inStock ? (
                    <Button onClick={() => addToCart(id, selectedAttributes)}>
                      Add to cart
                    </Button>
                  ) : (
                    <Button disabled={true}>Out Of Stock</Button>
                  )}
                </div>
                <div className="about mt-5">{renderHTML(description)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, selectedAttributes) =>
      dispatch(addToCart(id, selectedAttributes)),
  };
};

const mapStateToProps = (state) => {
  return {
    currency: state.shop.currency,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
