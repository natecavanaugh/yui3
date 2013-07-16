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
_yuitest_coverage["build/node-scroll-info/node-scroll-info.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/node-scroll-info/node-scroll-info.js",
    code: []
};
_yuitest_coverage["build/node-scroll-info/node-scroll-info.js"].code=["YUI.add('node-scroll-info', function (Y, NAME) {","","/**","Provides the ScrollInfo Node plugin, which exposes convenient events and methods","related to scrolling.","","@module node-scroll-info","@since 3.7.0","**/","","/**","Provides convenient events and methods related to scrolling. This could be used,","for example, to implement infinite scrolling, or to lazy-load content based on","the current scroll position.","","### Example","","    var body = Y.one('body');","","    body.plug(Y.Plugin.ScrollInfo);","","    body.scrollInfo.on('scrollToBottom', function (e) {","        // Load more content when the user scrolls to the bottom of the page.","    });","","@class Plugin.ScrollInfo","@extends Plugin.Base","@since 3.7.0","**/","","/**","Fired when the user scrolls within the host node.","","This event (like all scroll events exposed by ScrollInfo) is throttled and fired","only after the number of milliseconds specified by the `scrollDelay` attribute","have passed in order to prevent thrashing.","","This event passes along the event facade for the standard DOM `scroll` event and","mixes in the following additional properties.","","@event scroll","@param {Boolean} atBottom Whether the current scroll position is at the bottom","    of the scrollable region.","@param {Boolean} atLeft Whether the current scroll position is at the extreme","    left of the scrollable region.","@param {Boolean} atRight Whether the current scroll position is at the extreme","    right of the scrollable region.","@param {Boolean} atTop Whether the current scroll position is at the top of the","    scrollable region.","@param {Boolean} isScrollDown `true` if the user scrolled down.","@param {Boolean} isScrollLeft `true` if the user scrolled left.","@param {Boolean} isScrollRight `true` if the user scrolled right.","@param {Boolean} isScrollUp `true` if the user scrolled up.","@param {Number} scrollBottom Y value of the bottom-most onscreen pixel of the","    scrollable region.","@param {Number} scrollHeight Total height in pixels of the scrollable region,","    including offscreen pixels.","@param {Number} scrollLeft X value of the left-most onscreen pixel of the","    scrollable region.","@param {Number} scrollRight X value of the right-most onscreen pixel of the","    scrollable region.","@param {Number} scrollTop Y value of the top-most onscreen pixel of the","    scrollable region.","@param {Number} scrollWidth Total width in pixels of the scrollable region,","    including offscreen pixels.","@see scrollDelay","@see scrollMargin","**/","var EVT_SCROLL = 'scroll',","","    /**","    Fired when the user scrolls down within the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollDown","    @see scroll","    **/","    EVT_SCROLL_DOWN = 'scrollDown',","","    /**","    Fired when the user scrolls left within the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollLeft","    @see scroll","    **/","    EVT_SCROLL_LEFT = 'scrollLeft',","","    /**","    Fired when the user scrolls right within the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollRight","    @see scroll","    **/","    EVT_SCROLL_RIGHT = 'scrollRight',","","    /**","    Fired when the user scrolls up within the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollUp","    @see scroll","    **/","    EVT_SCROLL_UP = 'scrollUp',","","    /**","    Fired when the user scrolls to the bottom of the scrollable region within","    the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollToBottom","    @see scroll","    **/","    EVT_SCROLL_TO_BOTTOM = 'scrollToBottom',","","    /**","    Fired when the user scrolls to the extreme left of the scrollable region","    within the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollToLeft","    @see scroll","    **/","    EVT_SCROLL_TO_LEFT = 'scrollToLeft',","","    /**","    Fired when the user scrolls to the extreme right of the scrollable region","    within the host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollToRight","    @see scroll","    **/","    EVT_SCROLL_TO_RIGHT = 'scrollToRight',","","    /**","    Fired when the user scrolls to the top of the scrollable region within the","    host node.","","    This event provides the same event facade as the `scroll` event. See that","    event for details.","","    @event scrollToTop","    @see scroll","    **/","    EVT_SCROLL_TO_TOP = 'scrollToTop';","","Y.Plugin.ScrollInfo = Y.Base.create('scrollInfoPlugin', Y.Plugin.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","    initializer: function (config) {","        // Cache for quicker lookups in the critical path.","        this._host         = config.host;","        this._hostIsBody   = this._host.get('nodeName').toLowerCase() === 'body';","        this._scrollDelay  = this.get('scrollDelay');","        this._scrollMargin = this.get('scrollMargin');","        this._scrollNode   = this._getScrollNode();","","        this.refreshDimensions();","","        this._lastScroll = this.getScrollInfo();","","        this._bind();","    },","","    destructor: function () {","        new Y.EventHandle(this._events).detach();","        this._events = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Returns a NodeList containing all offscreen nodes inside the host node that","    match the given CSS selector. An offscreen node is any node that is entirely","    outside the visible (onscreen) region of the host node based on the current","    scroll location.","","    @method getOffscreenNodes","    @param {String} [selector] CSS selector. If omitted, all offscreen nodes","        will be returned.","    @param {Number} [margin] Additional margin in pixels beyond the actual","        onscreen region that should be considered \"onscreen\" for the purposes of","        this query. Defaults to the value of the `scrollMargin` attribute.","    @return {NodeList} Offscreen nodes matching _selector_.","    @see scrollMargin","    **/","    getOffscreenNodes: function (selector, margin) {","        if (typeof margin === 'undefined') {","            margin = this._scrollMargin;","        }","","        var elements = Y.Selector.query(selector || '*', this._host._node);","","        return new Y.NodeList(Y.Array.filter(elements, function (el) {","            return !this._isElementOnscreen(el, margin);","        }, this));","    },","","    /**","    Returns a NodeList containing all onscreen nodes inside the host node that","    match the given CSS selector. An onscreen node is any node that is fully or","    partially within the visible (onscreen) region of the host node based on the","    current scroll location.","","    @method getOnscreenNodes","    @param {String} [selector] CSS selector. If omitted, all onscreen nodes will","        be returned.","    @param {Number} [margin] Additional margin in pixels beyond the actual","        onscreen region that should be considered \"onscreen\" for the purposes of","        this query. Defaults to the value of the `scrollMargin` attribute.","    @return {NodeList} Onscreen nodes matching _selector_.","    @see scrollMargin","    **/","    getOnscreenNodes: function (selector, margin) {","        if (typeof margin === 'undefined') {","            margin = this._scrollMargin;","        }","","        var elements = Y.Selector.query(selector || '*', this._host._node);","","        return new Y.NodeList(Y.Array.filter(elements, function (el) {","            return this._isElementOnscreen(el, margin);","        }, this));","    },","","    /**","    Returns an object hash containing information about the current scroll","    position of the host node. This is the same information that's mixed into","    the event facade of the `scroll` event and other scroll-related events.","","    @method getScrollInfo","    @return {Object} Object hash containing information about the current scroll","        position. See the `scroll` event for details on what properties this","        object contains.","    @see scroll","    **/","    getScrollInfo: function () {","        var domNode    = this._scrollNode,","            lastScroll = this._lastScroll,","            margin     = this._scrollMargin,","","            scrollLeft   = domNode.scrollLeft,","            scrollHeight = domNode.scrollHeight,","            scrollTop    = domNode.scrollTop,","            scrollWidth  = domNode.scrollWidth,","","            scrollBottom = scrollTop + this._height,","            scrollRight  = scrollLeft + this._width;","","        return {","            atBottom: scrollBottom > (scrollHeight - margin),","            atLeft  : scrollLeft < margin,","            atRight : scrollRight > (scrollWidth - margin),","            atTop   : scrollTop < margin,","","            isScrollDown : lastScroll && scrollTop > lastScroll.scrollTop,","            isScrollLeft : lastScroll && scrollLeft < lastScroll.scrollLeft,","            isScrollRight: lastScroll && scrollLeft > lastScroll.scrollLeft,","            isScrollUp   : lastScroll && scrollTop < lastScroll.scrollTop,","","            scrollBottom: scrollBottom,","            scrollHeight: scrollHeight,","            scrollLeft  : scrollLeft,","            scrollRight : scrollRight,","            scrollTop   : scrollTop,","            scrollWidth : scrollWidth","        };","    },","","    /**","    Returns `true` if _node_ is at least partially onscreen within the host","    node, `false` otherwise.","","    @method isNodeOnscreen","    @param {HTMLElement|Node|String} node Node or selector to check.","    @param {Number} [margin] Additional margin in pixels beyond the actual","        onscreen region that should be considered \"onscreen\" for the purposes of","        this query. Defaults to the value of the `scrollMargin` attribute.","    @return {Boolean} `true` if _node_ is at least partially onscreen within the","        host node, `false` otherwise.","    @since @SINCE@","    **/","    isNodeOnscreen: function (node, margin) {","        node = Y.one(node);","        return !!(node && this._isElementOnscreen(node._node, margin));","    },","","    /**","    Refreshes cached position, height, and width dimensions for the host node.","    If the host node is the body, then the viewport height and width will be","    used.","","    This info is cached to improve performance during scroll events, since it's","    expensive to touch the DOM for these values. Dimensions are automatically","    refreshed whenever the browser is resized, but if you change the dimensions","    or position of the host node in JS, you may need to call","    `refreshDimensions()` manually to cache the new dimensions.","","    @method refreshDimensions","    **/","    refreshDimensions: function () {","        // WebKit only returns reliable scroll info on the body, and only","        // returns reliable height/width info on the documentElement, so we","        // have to special-case it (see the other special case in","        // _getScrollNode()).","        //","        // On iOS devices, documentElement.clientHeight/Width aren't reliable,","        // but window.innerHeight/Width are. And no, dom-screen's viewport size","        // methods don't account for this, which is why we do it here.","","        var hostIsBody = this._hostIsBody,","            iosHack    = hostIsBody && Y.UA.ios,","            win        = Y.config.win,","            el;","","        if (hostIsBody && Y.UA.webkit) {","            el = Y.config.doc.documentElement;","        } else {","            el = this._scrollNode;","        }","","        this._height = iosHack ? win.innerHeight : el.clientHeight;","        this._left   = el.offsetLeft;","        this._top    = el.offsetTop;","        this._width  = iosHack ? win.innerWidth : el.clientWidth;","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Binds event handlers.","","    @method _bind","    @protected","    **/","    _bind: function () {","        var winNode = Y.one('win');","","        this._events = [","            this.after({","                scrollDelayChange : this._afterScrollDelayChange,","                scrollMarginChange: this._afterScrollMarginChange","            }),","","            winNode.on('windowresize', this._afterResize, this),","","            // If we're attached to the body, listen for the scroll event on the","            // window, since <body> doesn't have a scroll event.","            (this._hostIsBody ? winNode : this._host).after(","                'scroll', this._afterScroll, this)","        ];","    },","","    /**","    Returns the DOM node that should be used to lookup scroll coordinates. In","    some browsers, the `<body>` element doesn't return scroll coordinates, and","    the documentElement must be used instead; this method takes care of","    determining which node should be used.","","    @method _getScrollNode","    @return {HTMLElement} DOM node.","    @protected","    **/","    _getScrollNode: function () {","        // WebKit returns scroll coordinates on the body element, but other","        // browsers don't, so we have to use the documentElement.","        return this._hostIsBody && !Y.UA.webkit ? Y.config.doc.documentElement :","                Y.Node.getDOMNode(this._host);","    },","","    /**","    Underlying element-based implementation for `isNodeOnscreen()`.","","    @method _isElementOnscreen","    @param {HTMLElement} el HTML element.","    @param {Number} [margin] Additional margin in pixels beyond the actual","        onscreen region that should be considered \"onscreen\" for the purposes of","        this query. Defaults to the value of the `scrollMargin` attribute.","    @return {Boolean} `true` if _el_ is at least partially onscreen within the","        host node, `false` otherwise.","    @since @SINCE@","    **/","    _isElementOnscreen: function (el, margin) {","        var rect = el.getBoundingClientRect();","","        if (typeof margin === 'undefined') {","            margin = this._scrollMargin;","        }","","        return (rect.top < this._height + margin","            && rect.bottom >= -margin","            && rect.right >= -margin","            && rect.left < this._width + margin);","    },","","    /**","    Mixes detailed scroll information into the given DOM `scroll` event facade","    and fires appropriate local events.","","    @method _triggerScroll","    @param {EventFacade} e Event facade from the DOM `scroll` event.","    @protected","    **/","    _triggerScroll: function (e) {","        var info       = this.getScrollInfo(),","            facade     = Y.merge(e, info),","            lastScroll = this._lastScroll;","","        this._lastScroll = info;","","        this.fire(EVT_SCROLL, facade);","","        if (info.isScrollLeft) {","            this.fire(EVT_SCROLL_LEFT, facade);","        } else if (info.isScrollRight) {","            this.fire(EVT_SCROLL_RIGHT, facade);","        }","","        if (info.isScrollUp) {","            this.fire(EVT_SCROLL_UP, facade);","        } else if (info.isScrollDown) {","            this.fire(EVT_SCROLL_DOWN, facade);","        }","","        if (info.atBottom && (!lastScroll.atBottom ||","                info.scrollHeight > lastScroll.scrollHeight)) {","","            this.fire(EVT_SCROLL_TO_BOTTOM, facade);","        }","","        if (info.atLeft && !lastScroll.atLeft) {","            this.fire(EVT_SCROLL_TO_LEFT, facade);","        }","","        if (info.atRight && (!lastScroll.atRight ||","                info.scrollWidth > lastScroll.scrollWidth)) {","","            this.fire(EVT_SCROLL_TO_RIGHT, facade);","        }","","        if (info.atTop && !lastScroll.atTop) {","            this.fire(EVT_SCROLL_TO_TOP, facade);","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","    Handles browser resize events.","","    @method _afterResize","    @protected","    **/","    _afterResize: function () {","        this.refreshDimensions();","    },","","    /**","    Handles DOM `scroll` events.","","    @method _afterScroll","    @param {EventFacade} e","    @protected","    **/","    _afterScroll: function (e) {","        var self = this;","","        clearTimeout(this._scrollTimeout);","","        this._scrollTimeout = setTimeout(function () {","            self._triggerScroll(e);","        }, this._scrollDelay);","    },","","    /**","    Caches the `scrollDelay` value after that attribute changes to allow","    quicker lookups in critical path code.","","    @method _afterScrollDelayChange","    @param {EventFacade} e","    @protected","    **/","    _afterScrollDelayChange: function (e) {","        this._scrollDelay = e.newVal;","    },","","    /**","    Caches the `scrollMargin` value after that attribute changes to allow","    quicker lookups in critical path code.","","    @method _afterScrollMarginChange","    @param {EventFacade} e","    @protected","    **/","    _afterScrollMarginChange: function (e) {","        this._scrollMargin = e.newVal;","    }","}, {","    NS: 'scrollInfo',","","    ATTRS: {","        /**","        Number of milliseconds to wait after a native `scroll` event before","        firing local scroll events. If another native scroll event occurs during","        this time, previous events will be ignored. This ensures that we don't","        fire thousands of events when the user is scrolling quickly.","","        @attribute scrollDelay","        @type Number","        @default 50","        **/","        scrollDelay: {","            value: 50","        },","","        /**","        Additional margin in pixels beyond the onscreen region of the host node","        that should be considered \"onscreen\".","","        For example, if set to 50, then a `scrollToBottom` event would be fired","        when the user scrolls to within 50 pixels of the bottom of the","        scrollable region, even if they don't actually scroll completely to the","        very bottom pixel.","","        This margin also applies to the `getOffscreenNodes()` and","        `getOnscreenNodes()` methods by default.","","        @attribute scrollMargin","        @type Number","        @default 50","        **/","        scrollMargin: {","            value: 50","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"array-extras\", \"base-build\", \"event-resize\", \"node-pluginhost\", \"plugin\", \"selector\"]});"];
_yuitest_coverage["build/node-scroll-info/node-scroll-info.js"].lines = {"1":0,"69":0,"163":0,"167":0,"168":0,"169":0,"170":0,"171":0,"173":0,"175":0,"177":0,"181":0,"182":0,"203":0,"204":0,"207":0,"209":0,"210":0,"230":0,"231":0,"234":0,"236":0,"237":0,"253":0,"265":0,"299":0,"300":0,"326":0,"331":0,"332":0,"334":0,"337":0,"338":0,"339":0,"340":0,"352":0,"354":0,"382":0,"399":0,"401":0,"402":0,"405":0,"420":0,"424":0,"426":0,"428":0,"429":0,"430":0,"431":0,"434":0,"435":0,"436":0,"437":0,"440":0,"443":0,"446":0,"447":0,"450":0,"453":0,"456":0,"457":0,"470":0,"481":0,"483":0,"485":0,"486":0,"499":0,"511":0};
_yuitest_coverage["build/node-scroll-info/node-scroll-info.js"].functions = {"initializer:165":0,"destructor:180":0,"(anonymous 2):209":0,"getOffscreenNodes:202":0,"(anonymous 3):236":0,"getOnscreenNodes:229":0,"getScrollInfo:252":0,"isNodeOnscreen:298":0,"refreshDimensions:316":0,"_bind:351":0,"_getScrollNode:379":0,"_isElementOnscreen:398":0,"_triggerScroll:419":0,"_afterResize:469":0,"(anonymous 4):485":0,"_afterScroll:480":0,"_afterScrollDelayChange:498":0,"_afterScrollMarginChange:510":0,"(anonymous 1):1":0};
_yuitest_coverage["build/node-scroll-info/node-scroll-info.js"].coveredLines = 68;
_yuitest_coverage["build/node-scroll-info/node-scroll-info.js"].coveredFunctions = 19;
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 1);
YUI.add('node-scroll-info', function (Y, NAME) {

/**
Provides the ScrollInfo Node plugin, which exposes convenient events and methods
related to scrolling.

@module node-scroll-info
@since 3.7.0
**/

/**
Provides convenient events and methods related to scrolling. This could be used,
for example, to implement infinite scrolling, or to lazy-load content based on
the current scroll position.

### Example

    var body = Y.one('body');

    body.plug(Y.Plugin.ScrollInfo);

    body.scrollInfo.on('scrollToBottom', function (e) {
        // Load more content when the user scrolls to the bottom of the page.
    });

@class Plugin.ScrollInfo
@extends Plugin.Base
@since 3.7.0
**/

/**
Fired when the user scrolls within the host node.

This event (like all scroll events exposed by ScrollInfo) is throttled and fired
only after the number of milliseconds specified by the `scrollDelay` attribute
have passed in order to prevent thrashing.

This event passes along the event facade for the standard DOM `scroll` event and
mixes in the following additional properties.

@event scroll
@param {Boolean} atBottom Whether the current scroll position is at the bottom
    of the scrollable region.
@param {Boolean} atLeft Whether the current scroll position is at the extreme
    left of the scrollable region.
@param {Boolean} atRight Whether the current scroll position is at the extreme
    right of the scrollable region.
@param {Boolean} atTop Whether the current scroll position is at the top of the
    scrollable region.
@param {Boolean} isScrollDown `true` if the user scrolled down.
@param {Boolean} isScrollLeft `true` if the user scrolled left.
@param {Boolean} isScrollRight `true` if the user scrolled right.
@param {Boolean} isScrollUp `true` if the user scrolled up.
@param {Number} scrollBottom Y value of the bottom-most onscreen pixel of the
    scrollable region.
@param {Number} scrollHeight Total height in pixels of the scrollable region,
    including offscreen pixels.
@param {Number} scrollLeft X value of the left-most onscreen pixel of the
    scrollable region.
@param {Number} scrollRight X value of the right-most onscreen pixel of the
    scrollable region.
@param {Number} scrollTop Y value of the top-most onscreen pixel of the
    scrollable region.
@param {Number} scrollWidth Total width in pixels of the scrollable region,
    including offscreen pixels.
@see scrollDelay
@see scrollMargin
**/
_yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "(anonymous 1)", 1);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 69);
var EVT_SCROLL = 'scroll',

    /**
    Fired when the user scrolls down within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollDown
    @see scroll
    **/
    EVT_SCROLL_DOWN = 'scrollDown',

    /**
    Fired when the user scrolls left within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollLeft
    @see scroll
    **/
    EVT_SCROLL_LEFT = 'scrollLeft',

    /**
    Fired when the user scrolls right within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollRight
    @see scroll
    **/
    EVT_SCROLL_RIGHT = 'scrollRight',

    /**
    Fired when the user scrolls up within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollUp
    @see scroll
    **/
    EVT_SCROLL_UP = 'scrollUp',

    /**
    Fired when the user scrolls to the bottom of the scrollable region within
    the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToBottom
    @see scroll
    **/
    EVT_SCROLL_TO_BOTTOM = 'scrollToBottom',

    /**
    Fired when the user scrolls to the extreme left of the scrollable region
    within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToLeft
    @see scroll
    **/
    EVT_SCROLL_TO_LEFT = 'scrollToLeft',

    /**
    Fired when the user scrolls to the extreme right of the scrollable region
    within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToRight
    @see scroll
    **/
    EVT_SCROLL_TO_RIGHT = 'scrollToRight',

    /**
    Fired when the user scrolls to the top of the scrollable region within the
    host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToTop
    @see scroll
    **/
    EVT_SCROLL_TO_TOP = 'scrollToTop';

