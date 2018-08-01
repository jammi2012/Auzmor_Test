/**
 * Created by jayaramv on 31/07/18.
 */
function Search() {
    this.SEARCH_BAR_XPATH = "//input[@title]";
    this.SEARCH_BUTTON_XPATH = "//button[@type='submit']";
}

Search.prototype.SEARCH_RESULT_XPATH = function (errMsg) {
    if(errMsg==='ERR') {
        return "//div[@class='DUFPUZ']";
    } else
    {
        return "//a[text()='Robodo TB6560 4 Axis Cnc Controller 4 Axis Stepper Moto...']";
    }

}

module.exports = Search;