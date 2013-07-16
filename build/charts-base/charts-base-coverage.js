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
_yuitest_coverage["build/charts-base/charts-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/charts-base/charts-base.js",
    code: []
};
_yuitest_coverage["build/charts-base/charts-base.js"].code=["YUI.add('charts-base', function (Y, NAME) {","","/**"," * Provides functionality for creating charts."," *"," * @module charts"," * @submodule charts-base"," */","var CONFIG = Y.config,","    WINDOW = CONFIG.win,","    DOCUMENT = CONFIG.doc,","    Y_Lang = Y.Lang,","    IS_STRING = Y_Lang.isString,","    _getClassName = Y.ClassNameManager.getClassName,","    SERIES_MARKER = _getClassName(\"seriesmarker\");","","/**"," * Gridlines draws gridlines on a Graph."," *"," * @class Gridlines"," * @constructor"," * @extends Base"," * @uses Renderer"," * @param {Object} config (optional) Configuration parameters."," * @submodule charts-base"," */","Y.Gridlines = Y.Base.create(\"gridlines\", Y.Base, [Y.Renderer], {","    /**","     * Reference to the `Path` element used for drawing Gridlines.","     *","     * @property _path","     * @type Path","     * @private","     */","    _path: null,","","    /**","     * Removes the Gridlines.","     *","     * @method remove","     * @private","     */","    remove: function()","    {","        var path = this._path;","        if(path)","        {","            path.destroy();","        }","    },","","    /**","     * Draws the gridlines","     *","     * @method draw","     * @protected","     */","    draw: function()","    {","        if(this.get(\"axis\") && this.get(\"graph\"))","        {","            this._drawGridlines();","        }","    },","","    /**","     * Algorithm for drawing gridlines","     *","     * @method _drawGridlines","     * @private","     */","    _drawGridlines: function()","    {","        var path,","            axis = this.get(\"axis\"),","            axisPosition = axis.get(\"position\"),","            points,","            i = 0,","            l,","            direction = this.get(\"direction\"),","            graph = this.get(\"graph\"),","            w = graph.get(\"width\"),","            h = graph.get(\"height\"),","            line = this.get(\"styles\").line,","            color = line.color,","            weight = line.weight,","            alpha = line.alpha,","            count = this.get(\"count\"),","            length,","            lineFunction;","        if(isFinite(w) && isFinite(h) && w > 0 && h > 0)","        {","            if(count && Y.Lang.isNumber(count))","            {","                points = this._getPoints(count, w, h);","            }","            else if(axisPosition !== \"none\" && axis && axis.get(\"tickPoints\"))","            {","                points = axis.get(\"tickPoints\");","            }","            else","            {","                points = this._getPoints(axis.get(\"styles\").majorUnit.count, w, h);","            }","            l = points.length;","            path = graph.get(\"gridlines\");","            path.set(\"width\", w);","            path.set(\"height\", h);","            path.set(\"stroke\", {","                weight: weight,","                color: color,","                opacity: alpha","            });","            if(direction === \"vertical\")","            {","                lineFunction = this._verticalLine;","                length = h;","            }","            else","            {","                lineFunction = this._horizontalLine;","                length = w;","            }","            for(i = 0; i < l; i = i + 1)","            {","                lineFunction(path, points[i], length);","            }","            path.end();","        }","    },","","    /**","     * Calculates the coordinates for the gridlines based on a count.","     *","     * @method _getPoints","     * @param {Number} count Number of gridlines","     * @return Array","     * @private","     */","    _getPoints: function(count, w, h)","    {","        var i,","            points = [],","            multiplier,","            divisor = count - 1;","        for(i = 0; i < count; i = i + 1)","        {","            multiplier = i/divisor;","            points[i] = {","                x: w * multiplier,","                y: h * multiplier","            };","        }","        return points;","    },","","    /**","     * Algorithm for horizontal lines.","     *","     * @method _horizontalLine","     * @param {Path} path Reference to path element","     * @param {Object} pt Coordinates corresponding to a major unit of an axis.","     * @param {Number} w Width of the Graph","     * @private","     */","    _horizontalLine: function(path, pt, w)","    {","        path.moveTo(0, pt.y);","        path.lineTo(w, pt.y);","    },","","    /**","     * Algorithm for vertical lines.","     *","     * @method _verticalLine","     * @param {Path} path Reference to path element","     * @param {Object} pt Coordinates corresponding to a major unit of an axis.","     * @param {Number} h Height of the Graph","     * @private","     */","    _verticalLine: function(path, pt, h)","    {","        path.moveTo(pt.x, 0);","        path.lineTo(pt.x, h);","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var defs = {","            line: {","                color:\"#f0efe9\",","                weight: 1,","                alpha: 1","            }","        };","        return defs;","    }","","},","{","    ATTRS: {","        /**","         * Indicates the direction of the gridline.","         *","         * @attribute direction","         * @type String","         */","        direction: {},","","        /**","         * Indicate the `Axis` in which to bind","         * the gridlines.","         *","         * @attribute axis","         * @type Axis","         */","        axis: {},","","        /**","         * Indicates the `Graph` in which the gridlines","         * are drawn.","         *","         * @attribute graph","         * @type Graph","         */","        graph: {},","","        /**","         * Indicates the number of gridlines to display. If no value is set, gridlines will equal the number of ticks in","         * the corresponding axis.","         *","         * @attribute count","         * @type Number","         */","        count: {}","    }","});","/**"," * Graph manages and contains series instances for a `CartesianChart`"," * instance."," *"," * @class Graph"," * @constructor"," * @extends Widget"," * @uses Renderer"," * @submodule charts-base"," */","Y.Graph = Y.Base.create(\"graph\", Y.Widget, [Y.Renderer], {","    /**","     * @method bindUI","     * @private","     */","    bindUI: function()","    {","        var bb = this.get(\"boundingBox\");","        bb.setStyle(\"position\", \"absolute\");","        this.after(\"widthChange\", this._sizeChangeHandler);","        this.after(\"heightChange\", this._sizeChangeHandler);","        this.after(\"stylesChange\", this._updateStyles);","        this.after(\"groupMarkersChange\", this._drawSeries);","    },","","    /**","     * @method syncUI","     * @private","     */","    syncUI: function()","    {","        var background,","            cb,","            bg,","            sc = this.get(\"seriesCollection\"),","            series,","            i = 0,","            len = sc ? sc.length : 0,","            hgl = this.get(\"horizontalGridlines\"),","            vgl = this.get(\"verticalGridlines\");","        if(this.get(\"showBackground\"))","        {","            background = this.get(\"background\");","            cb = this.get(\"contentBox\");","            bg = this.get(\"styles\").background;","            bg.stroke = bg.border;","            bg.stroke.opacity = bg.stroke.alpha;","            bg.fill.opacity = bg.fill.alpha;","            bg.width = this.get(\"width\");","            bg.height = this.get(\"height\");","            bg.type = bg.shape;","            background.set(bg);","        }","        for(; i < len; ++i)","        {","            series = sc[i];","            if(series instanceof Y.SeriesBase)","            {","                series.render();","            }","        }","        if(hgl && hgl instanceof Y.Gridlines)","        {","            hgl.draw();","        }","        if(vgl && vgl instanceof Y.Gridlines)","        {","            vgl.draw();","        }","    },","","    /**","     * Object of arrays containing series mapped to a series type.","     *","     * @property seriesTypes","     * @type Object","     * @private","     */","    seriesTypes: null,","","    /**","     * Returns a series instance based on an index.","     *","     * @method getSeriesByIndex","     * @param {Number} val index of the series","     * @return CartesianSeries","     */","    getSeriesByIndex: function(val)","    {","        var col = this.get(\"seriesCollection\"),","            series;","        if(col && col.length > val)","        {","            series = col[val];","        }","        return series;","    },","","    /**","     * Returns a series instance based on a key value.","     *","     * @method getSeriesByKey","     * @param {String} val key value of the series","     * @return CartesianSeries","     */","    getSeriesByKey: function(val)","    {","        var obj = this._seriesDictionary,","            series;","        if(obj && obj.hasOwnProperty(val))","        {","            series = obj[val];","        }","        return series;","    },","","    /**","     * Adds dispatcher to a `_dispatcher` used to","     * to ensure all series have redrawn before for firing event.","     *","     * @method addDispatcher","     * @param {CartesianSeries} val series instance to add","     * @protected","     */","    addDispatcher: function(val)","    {","        if(!this._dispatchers)","        {","            this._dispatchers = [];","        }","        this._dispatchers.push(val);","    },","","    /**","     * Collection of series to be displayed in the graph.","     *","     * @property _seriesCollection","     * @type Array","     * @private","     */","    _seriesCollection: null,","","    /**","     * Object containing key value pairs of `CartesianSeries` instances.","     *","     * @property _seriesDictionary","     * @type Object","     * @private","     */","    _seriesDictionary: null,","","    /**","     * Parses series instances to be displayed in the graph.","     *","     * @method _parseSeriesCollection","     * @param {Array} Collection of `CartesianSeries` instances or objects container `CartesianSeries` attributes values.","     * @private","     */","    _parseSeriesCollection: function(val)","    {","        if(!val)","        {","            return;","        }","        var len = val.length,","            i = 0,","            series,","            seriesKey;","        this._seriesCollection = [];","        this._seriesDictionary = {};","        this.seriesTypes = [];","        for(; i < len; ++i)","        {","            series = val[i];","            if(!(series instanceof Y.CartesianSeries) && !(series instanceof Y.PieSeries))","            {","                this._createSeries(series);","                continue;","            }","            this._addSeries(series);","        }","        len = this._seriesCollection.length;","        for(i = 0; i < len; ++i)","        {","            series = this.get(\"seriesCollection\")[i];","            seriesKey = series.get(\"direction\") === \"horizontal\" ? \"yKey\" : \"xKey\";","            this._seriesDictionary[series.get(seriesKey)] = series;","        }","    },","","    /**","     * Adds a series to the graph.","     *","     * @method _addSeries","     * @param {CartesianSeries} series Series to add to the graph.","     * @private","     */","    _addSeries: function(series)","    {","        var type = series.get(\"type\"),","            seriesCollection = this.get(\"seriesCollection\"),","            graphSeriesLength = seriesCollection.length,","            seriesTypes = this.seriesTypes,","            typeSeriesCollection;","        if(!series.get(\"graph\"))","        {","            series.set(\"graph\", this);","        }","        seriesCollection.push(series);","        if(!seriesTypes.hasOwnProperty(type))","        {","            this.seriesTypes[type] = [];","        }","        typeSeriesCollection = this.seriesTypes[type];","        series.set(\"graphOrder\", graphSeriesLength);","        series.set(\"order\", typeSeriesCollection.length);","        typeSeriesCollection.push(series);","        series.set(\"seriesTypeCollection\", typeSeriesCollection);","        this.addDispatcher(series);","        series.after(\"drawingComplete\", Y.bind(this._drawingCompleteHandler, this));","        this.fire(\"seriesAdded\", series);","    },","","    /**","     * Creates a `CartesianSeries` instance from an object containing attribute key value pairs. The key value pairs include","     * attributes for the specific series and a type value which defines the type of series to be used.","     *","     * @method createSeries","     * @param {Object} seriesData Series attribute key value pairs.","     * @private","     */","    _createSeries: function(seriesData)","    {","        var type = seriesData.type,","            seriesCollection = this.get(\"seriesCollection\"),","            seriesTypes = this.seriesTypes,","            typeSeriesCollection,","            SeriesClass,","            series;","            seriesData.graph = this;","        if(!seriesTypes.hasOwnProperty(type))","        {","            seriesTypes[type] = [];","        }","        typeSeriesCollection = seriesTypes[type];","        seriesData.graph = this;","        seriesData.order = typeSeriesCollection.length;","        seriesData.graphOrder = seriesCollection.length;","        SeriesClass = this._getSeries(seriesData.type);","        series = new SeriesClass(seriesData);","        this.addDispatcher(series);","        series.after(\"drawingComplete\", Y.bind(this._drawingCompleteHandler, this));","        typeSeriesCollection.push(series);","        seriesCollection.push(series);","        series.set(\"seriesTypeCollection\", typeSeriesCollection);","        if(this.get(\"rendered\"))","        {","            series.render();","        }","    },","","    /**","     * String reference for pre-defined `Series` classes.","     *","     * @property _seriesMap","     * @type Object","     * @private","     */","    _seriesMap: {","        line : Y.LineSeries,","        column : Y.ColumnSeries,","        bar : Y.BarSeries,","        area :  Y.AreaSeries,","        candlestick : Y.CandlestickSeries,","        ohlc : Y.OHLCSeries,","        stackedarea : Y.StackedAreaSeries,","        stackedline : Y.StackedLineSeries,","        stackedcolumn : Y.StackedColumnSeries,","        stackedbar : Y.StackedBarSeries,","        markerseries : Y.MarkerSeries,","        spline : Y.SplineSeries,","        areaspline : Y.AreaSplineSeries,","        stackedspline : Y.StackedSplineSeries,","        stackedareaspline : Y.StackedAreaSplineSeries,","        stackedmarkerseries : Y.StackedMarkerSeries,","        pie : Y.PieSeries,","        combo : Y.ComboSeries,","        stackedcombo : Y.StackedComboSeries,","        combospline : Y.ComboSplineSeries,","        stackedcombospline : Y.StackedComboSplineSeries","    },","","    /**","     * Returns a specific `CartesianSeries` class based on key value from a look up table of a direct reference to a","     * class. When specifying a key value, the following options are available:","     *","     *  <table>","     *      <tr><th>Key Value</th><th>Class</th></tr>","     *      <tr><td>line</td><td>Y.LineSeries</td></tr>","     *      <tr><td>column</td><td>Y.ColumnSeries</td></tr>","     *      <tr><td>bar</td><td>Y.BarSeries</td></tr>","     *      <tr><td>area</td><td>Y.AreaSeries</td></tr>","     *      <tr><td>stackedarea</td><td>Y.StackedAreaSeries</td></tr>","     *      <tr><td>stackedline</td><td>Y.StackedLineSeries</td></tr>","     *      <tr><td>stackedcolumn</td><td>Y.StackedColumnSeries</td></tr>","     *      <tr><td>stackedbar</td><td>Y.StackedBarSeries</td></tr>","     *      <tr><td>markerseries</td><td>Y.MarkerSeries</td></tr>","     *      <tr><td>spline</td><td>Y.SplineSeries</td></tr>","     *      <tr><td>areaspline</td><td>Y.AreaSplineSeries</td></tr>","     *      <tr><td>stackedspline</td><td>Y.StackedSplineSeries</td></tr>","     *      <tr><td>stackedareaspline</td><td>Y.StackedAreaSplineSeries</td></tr>","     *      <tr><td>stackedmarkerseries</td><td>Y.StackedMarkerSeries</td></tr>","     *      <tr><td>pie</td><td>Y.PieSeries</td></tr>","     *      <tr><td>combo</td><td>Y.ComboSeries</td></tr>","     *      <tr><td>stackedcombo</td><td>Y.StackedComboSeries</td></tr>","     *      <tr><td>combospline</td><td>Y.ComboSplineSeries</td></tr>","     *      <tr><td>stackedcombospline</td><td>Y.StackedComboSplineSeries</td></tr>","     *  </table>","     *","     * When referencing a class directly, you can specify any of the above classes or any custom class that extends","     * `CartesianSeries` or `PieSeries`.","     *","     * @method _getSeries","     * @param {String | Object} type Series type.","     * @return CartesianSeries","     * @private","     */","    _getSeries: function(type)","    {","        var seriesClass;","        if(Y_Lang.isString(type))","        {","            seriesClass = this._seriesMap[type];","        }","        else","        {","            seriesClass = type;","        }","        return seriesClass;","    },","","    /**","     * Event handler for marker events.","     *","     * @method _markerEventHandler","     * @param {Object} e Event object.","     * @private","     */","    _markerEventHandler: function(e)","    {","        var type = e.type,","            markerNode = e.currentTarget,","            strArr = markerNode.getAttribute(\"id\").split(\"_\"),","            series = this.getSeriesByIndex(strArr[1]),","            index = strArr[2];","        series.updateMarkerState(type, index);","    },","","    /**","     * Collection of `CartesianSeries` instances to be redrawn.","     *","     * @property _dispatchers","     * @type Array","     * @private","     */","    _dispatchers: null,","","    /**","     * Updates the `Graph` styles.","     *","     * @method _updateStyles","     * @private","     */","    _updateStyles: function()","    {","        var styles = this.get(\"styles\").background,","            border = styles.border;","            border.opacity = border.alpha;","            styles.stroke = border;","            styles.fill.opacity = styles.fill.alpha;","        this.get(\"background\").set(styles);","        this._sizeChangeHandler();","    },","","    /**","     * Event handler for size changes.","     *","     * @method _sizeChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _sizeChangeHandler: function()","    {","        var hgl = this.get(\"horizontalGridlines\"),","            vgl = this.get(\"verticalGridlines\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            bg = this.get(\"styles\").background,","            weight,","            background;","        if(bg && bg.border)","        {","            weight = bg.border.weight || 0;","        }","        if(this.get(\"showBackground\"))","        {","            background = this.get(\"background\");","            if(w && h)","            {","                background.set(\"width\", w);","                background.set(\"height\", h);","            }","        }","        if(this._gridlines)","        {","            this._gridlines.clear();","        }","        if(hgl && hgl instanceof Y.Gridlines)","        {","            hgl.draw();","        }","        if(vgl && vgl instanceof Y.Gridlines)","        {","            vgl.draw();","        }","        this._drawSeries();","    },","","    /**","     * Draws each series.","     *","     * @method _drawSeries","     * @private","     */","    _drawSeries: function()","    {","        if(this._drawing)","        {","            this._callLater = true;","            return;","        }","        var sc,","            i,","            len,","            graphic = this.get(\"graphic\");","        graphic.set(\"autoDraw\", false);","        graphic.set(\"width\", this.get(\"width\"));","        graphic.set(\"height\", this.get(\"height\"));","        this._callLater = false;","        this._drawing = true;","        sc = this.get(\"seriesCollection\");","        i = 0;","        len = sc ? sc.length : 0;","        for(; i < len; ++i)","        {","            sc[i].draw();","            if((!sc[i].get(\"xcoords\") || !sc[i].get(\"ycoords\")) && !sc[i] instanceof Y.PieSeries)","            {","                this._callLater = true;","                break;","            }","        }","        this._drawing = false;","        if(this._callLater)","        {","            this._drawSeries();","        }","    },","","    /**","     * Event handler for series drawingComplete event.","     *","     * @method _drawingCompleteHandler","     * @param {Object} e Event object.","     * @private","     */","    _drawingCompleteHandler: function(e)","    {","        var series = e.currentTarget,","            graphic,","            index = Y.Array.indexOf(this._dispatchers, series);","        if(index > -1)","        {","            this._dispatchers.splice(index, 1);","        }","        if(this._dispatchers.length < 1)","        {","            graphic = this.get(\"graphic\");","            if(!graphic.get(\"autoDraw\"))","            {","                graphic._redraw();","            }","            this.fire(\"chartRendered\");","        }","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var defs = {","            background: {","                shape: \"rect\",","                fill:{","                    color:\"#faf9f2\"","                },","                border: {","                    color:\"#dad8c9\",","                    weight: 1","                }","            }","        };","        return defs;","    },","","    /**","     * Destructor implementation Graph class. Removes all Graphic instances from the widget.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        if(this._graphic)","        {","            this._graphic.destroy();","            this._graphic = null;","        }","        if(this._background)","        {","            this._background.get(\"graphic\").destroy();","            this._background = null;","        }","        if(this._gridlines)","        {","            this._gridlines.get(\"graphic\").destroy();","            this._gridlines = null;","        }","    }","}, {","    ATTRS: {","        /**","         * The x-coordinate for the graph.","         *","         * @attribute x","         * @type Number","         * @protected","         */","        x: {","            setter: function(val)","            {","                this.get(\"boundingBox\").setStyle(\"left\", val + \"px\");","                return val;","            }","        },","","        /**","         * The y-coordinate for the graph.","         *","         * @attribute y","         * @type Number","         * @protected","         */","        y: {","            setter: function(val)","            {","                this.get(\"boundingBox\").setStyle(\"top\", val + \"px\");","                return val;","            }","        },","","        /**","         * Reference to the chart instance using the graph.","         *","         * @attribute chart","         * @type ChartBase","         * @readOnly","         */","        chart: {","            getter: function() {","                var chart = this._state.chart || this;","                return chart;","            }","        },","","        /**","         * Collection of series. When setting the `seriesCollection` the array can contain a combination of either","         * `CartesianSeries` instances or object literals with properties that will define a series.","         *","         * @attribute seriesCollection","         * @type CartesianSeries","         */","        seriesCollection: {","            getter: function()","            {","                return this._seriesCollection;","            },","","            setter: function(val)","            {","                this._parseSeriesCollection(val);","                return this._seriesCollection;","            }","        },","","        /**","         * Indicates whether the `Graph` has a background.","         *","         * @attribute showBackground","         * @type Boolean","         * @default true","         */","        showBackground: {","            value: true","        },","","        /**","         * Read-only hash lookup for all series on in the `Graph`.","         *","         * @attribute seriesDictionary","         * @type Object","         * @readOnly","         */","        seriesDictionary: {","            readOnly: true,","","            getter: function()","            {","                return this._seriesDictionary;","            }","        },","","        /**","         * Reference to the horizontal `Gridlines` instance.","         *","         * @attribute horizontalGridlines","         * @type Gridlines","         * @default null","         */","        horizontalGridlines: {","            value: null,","","            setter: function(val)","            {","                var cfg,","                    key,","                    gl = this.get(\"horizontalGridlines\");","                if(gl && gl instanceof Y.Gridlines)","                {","                    gl.remove();","                }","                if(val instanceof Y.Gridlines)","                {","                    gl = val;","                    val.set(\"graph\", this);","                    return val;","                }","                else if(val)","                {","                    cfg = {","                        direction: \"horizonal\",","                        graph: this","                    };","                    for(key in val)","                    {","                        if(val.hasOwnProperty(key))","                        {","                            cfg[key] = val[key];","                        }","                    }","                    gl = new Y.Gridlines(cfg);","                    return gl;","                }","            }","        },","","        /**","         * Reference to the vertical `Gridlines` instance.","         *","         * @attribute verticalGridlines","         * @type Gridlines","         * @default null","         */","        verticalGridlines: {","            value: null,","","            setter: function(val)","            {","                var cfg,","                    key,","                    gl = this.get(\"verticalGridlines\");","                if(gl && gl instanceof Y.Gridlines)","                {","                    gl.remove();","                }","                if(val instanceof Y.Gridlines)","                {","                    gl = val;","                    val.set(\"graph\", this);","                    return val;","                }","                else if(val)","                {","                    cfg = {","                        direction: \"vertical\",","                        graph: this","                    };","                    for(key in val)","                    {","                        if(val.hasOwnProperty(key))","                        {","                            cfg[key] = val[key];","                        }","                    }","                    gl = new Y.Gridlines(cfg);","                    return gl;","                }","            }","        },","","        /**","         * Reference to graphic instance used for the background.","         *","         * @attribute background","         * @type Graphic","         * @readOnly","         */","        background: {","            getter: function()","            {","                if(!this._background)","                {","                    this._backgroundGraphic = new Y.Graphic({render:this.get(\"contentBox\")});","                    this._backgroundGraphic.get(\"node\").style.zIndex = 0;","                    this._background = this._backgroundGraphic.addShape({type: \"rect\"});","                }","                return this._background;","            }","        },","","        /**","         * Reference to graphic instance used for gridlines.","         *","         * @attribute gridlines","         * @type Graphic","         * @readOnly","         */","        gridlines: {","            readOnly: true,","","            getter: function()","            {","                if(!this._gridlines)","                {","                    this._gridlinesGraphic = new Y.Graphic({render:this.get(\"contentBox\")});","                    this._gridlinesGraphic.get(\"node\").style.zIndex = 1;","                    this._gridlines = this._gridlinesGraphic.addShape({type: \"path\"});","                }","                return this._gridlines;","            }","        },","","        /**","         * Reference to graphic instance used for series.","         *","         * @attribute graphic","         * @type Graphic","         * @readOnly","         */","        graphic: {","            readOnly: true,","","            getter: function()","            {","                if(!this._graphic)","                {","                    this._graphic = new Y.Graphic({render:this.get(\"contentBox\")});","                    this._graphic.get(\"node\").style.zIndex = 2;","                    this._graphic.set(\"autoDraw\", false);","                }","                return this._graphic;","            }","        },","","        /**","         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","         *","         * @attribute groupMarkers","         * @type Boolean","         */","        groupMarkers: {","            value: false","        }","","        /**","         * Style properties used for drawing a background. Below are the default values:","         *  <dl>","         *      <dt>background</dt><dd>An object containing the following values:","         *          <dl>","         *              <dt>fill</dt><dd>Defines the style properties for the fill. Contains the following values:","         *                  <dl>","         *                      <dt>color</dt><dd>Color of the fill. The default value is #faf9f2.</dd>","         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background fill.","         *                      The default value is 1.</dd>","         *                  </dl>","         *              </dd>","         *              <dt>border</dt><dd>Defines the style properties for the border. Contains the following values:","         *                  <dl>","         *                      <dt>color</dt><dd>Color of the border. The default value is #dad8c9.</dd>","         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background border.","         *                      The default value is 1.</dd>","         *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *                  </dl>","         *              </dd>","         *          </dl>","         *      </dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","/**"," * The ChartBase class is an abstract class used to create charts."," *"," * @class ChartBase"," * @constructor"," * @submodule charts-base"," */","function ChartBase() {}","","ChartBase.ATTRS = {","    /**","     * Data used to generate the chart.","     *","     * @attribute dataProvider","     * @type Array","     */","    dataProvider: {","        lazyAdd: false,","","        valueFn: function()","        {","            var defDataProvider = [];","            if(!this._wereSeriesKeysExplicitlySet())","            {","                this.set(\"seriesKeys\", this._buildSeriesKeys(defDataProvider), {src: \"internal\"});","            }","            return defDataProvider;","        },","","        setter: function(val)","        {","            var dataProvider = this._setDataValues(val);","            if(!this._wereSeriesKeysExplicitlySet())","            {","                this.set(\"seriesKeys\", this._buildSeriesKeys(dataProvider), {src: \"internal\"});","            }","            return dataProvider;","        }","    },","","    /**","     * A collection of keys that map to the series axes. If no keys are set,","     * they will be generated automatically depending on the data structure passed into","     * the chart.","     *","     * @attribute seriesKeys","     * @type Array","     */","    seriesKeys: {","        lazyAdd: false,","","        setter: function(val)","        {","            var opts = arguments[2];","            if(!val || (opts && opts.src && opts.src === \"internal\"))","            {","                this._seriesKeysExplicitlySet = false;","            }","            else","            {","                this._seriesKeysExplicitlySet = true;","            }","            return val;","        }","    },","","    /**","     * Sets the `aria-label` for the chart.","     *","     * @attribute ariaLabel","     * @type String","     */","    ariaLabel: {","        value: \"Chart Application\",","","        setter: function(val)","        {","            var cb = this.get(\"contentBox\");","            if(cb)","            {","                cb.setAttribute(\"aria-label\", val);","            }","            return val;","        }","    },","","    /**","     * Sets the aria description for the chart.","     *","     * @attribute ariaDescription","     * @type String","     */","    ariaDescription: {","        value: \"Use the up and down keys to navigate between series. Use the left and right keys to navigate through items in a series.\",","","        setter: function(val)","        {","            if(this._description)","            {","                this._description.setContent(\"\");","                this._description.appendChild(DOCUMENT.createTextNode(val));","            }","            return val;","        }","    },","","    /**","     * Reference to the default tooltip available for the chart.","     * <p>Contains the following properties:</p>","     *  <dl>","     *      <dt>node</dt><dd>Reference to the actual dom node</dd>","     *      <dt>showEvent</dt><dd>Event that should trigger the tooltip</dd>","     *      <dt>hideEvent</dt><dd>Event that should trigger the removal of a tooltip (can be an event or an array of events)</dd>","     *      <dt>styles</dt><dd>A hash of style properties that will be applied to the tooltip node</dd>","     *      <dt>show</dt><dd>Indicates whether or not to show the tooltip</dd>","     *      <dt>markerEventHandler</dt><dd>Displays and hides tooltip based on marker events</dd>","     *      <dt>planarEventHandler</dt><dd>Displays and hides tooltip based on planar events</dd>","     *      <dt>markerLabelFunction</dt><dd>Reference to the function used to format a marker event triggered tooltip's text.","     *      The method contains the following arguments:","     *  <dl>","     *      <dt>categoryItem</dt><dd>An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>","     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided).</dd>","     *      <dt>key</dt><dd>The key of the category.</dd>","     *      <dt>value</dt><dd>The value of the category.</dd>","     *  </dl>","     *  </dd>","     *  <dt>valueItem</dt><dd>An object containing the following:","     *      <dl>","     *          <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>","     *          <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *          <dt>key</dt><dd>The key for the series.</dd>","     *          <dt>value</dt><dd>The value for the series item.</dd>","     *      </dl>","     *  </dd>","     *  <dt>itemIndex</dt><dd>The index of the item within the series.</dd>","     *  <dt>series</dt><dd> The `CartesianSeries` instance of the item.</dd>","     *  <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>","     *  </dl>","     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose","     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.","     *  </dd>","     *  <dt>planarLabelFunction</dt><dd>Reference to the function used to format a planar event triggered tooltip's text","     *  <dl>","     *      <dt>categoryAxis</dt><dd> `CategoryAxis` Reference to the categoryAxis of the chart.","     *      <dt>valueItems</dt><dd>Array of objects for each series that has a data point in the coordinate plane of the event. Each","     *      object contains the following data:","     *  <dl>","     *      <dt>axis</dt><dd>The value axis of the series.</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *  </dl>","     *  </dd>","     *      <dt>index</dt><dd>The index of the item within its series.</dd>","     *      <dt>seriesArray</dt><dd>Array of series instances for each value item.</dd>","     *      <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>","     *  </dl>","     *  </dd>","     *  </dl>","     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose","     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.","     *  </dd>","     *  <dt>setTextFunction</dt><dd>Method that writes content returned from `planarLabelFunction` or `markerLabelFunction` into the","     *  the tooltip node. Has the following signature:","     *  <dl>","     *      <dt>label</dt><dd>The `HTMLElement` that the content is to be added.</dd>","     *      <dt>val</dt><dd>The content to be rendered into tooltip. This can be a `String` or `HTMLElement`. If an HTML string is used,","     *      it will be rendered as a string.</dd>","     *  </dl>","     *  </dd>","     *  </dl>","     * @attribute tooltip","     * @type Object","     */","    tooltip: {","        valueFn: \"_getTooltip\",","","        setter: function(val)","        {","            return this._updateTooltip(val);","        }","    },","","    /**","     * The key value used for the chart's category axis.","     *","     * @attribute categoryKey","     * @type String","     * @default category","     */","    categoryKey: {","        value: \"category\"","    },","","    /**","     * Indicates the type of axis to use for the category axis.","     *","     *  <dl>","     *      <dt>category</dt><dd>Specifies a `CategoryAxis`.</dd>","     *      <dt>time</dt><dd>Specifies a `TimeAxis</dd>","     *  </dl>","     *","     * @attribute categoryType","     * @type String","     * @default category","     */","    categoryType:{","        value:\"category\"","    },","","    /**","     * Indicates the the type of interactions that will fire events.","     *","     *  <dl>","     *      <dt>marker</dt><dd>Events will be broadcasted when the mouse interacts with individual markers.</dd>","     *      <dt>planar</dt><dd>Events will be broadcasted when the mouse intersects the plane of any markers on the chart.</dd>","     *      <dt>none</dt><dd>No events will be broadcasted.</dd>","     *  </dl>","     *","     * @attribute interactionType","     * @type String","     * @default marker","     */","    interactionType: {","        value: \"marker\"","    },","","    /**","     * Reference to all the axes in the chart.","     *","     * @attribute axesCollection","     * @type Array","     */","    axesCollection: {},","","    /**","     * Reference to graph instance.","     *","     * @attribute graph","     * @type Graph","     */","    graph: {","        valueFn: \"_getGraph\"","    },","","    /**","     * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.","     *","     * @attribute groupMarkers","     * @type Boolean","     */","    groupMarkers: {","        value: false","    }","};","","ChartBase.prototype = {","","    /**","     * Utility method to determine if `seriesKeys` was explicitly provided","     * (for example during construction, or set by the user), as opposed to","     * being derived from the dataProvider for example.","     *","     * @method _wereSeriesKeysExplicitlySet","     * @private","     * @return boolean true if the `seriesKeys` attribute was explicitly set.","     */","    _wereSeriesKeysExplicitlySet : function()","    {","        var seriesKeys = this.get(\"seriesKeys\");","        return seriesKeys && this._seriesKeysExplicitlySet;","    },","","    /**","     * Handles groupMarkers change event.","     *","     * @method _groupMarkersChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _groupMarkersChangeHandler: function(e)","    {","        var graph = this.get(\"graph\"),","            useGroupMarkers = e.newVal;","        if(graph)","        {","            graph.set(\"groupMarkers\", useGroupMarkers);","        }","    },","","    /**","     * Handler for itemRendered event.","     *","     * @method _itemRendered","     * @param {Object} e Event object.","     * @private","     */","    _itemRendered: function(e)","    {","        this._itemRenderQueue = this._itemRenderQueue.splice(1 + Y.Array.indexOf(this._itemRenderQueue, e.currentTarget), 1);","        if(this._itemRenderQueue.length < 1)","        {","            this._redraw();","        }","    },","","    /**","     * Default value function for the `Graph` attribute.","     *","     * @method _getGraph","     * @return Graph","     * @private","     */","    _getGraph: function()","    {","        var graph = new Y.Graph({","            chart:this,","            groupMarkers: this.get(\"groupMarkers\")","        });","        graph.after(\"chartRendered\", Y.bind(function() {","            this.fire(\"chartRendered\");","        }, this));","        return graph;","    },","","    /**","     * Returns a series instance by index or key value.","     *","     * @method getSeries","     * @param val","     * @return CartesianSeries","     */","    getSeries: function(val)","    {","        var series = null,","            graph = this.get(\"graph\");","        if(graph)","        {","            if(Y_Lang.isNumber(val))","            {","                series = graph.getSeriesByIndex(val);","            }","            else","            {","                series = graph.getSeriesByKey(val);","            }","        }","        return series;","    },","","    /**","     * Returns an `Axis` instance by key reference. If the axis was explicitly set through the `axes` attribute,","     * the key will be the same as the key used in the `axes` object. For default axes, the key for","     * the category axis is the value of the `categoryKey` (`category`). For the value axis, the default","     * key is `values`.","     *","     * @method getAxisByKey","     * @param {String} val Key reference used to look up the axis.","     * @return Axis","     */","    getAxisByKey: function(val)","    {","        var axis,","            axes = this.get(\"axes\");","        if(axes && axes.hasOwnProperty(val))","        {","            axis = axes[val];","        }","        return axis;","    },","","    /**","     * Returns the category axis for the chart.","     *","     * @method getCategoryAxis","     * @return Axis","     */","    getCategoryAxis: function()","    {","        var axis,","            key = this.get(\"categoryKey\"),","            axes = this.get(\"axes\");","        if(axes.hasOwnProperty(key))","        {","            axis = axes[key];","        }","        return axis;","    },","","    /**","     * Default direction of the chart.","     *","     * @property _direction","     * @type String","     * @default horizontal","     * @private","     */","    _direction: \"horizontal\",","","    /**","     * Storage for the `dataProvider` attribute.","     *","     * @property _dataProvider","     * @type Array","     * @private","     */","    _dataProvider: null,","","    /**","     * Setter method for `dataProvider` attribute.","     *","     * @method _setDataValues","     * @param {Array} val Array to be set as `dataProvider`.","     * @return Array","     * @private","     */","    _setDataValues: function(val)","    {","        if(Y_Lang.isArray(val[0]))","        {","            var hash,","                dp = [],","                cats = val[0],","                i = 0,","                l = cats.length,","                n,","                sl = val.length;","            for(; i < l; ++i)","            {","                hash = {category:cats[i]};","                for(n = 1; n < sl; ++n)","                {","                    hash[\"series\" + n] = val[n][i];","                }","                dp[i] = hash;","            }","            return dp;","        }","        return val;","    },","","    /**","     * Storage for `seriesCollection` attribute.","     *","     * @property _seriesCollection","     * @type Array","     * @private","     */","    _seriesCollection: null,","","    /**","     * Setter method for `seriesCollection` attribute.","     *","     * @property _setSeriesCollection","     * @param {Array} val Array of either `CartesianSeries` instances or objects containing series attribute key value pairs.","     * @private","     */","    _setSeriesCollection: function(val)","    {","        this._seriesCollection = val;","    },","    /**","     * Helper method that returns the axis class that a key references.","     *","     * @method _getAxisClass","     * @param {String} t The type of axis.","     * @return Axis","     * @private","     */","    _getAxisClass: function(t)","    {","        return this._axisClass[t];","    },","","    /**","     * Key value pairs of axis types.","     *","     * @property _axisClass","     * @type Object","     * @private","     */","    _axisClass: {","        stacked: Y.StackedAxis,","        numeric: Y.NumericAxis,","        category: Y.CategoryAxis,","        time: Y.TimeAxis","    },","","    /**","     * Collection of axes.","     *","     * @property _axes","     * @type Array","     * @private","     */","    _axes: null,","","    /**","     * @method initializer","     * @private","     */","    initializer: function()","    {","        this._itemRenderQueue = [];","        this._seriesIndex = -1;","        this._itemIndex = -1;","        this.after(\"dataProviderChange\", this._dataProviderChangeHandler);","    },","","    /**","     * @method renderUI","     * @private","     */","    renderUI: function()","    {","        var tt = this.get(\"tooltip\"),","            bb = this.get(\"boundingBox\"),","            cb = this.get(\"contentBox\");","        //move the position = absolute logic to a class file","        bb.setStyle(\"position\", \"absolute\");","        cb.setStyle(\"position\", \"absolute\");","        this._addAxes();","        this._addSeries();","        if(tt && tt.show)","        {","            this._addTooltip();","        }","        this._setAriaElements(bb, cb);","    },","","    /**","     * Creates an aria `live-region`, `aria-label` and `aria-describedby` for the Chart.","     *","     * @method _setAriaElements","     * @param {Node} cb Reference to the Chart's `contentBox` attribute.","     * @private","     */","    _setAriaElements: function(bb, cb)","    {","        var description = this._getAriaOffscreenNode(),","            id = this.get(\"id\") + \"_description\",","            liveRegion = this._getAriaOffscreenNode();","        cb.set(\"tabIndex\", 0);","        cb.set(\"role\", \"img\");","        cb.setAttribute(\"aria-label\", this.get(\"ariaLabel\"));","        cb.setAttribute(\"aria-describedby\", id);","        description.set(\"id\", id);","        description.set(\"tabIndex\", -1);","        description.appendChild(DOCUMENT.createTextNode(this.get(\"ariaDescription\")));","        liveRegion.set(\"id\", \"live-region\");","        liveRegion.set(\"aria-live\", \"polite\");","        liveRegion.set(\"aria-atomic\", \"true\");","        liveRegion.set(\"role\", \"status\");","        bb.setAttribute(\"role\", \"application\");","        bb.appendChild(description);","        bb.appendChild(liveRegion);","        this._description = description;","        this._liveRegion = liveRegion;","    },","","    /**","     * Sets a node offscreen for use as aria-description or aria-live-regin.","     *","     * @method _setOffscreen","     * @return Node","     * @private","     */","    _getAriaOffscreenNode: function()","    {","        var node = Y.Node.create(\"<div></div>\"),","            ie = Y.UA.ie,","            clipRect = (ie && ie < 8) ? \"rect(1px 1px 1px 1px)\" : \"rect(1px, 1px, 1px, 1px)\";","        node.setStyle(\"position\", \"absolute\");","        node.setStyle(\"height\", \"1px\");","        node.setStyle(\"width\", \"1px\");","        node.setStyle(\"overflow\", \"hidden\");","        node.setStyle(\"clip\", clipRect);","        return node;","    },","","    /**","     * @method syncUI","     * @private","     */","    syncUI: function()","    {","        this._redraw();","    },","","    /**","     * @method bindUI","     * @private","     */","    bindUI: function()","    {","        this.after(\"tooltipChange\", Y.bind(this._tooltipChangeHandler, this));","        this.after(\"widthChange\", this._sizeChanged);","        this.after(\"heightChange\", this._sizeChanged);","        this.after(\"groupMarkersChange\", this._groupMarkersChangeHandler);","        var tt = this.get(\"tooltip\"),","            hideEvent = \"mouseout\",","            showEvent = \"mouseover\",","            cb = this.get(\"contentBox\"),","            interactionType = this.get(\"interactionType\"),","            i = 0,","            len,","            markerClassName = \".\" + SERIES_MARKER,","            isTouch = ((WINDOW && (\"ontouchstart\" in WINDOW)) && !(Y.UA.chrome && Y.UA.chrome < 6));","        Y.on(\"keydown\", Y.bind(function(e) {","            var key = e.keyCode,","                numKey = parseFloat(key),","                msg;","            if(numKey > 36 && numKey < 41)","            {","                e.halt();","                msg = this._getAriaMessage(numKey);","                this._liveRegion.setContent(\"\");","                this._liveRegion.appendChild(DOCUMENT.createTextNode(msg));","            }","        }, this), this.get(\"contentBox\"));","        if(interactionType === \"marker\")","        {","            //if touch capabilities, toggle tooltip on touchend. otherwise, the tooltip attribute's hideEvent/showEvent types.","            hideEvent = tt.hideEvent;","            showEvent = tt.showEvent;","            if(isTouch)","            {","                Y.delegate(\"touchend\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                //hide active tooltip if the chart is touched","                Y.on(\"touchend\", Y.bind(function(e) {","                    //only halt the event if it originated from the chart","                    if(cb.contains(e.target))","                    {","                        e.halt(true);","                    }","                    if(this._activeMarker)","                    {","                        this._activeMarker = null;","                        this.hideTooltip(e);","                    }","                }, this));","            }","            else","            {","                Y.delegate(\"mouseenter\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mousedown\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mouseup\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mouseleave\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"click\", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);","                Y.delegate(\"mousemove\", Y.bind(this._positionTooltip, this), cb, markerClassName);","            }","        }","        else if(interactionType === \"planar\")","        {","            if(isTouch)","            {","                this._overlay.on(\"touchend\", Y.bind(this._planarEventDispatcher, this));","            }","            else","            {","                this._overlay.on(\"mousemove\", Y.bind(this._planarEventDispatcher, this));","                this.on(\"mouseout\", this.hideTooltip);","            }","        }","        if(tt)","        {","            this.on(\"markerEvent:touchend\", Y.bind(function(e) {","                var marker = e.series.get(\"markers\")[e.index];","                if(this._activeMarker && marker === this._activeMarker)","                {","                    this._activeMarker = null;","                    this.hideTooltip(e);","                }","                else","                {","","                    this._activeMarker = marker;","                    tt.markerEventHandler.apply(this, [e]);","                }","            }, this));","            if(hideEvent && showEvent && hideEvent === showEvent)","            {","                this.on(interactionType + \"Event:\" + hideEvent, this.toggleTooltip);","            }","            else","            {","                if(showEvent)","                {","                    this.on(interactionType + \"Event:\" + showEvent, tt[interactionType + \"EventHandler\"]);","                }","                if(hideEvent)","                {","                    if(Y_Lang.isArray(hideEvent))","                    {","                        len = hideEvent.length;","                        for(; i < len; ++i)","                        {","                            this.on(interactionType + \"Event:\" + hideEvent[i], this.hideTooltip);","                        }","                    }","                    this.on(interactionType + \"Event:\" + hideEvent, this.hideTooltip);","                }","            }","        }","    },","","    /**","     * Event handler for marker events.","     *","     * @method _markerEventDispatcher","     * @param {Object} e Event object.","     * @private","     */","    _markerEventDispatcher: function(e)","    {","        var type = e.type,","            cb = this.get(\"contentBox\"),","            markerNode = e.currentTarget,","            strArr = markerNode.getAttribute(\"id\").split(\"_\"),","            index = strArr.pop(),","            seriesIndex = strArr.pop(),","            series = this.getSeries(parseInt(seriesIndex, 10)),","            items = this.getSeriesItems(series, index),","            isTouch = e && e.hasOwnProperty(\"changedTouches\"),","            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,","            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,","            x = pageX - cb.getX(),","            y = pageY - cb.getY();","        if(type === \"mouseenter\")","        {","            type = \"mouseover\";","        }","        else if(type === \"mouseleave\")","        {","            type = \"mouseout\";","        }","        series.updateMarkerState(type, index);","        e.halt();","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseover event.","         *","         *","         * @event markerEvent:mouseover","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseout event.","         *","         * @event markerEvent:mouseout","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mousedown event.","         *","         * @event markerEvent:mousedown","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseup event.","         *","         * @event markerEvent:mouseup","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *  </dl>","         */","        /**","         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a click event.","         *","         * @event markerEvent:click","         * @preventable false","         * @param {EventFacade} e Event facade with the following additional","         *   properties:","         *  <dl>","         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>","         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>","         *      <dt>node</dt><dd>The dom node of the marker.</dd>","         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","         *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>","         *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>","         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>","         *      <dt>index</dt><dd>Index of the marker in the series.</dd>","         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>","         *      <dt>originEvent</dt><dd>Underlying dom event.</dd>","         *  </dl>","         */","        this.fire(\"markerEvent:\" + type, {","            originEvent: e,","            pageX:pageX,","            pageY:pageY,","            categoryItem:items.category,","            valueItem:items.value,","            node:markerNode,","            x:x,","            y:y,","            series:series,","            index:index,","            seriesIndex:seriesIndex","        });","    },","","    /**","     * Event handler for dataProviderChange.","     *","     * @method _dataProviderChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _dataProviderChangeHandler: function(e)","    {","        var dataProvider = e.newVal,","            axes,","            i,","            axis;","        this._seriesIndex = -1;","        this._itemIndex = -1;","        if(this instanceof Y.CartesianChart)","        {","            this.set(\"axes\", this.get(\"axes\"));","            this.set(\"seriesCollection\", this.get(\"seriesCollection\"));","        }","        axes = this.get(\"axes\");","        if(axes)","        {","            for(i in axes)","            {","                if(axes.hasOwnProperty(i))","                {","                    axis = axes[i];","                    if(axis instanceof Y.Axis)","                    {","                        if(axis.get(\"position\") !== \"none\")","                        {","                            this._addToAxesRenderQueue(axis);","                        }","                        axis.set(\"dataProvider\", dataProvider);","                    }","                }","            }","        }","    },","","    /**","     * Event listener for toggling the tooltip. If a tooltip is visible, hide it. If not, it","     * will create and show a tooltip based on the event object.","     *","     * @method toggleTooltip","     * @param {Object} e Event object.","     */","    toggleTooltip: function(e)","    {","        var tt = this.get(\"tooltip\");","        if(tt.visible)","        {","            this.hideTooltip();","        }","        else","        {","            tt.markerEventHandler.apply(this, [e]);","        }","    },","","    /**","     * Shows a tooltip","     *","     * @method _showTooltip","     * @param {String} msg Message to dispaly in the tooltip.","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @private","     */","    _showTooltip: function(msg, x, y)","    {","        var tt = this.get(\"tooltip\"),","            node = tt.node;","        if(msg)","        {","            tt.visible = true;","            tt.setTextFunction(node, msg);","            node.setStyle(\"top\", y + \"px\");","            node.setStyle(\"left\", x + \"px\");","            node.setStyle(\"visibility\", \"visible\");","        }","    },","","    /**","     * Positions the tooltip","     *","     * @method _positionTooltip","     * @param {Object} e Event object.","     * @private","     */","    _positionTooltip: function(e)","    {","        var tt = this.get(\"tooltip\"),","            node = tt.node,","            cb = this.get(\"contentBox\"),","            x = (e.pageX + 10) - cb.getX(),","            y = (e.pageY + 10) - cb.getY();","        if(node)","        {","            node.setStyle(\"left\", x + \"px\");","            node.setStyle(\"top\", y + \"px\");","        }","    },","","    /**","     * Hides the default tooltip","     *","     * @method hideTooltip","     */","    hideTooltip: function()","    {","        var tt = this.get(\"tooltip\"),","            node = tt.node;","        tt.visible = false;","        node.set(\"innerHTML\", \"\");","        node.setStyle(\"left\", -10000);","        node.setStyle(\"top\", -10000);","        node.setStyle(\"visibility\", \"hidden\");","    },","","    /**","     * Adds a tooltip to the dom.","     *","     * @method _addTooltip","     * @private","     */","    _addTooltip: function()","    {","        var tt = this.get(\"tooltip\"),","            id = this.get(\"id\") + \"_tooltip\",","            cb = this.get(\"contentBox\"),","            oldNode = DOCUMENT.getElementById(id);","        if(oldNode)","        {","            cb.removeChild(oldNode);","        }","        tt.node.set(\"id\", id);","        tt.node.setStyle(\"visibility\", \"hidden\");","        cb.appendChild(tt.node);","    },","","    /**","     * Updates the tooltip attribute.","     *","     * @method _updateTooltip","     * @param {Object} val Object containing properties for the tooltip.","     * @return Object","     * @private","     */","    _updateTooltip: function(val)","    {","        var tt = this.get(\"tooltip\") || this._getTooltip(),","            i,","            styles,","            node,","            props = {","                markerLabelFunction:\"markerLabelFunction\",","                planarLabelFunction:\"planarLabelFunction\",","                setTextFunction:\"setTextFunction\",","                showEvent:\"showEvent\",","                hideEvent:\"hideEvent\",","                markerEventHandler:\"markerEventHandler\",","                planarEventHandler:\"planarEventHandler\",","                show:\"show\"","            };","        if(Y_Lang.isObject(val))","        {","            styles = val.styles;","            node = Y.one(val.node) || tt.node;","            if(styles)","            {","                for(i in styles)","                {","                    if(styles.hasOwnProperty(i))","                    {","                        node.setStyle(i, styles[i]);","                    }","                }","            }","            for(i in props)","            {","                if(val.hasOwnProperty(i))","                {","                    tt[i] = val[i];","                }","            }","            tt.node = node;","        }","        return tt;","    },","","    /**","     * Default getter for `tooltip` attribute.","     *","     * @method _getTooltip","     * @return Object","     * @private","     */","    _getTooltip: function()","    {","        var node = DOCUMENT.createElement(\"div\"),","            tooltipClass = _getClassName(\"chart-tooltip\"),","            tt = {","                setTextFunction: this._setText,","                markerLabelFunction: this._tooltipLabelFunction,","                planarLabelFunction: this._planarLabelFunction,","                show: true,","                hideEvent: \"mouseout\",","                showEvent: \"mouseover\",","                markerEventHandler: function(e)","                {","                    var tt = this.get(\"tooltip\"),","                    msg = tt.markerLabelFunction.apply(this, [e.categoryItem, e.valueItem, e.index, e.series, e.seriesIndex]);","                    this._showTooltip(msg, e.x + 10, e.y + 10);","                },","                planarEventHandler: function(e)","                {","                    var tt = this.get(\"tooltip\"),","                        msg ,","                        categoryAxis = this.get(\"categoryAxis\");","                    msg = tt.planarLabelFunction.apply(this, [categoryAxis, e.valueItem, e.index, e.items, e.seriesIndex]);","                    this._showTooltip(msg, e.x + 10, e.y + 10);","                }","            };","        node = Y.one(node);","        node.set(\"id\", this.get(\"id\") + \"_tooltip\");","        node.setStyle(\"fontSize\", \"85%\");","        node.setStyle(\"opacity\", \"0.83\");","        node.setStyle(\"position\", \"absolute\");","        node.setStyle(\"paddingTop\", \"2px\");","        node.setStyle(\"paddingRight\", \"5px\");","        node.setStyle(\"paddingBottom\", \"4px\");","        node.setStyle(\"paddingLeft\", \"2px\");","        node.setStyle(\"backgroundColor\", \"#fff\");","        node.setStyle(\"border\", \"1px solid #dbdccc\");","        node.setStyle(\"pointerEvents\", \"none\");","        node.setStyle(\"zIndex\", 3);","        node.setStyle(\"whiteSpace\", \"noWrap\");","        node.setStyle(\"visibility\", \"hidden\");","        node.addClass(tooltipClass);","        tt.node = Y.one(node);","        return tt;","    },","","    /**","     * Formats tooltip text when `interactionType` is `planar`.","     *","     * @method _planarLabelFunction","     * @param {Axis} categoryAxis Reference to the categoryAxis of the chart.","     * @param {Array} valueItems Array of objects for each series that has a data point in the coordinate plane of the event.","     * Each object contains the following data:","     *  <dl>","     *      <dt>axis</dt><dd>The value axis of the series.</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *  </dl>","     *  @param {Number} index The index of the item within its series.","     *  @param {Array} seriesArray Array of series instances for each value item.","     *  @param {Number} seriesIndex The index of the series in the `seriesCollection`.","     *  @return {String | HTML}","     * @private","     */","    _planarLabelFunction: function(categoryAxis, valueItems, index, seriesArray)","    {","        var msg = DOCUMENT.createElement(\"div\"),","            valueItem,","            i = 0,","            len = seriesArray.length,","            axis,","            categoryValue,","            seriesValue,","            series;","        if(categoryAxis)","        {","            categoryValue = categoryAxis.get(\"labelFunction\").apply(","                this,","                [categoryAxis.getKeyValueAt(this.get(\"categoryKey\"), index), categoryAxis.get(\"labelFormat\")]","            );","            if(!Y_Lang.isObject(categoryValue))","            {","                categoryValue = DOCUMENT.createTextNode(categoryValue);","            }","            msg.appendChild(categoryValue);","        }","","        for(; i < len; ++i)","        {","            series = seriesArray[i];","            if(series.get(\"visible\"))","            {","                valueItem = valueItems[i];","                axis = valueItem.axis;","                seriesValue =  axis.get(\"labelFunction\").apply(","                    this,","                    [axis.getKeyValueAt(valueItem.key, index), axis.get(\"labelFormat\")]","                );","                msg.appendChild(DOCUMENT.createElement(\"br\"));","                msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));","                msg.appendChild(DOCUMENT.createTextNode(\": \"));","                if(!Y_Lang.isObject(seriesValue))","                {","                    seriesValue = DOCUMENT.createTextNode(seriesValue);","                }","                msg.appendChild(seriesValue);","            }","        }","        return msg;","    },","","    /**","     * Formats tooltip text when `interactionType` is `marker`.","     *","     * @method _tooltipLabelFunction","     * @param {Object} categoryItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>","     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key of the category.</dd>","     *      <dt>value</dt><dd>The value of the category</dd>","     *  </dl>","     * @param {Object} valueItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *  </dl>","     * @return {String | HTML}","     * @private","     */","    _tooltipLabelFunction: function(categoryItem, valueItem)","    {","        var msg = DOCUMENT.createElement(\"div\"),","            categoryValue = categoryItem.axis.get(\"labelFunction\").apply(","                this,","                [categoryItem.value, categoryItem.axis.get(\"labelFormat\")]","            ),","            seriesValue = valueItem.axis.get(\"labelFunction\").apply(","                this,","                [valueItem.value, valueItem.axis.get(\"labelFormat\")]","            );","        msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName));","        msg.appendChild(DOCUMENT.createTextNode(\": \"));","        if(!Y_Lang.isObject(categoryValue))","        {","            categoryValue = DOCUMENT.createTextNode(categoryValue);","        }","        msg.appendChild(categoryValue);","        msg.appendChild(DOCUMENT.createElement(\"br\"));","        msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));","        msg.appendChild(DOCUMENT.createTextNode(\": \"));","        if(!Y_Lang.isObject(seriesValue))","        {","            seriesValue = DOCUMENT.createTextNode(seriesValue);","        }","        msg.appendChild(seriesValue);","        return msg;","    },","","    /**","     * Event handler for the tooltipChange.","     *","     * @method _tooltipChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _tooltipChangeHandler: function()","    {","        if(this.get(\"tooltip\"))","        {","            var tt = this.get(\"tooltip\"),","                node = tt.node,","                show = tt.show,","                cb = this.get(\"contentBox\");","            if(node && show)","            {","                if(!cb.contains(node))","                {","                    this._addTooltip();","                }","            }","        }","    },","","    /**","     * Updates the content of text field. This method writes a value into a text field using","     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.","     *","     * @method _setText","     * @param label {HTMLElement} label to be updated","     * @param val {String} value with which to update the label","     * @private","     */","    _setText: function(textField, val)","    {","        textField.setContent(\"\");","        if(Y_Lang.isNumber(val))","        {","            val = val + \"\";","        }","        else if(!val)","        {","            val = \"\";","        }","        if(IS_STRING(val))","        {","            val = DOCUMENT.createTextNode(val);","        }","        textField.appendChild(val);","    },","","    /**","     * Returns all the keys contained in a  `dataProvider`.","     *","     * @method _getAllKeys","     * @param {Array} dp Collection of objects to be parsed.","     * @return Object","     */","    _getAllKeys: function(dp)","    {","        var i = 0,","            len = dp.length,","            item,","            key,","            keys = {};","        for(; i < len; ++i)","        {","            item = dp[i];","            for(key in item)","            {","                if(item.hasOwnProperty(key))","                {","                    keys[key] = true;","                }","            }","        }","        return keys;","    },","","    /**","     * Constructs seriesKeys if not explicitly specified.","     *","     * @method _buildSeriesKeys","     * @param {Array} dataProvider The dataProvider for the chart.","     * @return Array","     * @private","     */","    _buildSeriesKeys: function(dataProvider)","    {","        var allKeys,","            catKey = this.get(\"categoryKey\"),","            keys = [],","            i;","        if(this._seriesKeysExplicitlySet)","        {","            return this._seriesKeys;","        }","        allKeys = this._getAllKeys(dataProvider);","        for(i in allKeys)","        {","            if(allKeys.hasOwnProperty(i) && i !== catKey)","            {","                keys.push(i);","            }","        }","        return keys;","    }","};","Y.ChartBase = ChartBase;","/**"," * The CartesianChart class creates a chart with horizontal and vertical axes."," *"," * @class CartesianChart"," * @extends ChartBase"," * @constructor"," * @submodule charts-base"," */","Y.CartesianChart = Y.Base.create(\"cartesianChart\", Y.Widget, [Y.ChartBase, Y.Renderer], {","    /**","     * @method renderUI","     * @private","     */","    renderUI: function()","    {","        var bb = this.get(\"boundingBox\"),","            cb = this.get(\"contentBox\"),","            tt = this.get(\"tooltip\"),","            overlay,","            overlayClass = _getClassName(\"overlay\");","        //move the position = absolute logic to a class file","        bb.setStyle(\"position\", \"absolute\");","        cb.setStyle(\"position\", \"absolute\");","        this._addAxes();","        this._addGridlines();","        this._addSeries();","        if(tt && tt.show)","        {","            this._addTooltip();","        }","        if(this.get(\"interactionType\") === \"planar\")","        {","            overlay = DOCUMENT.createElement(\"div\");","            this.get(\"contentBox\").appendChild(overlay);","            this._overlay = Y.one(overlay);","            this._overlay.set(\"id\", this.get(\"id\") + \"_overlay\");","            this._overlay.setStyle(\"position\", \"absolute\");","            this._overlay.setStyle(\"background\", \"#fff\");","            this._overlay.setStyle(\"opacity\", 0);","            this._overlay.addClass(overlayClass);","            this._overlay.setStyle(\"zIndex\", 4);","        }","        this._setAriaElements(bb, cb);","        this._redraw();","    },","","    /**","     * When `interactionType` is set to `planar`, listens for mouse move events and fires `planarEvent:mouseover` or `planarEvent:mouseout`","     * depending on the position of the mouse in relation to data points on the `Chart`.","     *","     * @method _planarEventDispatcher","     * @param {Object} e Event object.","     * @private","     */","    _planarEventDispatcher: function(e)","    {","        var graph = this.get(\"graph\"),","            bb = this.get(\"boundingBox\"),","            cb = graph.get(\"contentBox\"),","            isTouch = e && e.hasOwnProperty(\"changedTouches\"),","            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,","            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,","            posX = pageX - bb.getX(),","            posY = pageY - bb.getY(),","            offset = {","                x: pageX - cb.getX(),","                y: pageY - cb.getY()","            },","            sc = graph.get(\"seriesCollection\"),","            series,","            i = 0,","            index,","            oldIndex = this._selectedIndex,","            item,","            items = [],","            categoryItems = [],","            valueItems = [],","            direction = this.get(\"direction\"),","            hasMarkers,","            catAxis,","            valAxis,","            coord,","            //data columns and area data could be created on a graph level","            markerPlane,","            len,","            coords;","        e.halt(true);","        if(direction === \"horizontal\")","        {","            catAxis = \"x\";","            valAxis = \"y\";","        }","        else","        {","            valAxis = \"x\";","            catAxis = \"y\";","        }","        coord = offset[catAxis];","        if(sc)","        {","            len = sc.length;","            while(i < len && !markerPlane)","            {","                if(sc[i])","                {","                    markerPlane = sc[i].get(catAxis + \"MarkerPlane\");","                }","                i++;","            }","        }","        if(markerPlane)","        {","            len = markerPlane.length;","            for(i = 0; i < len; ++i)","            {","                if(coord <= markerPlane[i].end && coord >= markerPlane[i].start)","                {","                    index = i;","                    break;","                }","            }","            len = sc.length;","            for(i = 0; i < len; ++i)","            {","                series = sc[i];","                coords = series.get(valAxis + \"coords\");","                hasMarkers = series.get(\"markers\");","                if(hasMarkers && !isNaN(oldIndex) && oldIndex > -1)","                {","                    series.updateMarkerState(\"mouseout\", oldIndex);","                }","                if(coords && coords[index] > -1)","                {","                    if(hasMarkers && !isNaN(index) && index > -1)","                    {","                        series.updateMarkerState(\"mouseover\", index);","                    }","                    item = this.getSeriesItems(series, index);","                    categoryItems.push(item.category);","                    valueItems.push(item.value);","                    items.push(series);","                }","","            }","            this._selectedIndex = index;","","            /**","             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseover event.","             *","             *","             * @event planarEvent:mouseover","             * @preventable false","             * @param {EventFacade} e Event facade with the following additional","             *   properties:","             *  <dl>","             *      <dt>categoryItem</dt><dd>An array of hashes, each containing information about the category `Axis` of each marker","             *      whose plane has been intersected.</dd>","             *      <dt>valueItem</dt><dd>An array of hashes, each containing information about the value `Axis` of each marker whose","             *      plane has been intersected.</dd>","             *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>","             *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>","             *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>","             *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>","             *      <dt>items</dt><dd>An array including all the series which contain a marker whose plane has been intersected.</dd>","             *      <dt>index</dt><dd>Index of the markers in their respective series.</dd>","             *      <dt>originEvent</dt><dd>Underlying dom event.</dd>","             *  </dl>","             */","            /**","             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseout event.","             *","             * @event planarEvent:mouseout","             * @preventable false","             * @param {EventFacade} e","             */","            if(index > -1)","            {","                this.fire(\"planarEvent:mouseover\", {","                    categoryItem:categoryItems,","                    valueItem:valueItems,","                    x:posX,","                    y:posY,","                    pageX:pageX,","                    pageY:pageY,","                    items:items,","                    index:index,","                    originEvent:e","                });","            }","            else","            {","                this.fire(\"planarEvent:mouseout\");","            }","        }","    },","","    /**","     * Indicates the default series type for the chart.","     *","     * @property _type","     * @type {String}","     * @private","     */","    _type: \"combo\",","","    /**","     * Queue of axes instances that will be updated. This method is used internally to determine when all axes have been updated.","     *","     * @property _itemRenderQueue","     * @type Array","     * @private","     */","    _itemRenderQueue: null,","","    /**","     * Adds an `Axis` instance to the `_itemRenderQueue`.","     *","     * @method _addToAxesRenderQueue","     * @param {Axis} axis An `Axis` instance.","     * @private","     */","    _addToAxesRenderQueue: function(axis)","    {","        if(!this._itemRenderQueue)","        {","            this._itemRenderQueue = [];","        }","        if(Y.Array.indexOf(this._itemRenderQueue, axis) < 0)","        {","            this._itemRenderQueue.push(axis);","        }","    },","","    /**","     * Adds axis instance to the appropriate array based on position","     *","     * @method _addToAxesCollection","     * @param {String} position The position of the axis","     * @param {Axis} axis The `Axis` instance","     */","    _addToAxesCollection: function(position, axis)","    {","        var axesCollection = this.get(position + \"AxesCollection\");","        if(!axesCollection)","        {","            axesCollection = [];","            this.set(position + \"AxesCollection\", axesCollection);","        }","        axesCollection.push(axis);","    },","","    /**","     * Returns the default value for the `seriesCollection` attribute.","     *","     * @method _getDefaultSeriesCollection","     * @param {Array} val Array containing either `CartesianSeries` instances or objects containing data to construct series instances.","     * @return Array","     * @private","     */","    _getDefaultSeriesCollection: function()","    {","        var seriesCollection,","            dataProvider = this.get(\"dataProvider\");","        if(dataProvider)","        {","            seriesCollection = this._parseSeriesCollection();","        }","        return seriesCollection;","    },","","    /**","     * Parses and returns a series collection from an object and default properties.","     *","     * @method _parseSeriesCollection","     * @param {Object} val Object contain properties for series being set.","     * @return Object","     * @private","     */","    _parseSeriesCollection: function(val)","    {","        var dir = this.get(\"direction\"),","            seriesStyles = this.get(\"styles\").series,","            stylesAreArray = seriesStyles && Y_Lang.isArray(seriesStyles),","            stylesIndex,","            setStyles,","            globalStyles,","            sc = [],","            catAxis,","            valAxis,","            tempKeys = [],","            series,","            seriesKeys = this.get(\"seriesKeys\").concat(),","            i,","            index,","            l,","            type = this.get(\"type\"),","            key,","            catKey,","            seriesKey,","            graph,","            orphans = [],","            categoryKey = this.get(\"categoryKey\"),","            showMarkers = this.get(\"showMarkers\"),","            showAreaFill = this.get(\"showAreaFill\"),","            showLines = this.get(\"showLines\");","        val = val ? val.concat() : [];","        if(dir === \"vertical\")","        {","            catAxis = \"yAxis\";","            catKey = \"yKey\";","            valAxis = \"xAxis\";","            seriesKey = \"xKey\";","        }","        else","        {","            catAxis = \"xAxis\";","            catKey = \"xKey\";","            valAxis = \"yAxis\";","            seriesKey = \"yKey\";","        }","        l = val.length;","        while(val && val.length > 0)","        {","            series = val.shift();","            key = this._getBaseAttribute(series, seriesKey);","            if(key)","            {","                index = Y.Array.indexOf(seriesKeys, key);","                if(index > -1)","                {","                    seriesKeys.splice(index, 1);","                    tempKeys.push(key);","                    sc.push(series);","                }","                else","                {","                    orphans.push(series);","                }","            }","            else","            {","                orphans.push(series);","            }","        }","        while(orphans.length > 0)","        {","            series = orphans.shift();","            if(seriesKeys.length > 0)","            {","                key = seriesKeys.shift();","                this._setBaseAttribute(series, seriesKey, key);","                tempKeys.push(key);","                sc.push(series);","            }","            else if(series instanceof Y.CartesianSeries)","            {","                series.destroy(true);","            }","        }","        if(seriesKeys.length > 0)","        {","            tempKeys = tempKeys.concat(seriesKeys);","        }","        l = tempKeys.length;","        for(i = 0; i < l; ++i)","        {","            series = sc[i] || {type:type};","            if(series instanceof Y.CartesianSeries)","            {","                this._parseSeriesAxes(series);","            }","            else","            {","                series[catKey] = series[catKey] || categoryKey;","                series[seriesKey] = series[seriesKey] || seriesKeys.shift();","                series[catAxis] = this._getCategoryAxis();","                series[valAxis] = this._getSeriesAxis(series[seriesKey]);","","                series.type = series.type || type;","                series.direction = series.direction || dir;","","                if(series.type === \"combo\" ||","                    series.type === \"stackedcombo\" ||","                    series.type === \"combospline\" ||","                    series.type === \"stackedcombospline\")","                {","                    if(showAreaFill !== null)","                    {","                        series.showAreaFill = (series.showAreaFill !== null && series.showAreaFill !== undefined) ?","                                               series.showAreaFill : showAreaFill;","                    }","                    if(showMarkers !== null)","                    {","                        series.showMarkers = (series.showMarkers !== null && series.showMarkers !== undefined) ? series.showMarkers : showMarkers;","                    }","                    if(showLines !== null)","                    {","                        series.showLines = (series.showLines !== null && series.showLines !== undefined) ? series.showLines : showLines;","                    }","                }","                if(seriesStyles)","                {","                    stylesIndex = stylesAreArray ? i : series[seriesKey];","                    globalStyles = seriesStyles[stylesIndex];","                    if(globalStyles)","                    {","                        setStyles = series.styles;","                        if(setStyles)","                        {","                            series.styles = this._mergeStyles(setStyles, globalStyles);","                        }","                        else","                        {","                            series.styles = globalStyles;","                        }","                    }","                }","                sc[i] = series;","            }","        }","        if(sc)","        {","            graph = this.get(\"graph\");","            graph.set(\"seriesCollection\", sc);","            sc = graph.get(\"seriesCollection\");","        }","        return sc;","    },","","    /**","     * Parse and sets the axes for a series instance.","     *","     * @method _parseSeriesAxes","     * @param {CartesianSeries} series A `CartesianSeries` instance.","     * @private","     */","    _parseSeriesAxes: function(series)","    {","        var axes = this.get(\"axes\"),","            xAxis = series.get(\"xAxis\"),","            yAxis = series.get(\"yAxis\"),","            YAxis = Y.Axis,","            axis;","        if(xAxis && !(xAxis instanceof YAxis) && Y_Lang.isString(xAxis) && axes.hasOwnProperty(xAxis))","        {","            axis = axes[xAxis];","            if(axis instanceof YAxis)","            {","                series.set(\"xAxis\", axis);","            }","        }","        if(yAxis && !(yAxis instanceof YAxis) && Y_Lang.isString(yAxis) && axes.hasOwnProperty(yAxis))","        {","            axis = axes[yAxis];","            if(axis instanceof YAxis)","            {","                series.set(\"yAxis\", axis);","            }","        }","","    },","","    /**","     * Returns the category axis instance for the chart.","     *","     * @method _getCategoryAxis","     * @return Axis","     * @private","     */","    _getCategoryAxis: function()","    {","        var axis,","            axes = this.get(\"axes\"),","            categoryAxisName = this.get(\"categoryAxisName\") || this.get(\"categoryKey\");","        axis = axes[categoryAxisName];","        return axis;","    },","","    /**","     * Returns the value axis for a series.","     *","     * @method _getSeriesAxis","     * @param {String} key The key value used to determine the axis instance.","     * @return Axis","     * @private","     */","    _getSeriesAxis:function(key, axisName)","    {","        var axes = this.get(\"axes\"),","            i,","            keys,","            axis;","        if(axes)","        {","            if(axisName && axes.hasOwnProperty(axisName))","            {","                axis = axes[axisName];","            }","            else","            {","                for(i in axes)","                {","                    if(axes.hasOwnProperty(i))","                    {","                        keys = axes[i].get(\"keys\");","                        if(keys && keys.hasOwnProperty(key))","                        {","                            axis = axes[i];","                            break;","                        }","                    }","                }","            }","        }","        return axis;","    },","","    /**","     * Gets an attribute from an object, using a getter for Base objects and a property for object","     * literals. Used for determining attributes from series/axis references which can be an actual class instance","     * or a hash of properties that will be used to create a class instance.","     *","     * @method _getBaseAttribute","     * @param {Object} item Object or instance in which the attribute resides.","     * @param {String} key Attribute whose value will be returned.","     * @return Object","     * @private","     */","    _getBaseAttribute: function(item, key)","    {","        if(item instanceof Y.Base)","        {","            return item.get(key);","        }","        if(item.hasOwnProperty(key))","        {","            return item[key];","        }","        return null;","    },","","    /**","     * Sets an attribute on an object, using a setter of Base objects and a property for object","     * literals. Used for setting attributes on a Base class, either directly or to be stored in an object literal","     * for use at instantiation.","     *","     * @method _setBaseAttribute","     * @param {Object} item Object or instance in which the attribute resides.","     * @param {String} key Attribute whose value will be assigned.","     * @param {Object} value Value to be assigned to the attribute.","     * @private","     */","    _setBaseAttribute: function(item, key, value)","    {","        if(item instanceof Y.Base)","        {","            item.set(key, value);","        }","        else","        {","            item[key] = value;","        }","    },","","    /**","     * Creates `Axis` instances.","     *","     * @method _setAxes","     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.","     * @return Object","     * @private","     */","    _setAxes: function(val)","    {","        var hash = this._parseAxes(val),","            axes = {},","            axesAttrs = {","                edgeOffset: \"edgeOffset\",","                calculateEdgeOffset: \"calculateEdgeOffset\",","                position: \"position\",","                overlapGraph:\"overlapGraph\",","                labelValues: \"labelValues\",","                hideFirstMajorUnit: \"hideFirstMajorUnit\",","                hideLastMajorUnit: \"hideLastMajorUnit\",","                labelFunction:\"labelFunction\",","                labelFunctionScope:\"labelFunctionScope\",","                labelFormat:\"labelFormat\",","                appendLabelFunction: \"appendLabelFunction\",","                appendTitleFunction: \"appendTitleFunction\",","                maximum:\"maximum\",","                minimum:\"minimum\",","                roundingMethod:\"roundingMethod\",","                alwaysShowZero:\"alwaysShowZero\",","                title:\"title\",","                width:\"width\",","                height:\"height\"","            },","            dp = this.get(\"dataProvider\"),","            ai,","            i,","            pos,","            axis,","            axisPosition,","            dh,","            AxisClass,","            config,","            axesCollection;","        for(i in hash)","        {","            if(hash.hasOwnProperty(i))","            {","                dh = hash[i];","                if(dh instanceof Y.Axis)","                {","                    axis = dh;","                }","                else","                {","                    axis = null;","                    config = {};","                    config.dataProvider = dh.dataProvider || dp;","                    config.keys = dh.keys;","","                    if(dh.hasOwnProperty(\"roundingUnit\"))","                    {","                        config.roundingUnit = dh.roundingUnit;","                    }","                    pos = dh.position;","                    if(dh.styles)","                    {","                        config.styles = dh.styles;","                    }","                    config.position = dh.position;","                    for(ai in axesAttrs)","                    {","                        if(axesAttrs.hasOwnProperty(ai) && dh.hasOwnProperty(ai))","                        {","                            config[ai] = dh[ai];","                        }","                    }","","                    //only check for existing axis if we constructed the default axes already","                    if(val)","                    {","                        axis = this.getAxisByKey(i);","                    }","","                    if(axis && axis instanceof Y.Axis)","                    {","                        axisPosition = axis.get(\"position\");","                        if(pos !== axisPosition)","                        {","                            if(axisPosition !== \"none\")","                            {","                                axesCollection = this.get(axisPosition + \"AxesCollection\");","                                axesCollection.splice(Y.Array.indexOf(axesCollection, axis), 1);","                            }","                            if(pos !== \"none\")","                            {","                                this._addToAxesCollection(pos, axis);","                            }","                        }","                        axis.setAttrs(config);","                    }","                    else","                    {","                        AxisClass = this._getAxisClass(dh.type);","                        axis = new AxisClass(config);","                        axis.after(\"axisRendered\", Y.bind(this._itemRendered, this));","                    }","                }","","                if(axis)","                {","                    axesCollection = this.get(pos + \"AxesCollection\");","                    if(axesCollection && Y.Array.indexOf(axesCollection, axis) > 0)","                    {","                        axis.set(\"overlapGraph\", false);","                    }","                    axes[i] = axis;","                }","            }","        }","        return axes;","    },","","    /**","     * Adds axes to the chart.","     *","     * @method _addAxes","     * @private","     */","    _addAxes: function()","    {","        var axes = this.get(\"axes\"),","            i,","            axis,","            pos,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            node = Y.Node.one(this._parentNode);","        if(!this._axesCollection)","        {","            this._axesCollection = [];","        }","        for(i in axes)","        {","            if(axes.hasOwnProperty(i))","            {","                axis = axes[i];","                if(axis instanceof Y.Axis)","                {","                    if(!w)","                    {","                        this.set(\"width\", node.get(\"offsetWidth\"));","                        w = this.get(\"width\");","                    }","                    if(!h)","                    {","                        this.set(\"height\", node.get(\"offsetHeight\"));","                        h = this.get(\"height\");","                    }","                    this._addToAxesRenderQueue(axis);","                    pos = axis.get(\"position\");","                    if(!this.get(pos + \"AxesCollection\"))","                    {","                        this.set(pos + \"AxesCollection\", [axis]);","                    }","                    else","                    {","                        this.get(pos + \"AxesCollection\").push(axis);","                    }","                    this._axesCollection.push(axis);","                    if(axis.get(\"keys\").hasOwnProperty(this.get(\"categoryKey\")))","                    {","                        this.set(\"categoryAxis\", axis);","                    }","                    axis.render(this.get(\"contentBox\"));","                }","            }","        }","    },","","    /**","     * Renders the Graph.","     *","     * @method _addSeries","     * @private","     */","    _addSeries: function()","    {","        var graph = this.get(\"graph\");","        graph.render(this.get(\"contentBox\"));","","    },","","    /**","     * Adds gridlines to the chart.","     *","     * @method _addGridlines","     * @private","     */","    _addGridlines: function()","    {","        var graph = this.get(\"graph\"),","            hgl = this.get(\"horizontalGridlines\"),","            vgl = this.get(\"verticalGridlines\"),","            direction = this.get(\"direction\"),","            leftAxesCollection = this.get(\"leftAxesCollection\"),","            rightAxesCollection = this.get(\"rightAxesCollection\"),","            bottomAxesCollection = this.get(\"bottomAxesCollection\"),","            topAxesCollection = this.get(\"topAxesCollection\"),","            seriesAxesCollection,","            catAxis = this.get(\"categoryAxis\"),","            hAxis,","            vAxis;","        if(this._axesCollection)","        {","            seriesAxesCollection = this._axesCollection.concat();","            seriesAxesCollection.splice(Y.Array.indexOf(seriesAxesCollection, catAxis), 1);","        }","        if(hgl)","        {","            if(leftAxesCollection && leftAxesCollection[0])","            {","                hAxis = leftAxesCollection[0];","            }","            else if(rightAxesCollection && rightAxesCollection[0])","            {","                hAxis = rightAxesCollection[0];","            }","            else","            {","                hAxis = direction === \"horizontal\" ? catAxis : seriesAxesCollection[0];","            }","            if(!this._getBaseAttribute(hgl, \"axis\") && hAxis)","            {","                this._setBaseAttribute(hgl, \"axis\", hAxis);","            }","            if(this._getBaseAttribute(hgl, \"axis\"))","            {","                graph.set(\"horizontalGridlines\", hgl);","            }","        }","        if(vgl)","        {","            if(bottomAxesCollection && bottomAxesCollection[0])","            {","                vAxis = bottomAxesCollection[0];","            }","            else if (topAxesCollection && topAxesCollection[0])","            {","                vAxis = topAxesCollection[0];","            }","            else","            {","                vAxis = direction === \"vertical\" ? catAxis : seriesAxesCollection[0];","            }","            if(!this._getBaseAttribute(vgl, \"axis\") && vAxis)","            {","                this._setBaseAttribute(vgl, \"axis\", vAxis);","            }","            if(this._getBaseAttribute(vgl, \"axis\"))","            {","                graph.set(\"verticalGridlines\", vgl);","            }","        }","    },","","    /**","     * Default Function for the axes attribute.","     *","     * @method _getDefaultAxes","     * @return Object","     * @private","     */","    _getDefaultAxes: function()","    {","        var axes;","        if(this.get(\"dataProvider\"))","        {","            axes = this._parseAxes();","        }","        return axes;","    },","","    /**","     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.","     *","     * @method _parseAxes","     * @param {Object} axes Object containing `Axis` instances or `Axis` attributes.","     * @return Object","     * @private","     */","    _parseAxes: function(axes)","    {","        var catKey = this.get(\"categoryKey\"),","            axis,","            attr,","            keys,","            newAxes = {},","            claimedKeys = [],","            newKeys = [],","            categoryAxisName = this.get(\"categoryAxisName\") || this.get(\"categoryKey\"),","            valueAxisName = this.get(\"valueAxisName\"),","            seriesKeys = this.get(\"seriesKeys\").concat(),","            i,","            l,","            ii,","            ll,","            cIndex,","            direction = this.get(\"direction\"),","            seriesPosition,","            categoryPosition,","            valueAxes = [],","            seriesAxis = this.get(\"stacked\") ? \"stacked\" : \"numeric\";","        if(direction === \"vertical\")","        {","            seriesPosition = \"bottom\";","            categoryPosition = \"left\";","        }","        else","        {","            seriesPosition = \"left\";","            categoryPosition = \"bottom\";","        }","        if(axes)","        {","            for(i in axes)","            {","                if(axes.hasOwnProperty(i))","                {","                    axis = axes[i];","                    keys = this._getBaseAttribute(axis, \"keys\");","                    attr = this._getBaseAttribute(axis, \"type\");","                    if(attr === \"time\" || attr === \"category\")","                    {","                        categoryAxisName = i;","                        this.set(\"categoryAxisName\", i);","                        if(Y_Lang.isArray(keys) && keys.length > 0)","                        {","                            catKey = keys[0];","                            this.set(\"categoryKey\", catKey);","                        }","                        newAxes[i] = axis;","                    }","                    else if(i === categoryAxisName)","                    {","                        newAxes[i] = axis;","                    }","                    else","                    {","                        newAxes[i] = axis;","                        if(i !== valueAxisName && keys && Y_Lang.isArray(keys))","                        {","                            ll = keys.length;","                            for(ii = 0; ii < ll; ++ii)","                            {","                                claimedKeys.push(keys[ii]);","                            }","                            valueAxes.push(newAxes[i]);","                        }","                        if(!(this._getBaseAttribute(newAxes[i], \"type\")))","                        {","                            this._setBaseAttribute(newAxes[i], \"type\", seriesAxis);","                        }","                        if(!(this._getBaseAttribute(newAxes[i], \"position\")))","                        {","                            this._setBaseAttribute(","                                newAxes[i],","                                \"position\",","                                this._getDefaultAxisPosition(newAxes[i], valueAxes, seriesPosition)","                            );","                        }","                    }","                }","            }","        }","        cIndex = Y.Array.indexOf(seriesKeys, catKey);","        if(cIndex > -1)","        {","            seriesKeys.splice(cIndex, 1);","        }","        l = seriesKeys.length;","        for(i = 0; i < l; ++i)","        {","            cIndex = Y.Array.indexOf(claimedKeys, seriesKeys[i]);","            if(cIndex > -1)","            {","                newKeys = newKeys.concat(claimedKeys.splice(cIndex, 1));","            }","        }","        claimedKeys = newKeys.concat(claimedKeys);","        l = claimedKeys.length;","        for(i = 0; i < l; i = i + 1)","        {","            cIndex = Y.Array.indexOf(seriesKeys, claimedKeys[i]);","            if(cIndex > -1)","            {","                seriesKeys.splice(cIndex, 1);","            }","        }","        if(!newAxes.hasOwnProperty(categoryAxisName))","        {","            newAxes[categoryAxisName] = {};","        }","        if(!(this._getBaseAttribute(newAxes[categoryAxisName], \"keys\")))","        {","            this._setBaseAttribute(newAxes[categoryAxisName], \"keys\", [catKey]);","        }","","        if(!(this._getBaseAttribute(newAxes[categoryAxisName], \"position\")))","        {","            this._setBaseAttribute(newAxes[categoryAxisName], \"position\", categoryPosition);","        }","","        if(!(this._getBaseAttribute(newAxes[categoryAxisName], \"type\")))","        {","            this._setBaseAttribute(newAxes[categoryAxisName], \"type\", this.get(\"categoryType\"));","        }","        if(!newAxes.hasOwnProperty(valueAxisName) && seriesKeys && seriesKeys.length > 0)","        {","            newAxes[valueAxisName] = {keys:seriesKeys};","            valueAxes.push(newAxes[valueAxisName]);","        }","        if(claimedKeys.length > 0)","        {","            if(seriesKeys.length > 0)","            {","                seriesKeys = claimedKeys.concat(seriesKeys);","            }","            else","            {","                seriesKeys = claimedKeys;","            }","        }","        if(newAxes.hasOwnProperty(valueAxisName))","        {","            if(!(this._getBaseAttribute(newAxes[valueAxisName], \"position\")))","            {","                this._setBaseAttribute(","                    newAxes[valueAxisName],","                    \"position\",","                    this._getDefaultAxisPosition(newAxes[valueAxisName], valueAxes, seriesPosition)","                );","            }","            this._setBaseAttribute(newAxes[valueAxisName], \"type\", seriesAxis);","            this._setBaseAttribute(newAxes[valueAxisName], \"keys\", seriesKeys);","        }","        if(!this._wereSeriesKeysExplicitlySet())","        {","            this.set(\"seriesKeys\", seriesKeys, {src: \"internal\"});","        }","        return newAxes;","    },","","    /**","     * Determines the position of an axis when one is not specified.","     *","     * @method _getDefaultAxisPosition","     * @param {Axis} axis `Axis` instance.","     * @param {Array} valueAxes Array of `Axis` instances.","     * @param {String} position Default position depending on the direction of the chart and type of axis.","     * @return String","     * @private","     */","    _getDefaultAxisPosition: function(axis, valueAxes, position)","    {","        var direction = this.get(\"direction\"),","            i = Y.Array.indexOf(valueAxes, axis);","","        if(valueAxes[i - 1] && valueAxes[i - 1].position)","        {","            if(direction === \"horizontal\")","            {","                if(valueAxes[i - 1].position === \"left\")","                {","                    position = \"right\";","                }","                else if(valueAxes[i - 1].position === \"right\")","                {","                    position = \"left\";","                }","            }","            else","            {","                if (valueAxes[i -1].position === \"bottom\")","                {","                    position = \"top\";","                }","                else","                {","                    position = \"bottom\";","                }","            }","        }","        return position;","    },","","","    /**","     * Returns an object literal containing a categoryItem and a valueItem for a given series index. Below is the structure of each:","     *","     * @method getSeriesItems","     * @param {CartesianSeries} series Reference to a series.","     * @param {Number} index Index of the specified item within a series.","     * @return Object An object literal containing the following:","     *","     *  <dl>","     *      <dt>categoryItem</dt><dd>Object containing the following data related to the category axis of the series.","     *  <dl>","     *      <dt>axis</dt><dd>Reference to the category axis of the series.</dd>","     *      <dt>key</dt><dd>Category key for the series.</dd>","     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>","     *  </dl>","     *      </dd>","     *      <dt>valueItem</dt><dd>Object containing the following data related to the category axis of the series.","     *  <dl>","     *      <dt>axis</dt><dd>Reference to the value axis of the series.</dd>","     *      <dt>key</dt><dd>Value key for the series.</dd>","     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>","     *  </dl>","     *      </dd>","     *  </dl>","     */","    getSeriesItems: function(series, index)","    {","        var xAxis = series.get(\"xAxis\"),","            yAxis = series.get(\"yAxis\"),","            xKey = series.get(\"xKey\"),","            yKey = series.get(\"yKey\"),","            categoryItem,","            valueItem;","        if(this.get(\"direction\") === \"vertical\")","        {","            categoryItem = {","                axis:yAxis,","                key:yKey,","                value:yAxis.getKeyValueAt(yKey, index)","            };","            valueItem = {","                axis:xAxis,","                key:xKey,","                value: xAxis.getKeyValueAt(xKey, index)","            };","        }","        else","        {","            valueItem = {","                axis:yAxis,","                key:yKey,","                value:yAxis.getKeyValueAt(yKey, index)","            };","            categoryItem = {","                axis:xAxis,","                key:xKey,","                value: xAxis.getKeyValueAt(xKey, index)","            };","        }","        categoryItem.displayName = series.get(\"categoryDisplayName\");","        valueItem.displayName = series.get(\"valueDisplayName\");","        categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);","        valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);","        return {category:categoryItem, value:valueItem};","    },","","    /**","     * Handler for sizeChanged event.","     *","     * @method _sizeChanged","     * @param {Object} e Event object.","     * @private","     */","    _sizeChanged: function()","    {","        if(this._axesCollection)","        {","            var ac = this._axesCollection,","                i = 0,","                l = ac.length;","            for(; i < l; ++i)","            {","                this._addToAxesRenderQueue(ac[i]);","            }","            this._redraw();","        }","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the top bounds of all vertical axes.","     *","     * @method _getTopOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} width Width of the axes","     * @return Number","     * @private","     */","    _getTopOverflow: function(set1, set2, height)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(","                    overflow,","                    Math.abs(axis.getMaxLabelBounds().top) - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height)","                );","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(","                    overflow,","                    Math.abs(axis.getMaxLabelBounds().top) - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height)","                );","            }","        }","        return overflow;","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the right bounds of all horizontal axes.","     *","     * @method _getRightOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} width Width of the axes","     * @return Number","     * @private","     */","    _getRightOverflow: function(set1, set2, width)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(","                    overflow,","                    axis.getMaxLabelBounds().right - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width)","                );","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(","                    overflow,","                    axis.getMaxLabelBounds().right - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width)","                );","            }","        }","        return overflow;","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the left bounds of all horizontal axes.","     *","     * @method _getLeftOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} width Width of the axes","     * @return Number","     * @private","     */","    _getLeftOverflow: function(set1, set2, width)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(","                    overflow,","                    Math.abs(axis.getMinLabelBounds().left) - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width)","                );","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(","                    overflow,","                    Math.abs(axis.getMinLabelBounds().left) - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, width)","                );","            }","        }","        return overflow;","    },","","    /**","     * Returns the maximum distance in pixels that the extends outside the bottom bounds of all vertical axes.","     *","     * @method _getBottomOverflow","     * @param {Array} set1 Collection of axes to check.","     * @param {Array} set2 Seconf collection of axes to check.","     * @param {Number} height Height of the axes","     * @return Number","     * @private","     */","    _getBottomOverflow: function(set1, set2, height)","    {","        var i = 0,","            len,","            overflow = 0,","            axis;","        if(set1)","        {","            len = set1.length;","            for(; i < len; ++i)","            {","                axis = set1[i];","                overflow = Math.max(","                    overflow,","                    axis.getMinLabelBounds().bottom - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height)","                );","            }","        }","        if(set2)","        {","            i = 0;","            len = set2.length;","            for(; i < len; ++i)","            {","                axis = set2[i];","                overflow = Math.max(","                    overflow,","                    axis.getMinLabelBounds().bottom - axis.getEdgeOffset(axis.get(\"styles\").majorTicks.count, height)","                );","            }","        }","        return overflow;","    },","","    /**","     * Redraws and position all the components of the chart instance.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        if(this._drawing)","        {","            this._callLater = true;","            return;","        }","        this._drawing = true;","        this._callLater = false;","        var w = this.get(\"width\"),","            h = this.get(\"height\"),","            leftPaneWidth = 0,","            rightPaneWidth = 0,","            topPaneHeight = 0,","            bottomPaneHeight = 0,","            leftAxesCollection = this.get(\"leftAxesCollection\"),","            rightAxesCollection = this.get(\"rightAxesCollection\"),","            topAxesCollection = this.get(\"topAxesCollection\"),","            bottomAxesCollection = this.get(\"bottomAxesCollection\"),","            i = 0,","            l,","            axis,","            graphOverflow = \"visible\",","            graph = this.get(\"graph\"),","            topOverflow,","            bottomOverflow,","            leftOverflow,","            rightOverflow,","            graphWidth,","            graphHeight,","            graphX,","            graphY,","            allowContentOverflow = this.get(\"allowContentOverflow\"),","            diff,","            rightAxesXCoords,","            leftAxesXCoords,","            topAxesYCoords,","            bottomAxesYCoords,","            graphRect = {};","        if(leftAxesCollection)","        {","            leftAxesXCoords = [];","            l = leftAxesCollection.length;","            for(i = l - 1; i > -1; --i)","            {","                leftAxesXCoords.unshift(leftPaneWidth);","                leftPaneWidth += leftAxesCollection[i].get(\"width\");","            }","        }","        if(rightAxesCollection)","        {","            rightAxesXCoords = [];","            l = rightAxesCollection.length;","            i = 0;","            for(i = l - 1; i > -1; --i)","            {","                rightPaneWidth += rightAxesCollection[i].get(\"width\");","                rightAxesXCoords.unshift(w - rightPaneWidth);","            }","        }","        if(topAxesCollection)","        {","            topAxesYCoords = [];","            l = topAxesCollection.length;","            for(i = l - 1; i > -1; --i)","            {","                topAxesYCoords.unshift(topPaneHeight);","                topPaneHeight += topAxesCollection[i].get(\"height\");","            }","        }","        if(bottomAxesCollection)","        {","            bottomAxesYCoords = [];","            l = bottomAxesCollection.length;","            for(i = l - 1; i > -1; --i)","            {","                bottomPaneHeight += bottomAxesCollection[i].get(\"height\");","                bottomAxesYCoords.unshift(h - bottomPaneHeight);","            }","        }","","        graphWidth = w - (leftPaneWidth + rightPaneWidth);","        graphHeight = h - (bottomPaneHeight + topPaneHeight);","        graphRect.left = leftPaneWidth;","        graphRect.top = topPaneHeight;","        graphRect.bottom = h - bottomPaneHeight;","        graphRect.right = w - rightPaneWidth;","        if(!allowContentOverflow)","        {","            topOverflow = this._getTopOverflow(leftAxesCollection, rightAxesCollection);","            bottomOverflow = this._getBottomOverflow(leftAxesCollection, rightAxesCollection);","            leftOverflow = this._getLeftOverflow(bottomAxesCollection, topAxesCollection);","            rightOverflow = this._getRightOverflow(bottomAxesCollection, topAxesCollection);","","            diff = topOverflow - topPaneHeight;","            if(diff > 0)","            {","                graphRect.top = topOverflow;","                if(topAxesYCoords)","                {","                    i = 0;","                    l = topAxesYCoords.length;","                    for(; i < l; ++i)","                    {","                        topAxesYCoords[i] += diff;","                    }","                }","            }","","            diff = bottomOverflow - bottomPaneHeight;","            if(diff > 0)","            {","                graphRect.bottom = h - bottomOverflow;","                if(bottomAxesYCoords)","                {","                    i = 0;","                    l = bottomAxesYCoords.length;","                    for(; i < l; ++i)","                    {","                        bottomAxesYCoords[i] -= diff;","                    }","                }","            }","","            diff = leftOverflow - leftPaneWidth;","            if(diff > 0)","            {","                graphRect.left = leftOverflow;","                if(leftAxesXCoords)","                {","                    i = 0;","                    l = leftAxesXCoords.length;","                    for(; i < l; ++i)","                    {","                        leftAxesXCoords[i] += diff;","                    }","                }","            }","","            diff = rightOverflow - rightPaneWidth;","            if(diff > 0)","            {","                graphRect.right = w - rightOverflow;","                if(rightAxesXCoords)","                {","                    i = 0;","                    l = rightAxesXCoords.length;","                    for(; i < l; ++i)","                    {","                        rightAxesXCoords[i] -= diff;","                    }","                }","            }","        }","        graphWidth = graphRect.right - graphRect.left;","        graphHeight = graphRect.bottom - graphRect.top;","        graphX = graphRect.left;","        graphY = graphRect.top;","        if(topAxesCollection)","        {","            l = topAxesCollection.length;","            i = 0;","            for(; i < l; i++)","            {","                axis = topAxesCollection[i];","                if(axis.get(\"width\") !== graphWidth)","                {","                    axis.set(\"width\", graphWidth);","                }","                axis.get(\"boundingBox\").setStyle(\"left\", graphX + \"px\");","                axis.get(\"boundingBox\").setStyle(\"top\", topAxesYCoords[i] + \"px\");","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        if(bottomAxesCollection)","        {","            l = bottomAxesCollection.length;","            i = 0;","            for(; i < l; i++)","            {","                axis = bottomAxesCollection[i];","                if(axis.get(\"width\") !== graphWidth)","                {","                    axis.set(\"width\", graphWidth);","                }","                axis.get(\"boundingBox\").setStyle(\"left\", graphX + \"px\");","                axis.get(\"boundingBox\").setStyle(\"top\", bottomAxesYCoords[i] + \"px\");","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        if(leftAxesCollection)","        {","            l = leftAxesCollection.length;","            i = 0;","            for(; i < l; ++i)","            {","                axis = leftAxesCollection[i];","                axis.get(\"boundingBox\").setStyle(\"top\", graphY + \"px\");","                axis.get(\"boundingBox\").setStyle(\"left\", leftAxesXCoords[i] + \"px\");","                if(axis.get(\"height\") !== graphHeight)","                {","                    axis.set(\"height\", graphHeight);","                }","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        if(rightAxesCollection)","        {","            l = rightAxesCollection.length;","            i = 0;","            for(; i < l; ++i)","            {","                axis = rightAxesCollection[i];","                axis.get(\"boundingBox\").setStyle(\"top\", graphY + \"px\");","                axis.get(\"boundingBox\").setStyle(\"left\", rightAxesXCoords[i] + \"px\");","                if(axis.get(\"height\") !== graphHeight)","                {","                    axis.set(\"height\", graphHeight);","                }","            }","            if(axis._hasDataOverflow())","            {","                graphOverflow = \"hidden\";","            }","        }","        this._drawing = false;","        if(this._callLater)","        {","            this._redraw();","            return;","        }","        if(graph)","        {","            graph.get(\"boundingBox\").setStyle(\"left\", graphX + \"px\");","            graph.get(\"boundingBox\").setStyle(\"top\", graphY + \"px\");","            graph.set(\"width\", graphWidth);","            graph.set(\"height\", graphHeight);","            graph.get(\"boundingBox\").setStyle(\"overflow\", graphOverflow);","        }","","        if(this._overlay)","        {","            this._overlay.setStyle(\"left\", graphX + \"px\");","            this._overlay.setStyle(\"top\", graphY + \"px\");","            this._overlay.setStyle(\"width\", graphWidth + \"px\");","            this._overlay.setStyle(\"height\", graphHeight + \"px\");","        }","    },","","    /**","     * Destructor implementation for the CartesianChart class. Calls destroy on all axes, series and the Graph instance.","     * Removes the tooltip and overlay HTML elements.","     *","     * @method destructor","     * @protected","     */","    destructor: function()","    {","        var graph = this.get(\"graph\"),","            i = 0,","            len,","            seriesCollection = this.get(\"seriesCollection\"),","            axesCollection = this._axesCollection,","            tooltip = this.get(\"tooltip\").node;","        if(this._description)","        {","            this._description.empty();","            this._description.remove(true);","        }","        if(this._liveRegion)","        {","            this._liveRegion.empty();","            this._liveRegion.remove(true);","        }","        len = seriesCollection ? seriesCollection.length : 0;","        for(; i < len; ++i)","        {","            if(seriesCollection[i] instanceof Y.CartesianSeries)","            {","                seriesCollection[i].destroy(true);","            }","        }","        len = axesCollection ? axesCollection.length : 0;","        for(i = 0; i < len; ++i)","        {","            if(axesCollection[i] instanceof Y.Axis)","            {","                axesCollection[i].destroy(true);","            }","        }","        if(graph)","        {","            graph.destroy(true);","        }","        if(tooltip)","        {","            tooltip.empty();","            tooltip.remove(true);","        }","        if(this._overlay)","        {","            this._overlay.empty();","            this._overlay.remove(true);","        }","    },","","    /**","     * Returns the appropriate message based on the key press.","     *","     * @method _getAriaMessage","     * @param {Number} key The keycode that was pressed.","     * @return String","     */","    _getAriaMessage: function(key)","    {","        var msg = \"\",","            series,","            items,","            categoryItem,","            valueItem,","            seriesIndex = this._seriesIndex,","            itemIndex = this._itemIndex,","            seriesCollection = this.get(\"seriesCollection\"),","            len = seriesCollection.length,","            dataLength;","        if(key % 2 === 0)","        {","            if(len > 1)","            {","                if(key === 38)","                {","                    seriesIndex = seriesIndex < 1 ? len - 1 : seriesIndex - 1;","                }","                else if(key === 40)","                {","                    seriesIndex = seriesIndex >= len - 1 ? 0 : seriesIndex + 1;","                }","                this._itemIndex = -1;","            }","            else","            {","                seriesIndex = 0;","            }","            this._seriesIndex = seriesIndex;","            series = this.getSeries(parseInt(seriesIndex, 10));","            msg = series.get(\"valueDisplayName\") + \" series.\";","        }","        else","        {","            if(seriesIndex > -1)","            {","                msg = \"\";","                series = this.getSeries(parseInt(seriesIndex, 10));","            }","            else","            {","                seriesIndex = 0;","                this._seriesIndex = seriesIndex;","                series = this.getSeries(parseInt(seriesIndex, 10));","                msg = series.get(\"valueDisplayName\") + \" series.\";","            }","            dataLength = series._dataLength ? series._dataLength : 0;","            if(key === 37)","            {","                itemIndex = itemIndex > 0 ? itemIndex - 1 : dataLength - 1;","            }","            else if(key === 39)","            {","                itemIndex = itemIndex >= dataLength - 1 ? 0 : itemIndex + 1;","            }","            this._itemIndex = itemIndex;","            items = this.getSeriesItems(series, itemIndex);","            categoryItem = items.category;","            valueItem = items.value;","            if(categoryItem && valueItem && categoryItem.value && valueItem.value)","            {","                msg += categoryItem.displayName +","                    \": \" +","                    categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")]) +","                    \", \";","                msg += valueItem.displayName +","                    \": \" +","                    valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")]) +","                    \", \";","            }","           else","            {","                msg += \"No data available.\";","            }","            msg += (itemIndex + 1) + \" of \" + dataLength + \". \";","        }","        return msg;","    }","}, {","    ATTRS: {","        /**","         * Indicates whether axis labels are allowed to overflow beyond the bounds of the chart's content box.","         *","         * @attribute allowContentOverflow","         * @type Boolean","         */","        allowContentOverflow: {","            value: false","        },","","        /**","         * Style object for the axes.","         *","         * @attribute axesStyles","         * @type Object","         * @private","         */","        axesStyles: {","            lazyAdd: false,","","            getter: function()","            {","                var axes = this.get(\"axes\"),","                    i,","                    styles = this._axesStyles;","                if(axes)","                {","                    for(i in axes)","                    {","                        if(axes.hasOwnProperty(i) && axes[i] instanceof Y.Axis)","                        {","                            if(!styles)","                            {","                                styles = {};","                            }","                            styles[i] = axes[i].get(\"styles\");","                        }","                    }","                }","                return styles;","            },","","            setter: function(val)","            {","                var axes = this.get(\"axes\"),","                    i;","                for(i in val)","                {","                    if(val.hasOwnProperty(i) && axes.hasOwnProperty(i))","                    {","                        this._setBaseAttribute(axes[i], \"styles\", val[i]);","                    }","                }","                return val;","            }","        },","","        /**","         * Style object for the series","         *","         * @attribute seriesStyles","         * @type Object","         * @private","         */","        seriesStyles: {","            lazyAdd: false,","","            getter: function()","            {","                var styles = this._seriesStyles,","                    graph = this.get(\"graph\"),","                    dict,","                    i;","                if(graph)","                {","                    dict = graph.get(\"seriesDictionary\");","                    if(dict)","                    {","                        styles = {};","                        for(i in dict)","                        {","                            if(dict.hasOwnProperty(i))","                            {","                                styles[i] = dict[i].get(\"styles\");","                            }","                        }","                    }","                }","                return styles;","            },","","            setter: function(val)","            {","                var i,","                    l,","                    s;","","                if(Y_Lang.isArray(val))","                {","                    s = this.get(\"seriesCollection\");","                    i = 0;","                    l = val.length;","","                    for(; i < l; ++i)","                    {","                        this._setBaseAttribute(s[i], \"styles\", val[i]);","                    }","                }","                else","                {","                    for(i in val)","                    {","                        if(val.hasOwnProperty(i))","                        {","                            s = this.getSeries(i);","                            this._setBaseAttribute(s, \"styles\", val[i]);","                        }","                    }","                }","                return val;","            }","        },","","        /**","         * Styles for the graph.","         *","         * @attribute graphStyles","         * @type Object","         * @private","         */","        graphStyles: {","            lazyAdd: false,","","            getter: function()","            {","                var graph = this.get(\"graph\");","                if(graph)","                {","                    return(graph.get(\"styles\"));","                }","                return this._graphStyles;","            },","","            setter: function(val)","            {","                var graph = this.get(\"graph\");","                this._setBaseAttribute(graph, \"styles\", val);","                return val;","            }","","        },","","        /**","         * Style properties for the chart. Contains a key indexed hash of the following:","         *  <dl>","         *      <dt>series</dt><dd>A key indexed hash containing references to the `styles` attribute for each series in the chart.","         *      Specific style attributes vary depending on the series:","         *      <ul>","         *          <li><a href=\"AreaSeries.html#attr_styles\">AreaSeries</a></li>","         *          <li><a href=\"BarSeries.html#attr_styles\">BarSeries</a></li>","         *          <li><a href=\"ColumnSeries.html#attr_styles\">ColumnSeries</a></li>","         *          <li><a href=\"ComboSeries.html#attr_styles\">ComboSeries</a></li>","         *          <li><a href=\"LineSeries.html#attr_styles\">LineSeries</a></li>","         *          <li><a href=\"MarkerSeries.html#attr_styles\">MarkerSeries</a></li>","         *          <li><a href=\"SplineSeries.html#attr_styles\">SplineSeries</a></li>","         *      </ul>","         *      </dd>","         *      <dt>axes</dt><dd>A key indexed hash containing references to the `styles` attribute for each axes in the chart. Specific","         *      style attributes can be found in the <a href=\"Axis.html#attr_styles\">Axis</a> class.</dd>","         *      <dt>graph</dt><dd>A reference to the `styles` attribute in the chart. Specific style attributes can be found in the","         *      <a href=\"Graph.html#attr_styles\">Graph</a> class.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","        styles: {","            lazyAdd: false,","","            getter: function()","            {","                var styles = {","                    axes: this.get(\"axesStyles\"),","                    series: this.get(\"seriesStyles\"),","                    graph: this.get(\"graphStyles\")","                };","                return styles;","            },","            setter: function(val)","            {","                if(val.hasOwnProperty(\"axes\"))","                {","                    if(this.get(\"axesStyles\"))","                    {","                        this.set(\"axesStyles\", val.axes);","                    }","                    else","                    {","                        this._axesStyles = val.axes;","                    }","                }","                if(val.hasOwnProperty(\"series\"))","                {","                    if(this.get(\"seriesStyles\"))","                    {","                        this.set(\"seriesStyles\", val.series);","                    }","                    else","                    {","                        this._seriesStyles = val.series;","                    }","                }","                if(val.hasOwnProperty(\"graph\"))","                {","                    this.set(\"graphStyles\", val.graph);","                }","            }","        },","","        /**","         * Axes to appear in the chart. This can be a key indexed hash of axis instances or object literals","         * used to construct the appropriate axes.","         *","         * @attribute axes","         * @type Object","         */","        axes: {","            lazyAdd: false,","","            valueFn: \"_getDefaultAxes\",","","            setter: function(val)","            {","                if(this.get(\"dataProvider\"))","                {","                    val = this._setAxes(val);","                }","                return val;","            }","        },","","        /**","         * Collection of series to appear on the chart. This can be an array of Series instances or object literals","         * used to construct the appropriate series.","         *","         * @attribute seriesCollection","         * @type Array","         */","        seriesCollection: {","            lazyAdd: false,","","            valueFn: \"_getDefaultSeriesCollection\",","","            setter: function(val)","            {","                if(this.get(\"dataProvider\"))","                {","                    return this._parseSeriesCollection(val);","                }","                return val;","            }","        },","","        /**","         * Reference to the left-aligned axes for the chart.","         *","         * @attribute leftAxesCollection","         * @type Array","         * @private","         */","        leftAxesCollection: {},","","        /**","         * Reference to the bottom-aligned axes for the chart.","         *","         * @attribute bottomAxesCollection","         * @type Array","         * @private","         */","        bottomAxesCollection: {},","","        /**","         * Reference to the right-aligned axes for the chart.","         *","         * @attribute rightAxesCollection","         * @type Array","         * @private","         */","        rightAxesCollection: {},","","        /**","         * Reference to the top-aligned axes for the chart.","         *","         * @attribute topAxesCollection","         * @type Array","         * @private","         */","        topAxesCollection: {},","","        /**","         * Indicates whether or not the chart is stacked.","         *","         * @attribute stacked","         * @type Boolean","         */","        stacked: {","            value: false","        },","","        /**","         * Direction of chart's category axis when there is no series collection specified. Charts can","         * be horizontal or vertical. When the chart type is column, the chart is horizontal.","         * When the chart type is bar, the chart is vertical.","         *","         * @attribute direction","         * @type String","         */","        direction: {","            getter: function()","            {","                var type = this.get(\"type\");","                if(type === \"bar\")","                {","                    return \"vertical\";","                }","                else if(type === \"column\")","                {","                    return \"horizontal\";","                }","                return this._direction;","            },","","            setter: function(val)","            {","                this._direction = val;","                return this._direction;","            }","        },","","        /**","         * Indicates whether or not an area is filled in a combo chart.","         *","         * @attribute showAreaFill","         * @type Boolean","         */","        showAreaFill: {},","","        /**","         * Indicates whether to display markers in a combo chart.","         *","         * @attribute showMarkers","         * @type Boolean","         */","        showMarkers:{},","","        /**","         * Indicates whether to display lines in a combo chart.","         *","         * @attribute showLines","         * @type Boolean","         */","        showLines:{},","","        /**","         * Indicates the key value used to identify a category axis in the `axes` hash. If","         * not specified, the categoryKey attribute value will be used.","         *","         * @attribute categoryAxisName","         * @type String","         */","        categoryAxisName: {","        },","","        /**","         * Indicates the key value used to identify a the series axis when an axis not generated.","         *","         * @attribute valueAxisName","         * @type String","         */","        valueAxisName: {","            value: \"values\"","        },","","        /**","         * Reference to the horizontalGridlines for the chart.","         *","         * @attribute horizontalGridlines","         * @type Gridlines","         */","        horizontalGridlines: {","            getter: function()","            {","                var graph = this.get(\"graph\");","                if(graph)","                {","                    return graph.get(\"horizontalGridlines\");","                }","                return this._horizontalGridlines;","            },","            setter: function(val)","            {","                var graph = this.get(\"graph\");","                if(val && !Y_Lang.isObject(val))","                {","                    val = {};","                }","                if(graph)","                {","                    graph.set(\"horizontalGridlines\", val);","                }","                else","                {","                    this._horizontalGridlines = val;","                }","            }","        },","","        /**","         * Reference to the verticalGridlines for the chart.","         *","         * @attribute verticalGridlines","         * @type Gridlines","         */","        verticalGridlines: {","            getter: function()","            {","                var graph = this.get(\"graph\");","                if(graph)","                {","                    return graph.get(\"verticalGridlines\");","                }","                return this._verticalGridlines;","            },","            setter: function(val)","            {","                var graph = this.get(\"graph\");","                if(val && !Y_Lang.isObject(val))","                {","                    val = {};","                }","                if(graph)","                {","                    graph.set(\"verticalGridlines\", val);","                }","                else","                {","                    this._verticalGridlines = val;","                }","            }","        },","","        /**","         * Type of chart when there is no series collection specified.","         *","         * @attribute type","         * @type String","         */","        type: {","            getter: function()","            {","                if(this.get(\"stacked\"))","                {","                    return \"stacked\" + this._type;","                }","                return this._type;","            },","","            setter: function(val)","            {","                if(this._type === \"bar\")","                {","                    if(val !== \"bar\")","                    {","                        this.set(\"direction\", \"horizontal\");","                    }","                }","                else","                {","                    if(val === \"bar\")","                    {","                        this.set(\"direction\", \"vertical\");","                    }","                }","                this._type = val;","                return this._type;","            }","        },","","        /**","         * Reference to the category axis used by the chart.","         *","         * @attribute categoryAxis","         * @type Axis","         */","        categoryAxis:{}","    }","});","/**"," * The PieChart class creates a pie chart"," *"," * @class PieChart"," * @extends ChartBase"," * @constructor"," * @submodule charts-base"," */","Y.PieChart = Y.Base.create(\"pieChart\", Y.Widget, [Y.ChartBase], {","    /**","     * Calculates and returns a `seriesCollection`.","     *","     * @method _getSeriesCollection","     * @return Array","     * @private","     */","    _getSeriesCollection: function()","    {","        if(this._seriesCollection)","        {","            return this._seriesCollection;","        }","        var axes = this.get(\"axes\"),","            sc = [],","            seriesKeys,","            i = 0,","            l,","            type = this.get(\"type\"),","            key,","            catAxis = \"categoryAxis\",","            catKey = \"categoryKey\",","            valAxis = \"valueAxis\",","            seriesKey = \"valueKey\";","        if(axes)","        {","            seriesKeys = axes.values.get(\"keyCollection\");","            key = axes.category.get(\"keyCollection\")[0];","            l = seriesKeys.length;","            for(; i < l; ++i)","            {","                sc[i] = {type:type};","                sc[i][catAxis] = \"category\";","                sc[i][valAxis] = \"values\";","                sc[i][catKey] = key;","                sc[i][seriesKey] = seriesKeys[i];","            }","        }","        this._seriesCollection = sc;","        return sc;","    },","","    /**","     * Creates `Axis` instances.","     *","     * @method _parseAxes","     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.","     * @return Object","     * @private","     */","    _parseAxes: function(hash)","    {","        if(!this._axes)","        {","            this._axes = {};","        }","        var i, pos, axis, dh, config, AxisClass,","            type = this.get(\"type\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            node = Y.Node.one(this._parentNode);","        if(!w)","        {","            this.set(\"width\", node.get(\"offsetWidth\"));","            w = this.get(\"width\");","        }","        if(!h)","        {","            this.set(\"height\", node.get(\"offsetHeight\"));","            h = this.get(\"height\");","        }","        for(i in hash)","        {","            if(hash.hasOwnProperty(i))","            {","                dh = hash[i];","                pos = type === \"pie\" ? \"none\" : dh.position;","                AxisClass = this._getAxisClass(dh.type);","                config = {dataProvider:this.get(\"dataProvider\")};","                if(dh.hasOwnProperty(\"roundingUnit\"))","                {","                    config.roundingUnit = dh.roundingUnit;","                }","                config.keys = dh.keys;","                config.width = w;","                config.height = h;","                config.position = pos;","                config.styles = dh.styles;","                axis = new AxisClass(config);","                axis.on(\"axisRendered\", Y.bind(this._itemRendered, this));","                this._axes[i] = axis;","            }","        }","    },","","    /**","     * Adds axes to the chart.","     *","     * @method _addAxes","     * @private","     */","    _addAxes: function()","    {","        var axes = this.get(\"axes\"),","            i,","            axis,","            p;","        if(!axes)","        {","            this.set(\"axes\", this._getDefaultAxes());","            axes = this.get(\"axes\");","        }","        if(!this._axesCollection)","        {","            this._axesCollection = [];","        }","        for(i in axes)","        {","            if(axes.hasOwnProperty(i))","            {","                axis = axes[i];","                p = axis.get(\"position\");","                if(!this.get(p + \"AxesCollection\"))","                {","                    this.set(p + \"AxesCollection\", [axis]);","                }","                else","                {","                    this.get(p + \"AxesCollection\").push(axis);","                }","                this._axesCollection.push(axis);","            }","        }","    },","","    /**","     * Renders the Graph.","     *","     * @method _addSeries","     * @private","     */","    _addSeries: function()","    {","        var graph = this.get(\"graph\"),","            seriesCollection = this.get(\"seriesCollection\");","        this._parseSeriesAxes(seriesCollection);","        graph.set(\"showBackground\", false);","        graph.set(\"width\", this.get(\"width\"));","        graph.set(\"height\", this.get(\"height\"));","        graph.set(\"seriesCollection\", seriesCollection);","        this._seriesCollection = graph.get(\"seriesCollection\");","        graph.render(this.get(\"contentBox\"));","    },","","    /**","     * Parse and sets the axes for the chart.","     *","     * @method _parseSeriesAxes","     * @param {Array} c A collection `PieSeries` instance.","     * @private","     */","    _parseSeriesAxes: function(c)","    {","        var i = 0,","            len = c.length,","            s,","            axes = this.get(\"axes\"),","            axis;","        for(; i < len; ++i)","        {","            s = c[i];","            if(s)","            {","                //If series is an actual series instance,","                //replace axes attribute string ids with axes","                if(s instanceof Y.PieSeries)","                {","                    axis = s.get(\"categoryAxis\");","                    if(axis && !(axis instanceof Y.Axis))","                    {","                        s.set(\"categoryAxis\", axes[axis]);","                    }","                    axis = s.get(\"valueAxis\");","                    if(axis && !(axis instanceof Y.Axis))","                    {","                        s.set(\"valueAxis\", axes[axis]);","                    }","                    continue;","                }","                s.categoryAxis = axes.category;","                s.valueAxis = axes.values;","                if(!s.type)","                {","                    s.type = this.get(\"type\");","                }","            }","        }","    },","","    /**","     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.","     *","     * @method _getDefaultAxes","     * @return Object","     * @private","     */","    _getDefaultAxes: function()","    {","        var catKey = this.get(\"categoryKey\"),","            seriesKeys = this.get(\"seriesKeys\").concat(),","            seriesAxis = \"numeric\";","        return {","            values:{","                keys:seriesKeys,","                type:seriesAxis","            },","            category:{","                keys:[catKey],","                type:this.get(\"categoryType\")","            }","        };","    },","","    /**","     * Returns an object literal containing a categoryItem and a valueItem for a given series index.","     *","     * @method getSeriesItem","     * @param series Reference to a series.","     * @param index Index of the specified item within a series.","     * @return Object","     */","    getSeriesItems: function(series, index)","    {","        var categoryItem = {","                axis: series.get(\"categoryAxis\"),","                key: series.get(\"categoryKey\"),","                displayName: series.get(\"categoryDisplayName\")","            },","            valueItem = {","                axis: series.get(\"valueAxis\"),","                key: series.get(\"valueKey\"),","                displayName: series.get(\"valueDisplayName\")","            };","        categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);","        valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);","        return {category:categoryItem, value:valueItem};","    },","","    /**","     * Handler for sizeChanged event.","     *","     * @method _sizeChanged","     * @param {Object} e Event object.","     * @private","     */","    _sizeChanged: function()","    {","        this._redraw();","    },","","    /**","     * Redraws the chart instance.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var graph = this.get(\"graph\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            dimension;","        if(graph)","        {","            dimension = Math.min(w, h);","            graph.set(\"width\", dimension);","            graph.set(\"height\", dimension);","        }","    },","","    /**","     * Formats tooltip text for a pie chart.","     *","     * @method _tooltipLabelFunction","     * @param {Object} categoryItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>","     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key of the category.</dd>","     *      <dt>value</dt><dd>The value of the category</dd>","     *  </dl>","     * @param {Object} valueItem An object containing the following:","     *  <dl>","     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>","     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>","     *      <dt>key</dt><dd>The key for the series.</dd>","     *      <dt>value</dt><dd>The value for the series item.</dd>","     *  </dl>","     * @param {Number} itemIndex The index of the item within the series.","     * @param {CartesianSeries} series The `PieSeries` instance of the item.","     * @return {HTML}","     * @private","     */","    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series)","    {","        var msg = DOCUMENT.createElement(\"div\"),","            total = series.getTotalValues(),","            pct = Math.round((valueItem.value / total) * 10000)/100;","        msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName +","        \": \" + categoryItem.axis.get(\"labelFunction\").apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")])));","        msg.appendChild(DOCUMENT.createElement(\"br\"));","        msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName +","        \": \" + valueItem.axis.get(\"labelFunction\").apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")])));","        msg.appendChild(DOCUMENT.createElement(\"br\"));","        msg.appendChild(DOCUMENT.createTextNode(pct + \"%\"));","        return msg;","    },","","    /**","     * Returns the appropriate message based on the key press.","     *","     * @method _getAriaMessage","     * @param {Number} key The keycode that was pressed.","     * @return String","     */","    _getAriaMessage: function(key)","    {","        var msg = \"\",","            categoryItem,","            items,","            series,","            valueItem,","            seriesIndex = 0,","            itemIndex = this._itemIndex,","            len,","            total,","            pct,","            markers;","        series = this.getSeries(parseInt(seriesIndex, 10));","        markers = series.get(\"markers\");","        len = markers && markers.length ? markers.length : 0;","        if(key === 37)","        {","            itemIndex = itemIndex > 0 ? itemIndex - 1 : len - 1;","        }","        else if(key === 39)","        {","            itemIndex = itemIndex >= len - 1 ? 0 : itemIndex + 1;","        }","        this._itemIndex = itemIndex;","        items = this.getSeriesItems(series, itemIndex);","        categoryItem = items.category;","        valueItem = items.value;","        total = series.getTotalValues();","        pct = Math.round((valueItem.value / total) * 10000)/100;","        if(categoryItem && valueItem)","        {","            msg += categoryItem.displayName +","                \": \" +","                categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get(\"labelFormat\")]) +","                \", \";","            msg += valueItem.displayName +","                \": \" + valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get(\"labelFormat\")]) +","                \", \";","            msg += \"Percent of total \" + valueItem.displayName + \": \" + pct + \"%,\";","        }","        else","        {","            msg += \"No data available,\";","        }","        msg += (itemIndex + 1) + \" of \" + len + \". \";","        return msg;","    }","}, {","    ATTRS: {","        /**","         * Sets the aria description for the chart.","         *","         * @attribute ariaDescription","         * @type String","         */","        ariaDescription: {","            value: \"Use the left and right keys to navigate through items.\",","","            setter: function(val)","            {","                if(this._description)","                {","                    this._description.setContent(\"\");","                    this._description.appendChild(DOCUMENT.createTextNode(val));","                }","                return val;","            }","        },","","        /**","         * Axes to appear in the chart.","         *","         * @attribute axes","         * @type Object","         */","        axes: {","            getter: function()","            {","                return this._axes;","            },","","            setter: function(val)","            {","                this._parseAxes(val);","            }","        },","","        /**","         * Collection of series to appear on the chart. This can be an array of Series instances or object literals","         * used to describe a Series instance.","         *","         * @attribute seriesCollection","         * @type Array","         */","        seriesCollection: {","            lazyAdd: false,","","            getter: function()","            {","                return this._getSeriesCollection();","            },","","            setter: function(val)","            {","                return this._setSeriesCollection(val);","            }","        },","","        /**","         * Type of chart when there is no series collection specified.","         *","         * @attribute type","         * @type String","         */","        type: {","            value: \"pie\"","        }","    }","});","/**"," * The Chart class is the basic application used to create a chart."," *"," * @class Chart"," * @constructor"," * @submodule charts-base"," */","function Chart(cfg)","{","    if(cfg.type !== \"pie\")","    {","        return new Y.CartesianChart(cfg);","    }","    else","    {","        return new Y.PieChart(cfg);","    }","}","Y.Chart = Chart;","","","}, '@VERSION@', {","    \"requires\": [","        \"dom\",","        \"event-mouseenter\",","        \"event-touch\",","        \"graphics-group\",","        \"axes\",","        \"series-pie\",","        \"series-line\",","        \"series-marker\",","        \"series-area\",","        \"series-spline\",","        \"series-column\",","        \"series-bar\",","        \"series-areaspline\",","        \"series-combo\",","        \"series-combospline\",","        \"series-line-stacked\",","        \"series-marker-stacked\",","        \"series-area-stacked\",","        \"series-spline-stacked\",","        \"series-column-stacked\",","        \"series-bar-stacked\",","        \"series-areaspline-stacked\",","        \"series-combo-stacked\",","        \"series-combospline-stacked\"","    ]","});"];
_yuitest_coverage["build/charts-base/charts-base.js"].lines = {"1":0,"9":0,"27":0,"45":0,"46":0,"48":0,"60":0,"62":0,"74":0,"91":0,"93":0,"95":0,"97":0,"99":0,"103":0,"105":0,"106":0,"107":0,"108":0,"109":0,"114":0,"116":0,"117":0,"121":0,"122":0,"124":0,"126":0,"128":0,"142":0,"146":0,"148":0,"149":0,"154":0,"168":0,"169":0,"183":0,"184":0,"197":0,"204":0,"256":0,"263":0,"264":0,"265":0,"266":0,"267":0,"268":0,"277":0,"286":0,"288":0,"289":0,"290":0,"291":0,"292":0,"293":0,"294":0,"295":0,"296":0,"297":0,"299":0,"301":0,"302":0,"304":0,"307":0,"309":0,"311":0,"313":0,"335":0,"337":0,"339":0,"341":0,"353":0,"355":0,"357":0,"359":0,"372":0,"374":0,"376":0,"406":0,"408":0,"410":0,"414":0,"415":0,"416":0,"417":0,"419":0,"420":0,"422":0,"423":0,"425":0,"427":0,"428":0,"430":0,"431":0,"432":0,"445":0,"450":0,"452":0,"454":0,"455":0,"457":0,"459":0,"460":0,"461":0,"462":0,"463":0,"464":0,"465":0,"466":0,"479":0,"485":0,"486":0,"488":0,"490":0,"491":0,"492":0,"493":0,"494":0,"495":0,"496":0,"497":0,"498":0,"499":0,"500":0,"501":0,"503":0,"575":0,"576":0,"578":0,"582":0,"584":0,"596":0,"601":0,"621":0,"623":0,"624":0,"625":0,"626":0,"627":0,"639":0,"646":0,"648":0,"650":0,"652":0,"653":0,"655":0,"656":0,"659":0,"661":0,"663":0,"665":0,"667":0,"669":0,"671":0,"682":0,"684":0,"685":0,"687":0,"691":0,"692":0,"693":0,"694":0,"695":0,"696":0,"697":0,"698":0,"699":0,"701":0,"702":0,"704":0,"705":0,"708":0,"709":0,"711":0,"724":0,"727":0,"729":0,"731":0,"733":0,"734":0,"736":0,"738":0,"752":0,"764":0,"775":0,"777":0,"778":0,"780":0,"782":0,"783":0,"785":0,"787":0,"788":0,"803":0,"804":0,"818":0,"819":0,"832":0,"833":0,"847":0,"852":0,"853":0,"880":0,"896":0,"899":0,"901":0,"903":0,"905":0,"906":0,"907":0,"909":0,"911":0,"915":0,"917":0,"919":0,"922":0,"923":0,"940":0,"943":0,"945":0,"947":0,"949":0,"950":0,"951":0,"953":0,"955":0,"959":0,"961":0,"963":0,"966":0,"967":0,"982":0,"984":0,"985":0,"986":0,"988":0,"1004":0,"1006":0,"1007":0,"1008":0,"1010":0,"1026":0,"1028":0,"1029":0,"1030":0,"1032":0,"1082":0,"1084":0,"1096":0,"1097":0,"1099":0,"1101":0,"1106":0,"1107":0,"1109":0,"1111":0,"1128":0,"1129":0,"1131":0,"1135":0,"1137":0,"1152":0,"1153":0,"1155":0,"1157":0,"1172":0,"1174":0,"1175":0,"1177":0,"1256":0,"1333":0,"1346":0,"1347":0,"1359":0,"1361":0,"1363":0,"1376":0,"1377":0,"1379":0,"1392":0,"1396":0,"1397":0,"1399":0,"1411":0,"1413":0,"1415":0,"1417":0,"1421":0,"1424":0,"1439":0,"1441":0,"1443":0,"1445":0,"1456":0,"1459":0,"1461":0,"1463":0,"1495":0,"1497":0,"1504":0,"1506":0,"1507":0,"1509":0,"1511":0,"1513":0,"1515":0,"1536":0,"1548":0,"1580":0,"1581":0,"1582":0,"1583":0,"1592":0,"1596":0,"1597":0,"1598":0,"1599":0,"1600":0,"1602":0,"1604":0,"1616":0,"1619":0,"1620":0,"1621":0,"1622":0,"1623":0,"1624":0,"1625":0,"1626":0,"1627":0,"1628":0,"1629":0,"1630":0,"1631":0,"1632":0,"1633":0,"1634":0,"1646":0,"1649":0,"1650":0,"1651":0,"1652":0,"1653":0,"1654":0,"1663":0,"1672":0,"1673":0,"1674":0,"1675":0,"1676":0,"1685":0,"1686":0,"1689":0,"1691":0,"1692":0,"1693":0,"1694":0,"1697":0,"1700":0,"1701":0,"1702":0,"1704":0,"1706":0,"1708":0,"1710":0,"1712":0,"1714":0,"1715":0,"1721":0,"1722":0,"1723":0,"1724":0,"1725":0,"1726":0,"1729":0,"1731":0,"1733":0,"1737":0,"1738":0,"1741":0,"1743":0,"1744":0,"1745":0,"1747":0,"1748":0,"1753":0,"1754":0,"1757":0,"1759":0,"1763":0,"1765":0,"1767":0,"1769":0,"1771":0,"1772":0,"1774":0,"1777":0,"1792":0,"1805":0,"1807":0,"1809":0,"1811":0,"1813":0,"1814":0,"1909":0,"1933":0,"1937":0,"1938":0,"1939":0,"1941":0,"1942":0,"1944":0,"1945":0,"1947":0,"1949":0,"1951":0,"1952":0,"1954":0,"1956":0,"1958":0,"1974":0,"1975":0,"1977":0,"1981":0,"1996":0,"1998":0,"2000":0,"2001":0,"2002":0,"2003":0,"2004":0,"2017":0,"2022":0,"2024":0,"2025":0,"2036":0,"2038":0,"2039":0,"2040":0,"2041":0,"2042":0,"2053":0,"2057":0,"2059":0,"2061":0,"2062":0,"2063":0,"2076":0,"2090":0,"2092":0,"2093":0,"2094":0,"2096":0,"2098":0,"2100":0,"2104":0,"2106":0,"2108":0,"2111":0,"2113":0,"2125":0,"2136":0,"2138":0,"2142":0,"2145":0,"2146":0,"2149":0,"2150":0,"2151":0,"2152":0,"2153":0,"2154":0,"2155":0,"2156":0,"2157":0,"2158":0,"2159":0,"2160":0,"2161":0,"2162":0,"2163":0,"2164":0,"2165":0,"2166":0,"2190":0,"2198":0,"2200":0,"2204":0,"2206":0,"2208":0,"2211":0,"2213":0,"2214":0,"2216":0,"2217":0,"2218":0,"2222":0,"2223":0,"2224":0,"2225":0,"2227":0,"2229":0,"2232":0,"2258":0,"2267":0,"2268":0,"2269":0,"2271":0,"2273":0,"2274":0,"2275":0,"2276":0,"2277":0,"2279":0,"2281":0,"2282":0,"2294":0,"2296":0,"2300":0,"2302":0,"2304":0,"2321":0,"2322":0,"2324":0,"2326":0,"2328":0,"2330":0,"2332":0,"2334":0,"2346":0,"2351":0,"2353":0,"2354":0,"2356":0,"2358":0,"2362":0,"2375":0,"2379":0,"2381":0,"2383":0,"2384":0,"2386":0,"2388":0,"2391":0,"2394":0,"2403":0,"2410":0,"2416":0,"2417":0,"2418":0,"2419":0,"2420":0,"2421":0,"2423":0,"2425":0,"2427":0,"2428":0,"2429":0,"2430":0,"2431":0,"2432":0,"2433":0,"2434":0,"2435":0,"2437":0,"2438":0,"2451":0,"2481":0,"2482":0,"2484":0,"2485":0,"2489":0,"2490":0,"2492":0,"2493":0,"2495":0,"2496":0,"2498":0,"2500":0,"2502":0,"2505":0,"2507":0,"2508":0,"2510":0,"2512":0,"2513":0,"2516":0,"2517":0,"2519":0,"2520":0,"2521":0,"2522":0,"2524":0,"2526":0,"2528":0,"2530":0,"2532":0,"2533":0,"2534":0,"2535":0,"2539":0,"2570":0,"2572":0,"2586":0,"2618":0,"2620":0,"2622":0,"2624":0,"2637":0,"2638":0,"2640":0,"2641":0,"2643":0,"2656":0,"2658":0,"2660":0,"2662":0,"2675":0,"2700":0,"2701":0,"2703":0,"2704":0,"2705":0,"2706":0,"2710":0,"2711":0,"2712":0,"2713":0,"2715":0,"2716":0,"2718":0,"2719":0,"2720":0,"2722":0,"2723":0,"2725":0,"2726":0,"2727":0,"2731":0,"2736":0,"2739":0,"2741":0,"2742":0,"2744":0,"2745":0,"2746":0,"2747":0,"2749":0,"2751":0,"2754":0,"2756":0,"2758":0,"2759":0,"2761":0,"2762":0,"2764":0,"2768":0,"2769":0,"2770":0,"2771":0,"2773":0,"2774":0,"2776":0,"2781":0,"2783":0,"2786":0,"2788":0,"2790":0,"2792":0,"2795":0,"2797":0,"2798":0,"2799":0,"2801":0,"2802":0,"2804":0,"2808":0,"2812":0,"2815":0,"2817":0,"2818":0,"2819":0,"2821":0,"2833":0,"2838":0,"2840":0,"2841":0,"2843":0,"2846":0,"2848":0,"2849":0,"2851":0,"2866":0,"2869":0,"2870":0,"2883":0,"2887":0,"2889":0,"2891":0,"2895":0,"2897":0,"2899":0,"2900":0,"2902":0,"2903":0,"2909":0,"2925":0,"2927":0,"2929":0,"2931":0,"2933":0,"2949":0,"2951":0,"2955":0,"2969":0,"3002":0,"3004":0,"3006":0,"3007":0,"3009":0,"3013":0,"3014":0,"3015":0,"3016":0,"3018":0,"3020":0,"3022":0,"3023":0,"3025":0,"3027":0,"3028":0,"3030":0,"3032":0,"3037":0,"3039":0,"3042":0,"3044":0,"3045":0,"3047":0,"3049":0,"3050":0,"3052":0,"3054":0,"3057":0,"3061":0,"3062":0,"3063":0,"3067":0,"3069":0,"3070":0,"3072":0,"3074":0,"3078":0,"3089":0,"3096":0,"3098":0,"3100":0,"3102":0,"3104":0,"3105":0,"3107":0,"3109":0,"3110":0,"3112":0,"3114":0,"3115":0,"3117":0,"3118":0,"3119":0,"3121":0,"3125":0,"3127":0,"3128":0,"3130":0,"3132":0,"3146":0,"3147":0,"3159":0,"3171":0,"3173":0,"3174":0,"3176":0,"3178":0,"3180":0,"3182":0,"3184":0,"3188":0,"3190":0,"3192":0,"3194":0,"3196":0,"3199":0,"3201":0,"3203":0,"3205":0,"3207":0,"3211":0,"3213":0,"3215":0,"3217":0,"3219":0,"3233":0,"3234":0,"3236":0,"3238":0,"3251":0,"3271":0,"3273":0,"3274":0,"3278":0,"3279":0,"3281":0,"3283":0,"3285":0,"3287":0,"3288":0,"3289":0,"3290":0,"3292":0,"3293":0,"3294":0,"3296":0,"3297":0,"3299":0,"3301":0,"3303":0,"3307":0,"3308":0,"3310":0,"3311":0,"3313":0,"3315":0,"3317":0,"3319":0,"3321":0,"3323":0,"3333":0,"3334":0,"3336":0,"3338":0,"3339":0,"3341":0,"3342":0,"3344":0,"3347":0,"3348":0,"3349":0,"3351":0,"3352":0,"3354":0,"3357":0,"3359":0,"3361":0,"3363":0,"3366":0,"3368":0,"3371":0,"3373":0,"3375":0,"3377":0,"3378":0,"3380":0,"3382":0,"3384":0,"3388":0,"3391":0,"3393":0,"3395":0,"3401":0,"3402":0,"3404":0,"3406":0,"3408":0,"3423":0,"3426":0,"3428":0,"3430":0,"3432":0,"3434":0,"3436":0,"3441":0,"3443":0,"3447":0,"3451":0,"3482":0,"3488":0,"3490":0,"3495":0,"3503":0,"3508":0,"3514":0,"3515":0,"3516":0,"3517":0,"3518":0,"3530":0,"3532":0,"3535":0,"3537":0,"3539":0,"3555":0,"3559":0,"3561":0,"3562":0,"3564":0,"3565":0,"3571":0,"3573":0,"3574":0,"3575":0,"3577":0,"3578":0,"3584":0,"3599":0,"3603":0,"3605":0,"3606":0,"3608":0,"3609":0,"3615":0,"3617":0,"3618":0,"3619":0,"3621":0,"3622":0,"3628":0,"3643":0,"3647":0,"3649":0,"3650":0,"3652":0,"3653":0,"3659":0,"3661":0,"3662":0,"3663":0,"3665":0,"3666":0,"3672":0,"3687":0,"3691":0,"3693":0,"3694":0,"3696":0,"3697":0,"3703":0,"3705":0,"3706":0,"3707":0,"3709":0,"3710":0,"3716":0,"3727":0,"3729":0,"3730":0,"3732":0,"3733":0,"3734":0,"3764":0,"3766":0,"3767":0,"3768":0,"3770":0,"3771":0,"3774":0,"3776":0,"3777":0,"3778":0,"3779":0,"3781":0,"3782":0,"3785":0,"3787":0,"3788":0,"3789":0,"3791":0,"3792":0,"3795":0,"3797":0,"3798":0,"3799":0,"3801":0,"3802":0,"3806":0,"3807":0,"3808":0,"3809":0,"3810":0,"3811":0,"3812":0,"3814":0,"3815":0,"3816":0,"3817":0,"3819":0,"3820":0,"3822":0,"3823":0,"3825":0,"3826":0,"3827":0,"3829":0,"3834":0,"3835":0,"3837":0,"3838":0,"3840":0,"3841":0,"3842":0,"3844":0,"3849":0,"3850":0,"3852":0,"3853":0,"3855":0,"3856":0,"3857":0,"3859":0,"3864":0,"3865":0,"3867":0,"3868":0,"3870":0,"3871":0,"3872":0,"3874":0,"3879":0,"3880":0,"3881":0,"3882":0,"3883":0,"3885":0,"3886":0,"3887":0,"3889":0,"3890":0,"3892":0,"3894":0,"3895":0,"3897":0,"3899":0,"3902":0,"3904":0,"3905":0,"3906":0,"3908":0,"3909":0,"3911":0,"3913":0,"3914":0,"3916":0,"3918":0,"3921":0,"3923":0,"3924":0,"3925":0,"3927":0,"3928":0,"3929":0,"3930":0,"3932":0,"3935":0,"3937":0,"3940":0,"3942":0,"3943":0,"3944":0,"3946":0,"3947":0,"3948":0,"3949":0,"3951":0,"3954":0,"3956":0,"3959":0,"3960":0,"3962":0,"3963":0,"3965":0,"3967":0,"3968":0,"3969":0,"3970":0,"3971":0,"3974":0,"3976":0,"3977":0,"3978":0,"3979":0,"3992":0,"3998":0,"4000":0,"4001":0,"4003":0,"4005":0,"4006":0,"4008":0,"4009":0,"4011":0,"4013":0,"4016":0,"4017":0,"4019":0,"4021":0,"4024":0,"4026":0,"4028":0,"4030":0,"4031":0,"4033":0,"4035":0,"4036":0,"4049":0,"4059":0,"4061":0,"4063":0,"4065":0,"4067":0,"4069":0,"4071":0,"4075":0,"4077":0,"4078":0,"4079":0,"4083":0,"4085":0,"4086":0,"4090":0,"4091":0,"4092":0,"4093":0,"4095":0,"4096":0,"4098":0,"4100":0,"4102":0,"4104":0,"4105":0,"4106":0,"4107":0,"4108":0,"4110":0,"4114":0,"4121":0,"4123":0,"4125":0,"4151":0,"4154":0,"4156":0,"4158":0,"4160":0,"4162":0,"4164":0,"4168":0,"4173":0,"4175":0,"4177":0,"4179":0,"4182":0,"4198":0,"4202":0,"4204":0,"4205":0,"4207":0,"4208":0,"4210":0,"4212":0,"4217":0,"4222":0,"4226":0,"4228":0,"4229":0,"4230":0,"4232":0,"4234":0,"4239":0,"4241":0,"4243":0,"4244":0,"4248":0,"4264":0,"4265":0,"4267":0,"4269":0,"4274":0,"4275":0,"4276":0,"4310":0,"4315":0,"4319":0,"4321":0,"4323":0,"4327":0,"4330":0,"4332":0,"4334":0,"4338":0,"4341":0,"4343":0,"4362":0,"4364":0,"4366":0,"4384":0,"4386":0,"4388":0,"4449":0,"4450":0,"4452":0,"4454":0,"4456":0,"4458":0,"4463":0,"4464":0,"4521":0,"4522":0,"4524":0,"4526":0,"4530":0,"4531":0,"4533":0,"4535":0,"4537":0,"4541":0,"4555":0,"4556":0,"4558":0,"4560":0,"4564":0,"4565":0,"4567":0,"4569":0,"4571":0,"4575":0,"4589":0,"4591":0,"4593":0,"4598":0,"4600":0,"4602":0,"4607":0,"4609":0,"4612":0,"4613":0,"4634":0,"4644":0,"4646":0,"4648":0,"4659":0,"4661":0,"4662":0,"4663":0,"4664":0,"4666":0,"4667":0,"4668":0,"4669":0,"4670":0,"4673":0,"4674":0,"4687":0,"4689":0,"4691":0,"4696":0,"4698":0,"4699":0,"4701":0,"4703":0,"4704":0,"4706":0,"4708":0,"4710":0,"4711":0,"4712":0,"4713":0,"4714":0,"4716":0,"4718":0,"4719":0,"4720":0,"4721":0,"4722":0,"4723":0,"4724":0,"4725":0,"4738":0,"4742":0,"4744":0,"4745":0,"4747":0,"4749":0,"4751":0,"4753":0,"4755":0,"4756":0,"4757":0,"4759":0,"4763":0,"4765":0,"4778":0,"4780":0,"4781":0,"4782":0,"4783":0,"4784":0,"4785":0,"4786":0,"4798":0,"4803":0,"4805":0,"4806":0,"4810":0,"4812":0,"4813":0,"4815":0,"4817":0,"4818":0,"4820":0,"4822":0,"4824":0,"4825":0,"4826":0,"4828":0,"4843":0,"4846":0,"4868":0,"4878":0,"4879":0,"4880":0,"4892":0,"4903":0,"4907":0,"4909":0,"4910":0,"4911":0,"4940":0,"4943":0,"4945":0,"4946":0,"4948":0,"4949":0,"4950":0,"4962":0,"4973":0,"4974":0,"4975":0,"4976":0,"4978":0,"4980":0,"4982":0,"4984":0,"4985":0,"4986":0,"4987":0,"4988":0,"4989":0,"4990":0,"4992":0,"4996":0,"4999":0,"5003":0,"5005":0,"5006":0,"5021":0,"5023":0,"5024":0,"5026":0,"5039":0,"5044":0,"5060":0,"5065":0,"5087":0,"5089":0,"5091":0,"5095":0,"5098":0};
_yuitest_coverage["build/charts-base/charts-base.js"].functions = {"remove:43":0,"draw:58":0,"_drawGridlines:72":0,"_getPoints:140":0,"_horizontalLine:166":0,"_verticalLine:181":0,"_getDefaultStyles:195":0,"bindUI:261":0,"syncUI:275":0,"getSeriesByIndex:333":0,"getSeriesByKey:351":0,"addDispatcher:370":0,"_parseSeriesCollection:404":0,"_addSeries:443":0,"_createSeries:477":0,"_getSeries:573":0,"_markerEventHandler:594":0,"_updateStyles:619":0,"_sizeChangeHandler:637":0,"_drawSeries:680":0,"_drawingCompleteHandler:722":0,"_getDefaultStyles:750":0,"destructor:773":0,"setter:801":0,"setter:816":0,"getter:831":0,"getter:845":0,"setter:850":0,"getter:878":0,"setter:894":0,"setter:938":0,"getter:980":0,"getter:1002":0,"getter:1024":0,"ChartBase:1082":0,"valueFn:1094":0,"setter:1104":0,"setter:1126":0,"setter:1150":0,"setter:1170":0,"setter:1254":0,"_wereSeriesKeysExplicitlySet:1344":0,"_groupMarkersChangeHandler:1357":0,"_itemRendered:1374":0,"(anonymous 2):1396":0,"_getGraph:1390":0,"getSeries:1409":0,"getAxisByKey:1437":0,"getCategoryAxis:1454":0,"_setDataValues:1493":0,"_setSeriesCollection:1534":0,"_getAxisClass:1546":0,"initializer:1578":0,"renderUI:1590":0,"_setAriaElements:1614":0,"_getAriaOffscreenNode:1644":0,"syncUI:1661":0,"(anonymous 3):1685":0,"(anonymous 4):1706":0,"(anonymous 5):1743":0,"bindUI:1670":0,"_markerEventDispatcher:1790":0,"_dataProviderChangeHandler:1931":0,"toggleTooltip:1972":0,"_showTooltip:1994":0,"_positionTooltip:2015":0,"hideTooltip:2034":0,"_addTooltip:2051":0,"_updateTooltip:2074":0,"markerEventHandler:2134":0,"planarEventHandler:2140":0,"_getTooltip:2123":0,"_planarLabelFunction:2188":0,"_tooltipLabelFunction:2256":0,"_tooltipChangeHandler:2292":0,"_setText:2319":0,"_getAllKeys:2344":0,"_buildSeriesKeys:2373":0,"renderUI:2408":0,"_planarEventDispatcher:2449":0,"_addToAxesRenderQueue:2616":0,"_addToAxesCollection:2635":0,"_getDefaultSeriesCollection:2654":0,"_parseSeriesCollection:2673":0,"_parseSeriesAxes:2831":0,"_getCategoryAxis:2864":0,"_getSeriesAxis:2881":0,"_getBaseAttribute:2923":0,"_setBaseAttribute:2947":0,"_setAxes:2967":0,"_addAxes:3087":0,"_addSeries:3144":0,"_addGridlines:3157":0,"_getDefaultAxes:3231":0,"_parseAxes:3249":0,"_getDefaultAxisPosition:3421":0,"getSeriesItems:3480":0,"_sizeChanged:3528":0,"_getTopOverflow:3553":0,"_getRightOverflow:3597":0,"_getLeftOverflow:3641":0,"_getBottomOverflow:3685":0,"_redraw:3725":0,"destructor:3990":0,"_getAriaMessage:4047":0,"getter:4149":0,"setter:4171":0,"getter:4196":0,"setter:4220":0,"getter:4262":0,"setter:4272":0,"getter:4308":0,"setter:4317":0,"setter:4360":0,"setter:4382":0,"getter:4447":0,"setter:4461":0,"getter:4519":0,"setter:4528":0,"getter:4553":0,"setter:4562":0,"getter:4587":0,"setter:4596":0,"_getSeriesCollection:4642":0,"_parseAxes:4685":0,"_addAxes:4736":0,"_addSeries:4776":0,"_parseSeriesAxes:4796":0,"_getDefaultAxes:4841":0,"getSeriesItems:4866":0,"_sizeChanged:4890":0,"_redraw:4901":0,"_tooltipLabelFunction:4938":0,"_getAriaMessage:4960":0,"setter:5019":0,"getter:5037":0,"setter:5042":0,"getter:5058":0,"setter:5063":0,"Chart:5087":0,"(anonymous 1):1":0};
_yuitest_coverage["build/charts-base/charts-base.js"].coveredLines = 1374;
_yuitest_coverage["build/charts-base/charts-base.js"].coveredFunctions = 141;
_yuitest_coverline("build/charts-base/charts-base.js", 1);
YUI.add('charts-base', function (Y, NAME) {

/**
 * Provides functionality for creating charts.
 *
 * @module charts
 * @submodule charts-base
 */
_yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/charts-base/charts-base.js", 9);
var CONFIG = Y.config,
    WINDOW = CONFIG.win,
    DOCUMENT = CONFIG.doc,
    Y_Lang = Y.Lang,
    IS_STRING = Y_Lang.isString,
    _getClassName = Y.ClassNameManager.getClassName,
    SERIES_MARKER = _getClassName("seriesmarker");

/**
 * Gridlines draws gridlines on a Graph.
 *
 * @class Gridlines
 * @constructor
 * @extends Base
 * @uses Renderer
 * @param {Object} config (optional) Configuration parameters.
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 27);
Y.Gridlines = Y.Base.create("gridlines", Y.Base, [Y.Renderer], {
    /**
     * Reference to the `Path` element used for drawing Gridlines.
     *
     * @property _path
     * @type Path
     * @private
     */
    _path: null,

    /**
     * Removes the Gridlines.
     *
     * @method remove
     * @private
     */
    remove: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "remove", 43);
_yuitest_coverline("build/charts-base/charts-base.js", 45);
var path = this._path;
        _yuitest_coverline("build/charts-base/charts-base.js", 46);
if(path)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 48);
path.destroy();
        }
    },

    /**
     * Draws the gridlines
     *
     * @method draw
     * @protected
     */
    draw: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "draw", 58);