_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 163);
Y.Plugin.ScrollInfo = Y.Base.create('scrollInfoPlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        // Cache for quicker lookups in the critical path.
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "initializer", 165);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 167);
this._host         = config.host;
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 168);
this._hostIsBody   = this._host.get('nodeName').toLowerCase() === 'body';
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 169);
this._scrollDelay  = this.get('scrollDelay');
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 170);
this._scrollMargin = this.get('scrollMargin');
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 171);
this._scrollNode   = this._getScrollNode();

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 173);
this.refreshDimensions();

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 175);
this._lastScroll = this.getScrollInfo();

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 177);
this._bind();
    },

    destructor: function () {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "destructor", 180);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 181);
new Y.EventHandle(this._events).detach();
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 182);
this._events = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Returns a NodeList containing all offscreen nodes inside the host node that
    match the given CSS selector. An offscreen node is any node that is entirely
    outside the visible (onscreen) region of the host node based on the current
    scroll location.

    @method getOffscreenNodes
    @param {String} [selector] CSS selector. If omitted, all offscreen nodes
        will be returned.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {NodeList} Offscreen nodes matching _selector_.
    @see scrollMargin
    **/
    getOffscreenNodes: function (selector, margin) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "getOffscreenNodes", 202);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 203);
if (typeof margin === 'undefined') {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 204);
margin = this._scrollMargin;
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 207);
var elements = Y.Selector.query(selector || '*', this._host._node);

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 209);
return new Y.NodeList(Y.Array.filter(elements, function (el) {
            _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "(anonymous 2)", 209);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 210);
return !this._isElementOnscreen(el, margin);
        }, this));
    },

    /**
    Returns a NodeList containing all onscreen nodes inside the host node that
    match the given CSS selector. An onscreen node is any node that is fully or
    partially within the visible (onscreen) region of the host node based on the
    current scroll location.

    @method getOnscreenNodes
    @param {String} [selector] CSS selector. If omitted, all onscreen nodes will
        be returned.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {NodeList} Onscreen nodes matching _selector_.
    @see scrollMargin
    **/
    getOnscreenNodes: function (selector, margin) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "getOnscreenNodes", 229);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 230);
