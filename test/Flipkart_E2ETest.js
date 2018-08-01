/**
* Created by jayaramv on 10/03/18.
*/
var config = require('config');
var WebDriver = require('../lib/helper.js');
var LoginPage = require('../pages/login.js');
var SearchPage = require('../pages/search.js');
var ProductPage = require('../pages/product.js');
var CartPage = require('../pages/cart.js');
var OrderPage = require('../pages/order.js');
var test = require('selenium-webdriver/testing');
var HashMap = require('hashmap');
var Faker = require('faker');
var dateFormatter = require('dateformat');
var chai = require('chai');
var request = require('request');
var qs = require('querystring');
var falconTestData = config.get('fk_dashboard');
var assert = chai.assert;
var expect = chai.expect;
global.price = "";

test.describe('FlipKart E2E Test', function () {
  var driver, loginPage, searchPage, productPage, cartPage, orderPage;
  this.timeout(500000);

    test.before(function (done) {
        var now
        now = new Date();
        driver = new WebDriver('Chrome');
        loginPage = new LoginPage(driver);
        searchPage = new SearchPage(driver);
        productPage = new ProductPage(driver);
        cartPage = new CartPage(driver);
        orderPage = new OrderPage(driver);
        loginPage.doLaunch(falconTestData.login_page.url);
        done();
    });

    test.it('Verify that User is not able to Login without Username and Password', function (done) {
        var exp_msg = "Please enter valid Email ID/Mobile number";
        loginPage.doLogin("","", function (isPresent) {
            if(!isPresent) {
                loginPage.checkMesg(exp_msg,function (message) {
                    expect(message).equal(exp_msg);
                    done();
                })
            } else {
                assert.isTrue(isPresent, "Test Failed, Login Successful");
                done();
            }

        });
    });

    test.it('Verify that User is not able to Login with Valid Username and empty Password', function (done) {
        var randomPassword = "";
        var exp_msg = "Please enter Password";
        loginPage.doLogin(falconTestData.login_page.uname, randomPassword, function (isPresent) {
            if(!isPresent) {
                loginPage.checkMesg(exp_msg,function (message) {
                    expect(message).equal(exp_msg);
                    done();
                })
            } else {
                assert.isTrue(isPresent, "Test Failed, Login Successful");
                done();
            }

        });

    });

    test.it('Verify that User is not able to Login with invalid Username and invalid Password', function (done) {
        var randomEmail = Faker.internet.email();
        var randomPassword = Faker.internet.password();
        console.log(randomPassword);
        var exp_msg = "You are not registered with us. Please sign up.";
        loginPage.doLogin(randomEmail, randomPassword, function (isPresent) {
            if(!isPresent) {
                loginPage.getInfoText(function (message) {
                    console.log("2")
                    expect(message).equal(exp_msg);
                    done();
                })
            } else {
                assert.isTrue(isPresent, "Test Failed, Login Successful");
                done();
            }

        });

    });


    test.it('Verify that User is able to login with proper credentials', function (done) {
        console.log(falconTestData.login_page.pword);
        loginPage.doLogin(falconTestData.login_page.uname, falconTestData.login_page.pword, function (isPresent) {
            if(isPresent) {
                loginPage.getInfoText(function (message) {
                    assert.isFalse(message, "Success");
                    done();
                })
            } else {
                console.log("inside here")
                assert.isTrue(isPresent, "Test Failed, Login Failed");
                done();
            }

        });
    });

    test.it('Search for a product, which is not available in the marketplace', function (done) {
        searchPage.doSearch("abcdefghijk");
        searchPage.checkSearch("ERR", function (isPresent) {
            assert.isTrue(isPresent, "Error Not Found");
            done();
        });
    });

    test.it('Search for a product, which is not available in the marketplace', function (done) {
        searchPage.doSearch("4 axis");
        searchPage.checkSearch(null, function (isPresent) {
            assert.isTrue(isPresent, "Test Failed, Item not found");
            done();
        });
    });

    test.it('Open the product and Check for heading of the product', function (done) {
        productPage.checkHeading(function (isPresent) {
            assert.isTrue(isPresent, "Test Failed, Product heading is not visible");
            done();
        });
    });

    test.it('Check if the product is in stock and set its price', function (done) {
        productPage.checkBuyNow(function (isPresent) {
            assert.isTrue(isPresent, "Test Failed, Product is out of stock!");
            done();
        });
    });

    test.it('Check if the product is deliverable to given location - Negative', function (done) {
        productPage.checkDelivery("175123","Currently out of stock in this area.",function (isPresent) {
            assert.isTrue(isPresent, "Test Failed, Product is deliverable to the given location");
            done();
        });
    });

    test.it('Check if the product is deliverable to given location - Positive', function (done) {
        productPage.checkDelivery("639004",null,function (isPresent) {
            assert.isTrue(isPresent, "Test Failed, Test Failed, Product is not deliverable to the given location");
            done();
        });
    });

    test.it('Add to cart and check if the given product is added', function (done) {
        productPage.addToCart();
        cartPage.validateCart(function (product) {
            expect(product).to.contain("Robodo TB6560 4 Axis");
            done();
        });
    });

    test.it('Check if the product price is same as shown in the product page ', function (done) {
        cartPage.validatePrice(function (howMuch) {
            expect(howMuch).equals(price);
            done();
        });
    });

    test.it('Place order and fill the shipment details', function (done) {
        cartPage.placeOrder();
        orderPage.fillAddress(falconTestData.fk_address);
        orderPage.checkSummary(function (isPresent) {
            assert.isTrue(isPresent, "Order summar has a problem - refer screenshot");
            done();
        });
    });


    test.afterEach(function () {
        if (this.currentTest.state === "failed") {
        driver.takeScreenshot(this.currentTest.title);
        driver.sleep(1000);
        }
    });

});
