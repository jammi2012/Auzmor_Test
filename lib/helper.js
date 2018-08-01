require('chromedriver');
var fileSystem = require('fs');
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;
var dateFormatter = require('dateformat');
var Faker = require('faker');
const MAX_TIMEOUT = 15000;
var rptSubDir, parentWindow, windows = [];

function WebDriver(browser) {
  if (browser.trim() === "Chrome") {
      this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  }
  else if (browser.trim() === "Firefox") {
    this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build();
  }
  else {
    throw new Error("Unsupported Browser!!!");
  }
}

before("Building Project.", function () {
  var now, rptRootDir;

  now = new Date();
  rptRootDir = "./reports/screen_shots/" + dateFormatter(now, "ddd, mmm d, yyyy");
  rptSubDir = rptRootDir + "/" + dateFormatter(now, "hh_MM, TT");

  if (!fileSystem.existsSync(rptRootDir)) {
    fileSystem.mkdir(rptRootDir);
    if (fileSystem.existsSync(rptRootDir)) {
      fileSystem.mkdir(rptSubDir);
    } else if (!fileSystem.existsSync(rptSubDir)) {
      fileSystem.mkdir(rptSubDir);
    }
  } else {
    if (!fileSystem.existsSync(rptSubDir)) {
      fileSystem.mkdir(rptSubDir);
    }
  }
})

WebDriver.prototype.setSize = function () {
  this.driver.manage().window().setSize(1366, 800);
}

WebDriver.prototype.get = function (url) {
  this.driver.get(url);
  this.setSize();
}

WebDriver.prototype.getTitle = function (callback) {
  this.driver.getTitle().then(function (title) {
    callback(title);
  });
}

WebDriver.prototype.getCurrentUrl = function (callback) {
  this.driver.getCurrentUrl().then(function (url) {
    callback(url);
  });
}

WebDriver.prototype.refresh = function () {
  this.driver.navigate().refresh();
}

WebDriver.prototype.waitForTitleIs = function (title) {
  this.driver.wait(until.titleIs(title), MAX_TIMEOUT);
}

WebDriver.prototype.waitForTitleContains = function (title) {
  this.driver.wait(until.titleContains(title), MAX_TIMEOUT);
}

WebDriver.prototype.waitForUrlContains = function (url, callback) {
  this.driver.wait(until.urlContains(url), MAX_TIMEOUT).then(function (presence) {
    callback(presence);
  });
}

WebDriver.prototype.click = function (how, what) {
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    this.driver.findElement(By.xpath(what)).click();
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    this.driver.findElement(By.css(what)).click();
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    this.driver.findElement(By.id(what)).click();
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    this.driver.findElement(By.name(what)).click();
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    this.driver.findElement(By.className(what)).click();
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.linkText(what)).click();
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.partialLinkText(what)).click();
  }
}

WebDriver.prototype.actionClick = function (how, what) {
  var element;

  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.xpath(what));
    this.driver.actions().mouseMove(element).click().perform();
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.css(what));
    this.driver.actions().mouseMove(element).click().perform();
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.id(what));
    this.driver.actions().mouseMove(element).click().perform();
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.name(what));
    this.driver.actions().mouseMove(element).click().perform();
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.className(what));
    this.driver.actions().mouseMove(element).click().perform();
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.linkText(what));
    this.driver.actions().mouseMove(element).click().perform();
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.partialLinkText(what));
    this.driver.actions().mouseMove(element).click().perform();
  }
}

WebDriver.prototype.sendKeys = function (how, what, data) {
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    this.driver.findElement(By.xpath(what)).sendKeys(data);
  }
  else if (how === "CSS") {
    try {
      this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
      this.driver.findElement(By.css(what)).sendKeys(data);
    } catch (e) {
      console.log(e.stack)
      driver.takeScreenshot(this.currentTest.title);
      driver.sleep(1000);
    }
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    this.driver.findElement(By.id(what)).sendKeys(data);
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    this.driver.findElement(By.name(what)).sendKeys(data);
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    this.driver.findElement(By.className(what)).sendKeys(data);
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.linkText(what)).sendKeys(data);
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.partialLinkText(what)).sendKeys(data);
  }
}

