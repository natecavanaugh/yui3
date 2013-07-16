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
_yuitest_coverage["build/tree-sortable/tree-sortable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-sortable/tree-sortable.js",
    code: []
};
_yuitest_coverage["build/tree-sortable/tree-sortable.js"].code=["YUI.add('tree-sortable', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Extension for `Tree` that makes nodes sortable.","","@module tree","@submodule tree-sortable","@main tree-sortable","**/","","/**","Extension for `Tree` that makes nodes sortable.","","@class Tree.Sortable","@constructor","@param {Object} [config] Configuration options.","@param {Function} [config.sortComparator] Default comparator function to use","    when sorting a node's children if the node itself doesn't have a custom","    comparator function. If not specified, insertion order will be used by","    default.","@param {Boolean} [config.sortReverse=false] If `true`, node children will be","    sorted in reverse (descending) order by default. Otherwise they'll be sorted","    in ascending order.","@extensionfor Tree","**/","","/**","Fired after a node's children are re-sorted.","","@event sort","@param {Tree.Node} node Node whose children were sorted.","@param {Boolean} reverse `true` if the children were sorted in reverse","    (descending) order, `false` otherwise.","@param {String} src Source of the event.","**/","var EVT_SORT = 'sort';","","function Sortable() {}","","Sortable.prototype = {","    // -- Public Properties ----------------------------------------------------","","    /**","    If `true`, node children will be sorted in reverse (descending) order by","    default. Otherwise they'll be sorted in ascending order.","","    @property {Boolean} sortReverse","    @default false","    **/","    sortReverse: false,","","    // -- Lifecycle ------------------------------------------------------------","    initializer: function (config) {","        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Sortable);","","        if (config) {","            if (config.sortComparator) {","                this.sortComparator = config.sortComparator;","            }","","            if ('sortReverse' in config) {","                this.sortReverse = config.sortReverse;","            }","        }","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Sorts the children of every node in this tree.","","    A `sort` event will be fired for each node whose children are sorted, which","    can get very noisy. If this is a large tree, you may want to set the","    `silent` option to `true` to suppress these events.","","    @method sort","    @param {Object} [options] Options.","        @param {Boolean} [options.silent] If `true`, no `sort` events will be","            fired.","        @param {Function} [options.sortComparator] Custom comparator function to","            use. If specified, this will become the new comparator function for","            each node, overwriting any previous comparator function that was set","            for the node.","        @param {Boolean} [options.sortReverse] If `true`, children will be","            sorted in reverse (descending) order. Otherwise they'll be sorted in","            ascending order. This will become each node's new sort order,","            overwriting any previous sort order that was set for the node.","        @param {String} [options.src] Source of the sort operation. Will be","            passed along to the `sort` event facade.","    @chainable","    **/","    sort: function (options) {","        return this.sortNode(this.rootNode, Y.merge(options, {deep: true}));","    },","","    /**","    Default comparator function to use when sorting a node's children if the","    node itself doesn't have a custom comparator function.","","    If not specified, insertion order will be used by default.","","    @method sortComparator","    @param {Tree.Node} node Node being sorted.","    @return {Number|String} Value by which the node should be sorted relative to","        its siblings.","    **/","    sortComparator: function (node) {","        return node.index();","    },","","    /**","    Sorts the children of the specified node.","","    By default, only the node's direct children are sorted. To sort all nodes in","    the hierarchy (children, children's children, etc.), set the `deep` option","    to `true`. If this is a very deep hierarchy, you may also want to set","    `silent` to true to avoid generating a flood of `sort` events.","","    @method sortNode","    @param {Tree.Node} node Node whose children should be sorted.","    @param {Object} [options] Options.","        @param {Boolean} [options.deep=false] If `true`, all of this node's","            children (and their children, and so on) will be traversed and","            re-sorted as well.","        @param {Boolean} [options.silent] If `true`, no `sort` event will be","            fired.","        @param {Function} [options.sortComparator] Custom comparator function to","            use. If specified, this will become the node's new comparator","            function, overwriting any previous comparator function that was set","            for the node.","        @param {Boolean} [options.sortReverse] If `true`, children will be","            sorted in reverse (descending) order. Otherwise they'll be sorted in","            ascending order. This will become the node's new sort order,","            overwriting any previous sort order that was set for the node.","        @param {String} [options.src] Source of the sort operation. Will be","            passed along to the `sort` event facade.","    @chainable","    **/","    sortNode: function (node, options) {","        // Nothing to do if the node has no children.","        if (!node.children.length) {","            return this;","        }","","        options || (options = {});","","        if (options.deep) {","            // Unset the `deep` option so we don't cause an infinite loop.","            options = Y.merge(options, {deep: false});","","            var self = this;","","            // Traverse and sort all nodes (including this one).","            this.traverseNode(node, function (nodeToSort) {","                self.sortNode(nodeToSort, options);","            });","","            return this;","        }","","        var comparator = this._getSortComparator(node, options),","            reverse;","","        if ('sortReverse' in options) {","            reverse = node.sortReverse = options.sortReverse;","        } else if ('sortReverse' in node) {","            reverse = node.sortReverse;","        } else {","            reverse = this.sortReverse;","        }","","        node.children.sort(Y.rbind(this._sort, this, comparator, reverse));","","        if (!options.silent) {","            this.fire(EVT_SORT, {","                node   : node,","                reverse: !!reverse,","                src    : options.src","            });","        }","","        return this;","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Compares value _a_ to value _b_ for sorting purposes.","","    Values are assumed to be the result of calling a sortComparator function.","","    @method _compare","    @param {Mixed} a First value to compare.","    @param {Mixed} b Second value to compare.","    @return {Number} `-1` if _a_ should come before _b_, `0` if they're","        equivalent, `1` if _a_ should come after _b_.","    @protected","    **/","    _compare: function (a, b) {","        return a < b ? -1 : (a > b ? 1 : 0);","    },","","    /**","    Compares value _a_ to value _b_ for sorting purposes, but sorts them in","    reverse (descending) order.","","    Values are assumed to be the result of calling a sortComparator function.","","    @method _compareReverse","    @param {Mixed} a First value to compare.","    @param {Mixed} b Second value to compare.","    @return {Number} `-1` if _a_ should come before _b_, `0` if they're","        equivalent, `1` if _a_ should come after _b_.","    @protected","    **/","    _compareReverse: function (a, b) {","        return b < a ? -1 : (b > a ? 1 : 0);","    },","","    /**","    Overrides `Tree#_getDefaultNodeIndex()` to provide insertion-time sorting","    for nodes inserted without an explicit index.","","    @method _getDefaultNodeIndex","    @param {Tree.Node} parent Parent node.","    @param {Tree.Node} node Node being inserted.","    @param {Object} [options] Options passed to `insertNode()`.","    @return {Number} Index at which _node_ should be inserted into _parent_'s","        `children` array.","    @protected","    **/","    _getDefaultNodeIndex: function (parent, node) {","        /*jshint bitwise:false */","","        var children   = parent.children,","            comparator = this._getSortComparator(parent),","            max        = children.length,","            min        = 0,","            reverse    = 'sortReverse' in parent ? parent.sortReverse : this.sortReverse;","","        if (!max) {","            return max;","        }","","        // Special case: if the sortComparator is the default sortComparator,","        // cheat and just return the first or last index of the children array.","        //","        // This is necessary because the default sortComparator relies on","        // the node's index, which is always -1 for uninserted nodes.","        if (comparator._unboundComparator === Sortable.prototype.sortComparator) {","            return reverse ? 0 : max;","        }","","        var compare = reverse ? this._compareReverse : this._compare,","            needle  = comparator(node);","","        // Perform an iterative binary search to determine the correct position","        // for the node based on the return value of the comparator function.","        var middle;","","        while (min < max) {","            middle = (min + max) >> 1; // Divide by two and discard remainder.","","            if (compare(comparator(children[middle]), needle) < 0) {","                min = middle + 1;","            } else {","                max = middle;","            }","        }","","        return min;","    },","","    /**","    Returns a sort comparator function derived from the given _node_ and","    _options_, and bound to the correct `thisObj` based on where it was found.","","    @method _getSortComparator","    @param {Tree.Node} node Node on which to look for a `sortComparator`","        function.","    @param {Object} [options] Options object on which to look for a","        `sortComparator` function.","    @return {Function} Properly bound sort comparator function.","    @protected","    **/","    _getSortComparator: function (node, options) {","        var boundComparator,","            comparator,","            thisObj;","","        if (options && options.sortComparator) {","            comparator = node.sortComparator = options.sortComparator;","        } else if (node.sortComparator) {","            comparator = node.sortComparator;","            thisObj    = node;","        } else {","            comparator = this.sortComparator;","            thisObj    = this;","        }","","        boundComparator = function () {","            return comparator.apply(thisObj, arguments);","        };","","        boundComparator._unboundComparator = comparator;","","        return boundComparator;","    },","","    /**","    Array sort function used by `sortNode()` to re-sort a node's children.","","    @method _sort","    @param {Tree.Node} a First node to compare.","    @param {Tree.Node} b Second node to compare.","    @param {Function} comparator Comparator function.","    @param {Boolean} [reverse=false] If `true`, this will be a reverse","        (descending) comparison.","    @return {Number} `-1` if _a_ is less than _b_, `0` if equal, `1` if greater.","    @protected","    **/","    _sort: function (a, b, comparator, reverse) {","        return this[reverse ? '_compareReverse' : '_compare'](","            comparator(a), comparator(b));","    }","};","","Y.Tree.Sortable = Sortable;","/**","@module tree","@submodule tree-sortable","**/","","/**","`Tree.Node` extension that adds methods useful for nodes in trees that use the","`Tree.Sortable` extension.","","@class Tree.Node.Sortable","@constructor","@extensionfor Tree.Node","**/","","function NodeSortable() {}","","NodeSortable.prototype = {","    /**","    Sorts this node's children.","","    @method sort","    @param {Object} [options] Options.","        @param {Boolean} [options.silent] If `true`, no `sort` event will be","            fired.","        @param {Function} [options.sortComparator] Custom comparator function to","            use. If specified, this will become the node's new comparator","            function, overwriting any previous comparator function that was set","            for the node.","        @param {Boolean} [options.sortReverse] If `true`, children will be","            sorted in reverse (descending) order. Otherwise they'll be sorted in","            ascending order. This will become the node's new sort order,","            overwriting any previous sort order that was set for the node.","        @param {String} [options.src] Source of the sort operation. Will be","            passed along to the `sort` event facade.","    @chainable","    **/","    sort: function (options) {","        this.tree.sortNode(this, options);","        return this;","    }","};","","Y.Tree.Node.Sortable = NodeSortable;","","","}, '@VERSION@', {\"requires\": [\"tree\"]});"];
_yuitest_coverage["build/tree-sortable/tree-sortable.js"].lines = {"1":0,"38":0,"40":0,"42":0,"56":0,"58":0,"59":0,"60":0,"63":0,"64":0,"95":0,"110":0,"143":0,"144":0,"147":0,"149":0,"151":0,"153":0,"156":0,"157":0,"160":0,"163":0,"166":0,"167":0,"168":0,"169":0,"171":0,"174":0,"176":0,"177":0,"184":0,"202":0,"219":0,"237":0,"243":0,"244":0,"252":0,"253":0,"256":0,"261":0,"263":0,"264":0,"266":0,"267":0,"269":0,"273":0,"289":0,"293":0,"294":0,"295":0,"296":0,"297":0,"299":0,"300":0,"303":0,"304":0,"307":0,"309":0,"325":0,"330":0,"345":0,"347":0,"368":0,"369":0,"373":0};
_yuitest_coverage["build/tree-sortable/tree-sortable.js"].functions = {"Sortable:40":0,"initializer:55":0,"sort:94":0,"sortComparator:109":0,"(anonymous 2):156":0,"sortNode:141":0,"_compare:201":0,"_compareReverse:218":0,"_getDefaultNodeIndex:234":0,"boundComparator:303":0,"_getSortComparator:288":0,"_sort:324":0,"NodeSortable:345":0,"sort:367":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-sortable/tree-sortable.js"].coveredLines = 65;
_yuitest_coverage["build/tree-sortable/tree-sortable.js"].coveredFunctions = 15;
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 1);
YUI.add('tree-sortable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that makes nodes sortable.

@module tree
@submodule tree-sortable
@main tree-sortable
**/

/**
Extension for `Tree` that makes nodes sortable.

@class Tree.Sortable
@constructor
@param {Object} [config] Configuration options.
@param {Function} [config.sortComparator] Default comparator function to use
    when sorting a node's children if the node itself doesn't have a custom
    comparator function. If not specified, insertion order will be used by
    default.
@param {Boolean} [config.sortReverse=false] If `true`, node children will be
    sorted in reverse (descending) order by default. Otherwise they'll be sorted
    in ascending order.
@extensionfor Tree
**/

/**
Fired after a node's children are re-sorted.

@event sort
@param {Tree.Node} node Node whose children were sorted.
@param {Boolean} reverse `true` if the children were sorted in reverse
    (descending) order, `false` otherwise.
@param {String} src Source of the event.
**/
_yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 38);
var EVT_SORT = 'sort';

