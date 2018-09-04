'use strict'

function constructOrCall (param) {
    try {
        return new param();
    } catch (err) {
        if (err.type === "TypeError") {
            return param();
        }
    }
}

module.exports = {
    "isNumeric": function (param) {
        return (typeof param === "number" && !isNaN(param));
    },
    "kindOfSimilar": function(toCheck, comparator) {
        let input = toCheck;
        if (typeof input === "function") {
            input = constructOrCall(toCheck);
        }
        let target = comparator;
        if (typeof comparator === "function") {
            target = constructOrCall(comparator);
        }
        console.log(target);
        try {
            for (let key in target) {
                console.log(key);
                console.log(input);
                console.log(key in input);
                if (!(key in input)) {
                    return false;
                }
            }
            return true;
        } catch (err) {
            return false;
        }
    }
};
