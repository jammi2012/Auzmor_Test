/**
 * Created by jayaramv on 01/08/18.
 */
function Product() {
    this.PRODUCT_LINK_XPATH = "//a[text()='Robodo TB6560 4 Axis Cnc Controller 4 Axis Stepper Moto...']"
    this.PRODUCT_HEADING_XPATH = "//span[@class='_35KyD6']";
    this.PROUCT_PINCODE_XPATH = "//input[@id='pincodeInputId']";
    this.PRODUCT_CHK_BTN_XPATH = "//span[@class='_2aK_gu']";
    this.PRODUCT_ADD_CART_BTN_XPATH = "//button[@class='_2AkmmA _2Npkh4 _2MWPVK']";
    this.PRODUCT_PRICE_XPATH = "//div[@class='_1vC4OE _3qQ9m1']";
}

Product.prototype.SEARCH_RESULT_XPATH = function (errMsg) {
    if(errMsg==='ERR') {
        return "//div[@class='DUFPUZ']";
    } else
    {
        return "//a[text()='Robodo TB6560 4 Axis Cnc Controller 4 Axis Stepper Moto...']";
    }

}

Product.prototype.PRODUCT_DELIVERY_XPATH = function (errMsg) {
    if(errMsg) {
        return "//span[text()='" + errMsg + "']";
    } else
        return "//div[@class='_29Zp1s']";

}


module.exports = Product;