_yuitest_coverline("build/tree-sortable/tree-sortable.js", 40);
function Sortable() {}

_yuitest_coverline("build/tree-sortable/tree-sortable.js", 42);
Sortable.prototype = {
    // -- Public Properties ----------------------------------------------------

    /**
    If `true`, node children will be sorted in reverse (descending) order by
    default. Otherwise they'll be sorted in ascending order.

    @property {Boolean} sortReverse
    @default false
    **/
    sortReverse: false,

    // -- Lifecycle ------------------------------------------------------------
    initializer: function (config) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "initializer", 55);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 56);
this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Sortable);

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 58);
if (config) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 59);
if (config.sortComparator) {
                _yuitest_coverline("build/tree-sortable/tree-sortable.js", 60);
this.sortComparator = config.sortComparator;
            }

            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 63);
if ('sortReverse' in config) {
                _yuitest_coverline("build/tree-sortable/tree-sortable.js", 64);
this.sortReverse = config.sortReverse;
            }
        }
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Sorts the children of every node in this tree.

    A `sort` event will be fired for each node whose children are sorted, which
    can get very noisy. If this is a large tree, you may want to set the
    `silent` option to `true` to suppress these events.

    @method sort
    @param {Object} [options] Options.
        @param {Boolean} [options.silent] If `true`, no `sort` events will be
            fired.
        @param {Function} [options.sortComparator] Custom comparator function to
            use. If specified, this will become the new comparator function for
            each node, overwriting any previous comparator function that was set
            for the node.
        @param {Boolean} [options.sortReverse] If `true`, children will be
            sorted in reverse (descending) order. Otherwise they'll be sorted in
            ascending order. This will become each node's new sort order,
            overwriting any previous sort order that was set for the node.
        @param {String} [options.src] Source of the sort operation. Will be
            passed along to the `sort` event facade.
    @chainable
    **/
    sort: function (options) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "sort", 94);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 95);
