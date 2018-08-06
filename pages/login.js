var util = require('util');
var LoginLocator = require('../locators/login.js');

util.inherits(Login, LoginLocator);

function Login(driver) {
  LoginLocator.call(this);
  this.driver = driver;
}

Login.prototype.doLaunch = function (url) {
  this.driver.get(url);
}

Login.prototype.doLogin = function (email, password, callback) {
    var that = this;
    this.driver.isElementPresent("XPATH",this.CLOSE_LOGIN_WIDGET,function (presence) {
        if(presence) {
            console.log("present! So i'm closing it")
            that.driver.click("XPATH",that.CLOSE_LOGIN_WIDGET);
        }
    })
    this.driver.sleep(2000)
    this.driver.click("XPATH", this.LOGIN_SIGNUP_XPATH);
    this.driver.clear("XPATH", this.EMAIL_TXTBOX_XPATH);
    this.driver.click("XPATH", this.PASSWORD_TXTBOX_XPATH);
    this.driver.sleep(2000)
    this.driver.clear("XPATH", this.PASSWORD_TXTBOX_XPATH);
    this.driver.sleep(2000)
    this.driver.sendKeys("XPATH", this.EMAIL_TXTBOX_XPATH, email);
    this.driver.sendKeys("XPATH", this.PASSWORD_TXTBOX_XPATH, password);
    this.driver.click("XPATH", this.LOGIN_BTN_XPATH);
    this.driver.isElementPresent("XPATH",this.MYACCOUNT_XPATH,function (presence) {
            callback(presence)
    },3000)

}

Login.prototype.checkMesg = function (which,callback) {
    var that = this;
        console.log('in');
        this.driver.isElementPresent("XPATH",this.LOGIN_ERR_MSG_UNAMW_XPATH(which), function (presence) {
            if(presence){
                console.log(presence);
                that.driver.getText("XPATH",that.LOGIN_ERR_MSG_UNAMW_XPATH(which), function (result) {
                    callback(result);
                })
            }
        });
}

Login.prototype.getInfoText = function (callback) {
    var that = this;
    this.driver.isElementPresent("XPATH",this.LOGIN_ERR_MSG_XPATH_SIGNUP, function (presence) {
        if(presence){
            console.log(presence);
            that.driver.getText("XPATH",that.LOGIN_ERR_MSG_XPATH_SIGNUP, function (result) {
                callback(result);
            })
        } else {
            console.log('not present')
            callback(false);
        }
    });
}

module.exports = Login;
