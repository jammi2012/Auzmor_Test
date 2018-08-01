/**
 * Created by jayaramv on 01/08/18.
 */
var util = require('util');
var ProductLocator = require('../locators/product.js');

util.inherits(Product, ProductLocator);

function Product(driver) {
    ProductLocator.call(this);
    this.driver = driver;
}

Product.prototype.checkHeading = function (callback) {
    var that = this;
    this.driver.click("XPATH",this.PRODUCT_LINK_XPATH);
    this.driver.sleep(2000);
    this.driver.getAllWindowHandles(function (handle) {
        that.driver.switchToWindow(handle.length);
    })

    this.driver.sleep(2000);
    this.driver.getCurrentUrl(function (url) {
        console.log(url);
    });
    this.driver.isElementPresent("XPATH",this.PRODUCT_HEADING_XPATH,function (presence) {
        console.log('in')
        callback(presence)
    })
}

Product.prototype.checkBuyNow = function (callback) {
    var that = this;
    this.driver.isElementPresent("XPATH","//button[@class='_2AkmmA _2Npkh4 _2MWPVK']",function (presence) {
        that.driver.getText("XPATH", that.PRODUCT_PRICE_XPATH, function (howMuch) {
            console.log(howMuch);
            price = howMuch;
            callback(presence);
        })

    })
}

Product.prototype.checkDelivery = function (pincode, expectedMessage, callback) {
    this.driver.click("XPATH", this.PROUCT_PINCODE_XPATH);
    this.driver.sleep(2000)
    this.driver.clear("XPATH", this.PROUCT_PINCODE_XPATH);
    this.driver.sleep(2000)
    this.driver.sendKeys("XPATH", this.PROUCT_PINCODE_XPATH,pincode);
    this.driver.click("XPATH", this.PRODUCT_CHK_BTN_XPATH);
    this.driver.isElementPresent("XPATH",this.PRODUCT_DELIVERY_XPATH(expectedMessage),function (presence) {
        callback(presence)
    })
}

Product.prototype.addToCart = function (callback) {
    this.driver.click("XPATH", this.PRODUCT_ADD_CART_BTN_XPATH);
}

module.exports = Product;