if (typeof margin === 'undefined') {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 231);
margin = this._scrollMargin;
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 234);
var elements = Y.Selector.query(selector || '*', this._host._node);

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 236);
return new Y.NodeList(Y.Array.filter(elements, function (el) {
            _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "(anonymous 3)", 236);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 237);
return this._isElementOnscreen(el, margin);
        }, this));
    },

    /**
    Returns an object hash containing information about the current scroll
    position of the host node. This is the same information that's mixed into
    the event facade of the `scroll` event and other scroll-related events.

    @method getScrollInfo
    @return {Object} Object hash containing information about the current scroll
        position. See the `scroll` event for details on what properties this
        object contains.
    @see scroll
    **/
    getScrollInfo: function () {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "getScrollInfo", 252);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 253);
var domNode    = this._scrollNode,
            lastScroll = this._lastScroll,
            margin     = this._scrollMargin,

            scrollLeft   = domNode.scrollLeft,
            scrollHeight = domNode.scrollHeight,
            scrollTop    = domNode.scrollTop,
            scrollWidth  = domNode.scrollWidth,

            scrollBottom = scrollTop + this._height,
            scrollRight  = scrollLeft + this._width;

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 265);
return {
            atBottom: scrollBottom > (scrollHeight - margin),
            atLeft  : scrollLeft < margin,
            atRight : scrollRight > (scrollWidth - margin),
            atTop   : scrollTop < margin,

            isScrollDown : lastScroll && scrollTop > lastScroll.scrollTop,
            isScrollLeft : lastScroll && scrollLeft < lastScroll.scrollLeft,
            isScrollRight: lastScroll && scrollLeft > lastScroll.scrollLeft,
            isScrollUp   : lastScroll && scrollTop < lastScroll.scrollTop,

            scrollBottom: scrollBottom,
            scrollHeight: scrollHeight,
            scrollLeft  : scrollLeft,
            scrollRight : scrollRight,
            scrollTop   : scrollTop,
            scrollWidth : scrollWidth
        };
    },

    /**
    Returns `true` if _node_ is at least partially onscreen within the host
    node, `false` otherwise.

    @method isNodeOnscreen
    @param {HTMLElement|Node|String} node Node or selector to check.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {Boolean} `true` if _node_ is at least partially onscreen within the
        host node, `false` otherwise.
    @since @SINCE@
    **/
    isNodeOnscreen: function (node, margin) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "isNodeOnscreen", 298);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 299);
