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
_yuitest_coverage["build/tree-openable/tree-openable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-openable/tree-openable.js",
    code: []
};
_yuitest_coverage["build/tree-openable/tree-openable.js"].code=["YUI.add('tree-openable', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Extension for `Tree` that adds the concept of open/closed state for nodes.","","@module tree","@submodule tree-openable","@main tree-openable","**/","","/**","Extension for `Tree` that adds the concept of open/closed state for nodes.","","@class Tree.Openable","@constructor","@extensionfor Tree","**/","","/**","Fired when a node is closed.","","@event close","@param {Tree.Node} node Node being closed.","@param {String} src Source of the event.","@preventable _defCloseFn","**/","var EVT_CLOSE = 'close';","","/**","Fired when a node is opened.","","@event open","@param {Tree.Node} node Node being opened.","@param {String} src Source of the event.","@preventable _defOpenFn","**/","var EVT_OPEN = 'open';","","function Openable() {}","","Openable.prototype = {","    // -- Lifecycle ------------------------------------------------------------","    initializer: function () {","        this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Openable);","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Closes the specified node if it isn't already closed.","","    @method closeNode","    @param {Tree.Node} node Node to close.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `close` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    closeNode: function (node, options) {","        if (node.canHaveChildren && node.isOpen()) {","            this._fireTreeEvent(EVT_CLOSE, {","                node: node,","                src : options && options.src","            }, {","                defaultFn: this._defCloseFn,","                silent   : options && options.silent","            });","        }","","        return this;","    },","","    /**","    Opens the specified node if it isn't already open.","","    @method openNode","    @param {Tree.Node} node Node to open.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `open` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    openNode: function (node, options) {","        if (node.canHaveChildren && !node.isOpen()) {","            this._fireTreeEvent(EVT_OPEN, {","                node: node,","                src : options && options.src","            }, {","                defaultFn: this._defOpenFn,","                silent   : options && options.silent","            });","        }","","        return this;","    },","","    /**","    Toggles the open/closed state of the specified node, closing it if it's","    currently open or opening it if it's currently closed.","","    @method toggleOpenNode","    @param {Tree.Node} node Node to toggle.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, events will be","            suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    toggleOpenNode: function (node, options) {","        return node.isOpen() ? this.closeNode(node, options) :","            this.openNode(node, options);","    },","","    // -- Default Event Handlers -----------------------------------------------","","    /**","    Default handler for the `close` event.","","    @method _defCloseFn","    @param {EventFacade} e","    @protected","    **/","    _defCloseFn: function (e) {","        delete e.node.state.open;","    },","","    /**","    Default handler for the `open` event.","","    @method _defOpenFn","    @param {EventFacade} e","    @protected","    **/","    _defOpenFn: function (e) {","        e.node.state.open = true;","    }","};","","Y.Tree.Openable = Openable;","/**","@module tree","@submodule tree-openable","**/","","/**","`Tree.Node` extension that adds methods useful for nodes in trees that use the","`Tree.Openable` extension.","","@class Tree.Node.Openable","@constructor","@extensionfor Tree.Node","**/","","function NodeOpenable() {}","","NodeOpenable.prototype = {","    /**","    Closes this node if it's currently open.","","    @method close","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `close` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    close: function (options) {","        this.tree.closeNode(this, options);","        return this;","    },","","    /**","    Returns `true` if this node is currently open.","","    Note: the root node of a tree is always considered to be open.","","    @method isOpen","    @return {Boolean} `true` if this node is currently open, `false` otherwise.","    **/","    isOpen: function () {","        return !!this.state.open || this.isRoot();","    },","","    /**","    Opens this node if it's currently closed.","","    @method open","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `open` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    open: function (options) {","        this.tree.openNode(this, options);","        return this;","    },","","    /**","    Toggles the open/closed state of this node, closing it if it's currently","    open or opening it if it's currently closed.","","    @method toggleOpen","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, events will be","            suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    toggleOpen: function (options) {","        this.tree.toggleOpenNode(this, options);","        return this;","    }","};","","Y.Tree.Node.Openable = NodeOpenable;","","","}, '@VERSION@', {\"requires\": [\"tree\"]});"];
_yuitest_coverage["build/tree-openable/tree-openable.js"].lines = {"1":0,"29":0,"39":0,"41":0,"43":0,"46":0,"66":0,"67":0,"76":0,"94":0,"95":0,"104":0,"123":0,"137":0,"148":0,"152":0,"167":0,"169":0,"184":0,"185":0,"197":0,"214":0,"215":0,"233":0,"234":0,"238":0};
_yuitest_coverage["build/tree-openable/tree-openable.js"].functions = {"Openable:41":0,"initializer:45":0,"closeNode:65":0,"openNode:93":0,"toggleOpenNode:122":0,"_defCloseFn:136":0,"_defOpenFn:147":0,"NodeOpenable:167":0,"close:183":0,"isOpen:196":0,"open:213":0,"toggleOpen:232":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-openable/tree-openable.js"].coveredLines = 26;
_yuitest_coverage["build/tree-openable/tree-openable.js"].coveredFunctions = 13;
_yuitest_coverline("build/tree-openable/tree-openable.js", 1);
YUI.add('tree-openable', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Extension for `Tree` that adds the concept of open/closed state for nodes.

@module tree
@submodule tree-openable
@main tree-openable
**/

/**
Extension for `Tree` that adds the concept of open/closed state for nodes.

@class Tree.Openable
@constructor
@extensionfor Tree
**/

/**
Fired when a node is closed.

@event close
@param {Tree.Node} node Node being closed.
@param {String} src Source of the event.
@preventable _defCloseFn
**/
_yuitest_coverfunc("build/tree-openable/tree-openable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-openable/tree-openable.js", 29);
var EVT_CLOSE = 'close';

/**
Fired when a node is opened.

@event open
@param {Tree.Node} node Node being opened.
@param {String} src Source of the event.
@preventable _defOpenFn
**/
_yuitest_coverline("build/tree-openable/tree-openable.js", 39);
var EVT_OPEN = 'open';

_yuitest_coverline("build/tree-openable/tree-openable.js", 41);
function Openable() {}

_yuitest_coverline("build/tree-openable/tree-openable.js", 43);
Openable.prototype = {
    // -- Lifecycle ------------------------------------------------------------
    initializer: function () {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "initializer", 45);
_yuitest_coverline("build/tree-openable/tree-openable.js", 46);
this.nodeExtensions = this.nodeExtensions.concat(Y.Tree.Node.Openable);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Closes the specified node if it isn't already closed.

    @method closeNode
    @param {Tree.Node} node Node to close.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `close` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    closeNode: function (node, options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "closeNode", 65);
_yuitest_coverline("build/tree-openable/tree-openable.js", 66);
if (node.canHaveChildren && node.isOpen()) {
            _yuitest_coverline("build/tree-openable/tree-openable.js", 67);
this._fireTreeEvent(EVT_CLOSE, {
                node: node,
                src : options && options.src
            }, {
                defaultFn: this._defCloseFn,
                silent   : options && options.silent
            });
        }

        _yuitest_coverline("build/tree-openable/tree-openable.js", 76);
return this;
    },

    /**
    Opens the specified node if it isn't already open.

    @method openNode
    @param {Tree.Node} node Node to open.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `open` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    openNode: function (node, options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "openNode", 93);
_yuitest_coverline("build/tree-openable/tree-openable.js", 94);
if (node.canHaveChildren && !node.isOpen()) {
            _yuitest_coverline("build/tree-openable/tree-openable.js", 95);
this._fireTreeEvent(EVT_OPEN, {
                node: node,
                src : options && options.src
            }, {
                defaultFn: this._defOpenFn,
                silent   : options && options.silent
            });
        }

        _yuitest_coverline("build/tree-openable/tree-openable.js", 104);
return this;
    },

    /**
    Toggles the open/closed state of the specified node, closing it if it's
    currently open or opening it if it's currently closed.

    @method toggleOpenNode
    @param {Tree.Node} node Node to toggle.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, events will be
            suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    toggleOpenNode: function (node, options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "toggleOpenNode", 122);
_yuitest_coverline("build/tree-openable/tree-openable.js", 123);
return node.isOpen() ? this.closeNode(node, options) :
            this.openNode(node, options);
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default handler for the `close` event.

    @method _defCloseFn
    @param {EventFacade} e
    @protected
    **/
    _defCloseFn: function (e) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "_defCloseFn", 136);
_yuitest_coverline("build/tree-openable/tree-openable.js", 137);
delete e.node.state.open;
    },

    /**
    Default handler for the `open` event.

    @method _defOpenFn
    @param {EventFacade} e
    @protected
    **/
    _defOpenFn: function (e) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "_defOpenFn", 147);