return this.sortNode(this.rootNode, Y.merge(options, {deep: true}));
    },

    /**
    Default comparator function to use when sorting a node's children if the
    node itself doesn't have a custom comparator function.

    If not specified, insertion order will be used by default.

    @method sortComparator
    @param {Tree.Node} node Node being sorted.
    @return {Number|String} Value by which the node should be sorted relative to
        its siblings.
    **/
    sortComparator: function (node) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "sortComparator", 109);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 110);
return node.index();
    },

    /**
    Sorts the children of the specified node.

    By default, only the node's direct children are sorted. To sort all nodes in
    the hierarchy (children, children's children, etc.), set the `deep` option
    to `true`. If this is a very deep hierarchy, you may also want to set
    `silent` to true to avoid generating a flood of `sort` events.

    @method sortNode
    @param {Tree.Node} node Node whose children should be sorted.
    @param {Object} [options] Options.
        @param {Boolean} [options.deep=false] If `true`, all of this node's
            children (and their children, and so on) will be traversed and
            re-sorted as well.
        @param {Boolean} [options.silent] If `true`, no `sort` event will be
            fired.
        @param {Function} [options.sortComparator] Custom comparator function to
            use. If specified, this will become the node's new comparator
            function, overwriting any previous comparator function that was set
            for the node.
        @param {Boolean} [options.sortReverse] If `true`, children will be
            sorted in reverse (descending) order. Otherwise they'll be sorted in
            ascending order. This will become the node's new sort order,
            overwriting any previous sort order that was set for the node.
        @param {String} [options.src] Source of the sort operation. Will be
            passed along to the `sort` event facade.
    @chainable
    **/
    sortNode: function (node, options) {
        // Nothing to do if the node has no children.
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "sortNode", 141);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 143);
if (!node.children.length) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 144);
return this;
        }

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 147);
options || (options = {});

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 149);
if (options.deep) {
            // Unset the `deep` option so we don't cause an infinite loop.
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 151);
options = Y.merge(options, {deep: false});

            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 153);