node = Y.one(node);
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 300);
return !!(node && this._isElementOnscreen(node._node, margin));
    },

    /**
    Refreshes cached position, height, and width dimensions for the host node.
    If the host node is the body, then the viewport height and width will be
    used.

    This info is cached to improve performance during scroll events, since it's
    expensive to touch the DOM for these values. Dimensions are automatically
    refreshed whenever the browser is resized, but if you change the dimensions
    or position of the host node in JS, you may need to call
    `refreshDimensions()` manually to cache the new dimensions.

    @method refreshDimensions
    **/
    refreshDimensions: function () {
        // WebKit only returns reliable scroll info on the body, and only
        // returns reliable height/width info on the documentElement, so we
        // have to special-case it (see the other special case in
        // _getScrollNode()).
        //
        // On iOS devices, documentElement.clientHeight/Width aren't reliable,
        // but window.innerHeight/Width are. And no, dom-screen's viewport size
        // methods don't account for this, which is why we do it here.

        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "refreshDimensions", 316);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 326);
var hostIsBody = this._hostIsBody,
            iosHack    = hostIsBody && Y.UA.ios,
            win        = Y.config.win,
            el;

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 331);
if (hostIsBody && Y.UA.webkit) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 332);
el = Y.config.doc.documentElement;
        } else {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 334);