_yuitest_coverline("build/charts-base/charts-base.js", 60);
if(this.get("axis") && this.get("graph"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 62);
this._drawGridlines();
        }
    },

    /**
     * Algorithm for drawing gridlines
     *
     * @method _drawGridlines
     * @private
     */
    _drawGridlines: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_drawGridlines", 72);
_yuitest_coverline("build/charts-base/charts-base.js", 74);
var path,
            axis = this.get("axis"),
            axisPosition = axis.get("position"),
            points,
            i = 0,
            l,
            direction = this.get("direction"),
            graph = this.get("graph"),
            w = graph.get("width"),
            h = graph.get("height"),
            line = this.get("styles").line,
            color = line.color,
            weight = line.weight,
            alpha = line.alpha,
            count = this.get("count"),
            length,
            lineFunction;
        _yuitest_coverline("build/charts-base/charts-base.js", 91);
if(isFinite(w) && isFinite(h) && w > 0 && h > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 93);
if(count && Y.Lang.isNumber(count))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 95);
points = this._getPoints(count, w, h);
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 97);
if(axisPosition !== "none" && axis && axis.get("tickPoints"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 99);
points = axis.get("tickPoints");
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 103);
points = this._getPoints(axis.get("styles").majorUnit.count, w, h);
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 105);
l = points.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 106);
path = graph.get("gridlines");
            _yuitest_coverline("build/charts-base/charts-base.js", 107);
