'use strict'

function constructOrCall (param) {
    try {
        return new param();
    } catch (err) {
        if (err.type === 'TypeError') {
            return param();
        }
    }
}

module.exports = {
    'kindOfSimilar': (toCheck, comparator) => {
        let input = toCheck;
        if (typeof input === 'function') {
            input = constructOrCall(toCheck);
        }
        let target = comparator;
        if (typeof comparator === 'function') {
            target = constructOrCall(comparator);
        }
        try {
            for (let key in target) {
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