el = this._scrollNode;
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 337);
this._height = iosHack ? win.innerHeight : el.clientHeight;
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 338);
this._left   = el.offsetLeft;
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 339);
this._top    = el.offsetTop;
        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 340);
this._width  = iosHack ? win.innerWidth : el.clientWidth;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Binds event handlers.

    @method _bind
    @protected
    **/
    _bind: function () {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_bind", 351);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 352);
var winNode = Y.one('win');

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 354);
this._events = [
            this.after({
                scrollDelayChange : this._afterScrollDelayChange,
                scrollMarginChange: this._afterScrollMarginChange
            }),

            winNode.on('windowresize', this._afterResize, this),

            // If we're attached to the body, listen for the scroll event on the
            // window, since <body> doesn't have a scroll event.
            (this._hostIsBody ? winNode : this._host).after(
                'scroll', this._afterScroll, this)
        ];
    },

    /**
    Returns the DOM node that should be used to lookup scroll coordinates. In
    some browsers, the `<body>` element doesn't return scroll coordinates, and
    the documentElement must be used instead; this method takes care of
    determining which node should be used.

    @method _getScrollNode
    @return {HTMLElement} DOM node.
    @protected
    **/
    _getScrollNode: function () {
        // WebKit returns scroll coordinates on the body element, but other
        // browsers don't, so we have to use the documentElement.
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_getScrollNode", 379);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 382);
return this._hostIsBody && !Y.UA.webkit ? Y.config.doc.documentElement :
                Y.Node.getDOMNode(this._host);
    },

    /**
    Underlying element-based implementation for `isNodeOnscreen()`.

    @method _isElementOnscreen
    @param {HTMLElement} el HTML element.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {Boolean} `true` if _el_ is at least partially onscreen within the
        host node, `false` otherwise.
    @since @SINCE@
    **/
    _isElementOnscreen: function (el, margin) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_isElementOnscreen", 398);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 399);
