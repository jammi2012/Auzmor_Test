function Login() {
  this.LOGIN_PAGE_BTN_XPATH = "//a[text()='Login & Signup']";
  this.EMAIL_TXTBOX_XPATH = "//div[contains(@class, '_39M2dM')][1]/input[@type='text' and @autocomplete='off']";
  this.PASSWORD_TXTBOX_XPATH = "//input[@type='password']";
  this.LOGIN_BTN_XPATH = "//span[text()='Login']/ancestor::button";
  this.LOGIN_ERR_MSG_XPATH_SIGNUP = "//div[@class='JAUzCh']";
  this.MYACCOUNT_XPATH = "//div[@class='_2cyQi_' and text()='My Account']";

  this.ENTER_PWD_XPATH = "//span[text()='Please enter Password']";
}

Login.prototype.LOGIN_ERR_MSG_UNAMW_XPATH = function (errMsg) {
    return "//span[text()='" + errMsg + "']";
}

module.exports = Login;
