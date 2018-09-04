'use strict'

module.exports = {
    "isNumeric": function (param) {
        return (typeof param === "number" && !isNaN(param));
    }
};