var rect = el.getBoundingClientRect();

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 401);
if (typeof margin === 'undefined') {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 402);
margin = this._scrollMargin;
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 405);
return (rect.top < this._height + margin
            && rect.bottom >= -margin
            && rect.right >= -margin
            && rect.left < this._width + margin);
    },

    /**
    Mixes detailed scroll information into the given DOM `scroll` event facade
    and fires appropriate local events.

    @method _triggerScroll
    @param {EventFacade} e Event facade from the DOM `scroll` event.
    @protected
    **/
    _triggerScroll: function (e) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_triggerScroll", 419);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 420);
var info       = this.getScrollInfo(),
            facade     = Y.merge(e, info),
            lastScroll = this._lastScroll;

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 424);
this._lastScroll = info;

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 426);
this.fire(EVT_SCROLL, facade);

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 428);
if (info.isScrollLeft) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 429);
this.fire(EVT_SCROLL_LEFT, facade);
        } else {_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 430);
if (info.isScrollRight) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 431);
this.fire(EVT_SCROLL_RIGHT, facade);
        }}

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 434);
if (info.isScrollUp) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 435);
this.fire(EVT_SCROLL_UP, facade);
        } else {_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 436);
if (info.isScrollDown) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 437);
this.fire(EVT_SCROLL_DOWN, facade);
        }}

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 440);
if (info.atBottom && (!lastScroll.atBottom ||
                info.scrollHeight > lastScroll.scrollHeight)) {

            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 443);
