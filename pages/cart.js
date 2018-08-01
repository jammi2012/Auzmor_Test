/**
 * Created by jayaramv on 01/08/18.
 */
var util = require('util');
var CartLocator = require('../locators/cart.js');

util.inherits(Cart, CartLocator);

function Cart(driver) {
    CartLocator.call(this);
    this.driver = driver;
}

Cart.prototype.validateCart = function (callback) {
    var that = this;
    this.driver.getText("XPATH", this.CART_PRODUCT_XPATH, function (product) {
        callback(product);
    });
}

Cart.prototype.validatePrice = function (callback) {
    this.driver.getText("XPATH", this.CART_VALUE_XPATH, function (howMuch) {
        callback(howMuch);
    });
}

Cart.prototype.placeOrder = function (callback) {
    this.driver.click("XPATH", this.CART_PALCE_ORDER_BTN_XPATH);
}
module.exports = Cart;
