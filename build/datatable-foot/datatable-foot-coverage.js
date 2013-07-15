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
_yuitest_coverage["build/datatable-foot/datatable-foot.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatable-foot/datatable-foot.js",
    code: []
};
_yuitest_coverage["build/datatable-foot/datatable-foot.js"].code=["YUI.add('datatable-foot', function (Y, NAME) {","","/**","View class responsible for rendering the `<tfoot>` section of a table. Can be","used as the default `footerView` for `Y.DataTable.Base` and `Y.DataTable`","classes.","","@module datatable","@submodule datatable-foot","@since @SINCE@","**/","","","Y.namespace('DataTable').FooterView = Y.Base.create('tableFooter', Y.View, [], {","    // -- Instance properties -------------------------------------------------","","    /**","    HTML templates used to create the `<tfoot>` containing the table footers.","","    @property TFOOT_TEMPLATE","    @type {HTML}","    @default '<tfoot class=\"{className}\"/>'","    @since @SINCE@","    **/","    TFOOT_TEMPLATE: '<tfoot class=\"{className}\"/>',","","    // -- Public methods ------------------------------------------------------","","    /**","    Returns the generated CSS classname based on the input.  If the `host`","    attribute is configured, it will attempt to relay to its `getClassName`","    or use its static `NAME` property as a string base.","","    If `host` is absent or has neither method nor `NAME`, a CSS classname","    will be generated using this class's `NAME`.","","    @method getClassName","    @param {String} token* Any number of token strings to assemble the","        classname from.","    @return {String}","    @protected","    @since @SINCE@","    **/","    getClassName: function () {","        // TODO: add attribute with setter? to host to use property this.host","        // for performance","        var host = this.host,","            NAME = (host && host.constructor.NAME) ||","                    this.constructor.NAME;","","        if (host && host.getClassName) {","            return host.getClassName.apply(host, arguments);","        } else {","            return Y.ClassNameManager.getClassName","                .apply(Y.ClassNameManager,","                       [NAME].concat(Y.Array(arguments, 0, true)));","        }","    },","","    /**","    Creates the `<tfoot>` Node and inserts it after the `<thead>` Node.","","    @method render","    @return {FooterView} The instance","    @chainable","    @since @SINCE@","    **/","    render: function () {","        var tfoot    = this.tfootNode ||","                        (this.tfootNode = this._createTFootNode());","","        if (this.host && this.host._theadNode) {","            this.host._theadNode.insert(tfoot, 'after');","        }","","        return this;","    },","","    /**","    Creates the `<tfoot>` node that will store the footer rows and cells.","","    @method _createTFootNode","    @return {Node}","    @protected","    @since @SINCE@","    **/","    _createTFootNode: function () {","        return Y.Node.create(Y.Lang.sub(this.TFOOT_TEMPLATE, {","            className: this.getClassName('foot')","        }));","    },","","    /**","    Initializes the instance. Reads the following configuration properties:","","      * `host`    - The object to serve as source of truth for column info","","    @method initializer","    @param {Object} config Configuration data","    @protected","    @since @SINCE@","    **/","    initializer: function (config) {","        this.host  = (config && config.host);","    }","","","","});","","","}, '@VERSION@', {\"requires\": [\"datatable-core\", \"view\"]});"];
_yuitest_coverage["build/datatable-foot/datatable-foot.js"].lines = {"1":0,"14":0,"47":0,"51":0,"52":0,"54":0,"69":0,"72":0,"73":0,"76":0,"88":0,"104":0};
_yuitest_coverage["build/datatable-foot/datatable-foot.js"].functions = {"getClassName:44":0,"render:68":0,"_createTFootNode:87":0,"initializer:103":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatable-foot/datatable-foot.js"].coveredLines = 12;
_yuitest_coverage["build/datatable-foot/datatable-foot.js"].coveredFunctions = 5;
_yuitest_coverline("build/datatable-foot/datatable-foot.js", 1);
YUI.add('datatable-foot', function (Y, NAME) {

/**
View class responsible for rendering the `<tfoot>` section of a table. Can be
used as the default `footerView` for `Y.DataTable.Base` and `Y.DataTable`
classes.

@module datatable
@submodule datatable-foot
@since @SINCE@
**/


_yuitest_coverfunc("build/datatable-foot/datatable-foot.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatable-foot/datatable-foot.js", 14);
Y.namespace('DataTable').FooterView = Y.Base.create('tableFooter', Y.View, [], {
    // -- Instance properties -------------------------------------------------

    /**
    HTML templates used to create the `<tfoot>` containing the table footers.

    @property TFOOT_TEMPLATE
    @type {HTML}
    @default '<tfoot class="{className}"/>'
    @since @SINCE@
    **/
    TFOOT_TEMPLATE: '<tfoot class="{className}"/>',

    // -- Public methods ------------------------------------------------------

    /**
    Returns the generated CSS classname based on the input.  If the `host`
    attribute is configured, it will attempt to relay to its `getClassName`
    or use its static `NAME` property as a string base.

    If `host` is absent or has neither method nor `NAME`, a CSS classname
    will be generated using this class's `NAME`.

    @method getClassName
    @param {String} token* Any number of token strings to assemble the
        classname from.
    @return {String}
    @protected
    @since @SINCE@
    **/
    getClassName: function () {
        // TODO: add attribute with setter? to host to use property this.host
        // for performance
        _yuitest_coverfunc("build/datatable-foot/datatable-foot.js", "getClassName", 44);
_yuitest_coverline("build/datatable-foot/datatable-foot.js", 47);
var host = this.host,
            NAME = (host && host.constructor.NAME) ||
                    this.constructor.NAME;

        _yuitest_coverline("build/datatable-foot/datatable-foot.js", 51);
if (host && host.getClassName) {
            _yuitest_coverline("build/datatable-foot/datatable-foot.js", 52);
return host.getClassName.apply(host, arguments);
        } else {
            _yuitest_coverline("build/datatable-foot/datatable-foot.js", 54);
return Y.ClassNameManager.getClassName
                .apply(Y.ClassNameManager,
                       [NAME].concat(Y.Array(arguments, 0, true)));
        }
    },

    /**
    Creates the `<tfoot>` Node and inserts it after the `<thead>` Node.

    @method render
    @return {FooterView} The instance
    @chainable
    @since @SINCE@
    **/
    render: function () {
        _yuitest_coverfunc("build/datatable-foot/datatable-foot.js", "render", 68);
_yuitest_coverline("build/datatable-foot/datatable-foot.js", 69);
var tfoot    = this.tfootNode ||
                        (this.tfootNode = this._createTFootNode());

        _yuitest_coverline("build/datatable-foot/datatable-foot.js", 72);
if (this.host && this.host._theadNode) {
            _yuitest_coverline("build/datatable-foot/datatable-foot.js", 73);
this.host._theadNode.insert(tfoot, 'after');
        }

        _yuitest_coverline("build/datatable-foot/datatable-foot.js", 76);
return this;
    },

    /**
    Creates the `<tfoot>` node that will store the footer rows and cells.

    @method _createTFootNode
    @return {Node}
    @protected
    @since @SINCE@
    **/
    _createTFootNode: function () {
        _yuitest_coverfunc("build/datatable-foot/datatable-foot.js", "_createTFootNode", 87);
_yuitest_coverline("build/datatable-foot/datatable-foot.js", 88);
return Y.Node.create(Y.Lang.sub(this.TFOOT_TEMPLATE, {
            className: this.getClassName('foot')
        }));
    },

    /**
    Initializes the instance. Reads the following configuration properties:

      * `host`    - The object to serve as source of truth for column info

    @method initializer
    @param {Object} config Configuration data
    @protected
    @since @SINCE@
    **/
    initializer: function (config) {
        _yuitest_coverfunc("build/datatable-foot/datatable-foot.js", "initializer", 103);
_yuitest_coverline("build/datatable-foot/datatable-foot.js", 104);
this.host  = (config && config.host);
    }



});


}, '@VERSION@', {"requires": ["datatable-core", "view"]});