this.fire(EVT_SCROLL_TO_BOTTOM, facade);
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 446);
if (info.atLeft && !lastScroll.atLeft) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 447);
this.fire(EVT_SCROLL_TO_LEFT, facade);
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 450);
if (info.atRight && (!lastScroll.atRight ||
                info.scrollWidth > lastScroll.scrollWidth)) {

            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 453);
this.fire(EVT_SCROLL_TO_RIGHT, facade);
        }

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 456);
if (info.atTop && !lastScroll.atTop) {
            _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 457);
this.fire(EVT_SCROLL_TO_TOP, facade);
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles browser resize events.

    @method _afterResize
    @protected
    **/
    _afterResize: function () {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_afterResize", 469);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 470);
this.refreshDimensions();
    },

    /**
    Handles DOM `scroll` events.

    @method _afterScroll
    @param {EventFacade} e
    @protected
    **/
    _afterScroll: function (e) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_afterScroll", 480);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 481);
var self = this;

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 483);
clearTimeout(this._scrollTimeout);

        _yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 485);
this._scrollTimeout = setTimeout(function () {
            _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "(anonymous 4)", 485);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 486);
self._triggerScroll(e);
        }, this._scrollDelay);
    },

    /**
    Caches the `scrollDelay` value after that attribute changes to allow
    quicker lookups in critical path code.

    @method _afterScrollDelayChange
    @param {EventFacade} e
    @protected
    **/
    _afterScrollDelayChange: function (e) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_afterScrollDelayChange", 498);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 499);