path.set("width", w);
            _yuitest_coverline("build/charts-base/charts-base.js", 108);
path.set("height", h);
            _yuitest_coverline("build/charts-base/charts-base.js", 109);
path.set("stroke", {
                weight: weight,
                color: color,
                opacity: alpha
            });
            _yuitest_coverline("build/charts-base/charts-base.js", 114);
if(direction === "vertical")
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 116);
lineFunction = this._verticalLine;
                _yuitest_coverline("build/charts-base/charts-base.js", 117);
length = h;
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 121);
lineFunction = this._horizontalLine;
                _yuitest_coverline("build/charts-base/charts-base.js", 122);
length = w;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 124);
for(i = 0; i < l; i = i + 1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 126);
lineFunction(path, points[i], length);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 128);
path.end();
        }
    },

    /**
     * Calculates the coordinates for the gridlines based on a count.
     *
     * @method _getPoints
     * @param {Number} count Number of gridlines
     * @return Array
     * @private
     */
    _getPoints: function(count, w, h)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getPoints", 140);
_yuitest_coverline("build/charts-base/charts-base.js", 142);
var i,
            points = [],
            multiplier,
            divisor = count - 1;
        _yuitest_coverline("build/charts-base/charts-base.js", 146);
for(i = 0; i < count; i = i + 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 148);
multiplier = i/divisor;
            _yuitest_coverline("build/charts-base/charts-base.js", 149);