WebDriver.prototype.actionSendKeys = function (how, what, data) {
  var element;

  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.xpath(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.css(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.id(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.name(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.className(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.linkText(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.partialLinkText(what));
    this.driver.actions().mouseMove(element).sendKeys(data).perform();
  }
}

WebDriver.prototype.check = function (how, what, action) {
  var element;

  if (how === "XPATH") {
    element = this.driver.findElement(By.xpath(what));
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    if (action.trim().toUpperCase() === "CHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (!element.isSelected()) {
            element.click();
          }
        }
      }
    } else if (action.trim().toUpperCase() === "UNCHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (element.isSelected()) {
            element.click();
          }
        }
      }
    }
  } else if (how === "CSS") {
    element = this.driver.findElement(By.css(what));
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    if (action.trim().toUpperCase() === "CHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (!element.isSelected()) {
            element.click();
          }
        }
      }
    } else if (action.trim().toUpperCase() === "UNCHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (element.isSelected()) {
            element.click();
          }
        }
      }
    }
  }
  else if (how === "ID") {
    element = this.driver.findElement(By.id(what));
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    if (action.trim().toUpperCase() === "CHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (!element.isSelected()) {
            element.click();
          }
        }
      }
    } else if (action.trim().toUpperCase() === "UNCHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (element.isSelected()) {
            element.click();
          }
        }
      }
    }
  }
  else if (how === "NAME") {
    element = this.driver.findElement(By.name(what));
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    if (action.trim().toUpperCase() === "CHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (!element.isSelected()) {
            element.click();
          }
        }
      }
    } else if (action.trim().toUpperCase() === "UNCHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (element.isSelected()) {
            element.click();
          }
        }
      }
    }
  }
  else if (how === "CLASS_NAME") {
    element = this.driver.findElement(By.className(what));
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    if (action.trim().toUpperCase() === "CHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (!element.isSelected()) {
            element.click();
          }
        }
      }
    } else if (action.trim().toUpperCase() === "UNCHECK") {
      if (element.isDisplayed()) {
        if (element.isEnabled()) {
          if (element.isSelected()) {
            element.click();
          }
        }
      }
    }
  }
}

WebDriver.prototype.submit = function (how, what) {
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    this.driver.findElement(By.xpath(what)).submit();
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    this.driver.findElement(By.css(what)).submit();
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    this.driver.findElement(By.id(what)).submit();
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    this.driver.findElement(By.name(what)).submit();
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    this.driver.findElement(By.className(what)).submit();
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.linkText(what)).submit();
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.partialLinkText(what)).submit();
  }
}

WebDriver.prototype.getText = function (how, what, callback) {
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    this.driver.findElement(By.xpath(what)).then(function (element) {
      element.getText().then(function (text) {
        callback(text.trim());
      });
    });
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    this.driver.findElement(By.css(what)).then(function (element) {
      element.getText().then(function (text) {
        callback(text.trim());
      });
    });
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    this.driver.findElement(By.id(what)).then(function (element) {
      element.getText().then(function (text) {
        callback(text.trim());
      });
    });
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    this.driver.findElement(By.name(what)).then(function (element) {
      element.getText().then(function (text) {
        callback(text.trim());
      });
    });
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    this.driver.findElement(By.className(what)).then(function (element) {
      element.getText().then(function (text) {
        callback(text.trim());
      });
    });
  }
}

WebDriver.prototype.getAttribute = function (how, what, attribute, callback) {
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    this.driver.findElement(By.xpath(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      })
    });
  }
  else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    this.driver.findElement(By.css(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      });
    });
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    this.driver.findElement(By.id(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      });
    });
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    this.driver.findElement(By.name(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      });
    });
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    this.driver.findElement(By.className(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      })
    });
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.linkText(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      });
    });
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    this.driver.findElement(By.partialLinkText(what)).then(function (element) {
      element.getAttribute(attribute).then(function (attributeValue) {
        callback(attributeValue.trim());
      });
    });
  }
}

WebDriver.prototype.clear = function (how, what) {
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    this.driver.findElement(By.xpath(what)).clear();
  }
  else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    this.driver.findElement(By.css(what)).clear();
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    this.driver.findElement(By.id(what)).clear();
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    this.driver.findElement(By.name(what)).clear();
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    this.driver.findElement(By.className(what)).clear();
  }
}

WebDriver.prototype.getAllWindowHandles = function (callback) {
  this.driver.getAllWindowHandles().then(function (openedWindows) {
    windows = openedWindows;
    console.log(windows);
    callback(windows);
  });
}

WebDriver.prototype.getWindowHandle = function () {
  parentWindow = this.driver.getWindowHandle();
}

WebDriver.prototype.switchToWindow = function (windowIndex) {
  if (windows.length > 0 && windowIndex <= windows.length) {
    this.driver.switchTo().window(windows[windowIndex - 1]);
  }
}

WebDriver.prototype.switchToParentWindow = function () {
  this.driver.switchTo().window(parentWindow);
}

