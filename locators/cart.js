/**
 * Created by jayaramv on 01/08/18.
 */
function Cart() {
    this.CART_PRODUCT_XPATH = "//a[@class='_325-ji _3ROAwx']";
    this.CART_VALUE_XPATH = "//span[text()=' ₹5,799']"
    this.CART_PALCE_ORDER_BTN_XPATH = "//button[@tabindex]";
}

Cart.prototype.SEARCH_RESULT_XPATH = function (errMsg) {
    if(errMsg==='ERR') {
        return "//div[@class='DUFPUZ']";
    } else
    {
        return "//a[text()='Robodo TB6560 4 Axis Cnc Controller 4 Axis Stepper Moto...']";
    }

}

Cart.prototype.PRODUCT_DELIVERY_XPATH = function (errMsg) {
    if(errMsg) {
        return "//span[text()='" + errMsg + "']";
    } else
        return "//div[@class='_29Zp1s']";

}


module.exports = Cart;