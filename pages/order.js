/**
 * Created by jayaramv on 01/08/18.
 */
var util = require('util');
var OrderLocator = require('../locators/order.js');

util.inherits(Order, OrderLocator);

function Order(driver) {
    OrderLocator.call(this);
    this.driver = driver;
}

Order.prototype.fillAddress = function (address) {
    var that = this;
    console.log(address);
    this.driver.sendKeys("XPATH", this.ADDRESS_NAME_XPATH, address.name);
    this.driver.sendKeys("XPATH", this.ADDRESS_PHONE_XPATH, address.phone);
    this.driver.sendKeys("XPATH", this.ADDRESS_PIN_XPATH, address.pincode);
    this.driver.sendKeys("XPATH", this.ADDRESS_ADDR_LN2_XPATH, address.addr_line2);
    this.driver.sendKeys("XPATH", this.ADDRESS_ADDR_LN1_XPATH, address.addr_line1);
    this.driver.sendKeys("XPATH", this.ADDRESS_STATE_DRPDWN_XPATH, "Tamil Nadu");
    this.driver.actionClick("XPATH", this.ADDRESS_HOME_DLVRY_XPATH);
    this.driver.click("XPATH", this.ADDRESS_SAVE_XPATH);
}

Order.prototype.checkSummary = function (callback) {
    var that = this;
    this.driver.isElementPresent("XPATH",this.ORDER_SUMMARY_PRODUCT,function (presence) {
        callback(presence)
    });
}

Order.prototype.placeOrder = function (callback) {
    this.driver.click("XPATH", this.CART_PALCE_ORDER_BTN_XPATH);
}

module.exports = Order;