WebDriver.prototype.scroll = function (how, what) {
  var element;

  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.xpath(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.css(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.id(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.name(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.className(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.linkText(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT);
    element = this.driver.findElement(By.partialLinkText(what));
    this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }
}

WebDriver.prototype.switchToFrame = function (how, what) {
  if (how === "XPATH") {
    this.driver.wait(until.ableToSwitchToFrame(By.xpath(what)), MAX_TIMEOUT);
  } else if (how === "CSS") {
    this.driver.wait(until.ableToSwitchToFrame(By.css(what)), MAX_TIMEOUT);
  }
  else if (how === "ID") {
    this.driver.wait(until.ableToSwitchToFrame(By.id(what)), MAX_TIMEOUT);
  }
  else if (how === "NAME") {
    this.driver.wait(until.ableToSwitchToFrame(By.name(what)), MAX_TIMEOUT);
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.ableToSwitchToFrame(By.className(what)), MAX_TIMEOUT);
  }
}

WebDriver.prototype.switchToDefaultContent = function () {
  this.driver.switchTo().defaultContent();
}

WebDriver.prototype.findElements = function (how, what, callback) {
  var elements = [], that;

  that = this;
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.xpath(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  } else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.css(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.id(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.name(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.className(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.linkText(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), MAX_TIMEOUT).then(function () {
      that.driver.findElements(By.partialLinkText(what)).then(function (elements) {
        callback(elements);
      });
    }, function (err) {
      console.log(err.message);
      callback(elements);
    });
  }
}

WebDriver.prototype.isElementPresent = function (how, what, callback, timeout) {
  var NEW_TIMEOUT = timeout || MAX_TIMEOUT;
  if (how === "XPATH") {
    this.driver.wait(until.elementLocated(By.xpath(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);

    });
  }
  else if (how === "CSS") {
    this.driver.wait(until.elementLocated(By.css(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "ID") {
    this.driver.wait(until.elementLocated(By.id(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "NAME") {
    this.driver.wait(until.elementLocated(By.name(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "CLASS_NAME") {
    this.driver.wait(until.elementLocated(By.className(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.linkText(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.wait(until.elementLocated(By.partialLinkText(what)), NEW_TIMEOUT).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
}

WebDriver.prototype.isElementPresentOrNot = function (how, what, callback) {
  if (how === "XPATH") {
    this.driver.findElement(By.xpath(what)).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);

    });
  }
  else if (how === "CSS") {
    this.driver.findElement(By.css(what)).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "ID") {
    this.driver.findElement(By.id(what)).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "NAME") {
    this.driver.findElement(By.name(what)).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "CLASS_NAME") {
    this.driver.findElement(By.className(what)).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "LINK_TEXT") {
    this.driver.findElement(By.linkText(what)).then(function (element) {
      callback(true);
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.findElement(By.partialLinkText(what)).then(function (element) {
      callback(true);
    }, function (err) {
      if (err.message.indexOf('no such element') !== -1) {
        console.log(err.message);
        callback(false);
      }
    });
  }
}

WebDriver.prototype.isElementNotPresent = function (how, what, callback) {
  var that = this;

  if (how === "XPATH") {
    this.driver.findElement(By.xpath(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "CSS") {
    this.driver.findElement(By.css(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "ID") {
    this.driver.findElement(By.id(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "NAME") {
    this.driver.findElement(By.name(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "CLASS_NAME") {
    this.driver.findElement(By.className(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "LINK_TEXT") {
    this.driver.findElement(By.linkText(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
  else if (how === "PARTIAL_LINK_TEXT") {
    this.driver.findElement(By.partialLinkText(what)).then(function (element) {
      that.driver.wait(until.elementIsNotVisible(element), MAX_TIMEOUT).then(function () {
        callback(true);
      }, function (err) {
        console.log(err.message);
        callback(false);
      });
    }, function (err) {
      console.log(err.message);
      callback(false);
    });
  }
}

WebDriver.prototype.takeScreenshot = function (fileName) {
  this.driver.takeScreenshot().then(function (screenShot) {
    fileSystem.writeFileSync(rptSubDir + "/" + fileName + ".png", screenShot, "base64");
    console.log("Screenshot saved at " + rptSubDir);
  });
}

//Duration should be in milli seconds. 1 Sec = 1000 millisec
WebDriver.prototype.sleep = function (duration) {
  this.driver.sleep(duration);
}

//Duration should be in milli seconds. 1 Sec = 1000 millisec
WebDriver.prototype.implicitlyWait = function (duration) {
  this.driver.manage().timeouts().implicitlyWait(duration);
}

WebDriver.prototype.close = function () {
  this.driver.close();
}

WebDriver.prototype.quit = function () {
  this.driver.quit();
}

module.exports = WebDriver;
