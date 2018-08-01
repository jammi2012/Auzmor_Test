/**
 * Created by jayaramv on 31/07/18.
 */
var util = require('util');
var SearchLocator = require('../locators/search.js');

util.inherits(Search, SearchLocator);

function Search(driver) {
    SearchLocator.call(this);
    this.driver = driver;
}

Search.prototype.doLaunch = function (url) {
    this.driver.get(url);
}

Search.prototype.doSearch = function (searchKey) {
    this.driver.click("XPATH", this.SEARCH_BAR_XPATH);
    this.driver.sleep(2000)
    this.driver.clear("XPATH", this.SEARCH_BAR_XPATH);
    this.driver.sleep(2000)
    this.driver.sendKeys("XPATH", this.SEARCH_BAR_XPATH,searchKey);
    this.driver.click("XPATH", this.SEARCH_BUTTON_XPATH);
}

Search.prototype.checkSearch = function (reqd, callback) {
    this.driver.isElementPresent("XPATH",this.SEARCH_RESULT_XPATH(reqd),function (presence) {
        callback(presence)
    },1000)

}

module.exports = Search;