points[i] = {
                x: w * multiplier,
                y: h * multiplier
            };
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 154);
return points;
    },

    /**
     * Algorithm for horizontal lines.
     *
     * @method _horizontalLine
     * @param {Path} path Reference to path element
     * @param {Object} pt Coordinates corresponding to a major unit of an axis.
     * @param {Number} w Width of the Graph
     * @private
     */
    _horizontalLine: function(path, pt, w)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_horizontalLine", 166);
_yuitest_coverline("build/charts-base/charts-base.js", 168);
path.moveTo(0, pt.y);
        _yuitest_coverline("build/charts-base/charts-base.js", 169);
path.lineTo(w, pt.y);
    },

    /**
     * Algorithm for vertical lines.
     *
     * @method _verticalLine
     * @param {Path} path Reference to path element
     * @param {Object} pt Coordinates corresponding to a major unit of an axis.
     * @param {Number} h Height of the Graph
     * @private
     */
    _verticalLine: function(path, pt, h)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_verticalLine", 181);
_yuitest_coverline("build/charts-base/charts-base.js", 183);
path.moveTo(pt.x, 0);
        _yuitest_coverline("build/charts-base/charts-base.js", 184);
path.lineTo(pt.x, h);
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultStyles", 195);
_yuitest_coverline("build/charts-base/charts-base.js", 197);
var defs = {
            line: {
                color:"#f0efe9",
                weight: 1,
                alpha: 1
            }
        };
        _yuitest_coverline("build/charts-base/charts-base.js", 204);
return defs;
    }

},
{
    ATTRS: {
        /**
         * Indicates the direction of the gridline.
         *
         * @attribute direction
         * @type String
         */
        direction: {},

        /**
         * Indicate the `Axis` in which to bind
         * the gridlines.
         *
         * @attribute axis
         * @type Axis
         */
        axis: {},

        /**
         * Indicates the `Graph` in which the gridlines
         * are drawn.
         *
         * @attribute graph
         * @type Graph
         */
        graph: {},

        /**
         * Indicates the number of gridlines to display. If no value is set, gridlines will equal the number of ticks in
         * the corresponding axis.
         *
         * @attribute count
         * @type Number
         */
        count: {}
    }
});
/**
 * Graph manages and contains series instances for a `CartesianChart`
 * instance.
 *
 * @class Graph
 * @constructor
 * @extends Widget
 * @uses Renderer
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 256);
Y.Graph = Y.Base.create("graph", Y.Widget, [Y.Renderer], {
    /**
     * @method bindUI
     * @private
     */
    bindUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "bindUI", 261);