this._scrollDelay = e.newVal;
    },

    /**
    Caches the `scrollMargin` value after that attribute changes to allow
    quicker lookups in critical path code.

    @method _afterScrollMarginChange
    @param {EventFacade} e
    @protected
    **/
    _afterScrollMarginChange: function (e) {
        _yuitest_coverfunc("build/node-scroll-info/node-scroll-info.js", "_afterScrollMarginChange", 510);
_yuitest_coverline("build/node-scroll-info/node-scroll-info.js", 511);
this._scrollMargin = e.newVal;
    }
}, {
    NS: 'scrollInfo',

    ATTRS: {
        /**
        Number of milliseconds to wait after a native `scroll` event before
        firing local scroll events. If another native scroll event occurs during
        this time, previous events will be ignored. This ensures that we don't
        fire thousands of events when the user is scrolling quickly.

        @attribute scrollDelay
        @type Number
        @default 50
        **/
        scrollDelay: {
            value: 50
        },

        /**
        Additional margin in pixels beyond the onscreen region of the host node
        that should be considered "onscreen".

        For example, if set to 50, then a `scrollToBottom` event would be fired
        when the user scrolls to within 50 pixels of the bottom of the
        scrollable region, even if they don't actually scroll completely to the
        very bottom pixel.

        This margin also applies to the `getOffscreenNodes()` and
        `getOnscreenNodes()` methods by default.

        @attribute scrollMargin
        @type Number
        @default 50
        **/
        scrollMargin: {
            value: 50
        }
    }
});


}, '@VERSION@', {"requires": ["array-extras", "base-build", "event-resize", "node-pluginhost", "plugin", "selector"]});