var self = this;

            // Traverse and sort all nodes (including this one).
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 156);
this.traverseNode(node, function (nodeToSort) {
                _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "(anonymous 2)", 156);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 157);
self.sortNode(nodeToSort, options);
            });

            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 160);
return this;
        }

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 163);
var comparator = this._getSortComparator(node, options),
            reverse;

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 166);
if ('sortReverse' in options) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 167);
reverse = node.sortReverse = options.sortReverse;
        } else {_yuitest_coverline("build/tree-sortable/tree-sortable.js", 168);
if ('sortReverse' in node) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 169);
reverse = node.sortReverse;
        } else {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 171);
reverse = this.sortReverse;
        }}

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 174);
node.children.sort(Y.rbind(this._sort, this, comparator, reverse));

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 176);
if (!options.silent) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 177);
this.fire(EVT_SORT, {
                node   : node,
                reverse: !!reverse,
                src    : options.src
            });
        }

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 184);
return this;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Compares value _a_ to value _b_ for sorting purposes.

    Values are assumed to be the result of calling a sortComparator function.

    @method _compare
    @param {Mixed} a First value to compare.
    @param {Mixed} b Second value to compare.
    @return {Number} `-1` if _a_ should come before _b_, `0` if they're
        equivalent, `1` if _a_ should come after _b_.
    @protected
    **/
    _compare: function (a, b) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "_compare", 201);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 202);
