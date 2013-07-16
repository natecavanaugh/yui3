if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/arraysort/arraysort.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/arraysort/arraysort.js",
    code: []
};
_yuitest_coverage["build/arraysort/arraysort.js"].code=["YUI.add('arraysort', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Provides comparator functions useful for sorting arrays.","","@module arraysort","**/","","var LANG = Y.Lang,","    ISVALUE = LANG.isValue,","    ISSTRING = LANG.isString;","","/**","Provides comparator functions useful for sorting arrays.","","@class ArraySort","@static","**/","","var ArraySort = Y.ArraySort = {","    // -- Public Methods -------------------------------------------------------","","    /**","    Comparator function for simple case-insensitive sorting of an array of","    strings.","","    @method compare","    @param a {Object} First sort argument.","    @param b {Object} Second sort argument.","    @param desc {Boolean} `true` if sort direction is descending, `false` if","        sort direction is ascending.","    @return {Boolean} -1 when a < b. 0 when a == b. 1 when a > b.","    @static","    */","    compare: function(a, b, desc) {","        if(!ISVALUE(a)) {","            if(!ISVALUE(b)) {","                return 0;","            }","            else {","                return 1;","            }","        }","        else if(!ISVALUE(b)) {","            return -1;","        }","","        if(ISSTRING(a)) {","            a = a.toLowerCase();","        }","        if(ISSTRING(b)) {","            b = b.toLowerCase();","        }","        if(a < b) {","            return (desc) ? 1 : -1;","        }","        else if (a > b) {","            return (desc) ? -1 : 1;","        }","        else {","            return 0;","        }","    },","","    /**","    Performs a natural-order comparison of two strings or numbers (or a string","    and a number). This ensures that a value like 'foo2' will be sorted before","    'foo10', whereas a standard ASCII sort would sort 'foo10' first.","","    @example","","        var items = ['item10', 'item2', 'item1', 10, '1', 2];","","        items.sort(Y.ArraySort.naturalCompare);","        console.log(items); // => ['1', 2, 10, 'item1', 'item2', 'item10']","","    @method naturalCompare","    @param {Number|String} a First value to compare.","    @param {Number|String} b Second value to compare.","    @param {Object} [options] Options.","        @param {Boolean} [options.caseSensitive=false] If `true`, a","            case-sensitive comparison will be performed. By default the","            comparison is case-insensitive.","        @param {Boolean} [options.descending=false] If `true`, the sort order","            will be reversed so that larger values are sorted before smaller","            values.","    @return {Number} `0` if the two items are equal, a negative number if _a_","        should be sorted before _b_, or a positive number if _b_ should be","        sorted before _a_.","    @static","    @since @SINCE@","    **/","    naturalCompare: function (a, b, options) {","        // Coerce `a` and `b` to strings.","        a += '';","        b += '';","","        // Convert `a` and `b` to lowercase unless `options.caseSensitive` is","        // truthy.","        if (!options || !options.caseSensitive) {","            a = a.toLowerCase();","            b = b.toLowerCase();","        }","","        // Split `a` and `b` into alpha parts and numeric parts.","        var aParts = ArraySort._splitAlphaNum(a),","            bParts = ArraySort._splitAlphaNum(b),","            length = Math.min(aParts.length, bParts.length),","            result = 0,","","            aPart,","            bPart,","            i;","","        // Compare each part of `a` with each part of `b`.","        for (i = 0; i < length; i++) {","            aPart = aParts[i];","            bPart = bParts[i];","","            // If the two parts aren't equal, compare them and stop iterating.","            if (aPart !== bPart) {","                // First, try comparing them as numbers.","                result = aPart - bPart;","","                // If that didn't work, compare them as strings. This falsiness","                // check works because `result` can't be 0 (we checked for","                // equality above) and NaN is falsy.","                if (!result) {","                    result = aPart > bPart ? 1 : -1;","                }","","                // At this point we know enough to be able to sort the two","                // strings, so we don't need to compare any more parts.","                break;","            }","        }","","        // If we get here and `result` is still 0, then sort the shorter string","        // before the longer string.","        result || (result = a.length - b.length);","","        // Return the result, flipping the order if `options.descending` is","        // truthy.","        return options && options.descending ? -result : result;","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Splits a string into an array of alpha character and digit character parts.","","    @example","","        Y.ArraySort._splitAlphaNum('abc123def456');","        // => ['abc', '123', 'def', '456']","","    @method _splitAlphaNum","    @param {String} string String to split.","    @return {String[]} Array of alpha parts and digit parts.","    @protected","    @static","    @since @SINCE@","    **/","    _splitAlphaNum: function (string) {","        /*jshint boss:true */","        var parts = [],","            regex = /(\\d+|\\D+)/g,","            match;","","        while (match = regex.exec(string)) { // assignment","            parts.push(match[1]);","        }","","        return parts;","    }","};","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/arraysort/arraysort.js"].lines = {"1":0,"11":0,"22":0,"38":0,"39":0,"40":0,"43":0,"46":0,"47":0,"50":0,"51":0,"53":0,"54":0,"56":0,"57":0,"59":0,"60":0,"63":0,"97":0,"98":0,"102":0,"103":0,"104":0,"108":0,"118":0,"119":0,"120":0,"123":0,"125":0,"130":0,"131":0,"136":0,"142":0,"146":0,"168":0,"172":0,"173":0,"176":0};
_yuitest_coverage["build/arraysort/arraysort.js"].functions = {"compare:37":0,"naturalCompare:95":0,"_splitAlphaNum:166":0,"(anonymous 1):1":0};
_yuitest_coverage["build/arraysort/arraysort.js"].coveredLines = 38;
_yuitest_coverage["build/arraysort/arraysort.js"].coveredFunctions = 4;
_yuitest_coverline("build/arraysort/arraysort.js", 1);
YUI.add('arraysort', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Provides comparator functions useful for sorting arrays.

@module arraysort
**/

_yuitest_coverfunc("build/arraysort/arraysort.js", "(anonymous 1)", 1);
_yuitest_coverline("build/arraysort/arraysort.js", 11);
var LANG = Y.Lang,
    ISVALUE = LANG.isValue,
    ISSTRING = LANG.isString;

/**
Provides comparator functions useful for sorting arrays.

@class ArraySort
@static
**/

_yuitest_coverline("build/arraysort/arraysort.js", 22);
var ArraySort = Y.ArraySort = {
    // -- Public Methods -------------------------------------------------------

    /**
    Comparator function for simple case-insensitive sorting of an array of
    strings.

    @method compare
    @param a {Object} First sort argument.
    @param b {Object} Second sort argument.
    @param desc {Boolean} `true` if sort direction is descending, `false` if
        sort direction is ascending.
    @return {Boolean} -1 when a < b. 0 when a == b. 1 when a > b.
    @static
    */
    compare: function(a, b, desc) {
        _yuitest_coverfunc("build/arraysort/arraysort.js", "compare", 37);
_yuitest_coverline("build/arraysort/arraysort.js", 38);
if(!ISVALUE(a)) {
            _yuitest_coverline("build/arraysort/arraysort.js", 39);
if(!ISVALUE(b)) {
                _yuitest_coverline("build/arraysort/arraysort.js", 40);
return 0;
            }
            else {
                _yuitest_coverline("build/arraysort/arraysort.js", 43);
return 1;
            }
        }
        else {_yuitest_coverline("build/arraysort/arraysort.js", 46);
if(!ISVALUE(b)) {
            _yuitest_coverline("build/arraysort/arraysort.js", 47);
return -1;
        }}

        _yuitest_coverline("build/arraysort/arraysort.js", 50);
if(ISSTRING(a)) {
            _yuitest_coverline("build/arraysort/arraysort.js", 51);
a = a.toLowerCase();
        }
        _yuitest_coverline("build/arraysort/arraysort.js", 53);
if(ISSTRING(b)) {
            _yuitest_coverline("build/arraysort/arraysort.js", 54);
b = b.toLowerCase();
        }
        _yuitest_coverline("build/arraysort/arraysort.js", 56);
if(a < b) {
            _yuitest_coverline("build/arraysort/arraysort.js", 57);
return (desc) ? 1 : -1;
        }
        else {_yuitest_coverline("build/arraysort/arraysort.js", 59);
if (a > b) {
            _yuitest_coverline("build/arraysort/arraysort.js", 60);
return (desc) ? -1 : 1;
        }
        else {
            _yuitest_coverline("build/arraysort/arraysort.js", 63);
return 0;
        }}
    },

    /**
    Performs a natural-order comparison of two strings or numbers (or a string
    and a number). This ensures that a value like 'foo2' will be sorted before
    'foo10', whereas a standard ASCII sort would sort 'foo10' first.

    @example

        var items = ['item10', 'item2', 'item1', 10, '1', 2];

        items.sort(Y.ArraySort.naturalCompare);
        console.log(items); // => ['1', 2, 10, 'item1', 'item2', 'item10']

    @method naturalCompare
    @param {Number|String} a First value to compare.
    @param {Number|String} b Second value to compare.
    @param {Object} [options] Options.
        @param {Boolean} [options.caseSensitive=false] If `true`, a
            case-sensitive comparison will be performed. By default the
            comparison is case-insensitive.
        @param {Boolean} [options.descending=false] If `true`, the sort order
            will be reversed so that larger values are sorted before smaller
            values.
    @return {Number} `0` if the two items are equal, a negative number if _a_
        should be sorted before _b_, or a positive number if _b_ should be
        sorted before _a_.
    @static
    @since @SINCE@
    **/
    naturalCompare: function (a, b, options) {
        // Coerce `a` and `b` to strings.
        _yuitest_coverfunc("build/arraysort/arraysort.js", "naturalCompare", 95);
_yuitest_coverline("build/arraysort/arraysort.js", 97);
a += '';
        _yuitest_coverline("build/arraysort/arraysort.js", 98);
b += '';

        // Convert `a` and `b` to lowercase unless `options.caseSensitive` is
        // truthy.
        _yuitest_coverline("build/arraysort/arraysort.js", 102);
if (!options || !options.caseSensitive) {
            _yuitest_coverline("build/arraysort/arraysort.js", 103);
a = a.toLowerCase();
            _yuitest_coverline("build/arraysort/arraysort.js", 104);
b = b.toLowerCase();
        }

        // Split `a` and `b` into alpha parts and numeric parts.
        _yuitest_coverline("build/arraysort/arraysort.js", 108);
var aParts = ArraySort._splitAlphaNum(a),
            bParts = ArraySort._splitAlphaNum(b),
            length = Math.min(aParts.length, bParts.length),
            result = 0,

            aPart,
            bPart,
            i;

        // Compare each part of `a` with each part of `b`.
        _yuitest_coverline("build/arraysort/arraysort.js", 118);
for (i = 0; i < length; i++) {
            _yuitest_coverline("build/arraysort/arraysort.js", 119);
aPart = aParts[i];
            _yuitest_coverline("build/arraysort/arraysort.js", 120);
bPart = bParts[i];

            // If the two parts aren't equal, compare them and stop iterating.
            _yuitest_coverline("build/arraysort/arraysort.js", 123);
if (aPart !== bPart) {
                // First, try comparing them as numbers.
                _yuitest_coverline("build/arraysort/arraysort.js", 125);
result = aPart - bPart;

                // If that didn't work, compare them as strings. This falsiness
                // check works because `result` can't be 0 (we checked for
                // equality above) and NaN is falsy.
                _yuitest_coverline("build/arraysort/arraysort.js", 130);
if (!result) {
                    _yuitest_coverline("build/arraysort/arraysort.js", 131);
result = aPart > bPart ? 1 : -1;
                }

                // At this point we know enough to be able to sort the two
                // strings, so we don't need to compare any more parts.
                _yuitest_coverline("build/arraysort/arraysort.js", 136);
break;
            }
        }

        // If we get here and `result` is still 0, then sort the shorter string
        // before the longer string.
        _yuitest_coverline("build/arraysort/arraysort.js", 142);
result || (result = a.length - b.length);

        // Return the result, flipping the order if `options.descending` is
        // truthy.
        _yuitest_coverline("build/arraysort/arraysort.js", 146);
return options && options.descending ? -result : result;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Splits a string into an array of alpha character and digit character parts.

    @example

        Y.ArraySort._splitAlphaNum('abc123def456');
        // => ['abc', '123', 'def', '456']

    @method _splitAlphaNum
    @param {String} string String to split.
    @return {String[]} Array of alpha parts and digit parts.
    @protected
    @static
    @since @SINCE@
    **/
    _splitAlphaNum: function (string) {
        /*jshint boss:true */
        _yuitest_coverfunc("build/arraysort/arraysort.js", "_splitAlphaNum", 166);
_yuitest_coverline("build/arraysort/arraysort.js", 168);
var parts = [],
            regex = /(\d+|\D+)/g,
            match;

        _yuitest_coverline("build/arraysort/arraysort.js", 172);
while (match = regex.exec(string)) { // assignment
            _yuitest_coverline("build/arraysort/arraysort.js", 173);
parts.push(match[1]);
        }

        _yuitest_coverline("build/arraysort/arraysort.js", 176);
return parts;
    }
};


}, '@VERSION@', {"requires": ["yui-base"]});