_yuitest_coverline("build/tree-openable/tree-openable.js", 148);
e.node.state.open = true;
    }
};

_yuitest_coverline("build/tree-openable/tree-openable.js", 152);
Y.Tree.Openable = Openable;
/**
@module tree
@submodule tree-openable
**/

/**
`Tree.Node` extension that adds methods useful for nodes in trees that use the
`Tree.Openable` extension.

@class Tree.Node.Openable
@constructor
@extensionfor Tree.Node
**/

_yuitest_coverline("build/tree-openable/tree-openable.js", 167);
function NodeOpenable() {}

_yuitest_coverline("build/tree-openable/tree-openable.js", 169);
NodeOpenable.prototype = {
    /**
    Closes this node if it's currently open.

    @method close
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `close` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    close: function (options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "close", 183);
_yuitest_coverline("build/tree-openable/tree-openable.js", 184);
this.tree.closeNode(this, options);
        _yuitest_coverline("build/tree-openable/tree-openable.js", 185);
return this;
    },

    /**
    Returns `true` if this node is currently open.

    Note: the root node of a tree is always considered to be open.

    @method isOpen
    @return {Boolean} `true` if this node is currently open, `false` otherwise.
    **/
    isOpen: function () {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "isOpen", 196);
_yuitest_coverline("build/tree-openable/tree-openable.js", 197);
return !!this.state.open || this.isRoot();
    },

    /**
    Opens this node if it's currently closed.

    @method open
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `open` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    open: function (options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "open", 213);
_yuitest_coverline("build/tree-openable/tree-openable.js", 214);
this.tree.openNode(this, options);
        _yuitest_coverline("build/tree-openable/tree-openable.js", 215);
return this;
    },

    /**
    Toggles the open/closed state of this node, closing it if it's currently
    open or opening it if it's currently closed.

    @method toggleOpen
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, events will be
            suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    toggleOpen: function (options) {
        _yuitest_coverfunc("build/tree-openable/tree-openable.js", "toggleOpen", 232);
_yuitest_coverline("build/tree-openable/tree-openable.js", 233);
this.tree.toggleOpenNode(this, options);
        _yuitest_coverline("build/tree-openable/tree-openable.js", 234);
return this;
    }
};

_yuitest_coverline("build/tree-openable/tree-openable.js", 238);
Y.Tree.Node.Openable = NodeOpenable;


}, '@VERSION@', {"requires": ["tree"]});