_yuitest_coverline("build/charts-base/charts-base.js", 263);
var bb = this.get("boundingBox");
        _yuitest_coverline("build/charts-base/charts-base.js", 264);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 265);
this.after("widthChange", this._sizeChangeHandler);
        _yuitest_coverline("build/charts-base/charts-base.js", 266);
this.after("heightChange", this._sizeChangeHandler);
        _yuitest_coverline("build/charts-base/charts-base.js", 267);
this.after("stylesChange", this._updateStyles);
        _yuitest_coverline("build/charts-base/charts-base.js", 268);
this.after("groupMarkersChange", this._drawSeries);
    },

    /**
     * @method syncUI
     * @private
     */
    syncUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "syncUI", 275);
_yuitest_coverline("build/charts-base/charts-base.js", 277);
var background,
            cb,
            bg,
            sc = this.get("seriesCollection"),
            series,
            i = 0,
            len = sc ? sc.length : 0,
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines");
        _yuitest_coverline("build/charts-base/charts-base.js", 286);
if(this.get("showBackground"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 288);
background = this.get("background");
            _yuitest_coverline("build/charts-base/charts-base.js", 289);
cb = this.get("contentBox");
            _yuitest_coverline("build/charts-base/charts-base.js", 290);
bg = this.get("styles").background;
            _yuitest_coverline("build/charts-base/charts-base.js", 291);
bg.stroke = bg.border;
            _yuitest_coverline("build/charts-base/charts-base.js", 292);
bg.stroke.opacity = bg.stroke.alpha;
            _yuitest_coverline("build/charts-base/charts-base.js", 293);
bg.fill.opacity = bg.fill.alpha;
            _yuitest_coverline("build/charts-base/charts-base.js", 294);
bg.width = this.get("width");
            _yuitest_coverline("build/charts-base/charts-base.js", 295);
bg.height = this.get("height");
            _yuitest_coverline("build/charts-base/charts-base.js", 296);
bg.type = bg.shape;
            _yuitest_coverline("build/charts-base/charts-base.js", 297);
background.set(bg);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 299);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 301);
series = sc[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 302);
if(series instanceof Y.SeriesBase)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 304);
series.render();
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 307);
if(hgl && hgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 309);
hgl.draw();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 311);
if(vgl && vgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 313);
vgl.draw();
        }
    },

    /**
     * Object of arrays containing series mapped to a series type.
     *
     * @property seriesTypes
     * @type Object
     * @private
     */
    seriesTypes: null,

    /**
     * Returns a series instance based on an index.
     *
     * @method getSeriesByIndex
     * @param {Number} val index of the series
     * @return CartesianSeries
     */
    getSeriesByIndex: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesByIndex", 333);
_yuitest_coverline("build/charts-base/charts-base.js", 335);
var col = this.get("seriesCollection"),
            series;
        _yuitest_coverline("build/charts-base/charts-base.js", 337);
if(col && col.length > val)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 339);
series = col[val];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 341);
return series;
    },

    /**
     * Returns a series instance based on a key value.
     *
     * @method getSeriesByKey
     * @param {String} val key value of the series
     * @return CartesianSeries
     */
    getSeriesByKey: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesByKey", 351);
_yuitest_coverline("build/charts-base/charts-base.js", 353);
var obj = this._seriesDictionary,
            series;
        _yuitest_coverline("build/charts-base/charts-base.js", 355);
if(obj && obj.hasOwnProperty(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 357);
series = obj[val];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 359);
return series;
    },

    /**
     * Adds dispatcher to a `_dispatcher` used to
     * to ensure all series have redrawn before for firing event.
     *
     * @method addDispatcher
     * @param {CartesianSeries} val series instance to add
     * @protected
     */
    addDispatcher: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "addDispatcher", 370);
_yuitest_coverline("build/charts-base/charts-base.js", 372);
if(!this._dispatchers)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 374);
this._dispatchers = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 376);
this._dispatchers.push(val);
    },

    /**
     * Collection of series to be displayed in the graph.
     *
     * @property _seriesCollection
     * @type Array
     * @private
     */
    _seriesCollection: null,

    /**
     * Object containing key value pairs of `CartesianSeries` instances.
     *
     * @property _seriesDictionary
     * @type Object
     * @private
     */
    _seriesDictionary: null,

    /**
     * Parses series instances to be displayed in the graph.
     *
     * @method _parseSeriesCollection
     * @param {Array} Collection of `CartesianSeries` instances or objects container `CartesianSeries` attributes values.
     * @private
     */
    _parseSeriesCollection: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesCollection", 404);
_yuitest_coverline("build/charts-base/charts-base.js", 406);
if(!val)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 408);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 410);
var len = val.length,
            i = 0,
            series,
            seriesKey;
        _yuitest_coverline("build/charts-base/charts-base.js", 414);
this._seriesCollection = [];
        _yuitest_coverline("build/charts-base/charts-base.js", 415);
this._seriesDictionary = {};
        _yuitest_coverline("build/charts-base/charts-base.js", 416);
this.seriesTypes = [];
        _yuitest_coverline("build/charts-base/charts-base.js", 417);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 419);
series = val[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 420);
if(!(series instanceof Y.CartesianSeries) && !(series instanceof Y.PieSeries))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 422);
this._createSeries(series);
                _yuitest_coverline("build/charts-base/charts-base.js", 423);
continue;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 425);
this._addSeries(series);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 427);
len = this._seriesCollection.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 428);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 430);
series = this.get("seriesCollection")[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 431);
seriesKey = series.get("direction") === "horizontal" ? "yKey" : "xKey";
            _yuitest_coverline("build/charts-base/charts-base.js", 432);
this._seriesDictionary[series.get(seriesKey)] = series;
        }
    },

    /**
     * Adds a series to the graph.
     *
     * @method _addSeries
     * @param {CartesianSeries} series Series to add to the graph.
     * @private
     */
    _addSeries: function(series)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addSeries", 443);
_yuitest_coverline("build/charts-base/charts-base.js", 445);
var type = series.get("type"),
            seriesCollection = this.get("seriesCollection"),
            graphSeriesLength = seriesCollection.length,
            seriesTypes = this.seriesTypes,
            typeSeriesCollection;
        _yuitest_coverline("build/charts-base/charts-base.js", 450);
if(!series.get("graph"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 452);
series.set("graph", this);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 454);
seriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 455);
if(!seriesTypes.hasOwnProperty(type))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 457);
this.seriesTypes[type] = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 459);
typeSeriesCollection = this.seriesTypes[type];
        _yuitest_coverline("build/charts-base/charts-base.js", 460);
series.set("graphOrder", graphSeriesLength);
        _yuitest_coverline("build/charts-base/charts-base.js", 461);
series.set("order", typeSeriesCollection.length);
        _yuitest_coverline("build/charts-base/charts-base.js", 462);
typeSeriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 463);
series.set("seriesTypeCollection", typeSeriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 464);
this.addDispatcher(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 465);
series.after("drawingComplete", Y.bind(this._drawingCompleteHandler, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 466);
this.fire("seriesAdded", series);
    },

    /**
     * Creates a `CartesianSeries` instance from an object containing attribute key value pairs. The key value pairs include
     * attributes for the specific series and a type value which defines the type of series to be used.
     *
     * @method createSeries
     * @param {Object} seriesData Series attribute key value pairs.
     * @private
     */
    _createSeries: function(seriesData)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_createSeries", 477);
_yuitest_coverline("build/charts-base/charts-base.js", 479);
var type = seriesData.type,
            seriesCollection = this.get("seriesCollection"),
            seriesTypes = this.seriesTypes,
            typeSeriesCollection,
            SeriesClass,
            series;
            _yuitest_coverline("build/charts-base/charts-base.js", 485);
seriesData.graph = this;
        _yuitest_coverline("build/charts-base/charts-base.js", 486);
if(!seriesTypes.hasOwnProperty(type))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 488);
seriesTypes[type] = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 490);
typeSeriesCollection = seriesTypes[type];
        _yuitest_coverline("build/charts-base/charts-base.js", 491);
seriesData.graph = this;
        _yuitest_coverline("build/charts-base/charts-base.js", 492);
seriesData.order = typeSeriesCollection.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 493);
seriesData.graphOrder = seriesCollection.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 494);
SeriesClass = this._getSeries(seriesData.type);
        _yuitest_coverline("build/charts-base/charts-base.js", 495);
series = new SeriesClass(seriesData);
        _yuitest_coverline("build/charts-base/charts-base.js", 496);
this.addDispatcher(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 497);
series.after("drawingComplete", Y.bind(this._drawingCompleteHandler, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 498);
typeSeriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 499);
seriesCollection.push(series);
        _yuitest_coverline("build/charts-base/charts-base.js", 500);
series.set("seriesTypeCollection", typeSeriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 501);
if(this.get("rendered"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 503);
series.render();
        }
    },

    /**
     * String reference for pre-defined `Series` classes.
     *
     * @property _seriesMap
     * @type Object
     * @private
     */
    _seriesMap: {
        line : Y.LineSeries,
        column : Y.ColumnSeries,
        bar : Y.BarSeries,
        area :  Y.AreaSeries,
        candlestick : Y.CandlestickSeries,
        ohlc : Y.OHLCSeries,
        stackedarea : Y.StackedAreaSeries,
        stackedline : Y.StackedLineSeries,
        stackedcolumn : Y.StackedColumnSeries,
        stackedbar : Y.StackedBarSeries,
        markerseries : Y.MarkerSeries,
        spline : Y.SplineSeries,
        areaspline : Y.AreaSplineSeries,
        stackedspline : Y.StackedSplineSeries,
        stackedareaspline : Y.StackedAreaSplineSeries,
        stackedmarkerseries : Y.StackedMarkerSeries,
        pie : Y.PieSeries,
        combo : Y.ComboSeries,
        stackedcombo : Y.StackedComboSeries,
        combospline : Y.ComboSplineSeries,
        stackedcombospline : Y.StackedComboSplineSeries
    },

    /**
     * Returns a specific `CartesianSeries` class based on key value from a look up table of a direct reference to a
     * class. When specifying a key value, the following options are available:
     *
     *  <table>
     *      <tr><th>Key Value</th><th>Class</th></tr>
     *      <tr><td>line</td><td>Y.LineSeries</td></tr>
     *      <tr><td>column</td><td>Y.ColumnSeries</td></tr>
     *      <tr><td>bar</td><td>Y.BarSeries</td></tr>
     *      <tr><td>area</td><td>Y.AreaSeries</td></tr>
     *      <tr><td>stackedarea</td><td>Y.StackedAreaSeries</td></tr>
     *      <tr><td>stackedline</td><td>Y.StackedLineSeries</td></tr>
     *      <tr><td>stackedcolumn</td><td>Y.StackedColumnSeries</td></tr>
     *      <tr><td>stackedbar</td><td>Y.StackedBarSeries</td></tr>
     *      <tr><td>markerseries</td><td>Y.MarkerSeries</td></tr>
     *      <tr><td>spline</td><td>Y.SplineSeries</td></tr>
     *      <tr><td>areaspline</td><td>Y.AreaSplineSeries</td></tr>
     *      <tr><td>stackedspline</td><td>Y.StackedSplineSeries</td></tr>
     *      <tr><td>stackedareaspline</td><td>Y.StackedAreaSplineSeries</td></tr>
     *      <tr><td>stackedmarkerseries</td><td>Y.StackedMarkerSeries</td></tr>
     *      <tr><td>pie</td><td>Y.PieSeries</td></tr>
     *      <tr><td>combo</td><td>Y.ComboSeries</td></tr>
     *      <tr><td>stackedcombo</td><td>Y.StackedComboSeries</td></tr>
     *      <tr><td>combospline</td><td>Y.ComboSplineSeries</td></tr>
     *      <tr><td>stackedcombospline</td><td>Y.StackedComboSplineSeries</td></tr>
     *  </table>
     *
     * When referencing a class directly, you can specify any of the above classes or any custom class that extends
     * `CartesianSeries` or `PieSeries`.
     *
     * @method _getSeries
     * @param {String | Object} type Series type.
     * @return CartesianSeries
     * @private
     */
    _getSeries: function(type)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getSeries", 573);
_yuitest_coverline("build/charts-base/charts-base.js", 575);
var seriesClass;
        _yuitest_coverline("build/charts-base/charts-base.js", 576);
if(Y_Lang.isString(type))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 578);
seriesClass = this._seriesMap[type];
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 582);
seriesClass = type;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 584);
return seriesClass;
    },

    /**
     * Event handler for marker events.
     *
     * @method _markerEventHandler
     * @param {Object} e Event object.
     * @private
     */
    _markerEventHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_markerEventHandler", 594);
_yuitest_coverline("build/charts-base/charts-base.js", 596);
var type = e.type,
            markerNode = e.currentTarget,
            strArr = markerNode.getAttribute("id").split("_"),
            series = this.getSeriesByIndex(strArr[1]),
            index = strArr[2];
        _yuitest_coverline("build/charts-base/charts-base.js", 601);
series.updateMarkerState(type, index);
    },

    /**
     * Collection of `CartesianSeries` instances to be redrawn.
     *
     * @property _dispatchers
     * @type Array
     * @private
     */
    _dispatchers: null,

    /**
     * Updates the `Graph` styles.
     *
     * @method _updateStyles
     * @private
     */
    _updateStyles: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_updateStyles", 619);
_yuitest_coverline("build/charts-base/charts-base.js", 621);
var styles = this.get("styles").background,
            border = styles.border;
            _yuitest_coverline("build/charts-base/charts-base.js", 623);
border.opacity = border.alpha;
            _yuitest_coverline("build/charts-base/charts-base.js", 624);
styles.stroke = border;
            _yuitest_coverline("build/charts-base/charts-base.js", 625);
styles.fill.opacity = styles.fill.alpha;
        _yuitest_coverline("build/charts-base/charts-base.js", 626);
this.get("background").set(styles);
        _yuitest_coverline("build/charts-base/charts-base.js", 627);
this._sizeChangeHandler();
    },

    /**
     * Event handler for size changes.
     *
     * @method _sizeChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _sizeChangeHandler: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_sizeChangeHandler", 637);
_yuitest_coverline("build/charts-base/charts-base.js", 639);
var hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines"),
            w = this.get("width"),
            h = this.get("height"),
            bg = this.get("styles").background,
            weight,
            background;
        _yuitest_coverline("build/charts-base/charts-base.js", 646);
if(bg && bg.border)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 648);
weight = bg.border.weight || 0;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 650);
if(this.get("showBackground"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 652);
background = this.get("background");
            _yuitest_coverline("build/charts-base/charts-base.js", 653);
if(w && h)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 655);
background.set("width", w);
                _yuitest_coverline("build/charts-base/charts-base.js", 656);
background.set("height", h);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 659);
if(this._gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 661);
this._gridlines.clear();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 663);
if(hgl && hgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 665);
hgl.draw();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 667);
if(vgl && vgl instanceof Y.Gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 669);
vgl.draw();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 671);
this._drawSeries();
    },

    /**
     * Draws each series.
     *
     * @method _drawSeries
     * @private
     */
    _drawSeries: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_drawSeries", 680);
_yuitest_coverline("build/charts-base/charts-base.js", 682);
if(this._drawing)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 684);
this._callLater = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 685);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 687);
var sc,
            i,
            len,
            graphic = this.get("graphic");
        _yuitest_coverline("build/charts-base/charts-base.js", 691);
graphic.set("autoDraw", false);
        _yuitest_coverline("build/charts-base/charts-base.js", 692);
graphic.set("width", this.get("width"));
        _yuitest_coverline("build/charts-base/charts-base.js", 693);
graphic.set("height", this.get("height"));
        _yuitest_coverline("build/charts-base/charts-base.js", 694);
this._callLater = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 695);
this._drawing = true;
        _yuitest_coverline("build/charts-base/charts-base.js", 696);
sc = this.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 697);
i = 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 698);
len = sc ? sc.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 699);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 701);
sc[i].draw();
            _yuitest_coverline("build/charts-base/charts-base.js", 702);
if((!sc[i].get("xcoords") || !sc[i].get("ycoords")) && !sc[i] instanceof Y.PieSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 704);
this._callLater = true;
                _yuitest_coverline("build/charts-base/charts-base.js", 705);
break;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 708);
this._drawing = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 709);
if(this._callLater)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 711);
this._drawSeries();
        }
    },

    /**
     * Event handler for series drawingComplete event.
     *
     * @method _drawingCompleteHandler
     * @param {Object} e Event object.
     * @private
     */
    _drawingCompleteHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_drawingCompleteHandler", 722);
_yuitest_coverline("build/charts-base/charts-base.js", 724);
var series = e.currentTarget,
            graphic,
            index = Y.Array.indexOf(this._dispatchers, series);
        _yuitest_coverline("build/charts-base/charts-base.js", 727);
if(index > -1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 729);
this._dispatchers.splice(index, 1);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 731);
if(this._dispatchers.length < 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 733);
graphic = this.get("graphic");
            _yuitest_coverline("build/charts-base/charts-base.js", 734);
if(!graphic.get("autoDraw"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 736);
graphic._redraw();
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 738);
this.fire("chartRendered");
        }
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultStyles", 750);
_yuitest_coverline("build/charts-base/charts-base.js", 752);
var defs = {
            background: {
                shape: "rect",
                fill:{
                    color:"#faf9f2"
                },
                border: {
                    color:"#dad8c9",
                    weight: 1
                }
            }
        };
        _yuitest_coverline("build/charts-base/charts-base.js", 764);
return defs;
    },

    /**
     * Destructor implementation Graph class. Removes all Graphic instances from the widget.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "destructor", 773);
_yuitest_coverline("build/charts-base/charts-base.js", 775);
if(this._graphic)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 777);
this._graphic.destroy();
            _yuitest_coverline("build/charts-base/charts-base.js", 778);
this._graphic = null;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 780);
if(this._background)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 782);
this._background.get("graphic").destroy();
            _yuitest_coverline("build/charts-base/charts-base.js", 783);
this._background = null;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 785);
if(this._gridlines)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 787);
this._gridlines.get("graphic").destroy();
            _yuitest_coverline("build/charts-base/charts-base.js", 788);
this._gridlines = null;
        }
    }
}, {
    ATTRS: {
        /**
         * The x-coordinate for the graph.
         *
         * @attribute x
         * @type Number
         * @protected
         */
        x: {
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 801);
_yuitest_coverline("build/charts-base/charts-base.js", 803);
this.get("boundingBox").setStyle("left", val + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 804);
return val;
            }
        },

        /**
         * The y-coordinate for the graph.
         *
         * @attribute y
         * @type Number
         * @protected
         */
        y: {
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 816);
_yuitest_coverline("build/charts-base/charts-base.js", 818);
this.get("boundingBox").setStyle("top", val + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 819);
return val;
            }
        },

        /**
         * Reference to the chart instance using the graph.
         *
         * @attribute chart
         * @type ChartBase
         * @readOnly
         */
        chart: {
            getter: function() {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 831);
_yuitest_coverline("build/charts-base/charts-base.js", 832);
var chart = this._state.chart || this;
                _yuitest_coverline("build/charts-base/charts-base.js", 833);
return chart;
            }
        },

        /**
         * Collection of series. When setting the `seriesCollection` the array can contain a combination of either
         * `CartesianSeries` instances or object literals with properties that will define a series.
         *
         * @attribute seriesCollection
         * @type CartesianSeries
         */
        seriesCollection: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 845);
_yuitest_coverline("build/charts-base/charts-base.js", 847);
return this._seriesCollection;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 850);
_yuitest_coverline("build/charts-base/charts-base.js", 852);
this._parseSeriesCollection(val);
                _yuitest_coverline("build/charts-base/charts-base.js", 853);
return this._seriesCollection;
            }
        },

        /**
         * Indicates whether the `Graph` has a background.
         *
         * @attribute showBackground
         * @type Boolean
         * @default true
         */
        showBackground: {
            value: true
        },

        /**
         * Read-only hash lookup for all series on in the `Graph`.
         *
         * @attribute seriesDictionary
         * @type Object
         * @readOnly
         */
        seriesDictionary: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 878);
_yuitest_coverline("build/charts-base/charts-base.js", 880);
return this._seriesDictionary;
            }
        },

        /**
         * Reference to the horizontal `Gridlines` instance.
         *
         * @attribute horizontalGridlines
         * @type Gridlines
         * @default null
         */
        horizontalGridlines: {
            value: null,

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 894);
_yuitest_coverline("build/charts-base/charts-base.js", 896);
var cfg,
                    key,
                    gl = this.get("horizontalGridlines");
                _yuitest_coverline("build/charts-base/charts-base.js", 899);
if(gl && gl instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 901);
gl.remove();
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 903);
if(val instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 905);
gl = val;
                    _yuitest_coverline("build/charts-base/charts-base.js", 906);
val.set("graph", this);
                    _yuitest_coverline("build/charts-base/charts-base.js", 907);
return val;
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 909);
if(val)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 911);
cfg = {
                        direction: "horizonal",
                        graph: this
                    };
                    _yuitest_coverline("build/charts-base/charts-base.js", 915);
for(key in val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 917);
if(val.hasOwnProperty(key))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 919);
cfg[key] = val[key];
                        }
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 922);
gl = new Y.Gridlines(cfg);
                    _yuitest_coverline("build/charts-base/charts-base.js", 923);
return gl;
                }}
            }
        },

        /**
         * Reference to the vertical `Gridlines` instance.
         *
         * @attribute verticalGridlines
         * @type Gridlines
         * @default null
         */
        verticalGridlines: {
            value: null,

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 938);
_yuitest_coverline("build/charts-base/charts-base.js", 940);
var cfg,
                    key,
                    gl = this.get("verticalGridlines");
                _yuitest_coverline("build/charts-base/charts-base.js", 943);
if(gl && gl instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 945);
gl.remove();
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 947);
if(val instanceof Y.Gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 949);
gl = val;
                    _yuitest_coverline("build/charts-base/charts-base.js", 950);
val.set("graph", this);
                    _yuitest_coverline("build/charts-base/charts-base.js", 951);
return val;
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 953);
if(val)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 955);
cfg = {
                        direction: "vertical",
                        graph: this
                    };
                    _yuitest_coverline("build/charts-base/charts-base.js", 959);
for(key in val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 961);
if(val.hasOwnProperty(key))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 963);
cfg[key] = val[key];
                        }
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 966);
gl = new Y.Gridlines(cfg);
                    _yuitest_coverline("build/charts-base/charts-base.js", 967);
return gl;
                }}
            }
        },

        /**
         * Reference to graphic instance used for the background.
         *
         * @attribute background
         * @type Graphic
         * @readOnly
         */
        background: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 980);
_yuitest_coverline("build/charts-base/charts-base.js", 982);
if(!this._background)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 984);
this._backgroundGraphic = new Y.Graphic({render:this.get("contentBox")});
                    _yuitest_coverline("build/charts-base/charts-base.js", 985);
this._backgroundGraphic.get("node").style.zIndex = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 986);
this._background = this._backgroundGraphic.addShape({type: "rect"});
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 988);
return this._background;
            }
        },

        /**
         * Reference to graphic instance used for gridlines.
         *
         * @attribute gridlines
         * @type Graphic
         * @readOnly
         */
        gridlines: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 1002);
_yuitest_coverline("build/charts-base/charts-base.js", 1004);
if(!this._gridlines)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1006);
this._gridlinesGraphic = new Y.Graphic({render:this.get("contentBox")});
                    _yuitest_coverline("build/charts-base/charts-base.js", 1007);
this._gridlinesGraphic.get("node").style.zIndex = 1;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1008);
this._gridlines = this._gridlinesGraphic.addShape({type: "path"});
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1010);
return this._gridlines;
            }
        },

        /**
         * Reference to graphic instance used for series.
         *
         * @attribute graphic
         * @type Graphic
         * @readOnly
         */
        graphic: {
            readOnly: true,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 1024);
_yuitest_coverline("build/charts-base/charts-base.js", 1026);
if(!this._graphic)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1028);
this._graphic = new Y.Graphic({render:this.get("contentBox")});
                    _yuitest_coverline("build/charts-base/charts-base.js", 1029);
this._graphic.get("node").style.zIndex = 2;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1030);
this._graphic.set("autoDraw", false);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1032);
return this._graphic;
            }
        },

        /**
         * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.
         *
         * @attribute groupMarkers
         * @type Boolean
         */
        groupMarkers: {
            value: false
        }

        /**
         * Style properties used for drawing a background. Below are the default values:
         *  <dl>
         *      <dt>background</dt><dd>An object containing the following values:
         *          <dl>
         *              <dt>fill</dt><dd>Defines the style properties for the fill. Contains the following values:
         *                  <dl>
         *                      <dt>color</dt><dd>Color of the fill. The default value is #faf9f2.</dd>
         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background fill.
         *                      The default value is 1.</dd>
         *                  </dl>
         *              </dd>
         *              <dt>border</dt><dd>Defines the style properties for the border. Contains the following values:
         *                  <dl>
         *                      <dt>color</dt><dd>Color of the border. The default value is #dad8c9.</dd>
         *                      <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the background border.
         *                      The default value is 1.</dd>
         *                      <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *                  </dl>
         *              </dd>
         *          </dl>
         *      </dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});
/**
 * The ChartBase class is an abstract class used to create charts.
 *
 * @class ChartBase
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 1082);
function ChartBase() {}

_yuitest_coverline("build/charts-base/charts-base.js", 1084);
ChartBase.ATTRS = {
    /**
     * Data used to generate the chart.
     *
     * @attribute dataProvider
     * @type Array
     */
    dataProvider: {
        lazyAdd: false,

        valueFn: function()
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "valueFn", 1094);
_yuitest_coverline("build/charts-base/charts-base.js", 1096);
var defDataProvider = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 1097);
if(!this._wereSeriesKeysExplicitlySet())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1099);
this.set("seriesKeys", this._buildSeriesKeys(defDataProvider), {src: "internal"});
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1101);
return defDataProvider;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1104);
_yuitest_coverline("build/charts-base/charts-base.js", 1106);
var dataProvider = this._setDataValues(val);
            _yuitest_coverline("build/charts-base/charts-base.js", 1107);
if(!this._wereSeriesKeysExplicitlySet())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1109);
this.set("seriesKeys", this._buildSeriesKeys(dataProvider), {src: "internal"});
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1111);
return dataProvider;
        }
    },

    /**
     * A collection of keys that map to the series axes. If no keys are set,
     * they will be generated automatically depending on the data structure passed into
     * the chart.
     *
     * @attribute seriesKeys
     * @type Array
     */
    seriesKeys: {
        lazyAdd: false,

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1126);
_yuitest_coverline("build/charts-base/charts-base.js", 1128);
var opts = arguments[2];
            _yuitest_coverline("build/charts-base/charts-base.js", 1129);
if(!val || (opts && opts.src && opts.src === "internal"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1131);
this._seriesKeysExplicitlySet = false;
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1135);
this._seriesKeysExplicitlySet = true;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1137);
return val;
        }
    },

    /**
     * Sets the `aria-label` for the chart.
     *
     * @attribute ariaLabel
     * @type String
     */
    ariaLabel: {
        value: "Chart Application",

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1150);
_yuitest_coverline("build/charts-base/charts-base.js", 1152);
var cb = this.get("contentBox");
            _yuitest_coverline("build/charts-base/charts-base.js", 1153);
if(cb)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1155);
cb.setAttribute("aria-label", val);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1157);
return val;
        }
    },

    /**
     * Sets the aria description for the chart.
     *
     * @attribute ariaDescription
     * @type String
     */
    ariaDescription: {
        value: "Use the up and down keys to navigate between series. Use the left and right keys to navigate through items in a series.",

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1170);
_yuitest_coverline("build/charts-base/charts-base.js", 1172);
if(this._description)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1174);
this._description.setContent("");
                _yuitest_coverline("build/charts-base/charts-base.js", 1175);
this._description.appendChild(DOCUMENT.createTextNode(val));
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1177);
return val;
        }
    },

    /**
     * Reference to the default tooltip available for the chart.
     * <p>Contains the following properties:</p>
     *  <dl>
     *      <dt>node</dt><dd>Reference to the actual dom node</dd>
     *      <dt>showEvent</dt><dd>Event that should trigger the tooltip</dd>
     *      <dt>hideEvent</dt><dd>Event that should trigger the removal of a tooltip (can be an event or an array of events)</dd>
     *      <dt>styles</dt><dd>A hash of style properties that will be applied to the tooltip node</dd>
     *      <dt>show</dt><dd>Indicates whether or not to show the tooltip</dd>
     *      <dt>markerEventHandler</dt><dd>Displays and hides tooltip based on marker events</dd>
     *      <dt>planarEventHandler</dt><dd>Displays and hides tooltip based on planar events</dd>
     *      <dt>markerLabelFunction</dt><dd>Reference to the function used to format a marker event triggered tooltip's text.
     *      The method contains the following arguments:
     *  <dl>
     *      <dt>categoryItem</dt><dd>An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>
     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided).</dd>
     *      <dt>key</dt><dd>The key of the category.</dd>
     *      <dt>value</dt><dd>The value of the category.</dd>
     *  </dl>
     *  </dd>
     *  <dt>valueItem</dt><dd>An object containing the following:
     *      <dl>
     *          <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>
     *          <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *          <dt>key</dt><dd>The key for the series.</dd>
     *          <dt>value</dt><dd>The value for the series item.</dd>
     *      </dl>
     *  </dd>
     *  <dt>itemIndex</dt><dd>The index of the item within the series.</dd>
     *  <dt>series</dt><dd> The `CartesianSeries` instance of the item.</dd>
     *  <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>
     *  </dl>
     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose
     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.
     *  </dd>
     *  <dt>planarLabelFunction</dt><dd>Reference to the function used to format a planar event triggered tooltip's text
     *  <dl>
     *      <dt>categoryAxis</dt><dd> `CategoryAxis` Reference to the categoryAxis of the chart.
     *      <dt>valueItems</dt><dd>Array of objects for each series that has a data point in the coordinate plane of the event. Each
     *      object contains the following data:
     *  <dl>
     *      <dt>axis</dt><dd>The value axis of the series.</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *  </dl>
     *  </dd>
     *      <dt>index</dt><dd>The index of the item within its series.</dd>
     *      <dt>seriesArray</dt><dd>Array of series instances for each value item.</dd>
     *      <dt>seriesIndex</dt><dd>The index of the series in the `seriesCollection`.</dd>
     *  </dl>
     *  </dd>
     *  </dl>
     *  The method returns an `HTMLElement` which is written into the DOM using `appendChild`. If you override this method and choose
     *  to return an html string, you will also need to override the tooltip's `setTextFunction` method to accept an html string.
     *  </dd>
     *  <dt>setTextFunction</dt><dd>Method that writes content returned from `planarLabelFunction` or `markerLabelFunction` into the
     *  the tooltip node. Has the following signature:
     *  <dl>
     *      <dt>label</dt><dd>The `HTMLElement` that the content is to be added.</dd>
     *      <dt>val</dt><dd>The content to be rendered into tooltip. This can be a `String` or `HTMLElement`. If an HTML string is used,
     *      it will be rendered as a string.</dd>
     *  </dl>
     *  </dd>
     *  </dl>
     * @attribute tooltip
     * @type Object
     */
    tooltip: {
        valueFn: "_getTooltip",

        setter: function(val)
        {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 1254);
_yuitest_coverline("build/charts-base/charts-base.js", 1256);
return this._updateTooltip(val);
        }
    },

    /**
     * The key value used for the chart's category axis.
     *
     * @attribute categoryKey
     * @type String
     * @default category
     */
    categoryKey: {
        value: "category"
    },

    /**
     * Indicates the type of axis to use for the category axis.
     *
     *  <dl>
     *      <dt>category</dt><dd>Specifies a `CategoryAxis`.</dd>
     *      <dt>time</dt><dd>Specifies a `TimeAxis</dd>
     *  </dl>
     *
     * @attribute categoryType
     * @type String
     * @default category
     */
    categoryType:{
        value:"category"
    },

    /**
     * Indicates the the type of interactions that will fire events.
     *
     *  <dl>
     *      <dt>marker</dt><dd>Events will be broadcasted when the mouse interacts with individual markers.</dd>
     *      <dt>planar</dt><dd>Events will be broadcasted when the mouse intersects the plane of any markers on the chart.</dd>
     *      <dt>none</dt><dd>No events will be broadcasted.</dd>
     *  </dl>
     *
     * @attribute interactionType
     * @type String
     * @default marker
     */
    interactionType: {
        value: "marker"
    },

    /**
     * Reference to all the axes in the chart.
     *
     * @attribute axesCollection
     * @type Array
     */
    axesCollection: {},

    /**
     * Reference to graph instance.
     *
     * @attribute graph
     * @type Graph
     */
    graph: {
        valueFn: "_getGraph"
    },

    /**
     * Indicates whether or not markers for a series will be grouped and rendered in a single complex shape instance.
     *
     * @attribute groupMarkers
     * @type Boolean
     */
    groupMarkers: {
        value: false
    }
};

_yuitest_coverline("build/charts-base/charts-base.js", 1333);
ChartBase.prototype = {

    /**
     * Utility method to determine if `seriesKeys` was explicitly provided
     * (for example during construction, or set by the user), as opposed to
     * being derived from the dataProvider for example.
     *
     * @method _wereSeriesKeysExplicitlySet
     * @private
     * @return boolean true if the `seriesKeys` attribute was explicitly set.
     */
    _wereSeriesKeysExplicitlySet : function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_wereSeriesKeysExplicitlySet", 1344);
_yuitest_coverline("build/charts-base/charts-base.js", 1346);
var seriesKeys = this.get("seriesKeys");
        _yuitest_coverline("build/charts-base/charts-base.js", 1347);
return seriesKeys && this._seriesKeysExplicitlySet;
    },

    /**
     * Handles groupMarkers change event.
     *
     * @method _groupMarkersChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _groupMarkersChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_groupMarkersChangeHandler", 1357);
_yuitest_coverline("build/charts-base/charts-base.js", 1359);
var graph = this.get("graph"),
            useGroupMarkers = e.newVal;
        _yuitest_coverline("build/charts-base/charts-base.js", 1361);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1363);
graph.set("groupMarkers", useGroupMarkers);
        }
    },

    /**
     * Handler for itemRendered event.
     *
     * @method _itemRendered
     * @param {Object} e Event object.
     * @private
     */
    _itemRendered: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_itemRendered", 1374);
_yuitest_coverline("build/charts-base/charts-base.js", 1376);
this._itemRenderQueue = this._itemRenderQueue.splice(1 + Y.Array.indexOf(this._itemRenderQueue, e.currentTarget), 1);
        _yuitest_coverline("build/charts-base/charts-base.js", 1377);
if(this._itemRenderQueue.length < 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1379);
this._redraw();
        }
    },

    /**
     * Default value function for the `Graph` attribute.
     *
     * @method _getGraph
     * @return Graph
     * @private
     */
    _getGraph: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getGraph", 1390);
_yuitest_coverline("build/charts-base/charts-base.js", 1392);
var graph = new Y.Graph({
            chart:this,
            groupMarkers: this.get("groupMarkers")
        });
        _yuitest_coverline("build/charts-base/charts-base.js", 1396);
graph.after("chartRendered", Y.bind(function() {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 2)", 1396);
_yuitest_coverline("build/charts-base/charts-base.js", 1397);
this.fire("chartRendered");
        }, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 1399);
return graph;
    },

    /**
     * Returns a series instance by index or key value.
     *
     * @method getSeries
     * @param val
     * @return CartesianSeries
     */
    getSeries: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeries", 1409);
_yuitest_coverline("build/charts-base/charts-base.js", 1411);
var series = null,
            graph = this.get("graph");
        _yuitest_coverline("build/charts-base/charts-base.js", 1413);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1415);
if(Y_Lang.isNumber(val))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1417);
series = graph.getSeriesByIndex(val);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1421);
series = graph.getSeriesByKey(val);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1424);
return series;
    },

    /**
     * Returns an `Axis` instance by key reference. If the axis was explicitly set through the `axes` attribute,
     * the key will be the same as the key used in the `axes` object. For default axes, the key for
     * the category axis is the value of the `categoryKey` (`category`). For the value axis, the default
     * key is `values`.
     *
     * @method getAxisByKey
     * @param {String} val Key reference used to look up the axis.
     * @return Axis
     */
    getAxisByKey: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getAxisByKey", 1437);
_yuitest_coverline("build/charts-base/charts-base.js", 1439);
var axis,
            axes = this.get("axes");
        _yuitest_coverline("build/charts-base/charts-base.js", 1441);
if(axes && axes.hasOwnProperty(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1443);
axis = axes[val];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1445);
return axis;
    },

    /**
     * Returns the category axis for the chart.
     *
     * @method getCategoryAxis
     * @return Axis
     */
    getCategoryAxis: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getCategoryAxis", 1454);
_yuitest_coverline("build/charts-base/charts-base.js", 1456);
var axis,
            key = this.get("categoryKey"),
            axes = this.get("axes");
        _yuitest_coverline("build/charts-base/charts-base.js", 1459);
if(axes.hasOwnProperty(key))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1461);
axis = axes[key];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1463);
return axis;
    },

    /**
     * Default direction of the chart.
     *
     * @property _direction
     * @type String
     * @default horizontal
     * @private
     */
    _direction: "horizontal",

    /**
     * Storage for the `dataProvider` attribute.
     *
     * @property _dataProvider
     * @type Array
     * @private
     */
    _dataProvider: null,

    /**
     * Setter method for `dataProvider` attribute.
     *
     * @method _setDataValues
     * @param {Array} val Array to be set as `dataProvider`.
     * @return Array
     * @private
     */
    _setDataValues: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setDataValues", 1493);
_yuitest_coverline("build/charts-base/charts-base.js", 1495);
if(Y_Lang.isArray(val[0]))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1497);
var hash,
                dp = [],
                cats = val[0],
                i = 0,
                l = cats.length,
                n,
                sl = val.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 1504);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1506);
hash = {category:cats[i]};
                _yuitest_coverline("build/charts-base/charts-base.js", 1507);
for(n = 1; n < sl; ++n)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1509);
hash["series" + n] = val[n][i];
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1511);
dp[i] = hash;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 1513);
return dp;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1515);
return val;
    },

    /**
     * Storage for `seriesCollection` attribute.
     *
     * @property _seriesCollection
     * @type Array
     * @private
     */
    _seriesCollection: null,

    /**
     * Setter method for `seriesCollection` attribute.
     *
     * @property _setSeriesCollection
     * @param {Array} val Array of either `CartesianSeries` instances or objects containing series attribute key value pairs.
     * @private
     */
    _setSeriesCollection: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setSeriesCollection", 1534);