return a < b ? -1 : (a > b ? 1 : 0);
    },

    /**
    Compares value _a_ to value _b_ for sorting purposes, but sorts them in
    reverse (descending) order.

    Values are assumed to be the result of calling a sortComparator function.

    @method _compareReverse
    @param {Mixed} a First value to compare.
    @param {Mixed} b Second value to compare.
    @return {Number} `-1` if _a_ should come before _b_, `0` if they're
        equivalent, `1` if _a_ should come after _b_.
    @protected
    **/
    _compareReverse: function (a, b) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "_compareReverse", 218);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 219);
return b < a ? -1 : (b > a ? 1 : 0);
    },

    /**
    Overrides `Tree#_getDefaultNodeIndex()` to provide insertion-time sorting
    for nodes inserted without an explicit index.

    @method _getDefaultNodeIndex
    @param {Tree.Node} parent Parent node.
    @param {Tree.Node} node Node being inserted.
    @param {Object} [options] Options passed to `insertNode()`.
    @return {Number} Index at which _node_ should be inserted into _parent_'s
        `children` array.
    @protected
    **/
    _getDefaultNodeIndex: function (parent, node) {
        /*jshint bitwise:false */

        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "_getDefaultNodeIndex", 234);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 237);
var children   = parent.children,
            comparator = this._getSortComparator(parent),
            max        = children.length,
            min        = 0,
            reverse    = 'sortReverse' in parent ? parent.sortReverse : this.sortReverse;

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 243);
if (!max) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 244);
return max;
        }

        // Special case: if the sortComparator is the default sortComparator,
        // cheat and just return the first or last index of the children array.
        //
        // This is necessary because the default sortComparator relies on
        // the node's index, which is always -1 for uninserted nodes.
        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 252);
if (comparator._unboundComparator === Sortable.prototype.sortComparator) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 253);
return reverse ? 0 : max;
        }

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 256);
var compare = reverse ? this._compareReverse : this._compare,
            needle  = comparator(node);

        // Perform an iterative binary search to determine the correct position
        // for the node based on the return value of the comparator function.
        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 261);
