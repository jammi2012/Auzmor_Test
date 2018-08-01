/**
 * Created by jayaramv on 01/08/18.
 */
function Order() {
    this.ADDRESS_NAME_XPATH = "//input[@name='name']";
    this.ADDRESS_PHONE_XPATH = "//input[@name='phone']";
    this.ADDRESS_PIN_XPATH = "//input[@name='pincode']";
    this.ADDRESS_ADDR_LN2_XPATH = "//input[@name='addressLine2']";
    this.ADDRESS_ADDR_LN1_XPATH = "//textarea[@name='addressLine1']";
    this.ADDRESS_CITY_XPATH = "//input[@name='city']";
    this.ADDRESS_STATE_DRPDWN_XPATH = "//select[@name='state']";
    this.ADDRESS_STATE_DRPDWN_OPTN_TN_XPATH = "//input[@name='state']/option[32]";
    this.ADDRESS_HOME_DLVRY_XPATH = "//span[text()='Home (All day delivery)']";
    this.ADDRESS_SAVE_XPATH = "//button[@tabindex]";
    this.ORDER_SUMMARY_PRODUCT = "//div[@class='_1Ox9a7']";

}

Order.prototype.SEARCH_RESULT_XPATH = function (errMsg) {
    if(errMsg==='ERR') {
        return "//div[@class='DUFPUZ']";
    } else
    {
        return "//a[text()='Robodo TB6560 4 Axis Cnc Controller 4 Axis Stepper Moto...']";
    }

}

Order.prototype.PRODUCT_DELIVERY_XPATH = function (errMsg) {
    if(errMsg) {
        return "//span[text()='" + errMsg + "']";
    } else
        return "//div[@class='_29Zp1s']";

}


module.exports = Order;