_yuitest_coverline("build/charts-base/charts-base.js", 1536);
this._seriesCollection = val;
    },
    /**
     * Helper method that returns the axis class that a key references.
     *
     * @method _getAxisClass
     * @param {String} t The type of axis.
     * @return Axis
     * @private
     */
    _getAxisClass: function(t)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAxisClass", 1546);
_yuitest_coverline("build/charts-base/charts-base.js", 1548);
return this._axisClass[t];
    },

    /**
     * Key value pairs of axis types.
     *
     * @property _axisClass
     * @type Object
     * @private
     */
    _axisClass: {
        stacked: Y.StackedAxis,
        numeric: Y.NumericAxis,
        category: Y.CategoryAxis,
        time: Y.TimeAxis
    },

    /**
     * Collection of axes.
     *
     * @property _axes
     * @type Array
     * @private
     */
    _axes: null,

    /**
     * @method initializer
     * @private
     */
    initializer: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "initializer", 1578);
_yuitest_coverline("build/charts-base/charts-base.js", 1580);
this._itemRenderQueue = [];
        _yuitest_coverline("build/charts-base/charts-base.js", 1581);
this._seriesIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1582);
this._itemIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1583);
this.after("dataProviderChange", this._dataProviderChangeHandler);
    },

    /**
     * @method renderUI
     * @private
     */
    renderUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "renderUI", 1590);
_yuitest_coverline("build/charts-base/charts-base.js", 1592);
var tt = this.get("tooltip"),
            bb = this.get("boundingBox"),
            cb = this.get("contentBox");
        //move the position = absolute logic to a class file
        _yuitest_coverline("build/charts-base/charts-base.js", 1596);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 1597);
cb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 1598);
this._addAxes();
        _yuitest_coverline("build/charts-base/charts-base.js", 1599);
this._addSeries();
        _yuitest_coverline("build/charts-base/charts-base.js", 1600);
if(tt && tt.show)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1602);
this._addTooltip();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1604);
this._setAriaElements(bb, cb);
    },

    /**
     * Creates an aria `live-region`, `aria-label` and `aria-describedby` for the Chart.
     *
     * @method _setAriaElements
     * @param {Node} cb Reference to the Chart's `contentBox` attribute.
     * @private
     */
    _setAriaElements: function(bb, cb)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setAriaElements", 1614);
_yuitest_coverline("build/charts-base/charts-base.js", 1616);
var description = this._getAriaOffscreenNode(),
            id = this.get("id") + "_description",
            liveRegion = this._getAriaOffscreenNode();
        _yuitest_coverline("build/charts-base/charts-base.js", 1619);
cb.set("tabIndex", 0);
        _yuitest_coverline("build/charts-base/charts-base.js", 1620);
cb.set("role", "img");
        _yuitest_coverline("build/charts-base/charts-base.js", 1621);
cb.setAttribute("aria-label", this.get("ariaLabel"));
        _yuitest_coverline("build/charts-base/charts-base.js", 1622);
cb.setAttribute("aria-describedby", id);
        _yuitest_coverline("build/charts-base/charts-base.js", 1623);
description.set("id", id);
        _yuitest_coverline("build/charts-base/charts-base.js", 1624);
description.set("tabIndex", -1);
        _yuitest_coverline("build/charts-base/charts-base.js", 1625);
description.appendChild(DOCUMENT.createTextNode(this.get("ariaDescription")));
        _yuitest_coverline("build/charts-base/charts-base.js", 1626);
liveRegion.set("id", "live-region");
        _yuitest_coverline("build/charts-base/charts-base.js", 1627);
liveRegion.set("aria-live", "polite");
        _yuitest_coverline("build/charts-base/charts-base.js", 1628);
liveRegion.set("aria-atomic", "true");
        _yuitest_coverline("build/charts-base/charts-base.js", 1629);
liveRegion.set("role", "status");
        _yuitest_coverline("build/charts-base/charts-base.js", 1630);
bb.setAttribute("role", "application");
        _yuitest_coverline("build/charts-base/charts-base.js", 1631);
bb.appendChild(description);
        _yuitest_coverline("build/charts-base/charts-base.js", 1632);
bb.appendChild(liveRegion);
        _yuitest_coverline("build/charts-base/charts-base.js", 1633);
this._description = description;
        _yuitest_coverline("build/charts-base/charts-base.js", 1634);
this._liveRegion = liveRegion;
    },

    /**
     * Sets a node offscreen for use as aria-description or aria-live-regin.
     *
     * @method _setOffscreen
     * @return Node
     * @private
     */
    _getAriaOffscreenNode: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAriaOffscreenNode", 1644);
_yuitest_coverline("build/charts-base/charts-base.js", 1646);
var node = Y.Node.create("<div></div>"),
            ie = Y.UA.ie,
            clipRect = (ie && ie < 8) ? "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)";
        _yuitest_coverline("build/charts-base/charts-base.js", 1649);
node.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 1650);
node.setStyle("height", "1px");
        _yuitest_coverline("build/charts-base/charts-base.js", 1651);
node.setStyle("width", "1px");
        _yuitest_coverline("build/charts-base/charts-base.js", 1652);
node.setStyle("overflow", "hidden");
        _yuitest_coverline("build/charts-base/charts-base.js", 1653);
node.setStyle("clip", clipRect);
        _yuitest_coverline("build/charts-base/charts-base.js", 1654);
return node;
    },

    /**
     * @method syncUI
     * @private
     */
    syncUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "syncUI", 1661);
_yuitest_coverline("build/charts-base/charts-base.js", 1663);
this._redraw();
    },

    /**
     * @method bindUI
     * @private
     */
    bindUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "bindUI", 1670);
_yuitest_coverline("build/charts-base/charts-base.js", 1672);
this.after("tooltipChange", Y.bind(this._tooltipChangeHandler, this));
        _yuitest_coverline("build/charts-base/charts-base.js", 1673);
this.after("widthChange", this._sizeChanged);
        _yuitest_coverline("build/charts-base/charts-base.js", 1674);
this.after("heightChange", this._sizeChanged);
        _yuitest_coverline("build/charts-base/charts-base.js", 1675);
this.after("groupMarkersChange", this._groupMarkersChangeHandler);
        _yuitest_coverline("build/charts-base/charts-base.js", 1676);
var tt = this.get("tooltip"),
            hideEvent = "mouseout",
            showEvent = "mouseover",
            cb = this.get("contentBox"),
            interactionType = this.get("interactionType"),
            i = 0,
            len,
            markerClassName = "." + SERIES_MARKER,
            isTouch = ((WINDOW && ("ontouchstart" in WINDOW)) && !(Y.UA.chrome && Y.UA.chrome < 6));
        _yuitest_coverline("build/charts-base/charts-base.js", 1685);
Y.on("keydown", Y.bind(function(e) {
            _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 3)", 1685);
_yuitest_coverline("build/charts-base/charts-base.js", 1686);
var key = e.keyCode,
                numKey = parseFloat(key),
                msg;
            _yuitest_coverline("build/charts-base/charts-base.js", 1689);
if(numKey > 36 && numKey < 41)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1691);
e.halt();
                _yuitest_coverline("build/charts-base/charts-base.js", 1692);
msg = this._getAriaMessage(numKey);
                _yuitest_coverline("build/charts-base/charts-base.js", 1693);
this._liveRegion.setContent("");
                _yuitest_coverline("build/charts-base/charts-base.js", 1694);
this._liveRegion.appendChild(DOCUMENT.createTextNode(msg));
            }
        }, this), this.get("contentBox"));
        _yuitest_coverline("build/charts-base/charts-base.js", 1697);
if(interactionType === "marker")
        {
            //if touch capabilities, toggle tooltip on touchend. otherwise, the tooltip attribute's hideEvent/showEvent types.
            _yuitest_coverline("build/charts-base/charts-base.js", 1700);
hideEvent = tt.hideEvent;
            _yuitest_coverline("build/charts-base/charts-base.js", 1701);
showEvent = tt.showEvent;
            _yuitest_coverline("build/charts-base/charts-base.js", 1702);
if(isTouch)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1704);
Y.delegate("touchend", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                //hide active tooltip if the chart is touched
                _yuitest_coverline("build/charts-base/charts-base.js", 1706);
Y.on("touchend", Y.bind(function(e) {
                    //only halt the event if it originated from the chart
                    _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 4)", 1706);
_yuitest_coverline("build/charts-base/charts-base.js", 1708);
if(cb.contains(e.target))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1710);
e.halt(true);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 1712);
if(this._activeMarker)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1714);
this._activeMarker = null;
                        _yuitest_coverline("build/charts-base/charts-base.js", 1715);
this.hideTooltip(e);
                    }
                }, this));
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1721);
Y.delegate("mouseenter", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1722);
Y.delegate("mousedown", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1723);
Y.delegate("mouseup", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1724);
Y.delegate("mouseleave", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1725);
Y.delegate("click", Y.bind(this._markerEventDispatcher, this), cb, markerClassName);
                _yuitest_coverline("build/charts-base/charts-base.js", 1726);
Y.delegate("mousemove", Y.bind(this._positionTooltip, this), cb, markerClassName);
            }
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 1729);
if(interactionType === "planar")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1731);
if(isTouch)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1733);
this._overlay.on("touchend", Y.bind(this._planarEventDispatcher, this));
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1737);
this._overlay.on("mousemove", Y.bind(this._planarEventDispatcher, this));
                _yuitest_coverline("build/charts-base/charts-base.js", 1738);
this.on("mouseout", this.hideTooltip);
            }
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 1741);
if(tt)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1743);
this.on("markerEvent:touchend", Y.bind(function(e) {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "(anonymous 5)", 1743);
_yuitest_coverline("build/charts-base/charts-base.js", 1744);
var marker = e.series.get("markers")[e.index];
                _yuitest_coverline("build/charts-base/charts-base.js", 1745);
if(this._activeMarker && marker === this._activeMarker)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1747);
this._activeMarker = null;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1748);
this.hideTooltip(e);
                }
                else
                {

                    _yuitest_coverline("build/charts-base/charts-base.js", 1753);
this._activeMarker = marker;
                    _yuitest_coverline("build/charts-base/charts-base.js", 1754);
tt.markerEventHandler.apply(this, [e]);
                }
            }, this));
            _yuitest_coverline("build/charts-base/charts-base.js", 1757);
if(hideEvent && showEvent && hideEvent === showEvent)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1759);
this.on(interactionType + "Event:" + hideEvent, this.toggleTooltip);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1763);
if(showEvent)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1765);
this.on(interactionType + "Event:" + showEvent, tt[interactionType + "EventHandler"]);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 1767);
if(hideEvent)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1769);
if(Y_Lang.isArray(hideEvent))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1771);
len = hideEvent.length;
                        _yuitest_coverline("build/charts-base/charts-base.js", 1772);
for(; i < len; ++i)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 1774);
this.on(interactionType + "Event:" + hideEvent[i], this.hideTooltip);
                        }
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 1777);
this.on(interactionType + "Event:" + hideEvent, this.hideTooltip);
                }
            }
        }
    },

    /**
     * Event handler for marker events.
     *
     * @method _markerEventDispatcher
     * @param {Object} e Event object.
     * @private
     */
    _markerEventDispatcher: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_markerEventDispatcher", 1790);
_yuitest_coverline("build/charts-base/charts-base.js", 1792);
var type = e.type,
            cb = this.get("contentBox"),
            markerNode = e.currentTarget,
            strArr = markerNode.getAttribute("id").split("_"),
            index = strArr.pop(),
            seriesIndex = strArr.pop(),
            series = this.getSeries(parseInt(seriesIndex, 10)),
            items = this.getSeriesItems(series, index),
            isTouch = e && e.hasOwnProperty("changedTouches"),
            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,
            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,
            x = pageX - cb.getX(),
            y = pageY - cb.getY();
        _yuitest_coverline("build/charts-base/charts-base.js", 1805);
if(type === "mouseenter")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1807);
type = "mouseover";
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 1809);
if(type === "mouseleave")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1811);
type = "mouseout";
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 1813);
series.updateMarkerState(type, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 1814);
e.halt();
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseover event.
         *
         *
         * @event markerEvent:mouseover
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseout event.
         *
         * @event markerEvent:mouseout
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mousedown event.
         *
         * @event markerEvent:mousedown
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a mouseup event.
         *
         * @event markerEvent:mouseup
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *  </dl>
         */
        /**
         * Broadcasts when `interactionType` is set to `marker` and a series marker has received a click event.
         *
         * @event markerEvent:click
         * @preventable false
         * @param {EventFacade} e Event facade with the following additional
         *   properties:
         *  <dl>
         *      <dt>categoryItem</dt><dd>Hash containing information about the category `Axis`.</dd>
         *      <dt>valueItem</dt><dd>Hash containing information about the value `Axis`.</dd>
         *      <dt>node</dt><dd>The dom node of the marker.</dd>
         *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
         *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>
         *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>
         *      <dt>series</dt><dd>Reference to the series of the marker.</dd>
         *      <dt>index</dt><dd>Index of the marker in the series.</dd>
         *      <dt>seriesIndex</dt><dd>The `order` of the marker's series.</dd>
         *      <dt>originEvent</dt><dd>Underlying dom event.</dd>
         *  </dl>
         */
        _yuitest_coverline("build/charts-base/charts-base.js", 1909);
this.fire("markerEvent:" + type, {
            originEvent: e,
            pageX:pageX,
            pageY:pageY,
            categoryItem:items.category,
            valueItem:items.value,
            node:markerNode,
            x:x,
            y:y,
            series:series,
            index:index,
            seriesIndex:seriesIndex
        });
    },

    /**
     * Event handler for dataProviderChange.
     *
     * @method _dataProviderChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _dataProviderChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_dataProviderChangeHandler", 1931);
_yuitest_coverline("build/charts-base/charts-base.js", 1933);
var dataProvider = e.newVal,
            axes,
            i,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 1937);
this._seriesIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1938);
this._itemIndex = -1;
        _yuitest_coverline("build/charts-base/charts-base.js", 1939);
if(this instanceof Y.CartesianChart)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1941);
this.set("axes", this.get("axes"));
            _yuitest_coverline("build/charts-base/charts-base.js", 1942);
this.set("seriesCollection", this.get("seriesCollection"));
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 1944);
axes = this.get("axes");
        _yuitest_coverline("build/charts-base/charts-base.js", 1945);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1947);
for(i in axes)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 1949);
if(axes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 1951);
axis = axes[i];
                    _yuitest_coverline("build/charts-base/charts-base.js", 1952);
if(axis instanceof Y.Axis)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 1954);
if(axis.get("position") !== "none")
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 1956);
this._addToAxesRenderQueue(axis);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 1958);
axis.set("dataProvider", dataProvider);
                    }
                }
            }
        }
    },

    /**
     * Event listener for toggling the tooltip. If a tooltip is visible, hide it. If not, it
     * will create and show a tooltip based on the event object.
     *
     * @method toggleTooltip
     * @param {Object} e Event object.
     */
    toggleTooltip: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "toggleTooltip", 1972);
_yuitest_coverline("build/charts-base/charts-base.js", 1974);
var tt = this.get("tooltip");
        _yuitest_coverline("build/charts-base/charts-base.js", 1975);
if(tt.visible)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1977);
this.hideTooltip();
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 1981);
tt.markerEventHandler.apply(this, [e]);
        }
    },

    /**
     * Shows a tooltip
     *
     * @method _showTooltip
     * @param {String} msg Message to dispaly in the tooltip.
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @private
     */
    _showTooltip: function(msg, x, y)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_showTooltip", 1994);
_yuitest_coverline("build/charts-base/charts-base.js", 1996);
var tt = this.get("tooltip"),
            node = tt.node;
        _yuitest_coverline("build/charts-base/charts-base.js", 1998);
if(msg)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2000);
tt.visible = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 2001);
tt.setTextFunction(node, msg);
            _yuitest_coverline("build/charts-base/charts-base.js", 2002);
node.setStyle("top", y + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 2003);
node.setStyle("left", x + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 2004);
node.setStyle("visibility", "visible");
        }
    },

    /**
     * Positions the tooltip
     *
     * @method _positionTooltip
     * @param {Object} e Event object.
     * @private
     */
    _positionTooltip: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_positionTooltip", 2015);
_yuitest_coverline("build/charts-base/charts-base.js", 2017);
var tt = this.get("tooltip"),
            node = tt.node,
            cb = this.get("contentBox"),
            x = (e.pageX + 10) - cb.getX(),
            y = (e.pageY + 10) - cb.getY();
        _yuitest_coverline("build/charts-base/charts-base.js", 2022);
if(node)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2024);
node.setStyle("left", x + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 2025);
node.setStyle("top", y + "px");
        }
    },

    /**
     * Hides the default tooltip
     *
     * @method hideTooltip
     */
    hideTooltip: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "hideTooltip", 2034);
_yuitest_coverline("build/charts-base/charts-base.js", 2036);
var tt = this.get("tooltip"),
            node = tt.node;
        _yuitest_coverline("build/charts-base/charts-base.js", 2038);
tt.visible = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 2039);
node.set("innerHTML", "");
        _yuitest_coverline("build/charts-base/charts-base.js", 2040);
node.setStyle("left", -10000);
        _yuitest_coverline("build/charts-base/charts-base.js", 2041);
node.setStyle("top", -10000);
        _yuitest_coverline("build/charts-base/charts-base.js", 2042);
node.setStyle("visibility", "hidden");
    },

    /**
     * Adds a tooltip to the dom.
     *
     * @method _addTooltip
     * @private
     */
    _addTooltip: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addTooltip", 2051);
_yuitest_coverline("build/charts-base/charts-base.js", 2053);
var tt = this.get("tooltip"),
            id = this.get("id") + "_tooltip",
            cb = this.get("contentBox"),
            oldNode = DOCUMENT.getElementById(id);
        _yuitest_coverline("build/charts-base/charts-base.js", 2057);
if(oldNode)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2059);
cb.removeChild(oldNode);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2061);
tt.node.set("id", id);
        _yuitest_coverline("build/charts-base/charts-base.js", 2062);
tt.node.setStyle("visibility", "hidden");
        _yuitest_coverline("build/charts-base/charts-base.js", 2063);
cb.appendChild(tt.node);
    },

    /**
     * Updates the tooltip attribute.
     *
     * @method _updateTooltip
     * @param {Object} val Object containing properties for the tooltip.
     * @return Object
     * @private
     */
    _updateTooltip: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_updateTooltip", 2074);
_yuitest_coverline("build/charts-base/charts-base.js", 2076);
var tt = this.get("tooltip") || this._getTooltip(),
            i,
            styles,
            node,
            props = {
                markerLabelFunction:"markerLabelFunction",
                planarLabelFunction:"planarLabelFunction",
                setTextFunction:"setTextFunction",
                showEvent:"showEvent",
                hideEvent:"hideEvent",
                markerEventHandler:"markerEventHandler",
                planarEventHandler:"planarEventHandler",
                show:"show"
            };
        _yuitest_coverline("build/charts-base/charts-base.js", 2090);
if(Y_Lang.isObject(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2092);
styles = val.styles;
            _yuitest_coverline("build/charts-base/charts-base.js", 2093);
node = Y.one(val.node) || tt.node;
            _yuitest_coverline("build/charts-base/charts-base.js", 2094);
if(styles)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2096);
for(i in styles)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2098);
if(styles.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2100);
node.setStyle(i, styles[i]);
                    }
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2104);
for(i in props)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2106);
if(val.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2108);
tt[i] = val[i];
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2111);
tt.node = node;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2113);
return tt;
    },

    /**
     * Default getter for `tooltip` attribute.
     *
     * @method _getTooltip
     * @return Object
     * @private
     */
    _getTooltip: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getTooltip", 2123);
_yuitest_coverline("build/charts-base/charts-base.js", 2125);
var node = DOCUMENT.createElement("div"),
            tooltipClass = _getClassName("chart-tooltip"),
            tt = {
                setTextFunction: this._setText,
                markerLabelFunction: this._tooltipLabelFunction,
                planarLabelFunction: this._planarLabelFunction,
                show: true,
                hideEvent: "mouseout",
                showEvent: "mouseover",
                markerEventHandler: function(e)
                {
                    _yuitest_coverfunc("build/charts-base/charts-base.js", "markerEventHandler", 2134);
_yuitest_coverline("build/charts-base/charts-base.js", 2136);
var tt = this.get("tooltip"),
                    msg = tt.markerLabelFunction.apply(this, [e.categoryItem, e.valueItem, e.index, e.series, e.seriesIndex]);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2138);
this._showTooltip(msg, e.x + 10, e.y + 10);
                },
                planarEventHandler: function(e)
                {
                    _yuitest_coverfunc("build/charts-base/charts-base.js", "planarEventHandler", 2140);
_yuitest_coverline("build/charts-base/charts-base.js", 2142);
var tt = this.get("tooltip"),
                        msg ,
                        categoryAxis = this.get("categoryAxis");
                    _yuitest_coverline("build/charts-base/charts-base.js", 2145);
msg = tt.planarLabelFunction.apply(this, [categoryAxis, e.valueItem, e.index, e.items, e.seriesIndex]);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2146);
this._showTooltip(msg, e.x + 10, e.y + 10);
                }
            };
        _yuitest_coverline("build/charts-base/charts-base.js", 2149);
node = Y.one(node);
        _yuitest_coverline("build/charts-base/charts-base.js", 2150);
node.set("id", this.get("id") + "_tooltip");
        _yuitest_coverline("build/charts-base/charts-base.js", 2151);
node.setStyle("fontSize", "85%");
        _yuitest_coverline("build/charts-base/charts-base.js", 2152);
node.setStyle("opacity", "0.83");
        _yuitest_coverline("build/charts-base/charts-base.js", 2153);
node.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 2154);
node.setStyle("paddingTop", "2px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2155);
node.setStyle("paddingRight", "5px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2156);
node.setStyle("paddingBottom", "4px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2157);
node.setStyle("paddingLeft", "2px");
        _yuitest_coverline("build/charts-base/charts-base.js", 2158);
node.setStyle("backgroundColor", "#fff");
        _yuitest_coverline("build/charts-base/charts-base.js", 2159);
node.setStyle("border", "1px solid #dbdccc");
        _yuitest_coverline("build/charts-base/charts-base.js", 2160);
node.setStyle("pointerEvents", "none");
        _yuitest_coverline("build/charts-base/charts-base.js", 2161);
node.setStyle("zIndex", 3);
        _yuitest_coverline("build/charts-base/charts-base.js", 2162);
node.setStyle("whiteSpace", "noWrap");
        _yuitest_coverline("build/charts-base/charts-base.js", 2163);
node.setStyle("visibility", "hidden");
        _yuitest_coverline("build/charts-base/charts-base.js", 2164);
node.addClass(tooltipClass);
        _yuitest_coverline("build/charts-base/charts-base.js", 2165);
tt.node = Y.one(node);
        _yuitest_coverline("build/charts-base/charts-base.js", 2166);
return tt;
    },

    /**
     * Formats tooltip text when `interactionType` is `planar`.
     *
     * @method _planarLabelFunction
     * @param {Axis} categoryAxis Reference to the categoryAxis of the chart.
     * @param {Array} valueItems Array of objects for each series that has a data point in the coordinate plane of the event.
     * Each object contains the following data:
     *  <dl>
     *      <dt>axis</dt><dd>The value axis of the series.</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *  </dl>
     *  @param {Number} index The index of the item within its series.
     *  @param {Array} seriesArray Array of series instances for each value item.
     *  @param {Number} seriesIndex The index of the series in the `seriesCollection`.
     *  @return {String | HTML}
     * @private
     */
    _planarLabelFunction: function(categoryAxis, valueItems, index, seriesArray)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_planarLabelFunction", 2188);
_yuitest_coverline("build/charts-base/charts-base.js", 2190);
var msg = DOCUMENT.createElement("div"),
            valueItem,
            i = 0,
            len = seriesArray.length,
            axis,
            categoryValue,
            seriesValue,
            series;
        _yuitest_coverline("build/charts-base/charts-base.js", 2198);
if(categoryAxis)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2200);
categoryValue = categoryAxis.get("labelFunction").apply(
                this,
                [categoryAxis.getKeyValueAt(this.get("categoryKey"), index), categoryAxis.get("labelFormat")]
            );
            _yuitest_coverline("build/charts-base/charts-base.js", 2204);
if(!Y_Lang.isObject(categoryValue))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2206);
categoryValue = DOCUMENT.createTextNode(categoryValue);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2208);
msg.appendChild(categoryValue);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 2211);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2213);
series = seriesArray[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 2214);
if(series.get("visible"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2216);
valueItem = valueItems[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 2217);
axis = valueItem.axis;
                _yuitest_coverline("build/charts-base/charts-base.js", 2218);
seriesValue =  axis.get("labelFunction").apply(
                    this,
                    [axis.getKeyValueAt(valueItem.key, index), axis.get("labelFormat")]
                );
                _yuitest_coverline("build/charts-base/charts-base.js", 2222);
msg.appendChild(DOCUMENT.createElement("br"));
                _yuitest_coverline("build/charts-base/charts-base.js", 2223);
msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));
                _yuitest_coverline("build/charts-base/charts-base.js", 2224);
msg.appendChild(DOCUMENT.createTextNode(": "));
                _yuitest_coverline("build/charts-base/charts-base.js", 2225);
if(!Y_Lang.isObject(seriesValue))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2227);
seriesValue = DOCUMENT.createTextNode(seriesValue);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2229);
msg.appendChild(seriesValue);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2232);
return msg;
    },

    /**
     * Formats tooltip text when `interactionType` is `marker`.
     *
     * @method _tooltipLabelFunction
     * @param {Object} categoryItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>
     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key of the category.</dd>
     *      <dt>value</dt><dd>The value of the category</dd>
     *  </dl>
     * @param {Object} valueItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *  </dl>
     * @return {String | HTML}
     * @private
     */
    _tooltipLabelFunction: function(categoryItem, valueItem)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_tooltipLabelFunction", 2256);
_yuitest_coverline("build/charts-base/charts-base.js", 2258);
var msg = DOCUMENT.createElement("div"),
            categoryValue = categoryItem.axis.get("labelFunction").apply(
                this,
                [categoryItem.value, categoryItem.axis.get("labelFormat")]
            ),
            seriesValue = valueItem.axis.get("labelFunction").apply(
                this,
                [valueItem.value, valueItem.axis.get("labelFormat")]
            );
        _yuitest_coverline("build/charts-base/charts-base.js", 2267);
msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName));
        _yuitest_coverline("build/charts-base/charts-base.js", 2268);
msg.appendChild(DOCUMENT.createTextNode(": "));
        _yuitest_coverline("build/charts-base/charts-base.js", 2269);
if(!Y_Lang.isObject(categoryValue))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2271);
categoryValue = DOCUMENT.createTextNode(categoryValue);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2273);
msg.appendChild(categoryValue);
        _yuitest_coverline("build/charts-base/charts-base.js", 2274);
msg.appendChild(DOCUMENT.createElement("br"));
        _yuitest_coverline("build/charts-base/charts-base.js", 2275);
msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName));
        _yuitest_coverline("build/charts-base/charts-base.js", 2276);
msg.appendChild(DOCUMENT.createTextNode(": "));
        _yuitest_coverline("build/charts-base/charts-base.js", 2277);
if(!Y_Lang.isObject(seriesValue))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2279);
seriesValue = DOCUMENT.createTextNode(seriesValue);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2281);
msg.appendChild(seriesValue);
        _yuitest_coverline("build/charts-base/charts-base.js", 2282);
return msg;
    },

    /**
     * Event handler for the tooltipChange.
     *
     * @method _tooltipChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _tooltipChangeHandler: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_tooltipChangeHandler", 2292);
_yuitest_coverline("build/charts-base/charts-base.js", 2294);
if(this.get("tooltip"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2296);
var tt = this.get("tooltip"),
                node = tt.node,
                show = tt.show,
                cb = this.get("contentBox");
            _yuitest_coverline("build/charts-base/charts-base.js", 2300);
if(node && show)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2302);
if(!cb.contains(node))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2304);
this._addTooltip();
                }
            }
        }
    },

    /**
     * Updates the content of text field. This method writes a value into a text field using
     * `appendChild`. If the value is a `String`, it is converted to a `TextNode` first.
     *
     * @method _setText
     * @param label {HTMLElement} label to be updated
     * @param val {String} value with which to update the label
     * @private
     */
    _setText: function(textField, val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setText", 2319);
_yuitest_coverline("build/charts-base/charts-base.js", 2321);
textField.setContent("");
        _yuitest_coverline("build/charts-base/charts-base.js", 2322);
if(Y_Lang.isNumber(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2324);
val = val + "";
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 2326);
if(!val)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2328);
val = "";
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 2330);
if(IS_STRING(val))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2332);
val = DOCUMENT.createTextNode(val);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2334);
textField.appendChild(val);
    },

    /**
     * Returns all the keys contained in a  `dataProvider`.
     *
     * @method _getAllKeys
     * @param {Array} dp Collection of objects to be parsed.
     * @return Object
     */
    _getAllKeys: function(dp)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAllKeys", 2344);
_yuitest_coverline("build/charts-base/charts-base.js", 2346);
var i = 0,
            len = dp.length,
            item,
            key,
            keys = {};
        _yuitest_coverline("build/charts-base/charts-base.js", 2351);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2353);
item = dp[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 2354);
for(key in item)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2356);
if(item.hasOwnProperty(key))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2358);
keys[key] = true;
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2362);
return keys;
    },

    /**
     * Constructs seriesKeys if not explicitly specified.
     *
     * @method _buildSeriesKeys
     * @param {Array} dataProvider The dataProvider for the chart.
     * @return Array
     * @private
     */
    _buildSeriesKeys: function(dataProvider)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_buildSeriesKeys", 2373);
_yuitest_coverline("build/charts-base/charts-base.js", 2375);
var allKeys,
            catKey = this.get("categoryKey"),
            keys = [],
            i;
        _yuitest_coverline("build/charts-base/charts-base.js", 2379);
if(this._seriesKeysExplicitlySet)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2381);
return this._seriesKeys;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2383);
allKeys = this._getAllKeys(dataProvider);
        _yuitest_coverline("build/charts-base/charts-base.js", 2384);
for(i in allKeys)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2386);
if(allKeys.hasOwnProperty(i) && i !== catKey)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2388);
keys.push(i);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2391);
return keys;
    }
};
_yuitest_coverline("build/charts-base/charts-base.js", 2394);
Y.ChartBase = ChartBase;
/**
 * The CartesianChart class creates a chart with horizontal and vertical axes.
 *
 * @class CartesianChart
 * @extends ChartBase
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 2403);
Y.CartesianChart = Y.Base.create("cartesianChart", Y.Widget, [Y.ChartBase, Y.Renderer], {
    /**
     * @method renderUI
     * @private
     */
    renderUI: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "renderUI", 2408);
_yuitest_coverline("build/charts-base/charts-base.js", 2410);
var bb = this.get("boundingBox"),
            cb = this.get("contentBox"),
            tt = this.get("tooltip"),
            overlay,
            overlayClass = _getClassName("overlay");
        //move the position = absolute logic to a class file
        _yuitest_coverline("build/charts-base/charts-base.js", 2416);
bb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 2417);
cb.setStyle("position", "absolute");
        _yuitest_coverline("build/charts-base/charts-base.js", 2418);
this._addAxes();
        _yuitest_coverline("build/charts-base/charts-base.js", 2419);
this._addGridlines();
        _yuitest_coverline("build/charts-base/charts-base.js", 2420);
this._addSeries();
        _yuitest_coverline("build/charts-base/charts-base.js", 2421);
if(tt && tt.show)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2423);
this._addTooltip();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2425);
if(this.get("interactionType") === "planar")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2427);
overlay = DOCUMENT.createElement("div");
            _yuitest_coverline("build/charts-base/charts-base.js", 2428);
this.get("contentBox").appendChild(overlay);
            _yuitest_coverline("build/charts-base/charts-base.js", 2429);
this._overlay = Y.one(overlay);
            _yuitest_coverline("build/charts-base/charts-base.js", 2430);
this._overlay.set("id", this.get("id") + "_overlay");
            _yuitest_coverline("build/charts-base/charts-base.js", 2431);
this._overlay.setStyle("position", "absolute");
            _yuitest_coverline("build/charts-base/charts-base.js", 2432);
this._overlay.setStyle("background", "#fff");
            _yuitest_coverline("build/charts-base/charts-base.js", 2433);
this._overlay.setStyle("opacity", 0);
            _yuitest_coverline("build/charts-base/charts-base.js", 2434);
this._overlay.addClass(overlayClass);
            _yuitest_coverline("build/charts-base/charts-base.js", 2435);
this._overlay.setStyle("zIndex", 4);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2437);
this._setAriaElements(bb, cb);
        _yuitest_coverline("build/charts-base/charts-base.js", 2438);
this._redraw();
    },

    /**
     * When `interactionType` is set to `planar`, listens for mouse move events and fires `planarEvent:mouseover` or `planarEvent:mouseout`
     * depending on the position of the mouse in relation to data points on the `Chart`.
     *
     * @method _planarEventDispatcher
     * @param {Object} e Event object.
     * @private
     */
    _planarEventDispatcher: function(e)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_planarEventDispatcher", 2449);
_yuitest_coverline("build/charts-base/charts-base.js", 2451);
var graph = this.get("graph"),
            bb = this.get("boundingBox"),
            cb = graph.get("contentBox"),
            isTouch = e && e.hasOwnProperty("changedTouches"),
            pageX = isTouch ? e.changedTouches[0].pageX : e.pageX,
            pageY = isTouch ? e.changedTouches[0].pageY : e.pageY,
            posX = pageX - bb.getX(),
            posY = pageY - bb.getY(),
            offset = {
                x: pageX - cb.getX(),
                y: pageY - cb.getY()
            },
            sc = graph.get("seriesCollection"),
            series,
            i = 0,
            index,
            oldIndex = this._selectedIndex,
            item,
            items = [],
            categoryItems = [],
            valueItems = [],
            direction = this.get("direction"),
            hasMarkers,
            catAxis,
            valAxis,
            coord,
            //data columns and area data could be created on a graph level
            markerPlane,
            len,
            coords;
        _yuitest_coverline("build/charts-base/charts-base.js", 2481);
e.halt(true);
        _yuitest_coverline("build/charts-base/charts-base.js", 2482);
if(direction === "horizontal")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2484);
catAxis = "x";
            _yuitest_coverline("build/charts-base/charts-base.js", 2485);
valAxis = "y";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2489);
valAxis = "x";
            _yuitest_coverline("build/charts-base/charts-base.js", 2490);
catAxis = "y";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2492);
coord = offset[catAxis];
        _yuitest_coverline("build/charts-base/charts-base.js", 2493);
if(sc)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2495);
len = sc.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 2496);
while(i < len && !markerPlane)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2498);
if(sc[i])
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2500);
markerPlane = sc[i].get(catAxis + "MarkerPlane");
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2502);
i++;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2505);
if(markerPlane)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2507);
len = markerPlane.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 2508);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2510);
if(coord <= markerPlane[i].end && coord >= markerPlane[i].start)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2512);
index = i;
                    _yuitest_coverline("build/charts-base/charts-base.js", 2513);
break;
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2516);
len = sc.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 2517);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2519);
series = sc[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 2520);
coords = series.get(valAxis + "coords");
                _yuitest_coverline("build/charts-base/charts-base.js", 2521);
hasMarkers = series.get("markers");
                _yuitest_coverline("build/charts-base/charts-base.js", 2522);
if(hasMarkers && !isNaN(oldIndex) && oldIndex > -1)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2524);
series.updateMarkerState("mouseout", oldIndex);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2526);
if(coords && coords[index] > -1)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2528);
if(hasMarkers && !isNaN(index) && index > -1)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2530);
series.updateMarkerState("mouseover", index);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 2532);
item = this.getSeriesItems(series, index);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2533);
categoryItems.push(item.category);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2534);
valueItems.push(item.value);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2535);
items.push(series);
                }

            }
            _yuitest_coverline("build/charts-base/charts-base.js", 2539);
this._selectedIndex = index;

            /**
             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseover event.
             *
             *
             * @event planarEvent:mouseover
             * @preventable false
             * @param {EventFacade} e Event facade with the following additional
             *   properties:
             *  <dl>
             *      <dt>categoryItem</dt><dd>An array of hashes, each containing information about the category `Axis` of each marker
             *      whose plane has been intersected.</dd>
             *      <dt>valueItem</dt><dd>An array of hashes, each containing information about the value `Axis` of each marker whose
             *      plane has been intersected.</dd>
             *      <dt>x</dt><dd>The x-coordinate of the mouse in relation to the Chart.</dd>
             *      <dt>y</dt><dd>The y-coordinate of the mouse in relation to the Chart.</dd>
             *      <dt>pageX</dt><dd>The x location of the event on the page (including scroll)</dd>
             *      <dt>pageY</dt><dd>The y location of the event on the page (including scroll)</dd>
             *      <dt>items</dt><dd>An array including all the series which contain a marker whose plane has been intersected.</dd>
             *      <dt>index</dt><dd>Index of the markers in their respective series.</dd>
             *      <dt>originEvent</dt><dd>Underlying dom event.</dd>
             *  </dl>
             */
            /**
             * Broadcasts when `interactionType` is set to `planar` and a series' marker plane has received a mouseout event.
             *
             * @event planarEvent:mouseout
             * @preventable false
             * @param {EventFacade} e
             */
            _yuitest_coverline("build/charts-base/charts-base.js", 2570);
if(index > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2572);
this.fire("planarEvent:mouseover", {
                    categoryItem:categoryItems,
                    valueItem:valueItems,
                    x:posX,
                    y:posY,
                    pageX:pageX,
                    pageY:pageY,
                    items:items,
                    index:index,
                    originEvent:e
                });
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2586);
this.fire("planarEvent:mouseout");
            }
        }
    },

    /**
     * Indicates the default series type for the chart.
     *
     * @property _type
     * @type {String}
     * @private
     */
    _type: "combo",

    /**
     * Queue of axes instances that will be updated. This method is used internally to determine when all axes have been updated.
     *
     * @property _itemRenderQueue
     * @type Array
     * @private
     */
    _itemRenderQueue: null,

    /**
     * Adds an `Axis` instance to the `_itemRenderQueue`.
     *
     * @method _addToAxesRenderQueue
     * @param {Axis} axis An `Axis` instance.
     * @private
     */
    _addToAxesRenderQueue: function(axis)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addToAxesRenderQueue", 2616);