var middle;

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 263);
while (min < max) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 264);
middle = (min + max) >> 1; // Divide by two and discard remainder.

            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 266);
if (compare(comparator(children[middle]), needle) < 0) {
                _yuitest_coverline("build/tree-sortable/tree-sortable.js", 267);
min = middle + 1;
            } else {
                _yuitest_coverline("build/tree-sortable/tree-sortable.js", 269);
max = middle;
            }
        }

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 273);
return min;
    },

    /**
    Returns a sort comparator function derived from the given _node_ and
    _options_, and bound to the correct `thisObj` based on where it was found.

    @method _getSortComparator
    @param {Tree.Node} node Node on which to look for a `sortComparator`
        function.
    @param {Object} [options] Options object on which to look for a
        `sortComparator` function.
    @return {Function} Properly bound sort comparator function.
    @protected
    **/
    _getSortComparator: function (node, options) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "_getSortComparator", 288);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 289);
var boundComparator,
            comparator,
            thisObj;

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 293);
if (options && options.sortComparator) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 294);
comparator = node.sortComparator = options.sortComparator;
        } else {_yuitest_coverline("build/tree-sortable/tree-sortable.js", 295);
if (node.sortComparator) {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 296);
comparator = node.sortComparator;
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 297);
thisObj    = node;
        } else {
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 299);
comparator = this.sortComparator;
            _yuitest_coverline("build/tree-sortable/tree-sortable.js", 300);
thisObj    = this;
        }}

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 303);
boundComparator = function () {
            _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "boundComparator", 303);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 304);
return comparator.apply(thisObj, arguments);
        };

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 307);
boundComparator._unboundComparator = comparator;

        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 309);
return boundComparator;
    },

    /**
    Array sort function used by `sortNode()` to re-sort a node's children.

    @method _sort
    @param {Tree.Node} a First node to compare.
    @param {Tree.Node} b Second node to compare.
    @param {Function} comparator Comparator function.
    @param {Boolean} [reverse=false] If `true`, this will be a reverse
        (descending) comparison.
    @return {Number} `-1` if _a_ is less than _b_, `0` if equal, `1` if greater.
    @protected
    **/
    _sort: function (a, b, comparator, reverse) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "_sort", 324);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 325);
return this[reverse ? '_compareReverse' : '_compare'](
            comparator(a), comparator(b));
    }
};

_yuitest_coverline("build/tree-sortable/tree-sortable.js", 330);
Y.Tree.Sortable = Sortable;
/**
@module tree
@submodule tree-sortable
**/

/**
`Tree.Node` extension that adds methods useful for nodes in trees that use the
`Tree.Sortable` extension.

@class Tree.Node.Sortable
@constructor
@extensionfor Tree.Node
**/

_yuitest_coverline("build/tree-sortable/tree-sortable.js", 345);
function NodeSortable() {}

_yuitest_coverline("build/tree-sortable/tree-sortable.js", 347);
NodeSortable.prototype = {
    /**
    Sorts this node's children.

    @method sort
    @param {Object} [options] Options.
        @param {Boolean} [options.silent] If `true`, no `sort` event will be
            fired.
        @param {Function} [options.sortComparator] Custom comparator function to
            use. If specified, this will become the node's new comparator
            function, overwriting any previous comparator function that was set
            for the node.
        @param {Boolean} [options.sortReverse] If `true`, children will be
            sorted in reverse (descending) order. Otherwise they'll be sorted in
            ascending order. This will become the node's new sort order,
            overwriting any previous sort order that was set for the node.
        @param {String} [options.src] Source of the sort operation. Will be
            passed along to the `sort` event facade.
    @chainable
    **/
    sort: function (options) {
        _yuitest_coverfunc("build/tree-sortable/tree-sortable.js", "sort", 367);
_yuitest_coverline("build/tree-sortable/tree-sortable.js", 368);
this.tree.sortNode(this, options);
        _yuitest_coverline("build/tree-sortable/tree-sortable.js", 369);
return this;
    }
};

_yuitest_coverline("build/tree-sortable/tree-sortable.js", 373);
Y.Tree.Node.Sortable = NodeSortable;


}, '@VERSION@', {"requires": ["tree"]});