_yuitest_coverline("build/charts-base/charts-base.js", 2618);
if(!this._itemRenderQueue)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2620);
this._itemRenderQueue = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2622);
if(Y.Array.indexOf(this._itemRenderQueue, axis) < 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2624);
this._itemRenderQueue.push(axis);
        }
    },

    /**
     * Adds axis instance to the appropriate array based on position
     *
     * @method _addToAxesCollection
     * @param {String} position The position of the axis
     * @param {Axis} axis The `Axis` instance
     */
    _addToAxesCollection: function(position, axis)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addToAxesCollection", 2635);
_yuitest_coverline("build/charts-base/charts-base.js", 2637);
var axesCollection = this.get(position + "AxesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 2638);
if(!axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2640);
axesCollection = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 2641);
this.set(position + "AxesCollection", axesCollection);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2643);
axesCollection.push(axis);
    },

    /**
     * Returns the default value for the `seriesCollection` attribute.
     *
     * @method _getDefaultSeriesCollection
     * @param {Array} val Array containing either `CartesianSeries` instances or objects containing data to construct series instances.
     * @return Array
     * @private
     */
    _getDefaultSeriesCollection: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultSeriesCollection", 2654);
_yuitest_coverline("build/charts-base/charts-base.js", 2656);
var seriesCollection,
            dataProvider = this.get("dataProvider");
        _yuitest_coverline("build/charts-base/charts-base.js", 2658);
if(dataProvider)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2660);
seriesCollection = this._parseSeriesCollection();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2662);
return seriesCollection;
    },

    /**
     * Parses and returns a series collection from an object and default properties.
     *
     * @method _parseSeriesCollection
     * @param {Object} val Object contain properties for series being set.
     * @return Object
     * @private
     */
    _parseSeriesCollection: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesCollection", 2673);
_yuitest_coverline("build/charts-base/charts-base.js", 2675);
var dir = this.get("direction"),
            seriesStyles = this.get("styles").series,
            stylesAreArray = seriesStyles && Y_Lang.isArray(seriesStyles),
            stylesIndex,
            setStyles,
            globalStyles,
            sc = [],
            catAxis,
            valAxis,
            tempKeys = [],
            series,
            seriesKeys = this.get("seriesKeys").concat(),
            i,
            index,
            l,
            type = this.get("type"),
            key,
            catKey,
            seriesKey,
            graph,
            orphans = [],
            categoryKey = this.get("categoryKey"),
            showMarkers = this.get("showMarkers"),
            showAreaFill = this.get("showAreaFill"),
            showLines = this.get("showLines");
        _yuitest_coverline("build/charts-base/charts-base.js", 2700);
val = val ? val.concat() : [];
        _yuitest_coverline("build/charts-base/charts-base.js", 2701);
if(dir === "vertical")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2703);
catAxis = "yAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2704);
catKey = "yKey";
            _yuitest_coverline("build/charts-base/charts-base.js", 2705);
valAxis = "xAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2706);
seriesKey = "xKey";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2710);
catAxis = "xAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2711);
catKey = "xKey";
            _yuitest_coverline("build/charts-base/charts-base.js", 2712);
valAxis = "yAxis";
            _yuitest_coverline("build/charts-base/charts-base.js", 2713);
seriesKey = "yKey";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2715);
l = val.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 2716);
while(val && val.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2718);
series = val.shift();
            _yuitest_coverline("build/charts-base/charts-base.js", 2719);
key = this._getBaseAttribute(series, seriesKey);
            _yuitest_coverline("build/charts-base/charts-base.js", 2720);
if(key)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2722);
index = Y.Array.indexOf(seriesKeys, key);
                _yuitest_coverline("build/charts-base/charts-base.js", 2723);
if(index > -1)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2725);
seriesKeys.splice(index, 1);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2726);
tempKeys.push(key);
                    _yuitest_coverline("build/charts-base/charts-base.js", 2727);
sc.push(series);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2731);
orphans.push(series);
                }
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2736);
orphans.push(series);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2739);
while(orphans.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2741);
series = orphans.shift();
            _yuitest_coverline("build/charts-base/charts-base.js", 2742);
if(seriesKeys.length > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2744);
key = seriesKeys.shift();
                _yuitest_coverline("build/charts-base/charts-base.js", 2745);
this._setBaseAttribute(series, seriesKey, key);
                _yuitest_coverline("build/charts-base/charts-base.js", 2746);
tempKeys.push(key);
                _yuitest_coverline("build/charts-base/charts-base.js", 2747);
sc.push(series);
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 2749);
if(series instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2751);
series.destroy(true);
            }}
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2754);
if(seriesKeys.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2756);
tempKeys = tempKeys.concat(seriesKeys);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2758);
l = tempKeys.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 2759);
for(i = 0; i < l; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2761);
series = sc[i] || {type:type};
            _yuitest_coverline("build/charts-base/charts-base.js", 2762);
if(series instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2764);
this._parseSeriesAxes(series);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2768);
series[catKey] = series[catKey] || categoryKey;
                _yuitest_coverline("build/charts-base/charts-base.js", 2769);
series[seriesKey] = series[seriesKey] || seriesKeys.shift();
                _yuitest_coverline("build/charts-base/charts-base.js", 2770);
series[catAxis] = this._getCategoryAxis();
                _yuitest_coverline("build/charts-base/charts-base.js", 2771);
series[valAxis] = this._getSeriesAxis(series[seriesKey]);

                _yuitest_coverline("build/charts-base/charts-base.js", 2773);
series.type = series.type || type;
                _yuitest_coverline("build/charts-base/charts-base.js", 2774);
series.direction = series.direction || dir;

                _yuitest_coverline("build/charts-base/charts-base.js", 2776);
if(series.type === "combo" ||
                    series.type === "stackedcombo" ||
                    series.type === "combospline" ||
                    series.type === "stackedcombospline")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2781);
if(showAreaFill !== null)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2783);
series.showAreaFill = (series.showAreaFill !== null && series.showAreaFill !== undefined) ?
                                               series.showAreaFill : showAreaFill;
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 2786);
if(showMarkers !== null)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2788);
series.showMarkers = (series.showMarkers !== null && series.showMarkers !== undefined) ? series.showMarkers : showMarkers;
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 2790);
if(showLines !== null)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2792);
series.showLines = (series.showLines !== null && series.showLines !== undefined) ? series.showLines : showLines;
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2795);
if(seriesStyles)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2797);
stylesIndex = stylesAreArray ? i : series[seriesKey];
                    _yuitest_coverline("build/charts-base/charts-base.js", 2798);
globalStyles = seriesStyles[stylesIndex];
                    _yuitest_coverline("build/charts-base/charts-base.js", 2799);
if(globalStyles)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2801);
setStyles = series.styles;
                        _yuitest_coverline("build/charts-base/charts-base.js", 2802);
if(setStyles)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 2804);
series.styles = this._mergeStyles(setStyles, globalStyles);
                        }
                        else
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 2808);
series.styles = globalStyles;
                        }
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 2812);
sc[i] = series;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2815);
if(sc)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2817);
graph = this.get("graph");
            _yuitest_coverline("build/charts-base/charts-base.js", 2818);
graph.set("seriesCollection", sc);
            _yuitest_coverline("build/charts-base/charts-base.js", 2819);
sc = graph.get("seriesCollection");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2821);
return sc;
    },

    /**
     * Parse and sets the axes for a series instance.
     *
     * @method _parseSeriesAxes
     * @param {CartesianSeries} series A `CartesianSeries` instance.
     * @private
     */
    _parseSeriesAxes: function(series)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesAxes", 2831);
_yuitest_coverline("build/charts-base/charts-base.js", 2833);
var axes = this.get("axes"),
            xAxis = series.get("xAxis"),
            yAxis = series.get("yAxis"),
            YAxis = Y.Axis,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 2838);
if(xAxis && !(xAxis instanceof YAxis) && Y_Lang.isString(xAxis) && axes.hasOwnProperty(xAxis))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2840);
axis = axes[xAxis];
            _yuitest_coverline("build/charts-base/charts-base.js", 2841);
if(axis instanceof YAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2843);
series.set("xAxis", axis);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2846);
if(yAxis && !(yAxis instanceof YAxis) && Y_Lang.isString(yAxis) && axes.hasOwnProperty(yAxis))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2848);
axis = axes[yAxis];
            _yuitest_coverline("build/charts-base/charts-base.js", 2849);
if(axis instanceof YAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2851);
series.set("yAxis", axis);
            }
        }

    },

    /**
     * Returns the category axis instance for the chart.
     *
     * @method _getCategoryAxis
     * @return Axis
     * @private
     */
    _getCategoryAxis: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getCategoryAxis", 2864);
_yuitest_coverline("build/charts-base/charts-base.js", 2866);
var axis,
            axes = this.get("axes"),
            categoryAxisName = this.get("categoryAxisName") || this.get("categoryKey");
        _yuitest_coverline("build/charts-base/charts-base.js", 2869);
axis = axes[categoryAxisName];
        _yuitest_coverline("build/charts-base/charts-base.js", 2870);
return axis;
    },

    /**
     * Returns the value axis for a series.
     *
     * @method _getSeriesAxis
     * @param {String} key The key value used to determine the axis instance.
     * @return Axis
     * @private
     */
    _getSeriesAxis:function(key, axisName)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getSeriesAxis", 2881);
_yuitest_coverline("build/charts-base/charts-base.js", 2883);
var axes = this.get("axes"),
            i,
            keys,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 2887);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2889);
if(axisName && axes.hasOwnProperty(axisName))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2891);
axis = axes[axisName];
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 2895);
for(i in axes)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 2897);
if(axes.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 2899);
keys = axes[i].get("keys");
                        _yuitest_coverline("build/charts-base/charts-base.js", 2900);
if(keys && keys.hasOwnProperty(key))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 2902);
axis = axes[i];
                            _yuitest_coverline("build/charts-base/charts-base.js", 2903);
break;
                        }
                    }
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2909);
return axis;
    },

    /**
     * Gets an attribute from an object, using a getter for Base objects and a property for object
     * literals. Used for determining attributes from series/axis references which can be an actual class instance
     * or a hash of properties that will be used to create a class instance.
     *
     * @method _getBaseAttribute
     * @param {Object} item Object or instance in which the attribute resides.
     * @param {String} key Attribute whose value will be returned.
     * @return Object
     * @private
     */
    _getBaseAttribute: function(item, key)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getBaseAttribute", 2923);
_yuitest_coverline("build/charts-base/charts-base.js", 2925);
if(item instanceof Y.Base)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2927);
return item.get(key);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2929);
if(item.hasOwnProperty(key))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2931);
return item[key];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 2933);
return null;
    },

    /**
     * Sets an attribute on an object, using a setter of Base objects and a property for object
     * literals. Used for setting attributes on a Base class, either directly or to be stored in an object literal
     * for use at instantiation.
     *
     * @method _setBaseAttribute
     * @param {Object} item Object or instance in which the attribute resides.
     * @param {String} key Attribute whose value will be assigned.
     * @param {Object} value Value to be assigned to the attribute.
     * @private
     */
    _setBaseAttribute: function(item, key, value)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setBaseAttribute", 2947);
_yuitest_coverline("build/charts-base/charts-base.js", 2949);
if(item instanceof Y.Base)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2951);
item.set(key, value);
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 2955);
item[key] = value;
        }
    },

    /**
     * Creates `Axis` instances.
     *
     * @method _setAxes
     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.
     * @return Object
     * @private
     */
    _setAxes: function(val)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_setAxes", 2967);
_yuitest_coverline("build/charts-base/charts-base.js", 2969);
var hash = this._parseAxes(val),
            axes = {},
            axesAttrs = {
                edgeOffset: "edgeOffset",
                calculateEdgeOffset: "calculateEdgeOffset",
                position: "position",
                overlapGraph:"overlapGraph",
                labelValues: "labelValues",
                hideFirstMajorUnit: "hideFirstMajorUnit",
                hideLastMajorUnit: "hideLastMajorUnit",
                labelFunction:"labelFunction",
                labelFunctionScope:"labelFunctionScope",
                labelFormat:"labelFormat",
                appendLabelFunction: "appendLabelFunction",
                appendTitleFunction: "appendTitleFunction",
                maximum:"maximum",
                minimum:"minimum",
                roundingMethod:"roundingMethod",
                alwaysShowZero:"alwaysShowZero",
                title:"title",
                width:"width",
                height:"height"
            },
            dp = this.get("dataProvider"),
            ai,
            i,
            pos,
            axis,
            axisPosition,
            dh,
            AxisClass,
            config,
            axesCollection;
        _yuitest_coverline("build/charts-base/charts-base.js", 3002);
for(i in hash)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3004);
if(hash.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3006);
dh = hash[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3007);
if(dh instanceof Y.Axis)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3009);
axis = dh;
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3013);
axis = null;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3014);
config = {};
                    _yuitest_coverline("build/charts-base/charts-base.js", 3015);
config.dataProvider = dh.dataProvider || dp;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3016);
config.keys = dh.keys;

                    _yuitest_coverline("build/charts-base/charts-base.js", 3018);
if(dh.hasOwnProperty("roundingUnit"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3020);
config.roundingUnit = dh.roundingUnit;
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3022);
pos = dh.position;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3023);
if(dh.styles)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3025);
config.styles = dh.styles;
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3027);
config.position = dh.position;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3028);
for(ai in axesAttrs)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3030);
if(axesAttrs.hasOwnProperty(ai) && dh.hasOwnProperty(ai))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3032);
config[ai] = dh[ai];
                        }
                    }

                    //only check for existing axis if we constructed the default axes already
                    _yuitest_coverline("build/charts-base/charts-base.js", 3037);
if(val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3039);
axis = this.getAxisByKey(i);
                    }

                    _yuitest_coverline("build/charts-base/charts-base.js", 3042);
if(axis && axis instanceof Y.Axis)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3044);
axisPosition = axis.get("position");
                        _yuitest_coverline("build/charts-base/charts-base.js", 3045);
if(pos !== axisPosition)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3047);
if(axisPosition !== "none")
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 3049);
axesCollection = this.get(axisPosition + "AxesCollection");
                                _yuitest_coverline("build/charts-base/charts-base.js", 3050);
axesCollection.splice(Y.Array.indexOf(axesCollection, axis), 1);
                            }
                            _yuitest_coverline("build/charts-base/charts-base.js", 3052);
if(pos !== "none")
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 3054);
this._addToAxesCollection(pos, axis);
                            }
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3057);
axis.setAttrs(config);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3061);
AxisClass = this._getAxisClass(dh.type);
                        _yuitest_coverline("build/charts-base/charts-base.js", 3062);
axis = new AxisClass(config);
                        _yuitest_coverline("build/charts-base/charts-base.js", 3063);
axis.after("axisRendered", Y.bind(this._itemRendered, this));
                    }
                }

                _yuitest_coverline("build/charts-base/charts-base.js", 3067);
if(axis)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3069);
axesCollection = this.get(pos + "AxesCollection");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3070);
if(axesCollection && Y.Array.indexOf(axesCollection, axis) > 0)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3072);
axis.set("overlapGraph", false);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3074);
axes[i] = axis;
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3078);
return axes;
    },

    /**
     * Adds axes to the chart.
     *
     * @method _addAxes
     * @private
     */
    _addAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addAxes", 3087);
_yuitest_coverline("build/charts-base/charts-base.js", 3089);
var axes = this.get("axes"),
            i,
            axis,
            pos,
            w = this.get("width"),
            h = this.get("height"),
            node = Y.Node.one(this._parentNode);
        _yuitest_coverline("build/charts-base/charts-base.js", 3096);
if(!this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3098);
this._axesCollection = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3100);
for(i in axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3102);
if(axes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3104);
axis = axes[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3105);
if(axis instanceof Y.Axis)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3107);
if(!w)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3109);
this.set("width", node.get("offsetWidth"));
                        _yuitest_coverline("build/charts-base/charts-base.js", 3110);
w = this.get("width");
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3112);
if(!h)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3114);
this.set("height", node.get("offsetHeight"));
                        _yuitest_coverline("build/charts-base/charts-base.js", 3115);
h = this.get("height");
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3117);
this._addToAxesRenderQueue(axis);
                    _yuitest_coverline("build/charts-base/charts-base.js", 3118);
pos = axis.get("position");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3119);
if(!this.get(pos + "AxesCollection"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3121);
this.set(pos + "AxesCollection", [axis]);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3125);
this.get(pos + "AxesCollection").push(axis);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3127);
this._axesCollection.push(axis);
                    _yuitest_coverline("build/charts-base/charts-base.js", 3128);
if(axis.get("keys").hasOwnProperty(this.get("categoryKey")))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3130);
this.set("categoryAxis", axis);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 3132);
axis.render(this.get("contentBox"));
                }
            }
        }
    },

    /**
     * Renders the Graph.
     *
     * @method _addSeries
     * @private
     */
    _addSeries: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addSeries", 3144);
_yuitest_coverline("build/charts-base/charts-base.js", 3146);
var graph = this.get("graph");
        _yuitest_coverline("build/charts-base/charts-base.js", 3147);
graph.render(this.get("contentBox"));

    },

    /**
     * Adds gridlines to the chart.
     *
     * @method _addGridlines
     * @private
     */
    _addGridlines: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addGridlines", 3157);
_yuitest_coverline("build/charts-base/charts-base.js", 3159);
var graph = this.get("graph"),
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines"),
            direction = this.get("direction"),
            leftAxesCollection = this.get("leftAxesCollection"),
            rightAxesCollection = this.get("rightAxesCollection"),
            bottomAxesCollection = this.get("bottomAxesCollection"),
            topAxesCollection = this.get("topAxesCollection"),
            seriesAxesCollection,
            catAxis = this.get("categoryAxis"),
            hAxis,
            vAxis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3171);
if(this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3173);
seriesAxesCollection = this._axesCollection.concat();
            _yuitest_coverline("build/charts-base/charts-base.js", 3174);
seriesAxesCollection.splice(Y.Array.indexOf(seriesAxesCollection, catAxis), 1);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3176);
if(hgl)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3178);
if(leftAxesCollection && leftAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3180);
hAxis = leftAxesCollection[0];
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 3182);
if(rightAxesCollection && rightAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3184);
hAxis = rightAxesCollection[0];
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3188);
hAxis = direction === "horizontal" ? catAxis : seriesAxesCollection[0];
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 3190);
if(!this._getBaseAttribute(hgl, "axis") && hAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3192);
this._setBaseAttribute(hgl, "axis", hAxis);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3194);
if(this._getBaseAttribute(hgl, "axis"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3196);
graph.set("horizontalGridlines", hgl);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3199);
if(vgl)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3201);
if(bottomAxesCollection && bottomAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3203);
vAxis = bottomAxesCollection[0];
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 3205);
if (topAxesCollection && topAxesCollection[0])
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3207);
vAxis = topAxesCollection[0];
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3211);
vAxis = direction === "vertical" ? catAxis : seriesAxesCollection[0];
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 3213);
if(!this._getBaseAttribute(vgl, "axis") && vAxis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3215);
this._setBaseAttribute(vgl, "axis", vAxis);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3217);
if(this._getBaseAttribute(vgl, "axis"))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3219);
graph.set("verticalGridlines", vgl);
            }
        }
    },

    /**
     * Default Function for the axes attribute.
     *
     * @method _getDefaultAxes
     * @return Object
     * @private
     */
    _getDefaultAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultAxes", 3231);
_yuitest_coverline("build/charts-base/charts-base.js", 3233);
var axes;
        _yuitest_coverline("build/charts-base/charts-base.js", 3234);
if(this.get("dataProvider"))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3236);
axes = this._parseAxes();
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3238);
return axes;
    },

    /**
     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.
     *
     * @method _parseAxes
     * @param {Object} axes Object containing `Axis` instances or `Axis` attributes.
     * @return Object
     * @private
     */
    _parseAxes: function(axes)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseAxes", 3249);
_yuitest_coverline("build/charts-base/charts-base.js", 3251);
var catKey = this.get("categoryKey"),
            axis,
            attr,
            keys,
            newAxes = {},
            claimedKeys = [],
            newKeys = [],
            categoryAxisName = this.get("categoryAxisName") || this.get("categoryKey"),
            valueAxisName = this.get("valueAxisName"),
            seriesKeys = this.get("seriesKeys").concat(),
            i,
            l,
            ii,
            ll,
            cIndex,
            direction = this.get("direction"),
            seriesPosition,
            categoryPosition,
            valueAxes = [],
            seriesAxis = this.get("stacked") ? "stacked" : "numeric";
        _yuitest_coverline("build/charts-base/charts-base.js", 3271);
if(direction === "vertical")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3273);
seriesPosition = "bottom";
            _yuitest_coverline("build/charts-base/charts-base.js", 3274);
categoryPosition = "left";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3278);
seriesPosition = "left";
            _yuitest_coverline("build/charts-base/charts-base.js", 3279);
categoryPosition = "bottom";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3281);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3283);
for(i in axes)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3285);
if(axes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3287);
axis = axes[i];
                    _yuitest_coverline("build/charts-base/charts-base.js", 3288);
keys = this._getBaseAttribute(axis, "keys");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3289);
attr = this._getBaseAttribute(axis, "type");
                    _yuitest_coverline("build/charts-base/charts-base.js", 3290);
if(attr === "time" || attr === "category")
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3292);
categoryAxisName = i;
                        _yuitest_coverline("build/charts-base/charts-base.js", 3293);
this.set("categoryAxisName", i);
                        _yuitest_coverline("build/charts-base/charts-base.js", 3294);
if(Y_Lang.isArray(keys) && keys.length > 0)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3296);
catKey = keys[0];
                            _yuitest_coverline("build/charts-base/charts-base.js", 3297);
this.set("categoryKey", catKey);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3299);
newAxes[i] = axis;
                    }
                    else {_yuitest_coverline("build/charts-base/charts-base.js", 3301);
if(i === categoryAxisName)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3303);
newAxes[i] = axis;
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3307);
newAxes[i] = axis;
                        _yuitest_coverline("build/charts-base/charts-base.js", 3308);
if(i !== valueAxisName && keys && Y_Lang.isArray(keys))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3310);
ll = keys.length;
                            _yuitest_coverline("build/charts-base/charts-base.js", 3311);
for(ii = 0; ii < ll; ++ii)
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 3313);
claimedKeys.push(keys[ii]);
                            }
                            _yuitest_coverline("build/charts-base/charts-base.js", 3315);
valueAxes.push(newAxes[i]);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3317);
if(!(this._getBaseAttribute(newAxes[i], "type")))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3319);
this._setBaseAttribute(newAxes[i], "type", seriesAxis);
                        }
                        _yuitest_coverline("build/charts-base/charts-base.js", 3321);
if(!(this._getBaseAttribute(newAxes[i], "position")))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 3323);
this._setBaseAttribute(
                                newAxes[i],
                                "position",
                                this._getDefaultAxisPosition(newAxes[i], valueAxes, seriesPosition)
                            );
                        }
                    }}
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3333);
cIndex = Y.Array.indexOf(seriesKeys, catKey);
        _yuitest_coverline("build/charts-base/charts-base.js", 3334);
if(cIndex > -1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3336);
seriesKeys.splice(cIndex, 1);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3338);
l = seriesKeys.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 3339);
for(i = 0; i < l; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3341);
cIndex = Y.Array.indexOf(claimedKeys, seriesKeys[i]);
            _yuitest_coverline("build/charts-base/charts-base.js", 3342);
if(cIndex > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3344);
newKeys = newKeys.concat(claimedKeys.splice(cIndex, 1));
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3347);
claimedKeys = newKeys.concat(claimedKeys);
        _yuitest_coverline("build/charts-base/charts-base.js", 3348);
l = claimedKeys.length;
        _yuitest_coverline("build/charts-base/charts-base.js", 3349);
for(i = 0; i < l; i = i + 1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3351);
cIndex = Y.Array.indexOf(seriesKeys, claimedKeys[i]);
            _yuitest_coverline("build/charts-base/charts-base.js", 3352);
if(cIndex > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3354);
seriesKeys.splice(cIndex, 1);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3357);
if(!newAxes.hasOwnProperty(categoryAxisName))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3359);
newAxes[categoryAxisName] = {};
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3361);
if(!(this._getBaseAttribute(newAxes[categoryAxisName], "keys")))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3363);
this._setBaseAttribute(newAxes[categoryAxisName], "keys", [catKey]);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3366);
if(!(this._getBaseAttribute(newAxes[categoryAxisName], "position")))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3368);
this._setBaseAttribute(newAxes[categoryAxisName], "position", categoryPosition);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3371);
if(!(this._getBaseAttribute(newAxes[categoryAxisName], "type")))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3373);
this._setBaseAttribute(newAxes[categoryAxisName], "type", this.get("categoryType"));
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3375);
if(!newAxes.hasOwnProperty(valueAxisName) && seriesKeys && seriesKeys.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3377);
newAxes[valueAxisName] = {keys:seriesKeys};
            _yuitest_coverline("build/charts-base/charts-base.js", 3378);
valueAxes.push(newAxes[valueAxisName]);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3380);
if(claimedKeys.length > 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3382);
if(seriesKeys.length > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3384);
seriesKeys = claimedKeys.concat(seriesKeys);
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3388);
seriesKeys = claimedKeys;
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3391);
if(newAxes.hasOwnProperty(valueAxisName))
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3393);
if(!(this._getBaseAttribute(newAxes[valueAxisName], "position")))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3395);
this._setBaseAttribute(
                    newAxes[valueAxisName],
                    "position",
                    this._getDefaultAxisPosition(newAxes[valueAxisName], valueAxes, seriesPosition)
                );
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3401);
this._setBaseAttribute(newAxes[valueAxisName], "type", seriesAxis);
            _yuitest_coverline("build/charts-base/charts-base.js", 3402);
this._setBaseAttribute(newAxes[valueAxisName], "keys", seriesKeys);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3404);
if(!this._wereSeriesKeysExplicitlySet())
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3406);
this.set("seriesKeys", seriesKeys, {src: "internal"});
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3408);
return newAxes;
    },

    /**
     * Determines the position of an axis when one is not specified.
     *
     * @method _getDefaultAxisPosition
     * @param {Axis} axis `Axis` instance.
     * @param {Array} valueAxes Array of `Axis` instances.
     * @param {String} position Default position depending on the direction of the chart and type of axis.
     * @return String
     * @private
     */
    _getDefaultAxisPosition: function(axis, valueAxes, position)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultAxisPosition", 3421);
_yuitest_coverline("build/charts-base/charts-base.js", 3423);
var direction = this.get("direction"),
            i = Y.Array.indexOf(valueAxes, axis);

        _yuitest_coverline("build/charts-base/charts-base.js", 3426);
if(valueAxes[i - 1] && valueAxes[i - 1].position)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3428);
if(direction === "horizontal")
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3430);
if(valueAxes[i - 1].position === "left")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3432);
position = "right";
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 3434);
if(valueAxes[i - 1].position === "right")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3436);
position = "left";
                }}
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3441);
if (valueAxes[i -1].position === "bottom")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3443);
position = "top";
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3447);
position = "bottom";
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3451);
return position;
    },


    /**
     * Returns an object literal containing a categoryItem and a valueItem for a given series index. Below is the structure of each:
     *
     * @method getSeriesItems
     * @param {CartesianSeries} series Reference to a series.
     * @param {Number} index Index of the specified item within a series.
     * @return Object An object literal containing the following:
     *
     *  <dl>
     *      <dt>categoryItem</dt><dd>Object containing the following data related to the category axis of the series.
     *  <dl>
     *      <dt>axis</dt><dd>Reference to the category axis of the series.</dd>
     *      <dt>key</dt><dd>Category key for the series.</dd>
     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>
     *  </dl>
     *      </dd>
     *      <dt>valueItem</dt><dd>Object containing the following data related to the category axis of the series.
     *  <dl>
     *      <dt>axis</dt><dd>Reference to the value axis of the series.</dd>
     *      <dt>key</dt><dd>Value key for the series.</dd>
     *      <dt>value</dt><dd>Value on the axis corresponding to the series index.</dd>
     *  </dl>
     *      </dd>
     *  </dl>
     */
    getSeriesItems: function(series, index)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesItems", 3480);
_yuitest_coverline("build/charts-base/charts-base.js", 3482);
var xAxis = series.get("xAxis"),
            yAxis = series.get("yAxis"),
            xKey = series.get("xKey"),
            yKey = series.get("yKey"),
            categoryItem,
            valueItem;
        _yuitest_coverline("build/charts-base/charts-base.js", 3488);
if(this.get("direction") === "vertical")
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3490);
categoryItem = {
                axis:yAxis,
                key:yKey,
                value:yAxis.getKeyValueAt(yKey, index)
            };
            _yuitest_coverline("build/charts-base/charts-base.js", 3495);
valueItem = {
                axis:xAxis,
                key:xKey,
                value: xAxis.getKeyValueAt(xKey, index)
            };
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3503);
valueItem = {
                axis:yAxis,
                key:yKey,
                value:yAxis.getKeyValueAt(yKey, index)
            };
            _yuitest_coverline("build/charts-base/charts-base.js", 3508);
categoryItem = {
                axis:xAxis,
                key:xKey,
                value: xAxis.getKeyValueAt(xKey, index)
            };
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3514);
categoryItem.displayName = series.get("categoryDisplayName");
        _yuitest_coverline("build/charts-base/charts-base.js", 3515);
valueItem.displayName = series.get("valueDisplayName");
        _yuitest_coverline("build/charts-base/charts-base.js", 3516);
categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 3517);
valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 3518);
return {category:categoryItem, value:valueItem};
    },

    /**
     * Handler for sizeChanged event.
     *
     * @method _sizeChanged
     * @param {Object} e Event object.
     * @private
     */
    _sizeChanged: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_sizeChanged", 3528);
_yuitest_coverline("build/charts-base/charts-base.js", 3530);
if(this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3532);
var ac = this._axesCollection,
                i = 0,
                l = ac.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3535);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3537);
this._addToAxesRenderQueue(ac[i]);
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3539);
this._redraw();
        }
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the top bounds of all vertical axes.
     *
     * @method _getTopOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} width Width of the axes
     * @return Number
     * @private
     */
    _getTopOverflow: function(set1, set2, height)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getTopOverflow", 3553);
_yuitest_coverline("build/charts-base/charts-base.js", 3555);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3559);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3561);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3562);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3564);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3565);
overflow = Math.max(
                    overflow,
                    Math.abs(axis.getMaxLabelBounds().top) - axis.getEdgeOffset(axis.get("styles").majorTicks.count, height)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3571);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3573);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3574);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3575);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3577);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3578);
overflow = Math.max(
                    overflow,
                    Math.abs(axis.getMaxLabelBounds().top) - axis.getEdgeOffset(axis.get("styles").majorTicks.count, height)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3584);
return overflow;
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the right bounds of all horizontal axes.
     *
     * @method _getRightOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} width Width of the axes
     * @return Number
     * @private
     */
    _getRightOverflow: function(set1, set2, width)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getRightOverflow", 3597);
_yuitest_coverline("build/charts-base/charts-base.js", 3599);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3603);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3605);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3606);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3608);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3609);
overflow = Math.max(
                    overflow,
                    axis.getMaxLabelBounds().right - axis.getEdgeOffset(axis.get("styles").majorTicks.count, width)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3615);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3617);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3618);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3619);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3621);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3622);
overflow = Math.max(
                    overflow,
                    axis.getMaxLabelBounds().right - axis.getEdgeOffset(axis.get("styles").majorTicks.count, width)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3628);
return overflow;
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the left bounds of all horizontal axes.
     *
     * @method _getLeftOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} width Width of the axes
     * @return Number
     * @private
     */
    _getLeftOverflow: function(set1, set2, width)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getLeftOverflow", 3641);
_yuitest_coverline("build/charts-base/charts-base.js", 3643);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3647);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3649);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3650);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3652);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3653);
overflow = Math.max(
                    overflow,
                    Math.abs(axis.getMinLabelBounds().left) - axis.getEdgeOffset(axis.get("styles").majorTicks.count, width)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3659);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3661);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3662);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3663);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3665);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3666);
overflow = Math.max(
                    overflow,
                    Math.abs(axis.getMinLabelBounds().left) - axis.getEdgeOffset(axis.get("styles").majorTicks.count, width)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3672);
return overflow;
    },

    /**
     * Returns the maximum distance in pixels that the extends outside the bottom bounds of all vertical axes.
     *
     * @method _getBottomOverflow
     * @param {Array} set1 Collection of axes to check.
     * @param {Array} set2 Seconf collection of axes to check.
     * @param {Number} height Height of the axes
     * @return Number
     * @private
     */
    _getBottomOverflow: function(set1, set2, height)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getBottomOverflow", 3685);
_yuitest_coverline("build/charts-base/charts-base.js", 3687);
var i = 0,
            len,
            overflow = 0,
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 3691);
if(set1)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3693);
len = set1.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3694);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3696);
axis = set1[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3697);
overflow = Math.max(
                    overflow,
                    axis.getMinLabelBounds().bottom - axis.getEdgeOffset(axis.get("styles").majorTicks.count, height)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3703);
if(set2)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3705);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3706);
len = set2.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3707);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3709);
axis = set2[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3710);
overflow = Math.max(
                    overflow,
                    axis.getMinLabelBounds().bottom - axis.getEdgeOffset(axis.get("styles").majorTicks.count, height)
                );
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3716);
return overflow;
    },

    /**
     * Redraws and position all the components of the chart instance.
     *
     * @method _redraw
     * @private
     */
    _redraw: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_redraw", 3725);
_yuitest_coverline("build/charts-base/charts-base.js", 3727);
if(this._drawing)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3729);
this._callLater = true;
            _yuitest_coverline("build/charts-base/charts-base.js", 3730);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3732);
this._drawing = true;
        _yuitest_coverline("build/charts-base/charts-base.js", 3733);
this._callLater = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 3734);
var w = this.get("width"),
            h = this.get("height"),
            leftPaneWidth = 0,
            rightPaneWidth = 0,
            topPaneHeight = 0,
            bottomPaneHeight = 0,
            leftAxesCollection = this.get("leftAxesCollection"),
            rightAxesCollection = this.get("rightAxesCollection"),
            topAxesCollection = this.get("topAxesCollection"),
            bottomAxesCollection = this.get("bottomAxesCollection"),
            i = 0,
            l,
            axis,
            graphOverflow = "visible",
            graph = this.get("graph"),
            topOverflow,
            bottomOverflow,
            leftOverflow,
            rightOverflow,
            graphWidth,
            graphHeight,
            graphX,
            graphY,
            allowContentOverflow = this.get("allowContentOverflow"),
            diff,
            rightAxesXCoords,
            leftAxesXCoords,
            topAxesYCoords,
            bottomAxesYCoords,
            graphRect = {};
        _yuitest_coverline("build/charts-base/charts-base.js", 3764);
if(leftAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3766);
leftAxesXCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3767);
l = leftAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3768);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3770);
leftAxesXCoords.unshift(leftPaneWidth);
                _yuitest_coverline("build/charts-base/charts-base.js", 3771);
leftPaneWidth += leftAxesCollection[i].get("width");
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3774);
if(rightAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3776);
rightAxesXCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3777);
l = rightAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3778);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3779);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3781);
rightPaneWidth += rightAxesCollection[i].get("width");
                _yuitest_coverline("build/charts-base/charts-base.js", 3782);
rightAxesXCoords.unshift(w - rightPaneWidth);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3785);
if(topAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3787);
topAxesYCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3788);
l = topAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3789);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3791);
topAxesYCoords.unshift(topPaneHeight);
                _yuitest_coverline("build/charts-base/charts-base.js", 3792);
topPaneHeight += topAxesCollection[i].get("height");
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3795);
if(bottomAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3797);
bottomAxesYCoords = [];
            _yuitest_coverline("build/charts-base/charts-base.js", 3798);
l = bottomAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3799);
for(i = l - 1; i > -1; --i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3801);
bottomPaneHeight += bottomAxesCollection[i].get("height");
                _yuitest_coverline("build/charts-base/charts-base.js", 3802);
bottomAxesYCoords.unshift(h - bottomPaneHeight);
            }
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3806);
graphWidth = w - (leftPaneWidth + rightPaneWidth);
        _yuitest_coverline("build/charts-base/charts-base.js", 3807);
graphHeight = h - (bottomPaneHeight + topPaneHeight);
        _yuitest_coverline("build/charts-base/charts-base.js", 3808);
graphRect.left = leftPaneWidth;
        _yuitest_coverline("build/charts-base/charts-base.js", 3809);
graphRect.top = topPaneHeight;
        _yuitest_coverline("build/charts-base/charts-base.js", 3810);
graphRect.bottom = h - bottomPaneHeight;
        _yuitest_coverline("build/charts-base/charts-base.js", 3811);
graphRect.right = w - rightPaneWidth;
        _yuitest_coverline("build/charts-base/charts-base.js", 3812);
if(!allowContentOverflow)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3814);
topOverflow = this._getTopOverflow(leftAxesCollection, rightAxesCollection);
            _yuitest_coverline("build/charts-base/charts-base.js", 3815);
bottomOverflow = this._getBottomOverflow(leftAxesCollection, rightAxesCollection);
            _yuitest_coverline("build/charts-base/charts-base.js", 3816);
leftOverflow = this._getLeftOverflow(bottomAxesCollection, topAxesCollection);
            _yuitest_coverline("build/charts-base/charts-base.js", 3817);
rightOverflow = this._getRightOverflow(bottomAxesCollection, topAxesCollection);

            _yuitest_coverline("build/charts-base/charts-base.js", 3819);
diff = topOverflow - topPaneHeight;
            _yuitest_coverline("build/charts-base/charts-base.js", 3820);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3822);
graphRect.top = topOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3823);
if(topAxesYCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3825);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3826);
l = topAxesYCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3827);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3829);
topAxesYCoords[i] += diff;
                    }
                }
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 3834);
diff = bottomOverflow - bottomPaneHeight;
            _yuitest_coverline("build/charts-base/charts-base.js", 3835);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3837);
graphRect.bottom = h - bottomOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3838);
if(bottomAxesYCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3840);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3841);
l = bottomAxesYCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3842);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3844);
bottomAxesYCoords[i] -= diff;
                    }
                }
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 3849);
diff = leftOverflow - leftPaneWidth;
            _yuitest_coverline("build/charts-base/charts-base.js", 3850);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3852);
graphRect.left = leftOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3853);
if(leftAxesXCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3855);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3856);
l = leftAxesXCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3857);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3859);
leftAxesXCoords[i] += diff;
                    }
                }
            }

            _yuitest_coverline("build/charts-base/charts-base.js", 3864);
diff = rightOverflow - rightPaneWidth;
            _yuitest_coverline("build/charts-base/charts-base.js", 3865);
if(diff > 0)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3867);
graphRect.right = w - rightOverflow;
                _yuitest_coverline("build/charts-base/charts-base.js", 3868);
if(rightAxesXCoords)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3870);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3871);
l = rightAxesXCoords.length;
                    _yuitest_coverline("build/charts-base/charts-base.js", 3872);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 3874);
rightAxesXCoords[i] -= diff;
                    }
                }
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3879);
graphWidth = graphRect.right - graphRect.left;
        _yuitest_coverline("build/charts-base/charts-base.js", 3880);
graphHeight = graphRect.bottom - graphRect.top;
        _yuitest_coverline("build/charts-base/charts-base.js", 3881);
graphX = graphRect.left;
        _yuitest_coverline("build/charts-base/charts-base.js", 3882);
graphY = graphRect.top;
        _yuitest_coverline("build/charts-base/charts-base.js", 3883);
if(topAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3885);
l = topAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3886);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3887);
for(; i < l; i++)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3889);
axis = topAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3890);
if(axis.get("width") !== graphWidth)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3892);
axis.set("width", graphWidth);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 3894);
axis.get("boundingBox").setStyle("left", graphX + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3895);
axis.get("boundingBox").setStyle("top", topAxesYCoords[i] + "px");
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3897);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3899);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3902);
if(bottomAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3904);
l = bottomAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3905);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3906);
for(; i < l; i++)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3908);
axis = bottomAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3909);
if(axis.get("width") !== graphWidth)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3911);
axis.set("width", graphWidth);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 3913);
axis.get("boundingBox").setStyle("left", graphX + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3914);
axis.get("boundingBox").setStyle("top", bottomAxesYCoords[i] + "px");
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3916);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3918);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3921);
if(leftAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3923);
l = leftAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3924);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3925);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3927);
axis = leftAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3928);
axis.get("boundingBox").setStyle("top", graphY + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3929);
axis.get("boundingBox").setStyle("left", leftAxesXCoords[i] + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3930);
if(axis.get("height") !== graphHeight)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3932);
axis.set("height", graphHeight);
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3935);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3937);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3940);
if(rightAxesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3942);
l = rightAxesCollection.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 3943);
i = 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 3944);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3946);
axis = rightAxesCollection[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 3947);
axis.get("boundingBox").setStyle("top", graphY + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3948);
axis.get("boundingBox").setStyle("left", rightAxesXCoords[i] + "px");
                _yuitest_coverline("build/charts-base/charts-base.js", 3949);
if(axis.get("height") !== graphHeight)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 3951);
axis.set("height", graphHeight);
                }
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 3954);
if(axis._hasDataOverflow())
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 3956);
graphOverflow = "hidden";
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3959);
this._drawing = false;
        _yuitest_coverline("build/charts-base/charts-base.js", 3960);
if(this._callLater)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3962);
this._redraw();
            _yuitest_coverline("build/charts-base/charts-base.js", 3963);
return;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 3965);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3967);
graph.get("boundingBox").setStyle("left", graphX + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3968);
graph.get("boundingBox").setStyle("top", graphY + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3969);
graph.set("width", graphWidth);
            _yuitest_coverline("build/charts-base/charts-base.js", 3970);
graph.set("height", graphHeight);
            _yuitest_coverline("build/charts-base/charts-base.js", 3971);
graph.get("boundingBox").setStyle("overflow", graphOverflow);
        }

        _yuitest_coverline("build/charts-base/charts-base.js", 3974);
if(this._overlay)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 3976);
this._overlay.setStyle("left", graphX + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3977);
this._overlay.setStyle("top", graphY + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3978);
this._overlay.setStyle("width", graphWidth + "px");
            _yuitest_coverline("build/charts-base/charts-base.js", 3979);
this._overlay.setStyle("height", graphHeight + "px");
        }
    },

    /**
     * Destructor implementation for the CartesianChart class. Calls destroy on all axes, series and the Graph instance.
     * Removes the tooltip and overlay HTML elements.
     *
     * @method destructor
     * @protected
     */
    destructor: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "destructor", 3990);
_yuitest_coverline("build/charts-base/charts-base.js", 3992);
var graph = this.get("graph"),
            i = 0,
            len,
            seriesCollection = this.get("seriesCollection"),
            axesCollection = this._axesCollection,
            tooltip = this.get("tooltip").node;
        _yuitest_coverline("build/charts-base/charts-base.js", 3998);
if(this._description)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4000);
this._description.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 4001);
this._description.remove(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4003);
if(this._liveRegion)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4005);
this._liveRegion.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 4006);
this._liveRegion.remove(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4008);
len = seriesCollection ? seriesCollection.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 4009);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4011);
if(seriesCollection[i] instanceof Y.CartesianSeries)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4013);
seriesCollection[i].destroy(true);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4016);
len = axesCollection ? axesCollection.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 4017);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4019);
if(axesCollection[i] instanceof Y.Axis)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4021);
axesCollection[i].destroy(true);
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4024);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4026);
graph.destroy(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4028);
if(tooltip)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4030);
tooltip.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 4031);
tooltip.remove(true);
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4033);
if(this._overlay)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4035);
this._overlay.empty();
            _yuitest_coverline("build/charts-base/charts-base.js", 4036);
this._overlay.remove(true);
        }
    },

    /**
     * Returns the appropriate message based on the key press.
     *
     * @method _getAriaMessage
     * @param {Number} key The keycode that was pressed.
     * @return String
     */
    _getAriaMessage: function(key)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAriaMessage", 4047);
_yuitest_coverline("build/charts-base/charts-base.js", 4049);
var msg = "",
            series,
            items,
            categoryItem,
            valueItem,
            seriesIndex = this._seriesIndex,
            itemIndex = this._itemIndex,
            seriesCollection = this.get("seriesCollection"),
            len = seriesCollection.length,
            dataLength;
        _yuitest_coverline("build/charts-base/charts-base.js", 4059);
if(key % 2 === 0)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4061);
if(len > 1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4063);
if(key === 38)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4065);
seriesIndex = seriesIndex < 1 ? len - 1 : seriesIndex - 1;
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 4067);
if(key === 40)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4069);
seriesIndex = seriesIndex >= len - 1 ? 0 : seriesIndex + 1;
                }}
                _yuitest_coverline("build/charts-base/charts-base.js", 4071);
this._itemIndex = -1;
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4075);
seriesIndex = 0;
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 4077);
this._seriesIndex = seriesIndex;
            _yuitest_coverline("build/charts-base/charts-base.js", 4078);
series = this.getSeries(parseInt(seriesIndex, 10));
            _yuitest_coverline("build/charts-base/charts-base.js", 4079);
msg = series.get("valueDisplayName") + " series.";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4083);
if(seriesIndex > -1)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4085);
msg = "";
                _yuitest_coverline("build/charts-base/charts-base.js", 4086);
series = this.getSeries(parseInt(seriesIndex, 10));
            }
            else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4090);
seriesIndex = 0;
                _yuitest_coverline("build/charts-base/charts-base.js", 4091);
this._seriesIndex = seriesIndex;
                _yuitest_coverline("build/charts-base/charts-base.js", 4092);
series = this.getSeries(parseInt(seriesIndex, 10));
                _yuitest_coverline("build/charts-base/charts-base.js", 4093);
msg = series.get("valueDisplayName") + " series.";
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 4095);
dataLength = series._dataLength ? series._dataLength : 0;
            _yuitest_coverline("build/charts-base/charts-base.js", 4096);
if(key === 37)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4098);
itemIndex = itemIndex > 0 ? itemIndex - 1 : dataLength - 1;
            }
            else {_yuitest_coverline("build/charts-base/charts-base.js", 4100);
if(key === 39)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4102);
itemIndex = itemIndex >= dataLength - 1 ? 0 : itemIndex + 1;
            }}
            _yuitest_coverline("build/charts-base/charts-base.js", 4104);
this._itemIndex = itemIndex;
            _yuitest_coverline("build/charts-base/charts-base.js", 4105);
items = this.getSeriesItems(series, itemIndex);
            _yuitest_coverline("build/charts-base/charts-base.js", 4106);
categoryItem = items.category;
            _yuitest_coverline("build/charts-base/charts-base.js", 4107);
valueItem = items.value;
            _yuitest_coverline("build/charts-base/charts-base.js", 4108);
if(categoryItem && valueItem && categoryItem.value && valueItem.value)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4110);
msg += categoryItem.displayName +
                    ": " +
                    categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]) +
                    ", ";
                _yuitest_coverline("build/charts-base/charts-base.js", 4114);
msg += valueItem.displayName +
                    ": " +
                    valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get("labelFormat")]) +
                    ", ";
            }
           else
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4121);
msg += "No data available.";
            }
            _yuitest_coverline("build/charts-base/charts-base.js", 4123);
msg += (itemIndex + 1) + " of " + dataLength + ". ";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4125);
return msg;
    }
}, {
    ATTRS: {
        /**
         * Indicates whether axis labels are allowed to overflow beyond the bounds of the chart's content box.
         *
         * @attribute allowContentOverflow
         * @type Boolean
         */
        allowContentOverflow: {
            value: false
        },

        /**
         * Style object for the axes.
         *
         * @attribute axesStyles
         * @type Object
         * @private
         */
        axesStyles: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4149);
_yuitest_coverline("build/charts-base/charts-base.js", 4151);
var axes = this.get("axes"),
                    i,
                    styles = this._axesStyles;
                _yuitest_coverline("build/charts-base/charts-base.js", 4154);
if(axes)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4156);
for(i in axes)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4158);
if(axes.hasOwnProperty(i) && axes[i] instanceof Y.Axis)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 4160);
if(!styles)
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 4162);
styles = {};
                            }
                            _yuitest_coverline("build/charts-base/charts-base.js", 4164);
styles[i] = axes[i].get("styles");
                        }
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4168);
return styles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4171);
_yuitest_coverline("build/charts-base/charts-base.js", 4173);
var axes = this.get("axes"),
                    i;
                _yuitest_coverline("build/charts-base/charts-base.js", 4175);
for(i in val)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4177);
if(val.hasOwnProperty(i) && axes.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4179);
this._setBaseAttribute(axes[i], "styles", val[i]);
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4182);
return val;
            }
        },

        /**
         * Style object for the series
         *
         * @attribute seriesStyles
         * @type Object
         * @private
         */
        seriesStyles: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4196);
_yuitest_coverline("build/charts-base/charts-base.js", 4198);
var styles = this._seriesStyles,
                    graph = this.get("graph"),
                    dict,
                    i;
                _yuitest_coverline("build/charts-base/charts-base.js", 4202);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4204);
dict = graph.get("seriesDictionary");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4205);
if(dict)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4207);
styles = {};
                        _yuitest_coverline("build/charts-base/charts-base.js", 4208);
for(i in dict)
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 4210);
if(dict.hasOwnProperty(i))
                            {
                                _yuitest_coverline("build/charts-base/charts-base.js", 4212);
styles[i] = dict[i].get("styles");
                            }
                        }
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4217);
return styles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4220);
_yuitest_coverline("build/charts-base/charts-base.js", 4222);
var i,
                    l,
                    s;

                _yuitest_coverline("build/charts-base/charts-base.js", 4226);
if(Y_Lang.isArray(val))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4228);
s = this.get("seriesCollection");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4229);
i = 0;
                    _yuitest_coverline("build/charts-base/charts-base.js", 4230);
l = val.length;

                    _yuitest_coverline("build/charts-base/charts-base.js", 4232);
for(; i < l; ++i)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4234);
this._setBaseAttribute(s[i], "styles", val[i]);
                    }
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4239);
for(i in val)
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4241);
if(val.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/charts-base/charts-base.js", 4243);
s = this.getSeries(i);
                            _yuitest_coverline("build/charts-base/charts-base.js", 4244);
this._setBaseAttribute(s, "styles", val[i]);
                        }
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4248);
return val;
            }
        },

        /**
         * Styles for the graph.
         *
         * @attribute graphStyles
         * @type Object
         * @private
         */
        graphStyles: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4262);
_yuitest_coverline("build/charts-base/charts-base.js", 4264);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4265);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4267);
return(graph.get("styles"));
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4269);
return this._graphStyles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4272);
_yuitest_coverline("build/charts-base/charts-base.js", 4274);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4275);
this._setBaseAttribute(graph, "styles", val);
                _yuitest_coverline("build/charts-base/charts-base.js", 4276);
return val;
            }

        },

        /**
         * Style properties for the chart. Contains a key indexed hash of the following:
         *  <dl>
         *      <dt>series</dt><dd>A key indexed hash containing references to the `styles` attribute for each series in the chart.
         *      Specific style attributes vary depending on the series:
         *      <ul>
         *          <li><a href="AreaSeries.html#attr_styles">AreaSeries</a></li>
         *          <li><a href="BarSeries.html#attr_styles">BarSeries</a></li>
         *          <li><a href="ColumnSeries.html#attr_styles">ColumnSeries</a></li>
         *          <li><a href="ComboSeries.html#attr_styles">ComboSeries</a></li>
         *          <li><a href="LineSeries.html#attr_styles">LineSeries</a></li>
         *          <li><a href="MarkerSeries.html#attr_styles">MarkerSeries</a></li>
         *          <li><a href="SplineSeries.html#attr_styles">SplineSeries</a></li>
         *      </ul>
         *      </dd>
         *      <dt>axes</dt><dd>A key indexed hash containing references to the `styles` attribute for each axes in the chart. Specific
         *      style attributes can be found in the <a href="Axis.html#attr_styles">Axis</a> class.</dd>
         *      <dt>graph</dt><dd>A reference to the `styles` attribute in the chart. Specific style attributes can be found in the
         *      <a href="Graph.html#attr_styles">Graph</a> class.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
        styles: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4308);
_yuitest_coverline("build/charts-base/charts-base.js", 4310);
var styles = {
                    axes: this.get("axesStyles"),
                    series: this.get("seriesStyles"),
                    graph: this.get("graphStyles")
                };
                _yuitest_coverline("build/charts-base/charts-base.js", 4315);
return styles;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4317);
_yuitest_coverline("build/charts-base/charts-base.js", 4319);
if(val.hasOwnProperty("axes"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4321);
if(this.get("axesStyles"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4323);
this.set("axesStyles", val.axes);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4327);
this._axesStyles = val.axes;
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4330);
if(val.hasOwnProperty("series"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4332);
if(this.get("seriesStyles"))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4334);
this.set("seriesStyles", val.series);
                    }
                    else
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4338);
this._seriesStyles = val.series;
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4341);
if(val.hasOwnProperty("graph"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4343);
this.set("graphStyles", val.graph);
                }
            }
        },

        /**
         * Axes to appear in the chart. This can be a key indexed hash of axis instances or object literals
         * used to construct the appropriate axes.
         *
         * @attribute axes
         * @type Object
         */
        axes: {
            lazyAdd: false,

            valueFn: "_getDefaultAxes",

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4360);
_yuitest_coverline("build/charts-base/charts-base.js", 4362);
if(this.get("dataProvider"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4364);
val = this._setAxes(val);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4366);
return val;
            }
        },

        /**
         * Collection of series to appear on the chart. This can be an array of Series instances or object literals
         * used to construct the appropriate series.
         *
         * @attribute seriesCollection
         * @type Array
         */
        seriesCollection: {
            lazyAdd: false,

            valueFn: "_getDefaultSeriesCollection",

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4382);
_yuitest_coverline("build/charts-base/charts-base.js", 4384);
if(this.get("dataProvider"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4386);
return this._parseSeriesCollection(val);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4388);
return val;
            }
        },

        /**
         * Reference to the left-aligned axes for the chart.
         *
         * @attribute leftAxesCollection
         * @type Array
         * @private
         */
        leftAxesCollection: {},

        /**
         * Reference to the bottom-aligned axes for the chart.
         *
         * @attribute bottomAxesCollection
         * @type Array
         * @private
         */
        bottomAxesCollection: {},

        /**
         * Reference to the right-aligned axes for the chart.
         *
         * @attribute rightAxesCollection
         * @type Array
         * @private
         */
        rightAxesCollection: {},

        /**
         * Reference to the top-aligned axes for the chart.
         *
         * @attribute topAxesCollection
         * @type Array
         * @private
         */
        topAxesCollection: {},

        /**
         * Indicates whether or not the chart is stacked.
         *
         * @attribute stacked
         * @type Boolean
         */
        stacked: {
            value: false
        },

        /**
         * Direction of chart's category axis when there is no series collection specified. Charts can
         * be horizontal or vertical. When the chart type is column, the chart is horizontal.
         * When the chart type is bar, the chart is vertical.
         *
         * @attribute direction
         * @type String
         */
        direction: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4447);
_yuitest_coverline("build/charts-base/charts-base.js", 4449);
var type = this.get("type");
                _yuitest_coverline("build/charts-base/charts-base.js", 4450);
if(type === "bar")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4452);
return "vertical";
                }
                else {_yuitest_coverline("build/charts-base/charts-base.js", 4454);
if(type === "column")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4456);
return "horizontal";
                }}
                _yuitest_coverline("build/charts-base/charts-base.js", 4458);
return this._direction;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4461);
_yuitest_coverline("build/charts-base/charts-base.js", 4463);
this._direction = val;
                _yuitest_coverline("build/charts-base/charts-base.js", 4464);
return this._direction;
            }
        },

        /**
         * Indicates whether or not an area is filled in a combo chart.
         *
         * @attribute showAreaFill
         * @type Boolean
         */
        showAreaFill: {},

        /**
         * Indicates whether to display markers in a combo chart.
         *
         * @attribute showMarkers
         * @type Boolean
         */
        showMarkers:{},

        /**
         * Indicates whether to display lines in a combo chart.
         *
         * @attribute showLines
         * @type Boolean
         */
        showLines:{},

        /**
         * Indicates the key value used to identify a category axis in the `axes` hash. If
         * not specified, the categoryKey attribute value will be used.
         *
         * @attribute categoryAxisName
         * @type String
         */
        categoryAxisName: {
        },

        /**
         * Indicates the key value used to identify a the series axis when an axis not generated.
         *
         * @attribute valueAxisName
         * @type String
         */
        valueAxisName: {
            value: "values"
        },

        /**
         * Reference to the horizontalGridlines for the chart.
         *
         * @attribute horizontalGridlines
         * @type Gridlines
         */
        horizontalGridlines: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4519);
_yuitest_coverline("build/charts-base/charts-base.js", 4521);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4522);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4524);
return graph.get("horizontalGridlines");
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4526);
return this._horizontalGridlines;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4528);
_yuitest_coverline("build/charts-base/charts-base.js", 4530);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4531);
if(val && !Y_Lang.isObject(val))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4533);
val = {};
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4535);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4537);
graph.set("horizontalGridlines", val);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4541);
this._horizontalGridlines = val;
                }
            }
        },

        /**
         * Reference to the verticalGridlines for the chart.
         *
         * @attribute verticalGridlines
         * @type Gridlines
         */
        verticalGridlines: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4553);
_yuitest_coverline("build/charts-base/charts-base.js", 4555);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4556);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4558);
return graph.get("verticalGridlines");
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4560);
return this._verticalGridlines;
            },
            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4562);
_yuitest_coverline("build/charts-base/charts-base.js", 4564);
var graph = this.get("graph");
                _yuitest_coverline("build/charts-base/charts-base.js", 4565);
if(val && !Y_Lang.isObject(val))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4567);
val = {};
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4569);
if(graph)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4571);
graph.set("verticalGridlines", val);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4575);
this._verticalGridlines = val;
                }
            }
        },

        /**
         * Type of chart when there is no series collection specified.
         *
         * @attribute type
         * @type String
         */
        type: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 4587);
_yuitest_coverline("build/charts-base/charts-base.js", 4589);
if(this.get("stacked"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4591);
return "stacked" + this._type;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4593);
return this._type;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 4596);
_yuitest_coverline("build/charts-base/charts-base.js", 4598);
if(this._type === "bar")
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4600);
if(val !== "bar")
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4602);
this.set("direction", "horizontal");
                    }
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4607);
if(val === "bar")
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4609);
this.set("direction", "vertical");
                    }
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4612);
this._type = val;
                _yuitest_coverline("build/charts-base/charts-base.js", 4613);
return this._type;
            }
        },

        /**
         * Reference to the category axis used by the chart.
         *
         * @attribute categoryAxis
         * @type Axis
         */
        categoryAxis:{}
    }
});
/**
 * The PieChart class creates a pie chart
 *
 * @class PieChart
 * @extends ChartBase
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 4634);
Y.PieChart = Y.Base.create("pieChart", Y.Widget, [Y.ChartBase], {
    /**
     * Calculates and returns a `seriesCollection`.
     *
     * @method _getSeriesCollection
     * @return Array
     * @private
     */
    _getSeriesCollection: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getSeriesCollection", 4642);
_yuitest_coverline("build/charts-base/charts-base.js", 4644);
if(this._seriesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4646);
return this._seriesCollection;
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4648);
var axes = this.get("axes"),
            sc = [],
            seriesKeys,
            i = 0,
            l,
            type = this.get("type"),
            key,
            catAxis = "categoryAxis",
            catKey = "categoryKey",
            valAxis = "valueAxis",
            seriesKey = "valueKey";
        _yuitest_coverline("build/charts-base/charts-base.js", 4659);
if(axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4661);
seriesKeys = axes.values.get("keyCollection");
            _yuitest_coverline("build/charts-base/charts-base.js", 4662);
key = axes.category.get("keyCollection")[0];
            _yuitest_coverline("build/charts-base/charts-base.js", 4663);
l = seriesKeys.length;
            _yuitest_coverline("build/charts-base/charts-base.js", 4664);
for(; i < l; ++i)
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4666);
sc[i] = {type:type};
                _yuitest_coverline("build/charts-base/charts-base.js", 4667);
sc[i][catAxis] = "category";
                _yuitest_coverline("build/charts-base/charts-base.js", 4668);
sc[i][valAxis] = "values";
                _yuitest_coverline("build/charts-base/charts-base.js", 4669);
sc[i][catKey] = key;
                _yuitest_coverline("build/charts-base/charts-base.js", 4670);
sc[i][seriesKey] = seriesKeys[i];
            }
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4673);
this._seriesCollection = sc;
        _yuitest_coverline("build/charts-base/charts-base.js", 4674);
return sc;
    },

    /**
     * Creates `Axis` instances.
     *
     * @method _parseAxes
     * @param {Object} val Object containing `Axis` instances or objects in which to construct `Axis` instances.
     * @return Object
     * @private
     */
    _parseAxes: function(hash)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseAxes", 4685);
_yuitest_coverline("build/charts-base/charts-base.js", 4687);
if(!this._axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4689);
this._axes = {};
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4691);
var i, pos, axis, dh, config, AxisClass,
            type = this.get("type"),
            w = this.get("width"),
            h = this.get("height"),
            node = Y.Node.one(this._parentNode);
        _yuitest_coverline("build/charts-base/charts-base.js", 4696);
if(!w)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4698);
this.set("width", node.get("offsetWidth"));
            _yuitest_coverline("build/charts-base/charts-base.js", 4699);
w = this.get("width");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4701);
if(!h)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4703);
this.set("height", node.get("offsetHeight"));
            _yuitest_coverline("build/charts-base/charts-base.js", 4704);
h = this.get("height");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4706);
for(i in hash)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4708);
if(hash.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4710);
dh = hash[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 4711);
pos = type === "pie" ? "none" : dh.position;
                _yuitest_coverline("build/charts-base/charts-base.js", 4712);
AxisClass = this._getAxisClass(dh.type);
                _yuitest_coverline("build/charts-base/charts-base.js", 4713);
config = {dataProvider:this.get("dataProvider")};
                _yuitest_coverline("build/charts-base/charts-base.js", 4714);
if(dh.hasOwnProperty("roundingUnit"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4716);
config.roundingUnit = dh.roundingUnit;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4718);
config.keys = dh.keys;
                _yuitest_coverline("build/charts-base/charts-base.js", 4719);
config.width = w;
                _yuitest_coverline("build/charts-base/charts-base.js", 4720);
config.height = h;
                _yuitest_coverline("build/charts-base/charts-base.js", 4721);
config.position = pos;
                _yuitest_coverline("build/charts-base/charts-base.js", 4722);
config.styles = dh.styles;
                _yuitest_coverline("build/charts-base/charts-base.js", 4723);
axis = new AxisClass(config);
                _yuitest_coverline("build/charts-base/charts-base.js", 4724);
axis.on("axisRendered", Y.bind(this._itemRendered, this));
                _yuitest_coverline("build/charts-base/charts-base.js", 4725);
this._axes[i] = axis;
            }
        }
    },

    /**
     * Adds axes to the chart.
     *
     * @method _addAxes
     * @private
     */
    _addAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addAxes", 4736);
_yuitest_coverline("build/charts-base/charts-base.js", 4738);
var axes = this.get("axes"),
            i,
            axis,
            p;
        _yuitest_coverline("build/charts-base/charts-base.js", 4742);
if(!axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4744);
this.set("axes", this._getDefaultAxes());
            _yuitest_coverline("build/charts-base/charts-base.js", 4745);
axes = this.get("axes");
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4747);
if(!this._axesCollection)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4749);
this._axesCollection = [];
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 4751);
for(i in axes)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4753);
if(axes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/charts-base/charts-base.js", 4755);
axis = axes[i];
                _yuitest_coverline("build/charts-base/charts-base.js", 4756);
p = axis.get("position");
                _yuitest_coverline("build/charts-base/charts-base.js", 4757);
if(!this.get(p + "AxesCollection"))
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4759);
this.set(p + "AxesCollection", [axis]);
                }
                else
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4763);
this.get(p + "AxesCollection").push(axis);
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4765);
this._axesCollection.push(axis);
            }
        }
    },

    /**
     * Renders the Graph.
     *
     * @method _addSeries
     * @private
     */
    _addSeries: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_addSeries", 4776);
_yuitest_coverline("build/charts-base/charts-base.js", 4778);
var graph = this.get("graph"),
            seriesCollection = this.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 4780);
this._parseSeriesAxes(seriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 4781);
graph.set("showBackground", false);
        _yuitest_coverline("build/charts-base/charts-base.js", 4782);
graph.set("width", this.get("width"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4783);
graph.set("height", this.get("height"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4784);
graph.set("seriesCollection", seriesCollection);
        _yuitest_coverline("build/charts-base/charts-base.js", 4785);
this._seriesCollection = graph.get("seriesCollection");
        _yuitest_coverline("build/charts-base/charts-base.js", 4786);
graph.render(this.get("contentBox"));
    },

    /**
     * Parse and sets the axes for the chart.
     *
     * @method _parseSeriesAxes
     * @param {Array} c A collection `PieSeries` instance.
     * @private
     */
    _parseSeriesAxes: function(c)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_parseSeriesAxes", 4796);
_yuitest_coverline("build/charts-base/charts-base.js", 4798);
var i = 0,
            len = c.length,
            s,
            axes = this.get("axes"),
            axis;
        _yuitest_coverline("build/charts-base/charts-base.js", 4803);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4805);
s = c[i];
            _yuitest_coverline("build/charts-base/charts-base.js", 4806);
if(s)
            {
                //If series is an actual series instance,
                //replace axes attribute string ids with axes
                _yuitest_coverline("build/charts-base/charts-base.js", 4810);
if(s instanceof Y.PieSeries)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4812);
axis = s.get("categoryAxis");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4813);
if(axis && !(axis instanceof Y.Axis))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4815);
s.set("categoryAxis", axes[axis]);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 4817);
axis = s.get("valueAxis");
                    _yuitest_coverline("build/charts-base/charts-base.js", 4818);
if(axis && !(axis instanceof Y.Axis))
                    {
                        _yuitest_coverline("build/charts-base/charts-base.js", 4820);
s.set("valueAxis", axes[axis]);
                    }
                    _yuitest_coverline("build/charts-base/charts-base.js", 4822);
continue;
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 4824);
s.categoryAxis = axes.category;
                _yuitest_coverline("build/charts-base/charts-base.js", 4825);
s.valueAxis = axes.values;
                _yuitest_coverline("build/charts-base/charts-base.js", 4826);
if(!s.type)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 4828);
s.type = this.get("type");
                }
            }
        }
    },

    /**
     * Generates and returns a key-indexed object containing `Axis` instances or objects used to create `Axis` instances.
     *
     * @method _getDefaultAxes
     * @return Object
     * @private
     */
    _getDefaultAxes: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getDefaultAxes", 4841);
_yuitest_coverline("build/charts-base/charts-base.js", 4843);
var catKey = this.get("categoryKey"),
            seriesKeys = this.get("seriesKeys").concat(),
            seriesAxis = "numeric";
        _yuitest_coverline("build/charts-base/charts-base.js", 4846);
return {
            values:{
                keys:seriesKeys,
                type:seriesAxis
            },
            category:{
                keys:[catKey],
                type:this.get("categoryType")
            }
        };
    },

    /**
     * Returns an object literal containing a categoryItem and a valueItem for a given series index.
     *
     * @method getSeriesItem
     * @param series Reference to a series.
     * @param index Index of the specified item within a series.
     * @return Object
     */
    getSeriesItems: function(series, index)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "getSeriesItems", 4866);
_yuitest_coverline("build/charts-base/charts-base.js", 4868);
var categoryItem = {
                axis: series.get("categoryAxis"),
                key: series.get("categoryKey"),
                displayName: series.get("categoryDisplayName")
            },
            valueItem = {
                axis: series.get("valueAxis"),
                key: series.get("valueKey"),
                displayName: series.get("valueDisplayName")
            };
        _yuitest_coverline("build/charts-base/charts-base.js", 4878);
categoryItem.value = categoryItem.axis.getKeyValueAt(categoryItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 4879);
valueItem.value = valueItem.axis.getKeyValueAt(valueItem.key, index);
        _yuitest_coverline("build/charts-base/charts-base.js", 4880);
return {category:categoryItem, value:valueItem};
    },

    /**
     * Handler for sizeChanged event.
     *
     * @method _sizeChanged
     * @param {Object} e Event object.
     * @private
     */
    _sizeChanged: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_sizeChanged", 4890);
_yuitest_coverline("build/charts-base/charts-base.js", 4892);
this._redraw();
    },

    /**
     * Redraws the chart instance.
     *
     * @method _redraw
     * @private
     */
    _redraw: function()
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_redraw", 4901);
_yuitest_coverline("build/charts-base/charts-base.js", 4903);
var graph = this.get("graph"),
            w = this.get("width"),
            h = this.get("height"),
            dimension;
        _yuitest_coverline("build/charts-base/charts-base.js", 4907);
if(graph)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4909);
dimension = Math.min(w, h);
            _yuitest_coverline("build/charts-base/charts-base.js", 4910);
graph.set("width", dimension);
            _yuitest_coverline("build/charts-base/charts-base.js", 4911);
graph.set("height", dimension);
        }
    },

    /**
     * Formats tooltip text for a pie chart.
     *
     * @method _tooltipLabelFunction
     * @param {Object} categoryItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the category is bound.</dd>
     *      <dt>displayName</dt><dd>The display name set to the category (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key of the category.</dd>
     *      <dt>value</dt><dd>The value of the category</dd>
     *  </dl>
     * @param {Object} valueItem An object containing the following:
     *  <dl>
     *      <dt>axis</dt><dd>The axis to which the item's series is bound.</dd>
     *      <dt>displayName</dt><dd>The display name of the series. (defaults to key if not provided)</dd>
     *      <dt>key</dt><dd>The key for the series.</dd>
     *      <dt>value</dt><dd>The value for the series item.</dd>
     *  </dl>
     * @param {Number} itemIndex The index of the item within the series.
     * @param {CartesianSeries} series The `PieSeries` instance of the item.
     * @return {HTML}
     * @private
     */
    _tooltipLabelFunction: function(categoryItem, valueItem, itemIndex, series)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_tooltipLabelFunction", 4938);
_yuitest_coverline("build/charts-base/charts-base.js", 4940);
var msg = DOCUMENT.createElement("div"),
            total = series.getTotalValues(),
            pct = Math.round((valueItem.value / total) * 10000)/100;
        _yuitest_coverline("build/charts-base/charts-base.js", 4943);
msg.appendChild(DOCUMENT.createTextNode(categoryItem.displayName +
        ": " + categoryItem.axis.get("labelFunction").apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")])));
        _yuitest_coverline("build/charts-base/charts-base.js", 4945);
msg.appendChild(DOCUMENT.createElement("br"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4946);
msg.appendChild(DOCUMENT.createTextNode(valueItem.displayName +
        ": " + valueItem.axis.get("labelFunction").apply(this, [valueItem.value, valueItem.axis.get("labelFormat")])));
        _yuitest_coverline("build/charts-base/charts-base.js", 4948);
msg.appendChild(DOCUMENT.createElement("br"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4949);
msg.appendChild(DOCUMENT.createTextNode(pct + "%"));
        _yuitest_coverline("build/charts-base/charts-base.js", 4950);
return msg;
    },

    /**
     * Returns the appropriate message based on the key press.
     *
     * @method _getAriaMessage
     * @param {Number} key The keycode that was pressed.
     * @return String
     */
    _getAriaMessage: function(key)
    {
        _yuitest_coverfunc("build/charts-base/charts-base.js", "_getAriaMessage", 4960);
_yuitest_coverline("build/charts-base/charts-base.js", 4962);
var msg = "",
            categoryItem,
            items,
            series,
            valueItem,
            seriesIndex = 0,
            itemIndex = this._itemIndex,
            len,
            total,
            pct,
            markers;
        _yuitest_coverline("build/charts-base/charts-base.js", 4973);
series = this.getSeries(parseInt(seriesIndex, 10));
        _yuitest_coverline("build/charts-base/charts-base.js", 4974);
markers = series.get("markers");
        _yuitest_coverline("build/charts-base/charts-base.js", 4975);
len = markers && markers.length ? markers.length : 0;
        _yuitest_coverline("build/charts-base/charts-base.js", 4976);
if(key === 37)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4978);
itemIndex = itemIndex > 0 ? itemIndex - 1 : len - 1;
        }
        else {_yuitest_coverline("build/charts-base/charts-base.js", 4980);
if(key === 39)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4982);
itemIndex = itemIndex >= len - 1 ? 0 : itemIndex + 1;
        }}
        _yuitest_coverline("build/charts-base/charts-base.js", 4984);
this._itemIndex = itemIndex;
        _yuitest_coverline("build/charts-base/charts-base.js", 4985);
items = this.getSeriesItems(series, itemIndex);
        _yuitest_coverline("build/charts-base/charts-base.js", 4986);
categoryItem = items.category;
        _yuitest_coverline("build/charts-base/charts-base.js", 4987);
valueItem = items.value;
        _yuitest_coverline("build/charts-base/charts-base.js", 4988);
total = series.getTotalValues();
        _yuitest_coverline("build/charts-base/charts-base.js", 4989);
pct = Math.round((valueItem.value / total) * 10000)/100;
        _yuitest_coverline("build/charts-base/charts-base.js", 4990);
if(categoryItem && valueItem)
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 4992);
msg += categoryItem.displayName +
                ": " +
                categoryItem.axis.formatLabel.apply(this, [categoryItem.value, categoryItem.axis.get("labelFormat")]) +
                ", ";
            _yuitest_coverline("build/charts-base/charts-base.js", 4996);
msg += valueItem.displayName +
                ": " + valueItem.axis.formatLabel.apply(this, [valueItem.value, valueItem.axis.get("labelFormat")]) +
                ", ";
            _yuitest_coverline("build/charts-base/charts-base.js", 4999);
msg += "Percent of total " + valueItem.displayName + ": " + pct + "%,";
        }
        else
        {
            _yuitest_coverline("build/charts-base/charts-base.js", 5003);
msg += "No data available,";
        }
        _yuitest_coverline("build/charts-base/charts-base.js", 5005);
msg += (itemIndex + 1) + " of " + len + ". ";
        _yuitest_coverline("build/charts-base/charts-base.js", 5006);
return msg;
    }
}, {
    ATTRS: {
        /**
         * Sets the aria description for the chart.
         *
         * @attribute ariaDescription
         * @type String
         */
        ariaDescription: {
            value: "Use the left and right keys to navigate through items.",

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 5019);
_yuitest_coverline("build/charts-base/charts-base.js", 5021);
if(this._description)
                {
                    _yuitest_coverline("build/charts-base/charts-base.js", 5023);
this._description.setContent("");
                    _yuitest_coverline("build/charts-base/charts-base.js", 5024);
this._description.appendChild(DOCUMENT.createTextNode(val));
                }
                _yuitest_coverline("build/charts-base/charts-base.js", 5026);
return val;
            }
        },

        /**
         * Axes to appear in the chart.
         *
         * @attribute axes
         * @type Object
         */
        axes: {
            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 5037);
_yuitest_coverline("build/charts-base/charts-base.js", 5039);
return this._axes;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 5042);
_yuitest_coverline("build/charts-base/charts-base.js", 5044);
this._parseAxes(val);
            }
        },

        /**
         * Collection of series to appear on the chart. This can be an array of Series instances or object literals
         * used to describe a Series instance.
         *
         * @attribute seriesCollection
         * @type Array
         */
        seriesCollection: {
            lazyAdd: false,

            getter: function()
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "getter", 5058);
_yuitest_coverline("build/charts-base/charts-base.js", 5060);
return this._getSeriesCollection();
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/charts-base/charts-base.js", "setter", 5063);
_yuitest_coverline("build/charts-base/charts-base.js", 5065);
return this._setSeriesCollection(val);
            }
        },

        /**
         * Type of chart when there is no series collection specified.
         *
         * @attribute type
         * @type String
         */
        type: {
            value: "pie"
        }
    }
});
/**
 * The Chart class is the basic application used to create a chart.
 *
 * @class Chart
 * @constructor
 * @submodule charts-base
 */
_yuitest_coverline("build/charts-base/charts-base.js", 5087);
function Chart(cfg)
{
    _yuitest_coverfunc("build/charts-base/charts-base.js", "Chart", 5087);
_yuitest_coverline("build/charts-base/charts-base.js", 5089);
if(cfg.type !== "pie")
    {
        _yuitest_coverline("build/charts-base/charts-base.js", 5091);
return new Y.CartesianChart(cfg);
    }
    else
    {
        _yuitest_coverline("build/charts-base/charts-base.js", 5095);
return new Y.PieChart(cfg);
    }
}
_yuitest_coverline("build/charts-base/charts-base.js", 5098);
Y.Chart = Chart;


}, '@VERSION@', {
    "requires": [
        "dom",
        "event-mouseenter",
        "event-touch",
        "graphics-group",
        "axes",
        "series-pie",
        "series-line",
        "series-marker",
        "series-area",
        "series-spline",
        "series-column",
        "series-bar",
        "series-areaspline",
        "series-combo",
        "series-combospline",
        "series-line-stacked",
        "series-marker-stacked",
        "series-area-stacked",
        "series-spline-stacked",
        "series-column-stacked",
        "series-bar-stacked",
        "series-areaspline-stacked",
        "series-combo-stacked",
        "series-combospline-stacked"
    ]
});
