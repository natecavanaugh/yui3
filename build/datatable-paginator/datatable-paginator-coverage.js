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
_yuitest_coverage["build/datatable-paginator/datatable-paginator.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatable-paginator/datatable-paginator.js",
    code: []
};
_yuitest_coverage["build/datatable-paginator/datatable-paginator.js"].code=["YUI.add('datatable-paginator', function (Y, NAME) {","","/**"," Adds support for paging through data in the DataTable.",""," @module datatable"," @submodule datatable-paginator"," @since @SINCE@"," */","","var Model,","    View,","    PaginatorTemplates = Y.DataTable.Templates.Paginator,","    sub = Y.Lang.sub,","    getClassName = Y.ClassNameManager.getClassName,","    CLASS_DISABLED = getClassName(NAME, 'control-disabled'),","    EVENT_UI = 'paginator:ui';","","","/**"," @class DataTable.Paginator.Model"," @extends Model"," @since @SINCE@"," */","Model = Y.Base.create('dt-pg-model', Y.Model, [Y.Paginator.Core]),","","/**"," @class DataTable.Paginator.View"," @extends View"," @since @SINCE@"," */","View = Y.Base.create('dt-pg-view', Y.View, [], {","    /**","     Array of event handles to keep track of what should be destroyed later","     @protected","     @property _eventHandles","     @type {Array}","     @SINCE@","     */","    _eventHandles: [],","","    /**","     Template for this view's container.","     @property containerTemplate","     @type {String}","     @default '<div class=\"yui3-datatable-paginator\"/>'","     @SINCE@","     */","    containerTemplate: '<div class=\"{paginator}\"/>',","","    /**","     Template for content. Helps maintain order of controls.","     @property contentTemplate","     @type {String}","     @default '{buttons}{goto}{perPage}'","     @SINCE@","     */","    contentTemplate: '{buttons}{goto}{perPage}',","","    /**","     Disables ad-hoc ATTRS for our view.","     @protected","     @property _allowAdHocAttrs","     @type {Boolean}","     @default false","     @SINCE@","     */","    _allowAdHocAttrs: false,","","    /**","     Sets classnames on the templates and bind events","     @method initializer","     @SINCE@","     */","    initializer: function () {","        this.containerTemplate = sub(this.containerTemplate, {","            paginator: getClassName(NAME)","        });","","        this._initStrings();","        this._initClassNames();","","        this.attachEvents();","    },","","    /**","     @method render","     @chainable","     @SINCE@","     */","    render: function () {","        var model = this.get('model'),","            content = sub(this.contentTemplate, {","                'buttons': this._buildButtonsGroup(),","                'goto': this._buildGotoGroup(),","                'perPage': this._buildPerPageGroup()","            });","","        this.get('container').append(content);","","        this._rendered = true;","","        this._updateControlsUI(model.get('page'));","        this._updateItemsPerPageUI(model.get('itemsPerPage'));","","        return this;","    },","","    /**","     @method attachEvents","     @SINCE@","     */","    attachEvents: function () {","        View.superclass.attachEvents.apply(this, arguments);","","        var container = this.get('container');","","        if (!this.classNames) {","            this._initClassNames();","        }","","        this._attachedViewEvents.push(","            container.delegate('click', this._controlClick, '.' + this.classNames.control, this),","            container.after('change', this._controlChange, this, 'select'),","            container.after('submit', this._controlSubmit, this, 'form'),","            this.get('model').after('change', this._modelChange, this)","        );","","    },","","    /**","     Returns a string built from the button and buttons templates.","     @protected","     @method _buildButtonsGroup","     @return {String}","     @SINCE@","     */","    _buildButtonsGroup: function () {","        var strings = this.get('strings'),","            classNames = this.classNames,","            buttons;","","        buttons = PaginatorTemplates.button({","                    type: 'first', label: strings.first, classNames: classNames","                }) +","                PaginatorTemplates.button({","                    type: 'prev',  label: strings.prev,  classNames: classNames","                }) +","                PaginatorTemplates.button({","                    type: 'next',  label: strings.next,  classNames: classNames","                }) +","                PaginatorTemplates.button({","                    type: 'last',  label: strings.last,  classNames: classNames","                });","","        return PaginatorTemplates.buttons({","            classNames: classNames,","            buttons: buttons","        });","","    },","","    /**","     Returns a string built from the gotoPage template.","     @protected","     @method _buildGotoGroup","     @return {String}","     @SINCE@","     */","    _buildGotoGroup: function () {","","        return PaginatorTemplates.gotoPage({","            classNames: this.classNames,","            strings: this.get('strings'),","            page: this.get('model').get('page')","        });","    },","","    /**","     Returns a string built from the perPage template","     @protected","     @method _buildPerPageGroup","     @return {String}","     @SINCE@","     */","    _buildPerPageGroup: function () {","        var options = this.get('pageSizes'),","            rowsPerPage = this.get('model').get('rowsPerPage'),","            option,","            len,","            i;","","        for (i = 0, len = options.length; i < len; i++ ) {","            option = options[i];","","            if (typeof option !== 'object') {","                option = {","                    value: option,","                    label: option","                };","            }","            option.selected = (option.value === rowsPerPage) ? ' selected' : '';","        }","","        return PaginatorTemplates.perPage({","            classNames: this.classNames,","            strings: this.get('strings'),","            options: this.get('pageSizes')","        });","","    },","","    /**","     Update the UI after the model has changed.","     @protected","     @method _modelChange","     @param {EventFacade} e","     @SINCE@","     */","    _modelChange: function (e) {","        var changed = e.changed,","            page = (changed && changed.page),","            itemsPerPage = (changed && changed.itemsPerPage);","","        if (page) {","            this._updateControlsUI(page.newVal);","        }","        if (itemsPerPage) {","            this._updateItemsPerPageUI(itemsPerPage.newVal);","            if (!page) {","                this._updateControlsUI(e.target.get('page'));","            }","        }","","    },","","    /**","     Updates the button controls and the gotoPage form","     @protected","     @method _updateControlsUI","     @param {Number} val Page number to set the UI input to","     @SINCE@","     */","    _updateControlsUI: function (val) {","        if (!this._rendered) {","            return;","        }","","        var model = this.get('model'),","            controlClass = '.' + this.classNames.control,","            container = this.get('container'),","            hasPrev = model.hasPrevPage(),","            hasNext = model.hasNextPage();","","        container.one(controlClass + '-first')","                 .toggleClass(CLASS_DISABLED, !hasPrev)","                 .set('disabled', !hasPrev);","","        container.one(controlClass + '-prev')","                 .toggleClass(CLASS_DISABLED, !hasPrev)","                 .set('disabled', !hasPrev);","","        container.one(controlClass + '-next')","                 .toggleClass(CLASS_DISABLED, !hasNext)","                 .set('disabled', !hasNext);","","        container.one(controlClass + '-last')","                 .toggleClass(CLASS_DISABLED, !hasNext)","                 .set('disabled', !hasNext);","","        container.one('form input').set('value', val);","    },","","    /**","     Updates the drop down select for items per page","     @protected","     @method _updateItemsPerPageUI","     @param {Number} val Number of items to display per page","     @SINCE@","     */","    _updateItemsPerPageUI: function (val) {","        if (!this._rendered) {","            return;","        }","","        this.get('container').one('select').set('value', val);","    },","","    /**","     Fire EVENT_UI when an enabled control button is clicked","     @protected","     @method _controlClick","     @param {EventFacade} e","     @SINCE@","     */","    _controlClick: function (e) { // buttons","        e.preventDefault();","        var control = e.currentTarget;","        // register click events from the four control buttons","        if (control.hasClass(CLASS_DISABLED)) {","            return;","        }","        this.fire(EVENT_UI, {","            type: control.getData('type'),","            val: control.getData('page') || null","        });","    },","","    /**","     Fire EVENT_UI with `type:perPage` after the select drop down changes","     @protected","     @method _controlChange","     @param {EventFacade} e","     @param {String} selector","     @SINCE@","     */","    _controlChange: function (e, selector) {","        var control = e.target,","            val;","","        // register change events from the perPage select","        if (","            control.hasClass(CLASS_DISABLED) ||","            ( selector && !(control.test(selector)) )","        ) {","            return;","        }","","        val = e.target.get('value');","        this.fire(EVENT_UI, { type: 'perPage', val: parseInt(val, 10) });","    },","","    /**","     Fire EVENT_UI with `type:page` after form is submitted","     @protected","     @method _controlSubmit","     @param {EventFacade} e","     @param {String} selector","     @SINCE@","     */","    _controlSubmit: function (e, selector) {","        var control = e.target,","            input;","","        if (","            control.hasClass(CLASS_DISABLED) ||","            ( selector && !(control.test(selector)) )","        ) {","            return;","        }","","        // the only form we have is the go to page form","        e.preventDefault();","","        input = e.target.one('input');","        this.fire(EVENT_UI, { type: 'page', val: input.get('value') });","    },","","    /**","     Initializes classnames to be used with the templates","     @protected","     @method _initClassNames","     @SINCE@","     */","    _initClassNames: function () {","        this.classNames = {","            control: getClassName(NAME, 'control'),","            controls: getClassName(NAME, 'controls'),","            group: getClassName(NAME, 'group'),","            perPage: getClassName(NAME, 'per-page')","        };","    },","","    /**","     Initializes strings used for internationalization","     @protected","     @method _initStrings","     @SINCE@","     */","    _initStrings: function () {","        // Not a valueFn because other class extensions may want to add to it","        this.set('strings', Y.mix((this.get('strings') || {}),","            Y.Intl.get('datatable-paginator')));","    }","}, {","    ATTRS: {","        /**","         Array of values used to populate the drop down for items per page","         @attribute pageSizes","         @type {Array}","         @default [ 10, 50, 100, { label: 'Show All', value: -1 } ]","         @SINCE@","         */","        pageSizes: {","            value: [ 10, 50, 100, { label: 'Show All', value: -1 } ]","        },","","        /**","         Model used for this view","         @attribute model","         @type {Y.Model}","         @default null","         @since @SINCE@","         */","        model: {}","    }","});","","/**"," @class DataTable.Paginator"," @since @SINCE@"," */","function Controller () {}","","Controller.ATTRS = {","    /**","     A model instance or a configuration object for the Model.","     @attribute paginatorModel","     @type {Y.Model | Object}","     @default null","     @since @SINCE@","     */","    paginatorModel: {","        setter: '_setPaginatorModel',","        value: null,","        writeOnce: 'initOnly'","    },","","    /**","     A pointer to a Model object to be instantiated, or a String off of the","     `Y` namespace.","","     This is only used if the `pagiantorModel` is a configuration object or","     is null.","     @attribute paginatorModelType","     @type {Y.Model | String}","     @default 'DataTable.Paginator.Model'","     @since @SINCE@","     */","    paginatorModelType: {","        getter: '_getConstructor',","        value: 'DataTable.Paginator.Model',","        writeOnce: 'initOnly'","    },","","    /**","     A pointer to a `Y.View` object to be instantiated. A new view will be","     created for each location provided. Each view created will be given the","     same model instance.","     @attribute paginatorView","     @type {Y.View | String}","     @default 'DataTable.Paginator.View'","     @since @SINCE@","     */","    paginatorView: {","        getter: '_getConstructor',","        value: 'DataTable.Paginator.View',","        writeOnce: 'initOnly'","    },","","    // PAGINATOR CONFIGS","    /**","     Array of values used to populate the values in the Paginator UI allowing","     the end user to select the number of items to display per page.","     @attribute pageSizes","     @type {Array}","     @default [10, 50, 100, { label: 'Show All', value: -1 }]","     @since @SINCE@","     */","    pageSizes: {","        setter: '_setPageSizesFn',","        value: [10, 50, 100, { label: 'Show All', value: -1 }]","    },","","    /**","     Number of rows to display per page. As the UI changes the number of pages","     to display, this will update to reflect the value selected in the UI","     @attribute rowsPerPage","     @type {Number | null}","     @default null","     @since @SINCE@","     */","    rowsPerPage: {","        value: null","    },","","    /**","     String of `footer` or `header`, a Y.Node, or an Array or any combination","     of those values.","     @attribute paginatorLocation","     @type {String | Array | Y.Node}","     @default footer","     @since @SINCE@","     */","    paginatorLocation: {","        value: 'footer'","    }","};","","Y.mix(Controller.prototype, {","    /**","     Sets the `paginatorModel` to the first page.","     @method firstPage","     @chainable","     @since @SINCE@","     */","    firstPage: function () {","        this.get('paginatorModel').set('page', 1);","        return this;","    },","","    /**","     Sets the `paginatorModel` to the last page.","     @method lastPage","     @chainable","     @since @SINCE@","     */","    lastPage: function () {","        var model = this.get('paginatorModel');","        model.set('page', model.get('totalPages'));","        return this;","    },","","    /**","     Sets the `paginatorModel` to the previous page.","     @method previousPage","     @chainable","     @since @SINCE@","     */","    previousPage: function () {","        this.get('paginatorModel').prevPage();","        return this;","    },","","    /**","     Sets the `paginatorModel` to the next page.","     @method nextPage","     @chainable","     @since @SINCE@","     */","    nextPage: function () {","        this.get('paginatorModel').nextPage();","        return this;","    },","","","    /// Init and protected","    /**","     Constructor logic","     @protected","     @method initializer","     @since @SINCE@","     */","    initializer: function () {","        // allow DT to use paged data","        this._augmentData();","","        if (!this._eventHandles.paginatorRender) {","            this._eventHandles.paginatorRender = Y.Do.after(this._paginatorRender, this, 'render');","        }","    },","","    /**","     Renders the paginator into locations and attaches events.","     @protected","     @method _paginatorRender","     @since @SINCE@","     */","    _paginatorRender: function () {","        var model = this.get('paginatorModel');","","        this._paginatorRenderUI();","        model.after('change', this._afterPaginatorModelChange, this);","        this.after('dataChange', this._afterDataChangeWithPaginator, this);","        this.after('rowsPerPageChange', this._afterRowsPerPageChange, this);","","        // ensure our model has the correct totalItems set","        model.set('itemsPerPage', this.get('rowsPerPage'));","        model.set('totalItems', this.get('data').size());","    },","","    /**","     After the data changes, we ensure we are on the first page and the data","     is augmented","     @protected","     @method _afterDataChangeWithPaginator","     @since @SINCE@","     */","    _afterDataChangeWithPaginator: function () {","        var data = this.get('data'),","            model = this.get('paginatorModel');","","        if (model.get('page') !== 1) {","            this.firstPage();","        } else {","            this._augmentData();","","            data.fire.call(data, 'reset', {","                src: 'reset',","                models: data._items.concat()","            });","        }","    },","","    /**","     After the rowsPerPage changes, update the UI to reflect the new number of","     rows to be displayed. If the new value is `null`, destroy all instances","     of the paginators.","     @protected","     @method _afterRowsPerPageChange","     @param {EventFacade} e","     @since @SINCE@","     */","    _afterRowsPerPageChange: function (e) {","        var data = this.get('data'),","            model = this.get('paginatorModel'),","            view;","","        if (e.newVal !== null) {","            // turning on","            this._paginatorRenderUI();","","            if (!(data._paged)) {","                this._augmentData();","            }","","            data._paged.index = (model.get('page') - 1) * model.get('itemsPerPage');","            data._paged.length = model.get('itemsPerPage');","","        } else { // e.newVal === null","            // destroy!","            while(this._pgViews.length) {","                view = this._pgViews.shift();","                view.destroy({ remove: true });","                view._rendered = null;","            }","","            data._paged.index = 0;","            data._paged.length = null;","        }","","        this.get('paginatorModel').set('itemsPerPage', parseInt(e.newVal, 10));","    },","","    /**","     Parse each location and render a new view into each area.","     @protected","     @method _paginatorRenderUI","     @since @SINCE@","     */","    _paginatorRenderUI: function () {","        if (!this.get('rowsPerPage')) {","            return;","        }","        var views = this._pgViews,","            ViewClass = this.get('paginatorView'),","            viewConfig = {","                pageSizes: this.get('pageSizes'),","                model: this.get('paginatorModel')","            },","            locations = this.get('paginatorLocation');","","        if (!Y.Lang.isArray(locations)) {","            locations = [locations];","        }","","        if (!views) { // set up initial rendering of views","            views = this._pgViews = [];","        }","","        // for each placement area, push to views","        Y.Array.each(locations, function (location) {","            var view = new ViewClass(viewConfig),","                container = view.render().get('container'),","                row;","","            view.after('*:ui', this._uiPgHandler, this);","            views.push(view);","","            if (location._node) { // assume Y.Node","                location.append(container);","                // remove this container row if the view is ever destroyed","                this.after('destroy', function (/* e */) {","                    view.destroy({ remove: true });","                });","            } else if (location === 'footer') { // DT Footer","                // Render a table footer if there isn't one","                if (!this.foot) {","                    this.foot = new Y.DataTable.FooterView({ host: this });","                    this.foot.render();","                    this.fire('renderFooter', { view: this.foot });","                }","","                // create a row for the paginator to sit in","                row = Y.Node.create(PaginatorTemplates.rowWrapper({","                    wrapperClass: getClassName(NAME, 'wrapper'),","                    numOfCols: this.get('columns').length","                }));","","                row.one('td').append(container);","                this.foot.tfootNode.append(row);","","                // remove this container row if the view is ever destroyed","                view.after('destroy', function (/* e */) {","                    row.remove(true);","                });","            } else if (location === 'header') {","                // 'header' means insert before the table","                // placement with the caption may need to be addressed","                if (this.view && this.view.tableNode) {","                    this.view.tableNode.insert(container, 'before');","                } else {","                    this.get('contentBox').prepend(container);","                }","            }","        }, this);","","    },","","    /**","     Handles the paginator's UI event into a single location. Updates the","     `paginatorModel` according to what type is provided.","     @protected","     @method _uiPgHandler","     @param {EventFacade} e","     @since @SINCE@","     */","    _uiPgHandler: function (e) {","        // e.type = control type (first|prev|next|last|page|perPage)","        // e.val = value based on the control type to pass to the model","        var model = this.get('paginatorModel');","","        switch (e.type) {","            case 'first':","                model.set('page', 1);","                break;","            case 'last':","                model.set('page', model.get('totalPages'));","                break;","            case 'prev':","            case 'next': // overflow intentional","                model[e.type + 'Page']();","                break;","            case 'page':","                model.set('page', e.val);","                break;","            case 'perPage':","                model.set('itemsPerPage', e.val);","                model.set('page', 1);","                break;","        }","    },","","    /**","     Augments the model list with a paged structure, or updates the paged","     data. Then fires reset on the model list.","     @protected","     @method _afterPaginatorModelChange","     @param {EventFacade} [e]","     @since @SINCE@","     */","    _afterPaginatorModelChange: function () {","        var model = this.get('paginatorModel'),","            data = this.get('data');","","        if (!data._paged) {","            this._augmentData();","        } else {","            data._paged.index = (model.get('page') - 1) * model.get('itemsPerPage');","            data._paged.length = model.get('itemsPerPage');","        }","","        data.fire.call(data, 'reset', {","            src: 'reset',","            models: data._items.concat()","        });","    },","","    /**","     Augments the model list data structure with paged implementations.","","     The model list will contain a method for `getPage` that will return the","     given number of items listed within the range.","","     `each` will also loop over the items in the page","     @protected","     @method _augmentData","     @since @SINCE@","     */","    _augmentData: function () {","        var model = this.get('paginatorModel');","","        if (this.get('rowsPerPage') === null) {","            return;","        }","","        Y.mix(this.get('data'), {","","            _paged: {","                index: (model.get('page') - 1) * model.get('itemsPerPage'),","                length: model.get('itemsPerPage')","            },","","            getPage: function () {","                var _pg = this._paged,","                    min = _pg.index,","                    max = (_pg.length >= 0) ? min + _pg.length : undefined;","","                return this._items.slice(min, max);","            },","","            size: function (paged) {","                return (paged && this._paged.length >=0 ) ?","                    this._paged.length :","                    this._items.length;","            },","","            each: function () {","                var args = Array.prototype.slice.call(arguments);","                args.unshift(this.getPage());","","                Y.Array.each.apply(null, args);","","                return this;","            }","        }, true);","    },","","    /**","     Ensures `pageSizes` value is an array of objects to be used in the","     paginator view.","     @protected","     @method _setPageSizesFn","     @param {Array} val","     @return Array","     @since @SINCE@","     */","    _setPageSizesFn: function (val) {","        var i,","            len = val.length,","            label,","            value;","","        if (!Y.Lang.isArray(val)) {","            val = [val];","            len = val.length;","        }","","        for ( i = 0; i < len; i++ ) {","            if (typeof val[i] !== 'object') {","                label = val[i];","                value = val[i];","","                // We want to check to see if we have a number or a string","                // of a number. If we do not, we want the value to be -1 to","                // indicate \"all rows\"","                /*jshint eqeqeq:false */","                if (parseInt(value, 10) != value) {","                    value = -1;","                }","                /*jshint eqeqeq:true */","                val[i] = { label: label, value: value };","            }","        }","","        return val;","    },","","    /**","     Ensures the object provided is an instance of a `Y.Model`. If it is not,","     it assumes it is the configuration of a model, and gets the new model","     type from `paginatorModelType`.","     @protected","     @method _setPaginatorModel","     @param {Y.Model | Object} model","     @return Y.Model instance","     @since @SINCE@","     */","    _setPaginatorModel: function (model) {","        if (!(model && model._isYUIModel)) {","            var ModelConstructor = this.get('paginatorModelType');","            model = new ModelConstructor(model);","        }","","        return model;","    },","","    /**","     Returns a pointer to an object to be instantiated if the provided type is","     a string","     @protected","     @method _getConstructor","     @param {Object | String} type Type of Object to contruct. If `type` is a","       String, we assume it is a namespace off the Y object","     @return","     @since @SINCE@","     */","    _getConstructor: function (type) {","        return typeof type === 'string' ?","            Y.Object.getValue(Y, type.split('.')) :","            type;","    }","}, true);","","","Y.DataTable.Paginator = Controller;","Y.DataTable.Paginator.Model = Model;","Y.DataTable.Paginator.View = View;","","Y.Base.mix(Y.DataTable, [Y.DataTable.Paginator]);","","","}, '@VERSION@', {","    \"requires\": [","        \"model\",","        \"view\",","        \"paginator-core\",","        \"datatable-foot\",","        \"datatable-paginator-templates\"","    ],","    \"lang\": [","        \"en\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/datatable-paginator/datatable-paginator.js"].lines = {"1":0,"11":0,"25":0,"76":0,"80":0,"81":0,"83":0,"92":0,"99":0,"101":0,"103":0,"104":0,"106":0,"114":0,"116":0,"118":0,"119":0,"122":0,"139":0,"143":0,"156":0,"172":0,"187":0,"193":0,"194":0,"196":0,"197":0,"202":0,"205":0,"221":0,"225":0,"226":0,"228":0,"229":0,"230":0,"231":0,"245":0,"246":0,"249":0,"255":0,"259":0,"263":0,"267":0,"271":0,"282":0,"283":0,"286":0,"297":0,"298":0,"300":0,"301":0,"303":0,"318":0,"322":0,"326":0,"329":0,"330":0,"342":0,"345":0,"349":0,"353":0,"355":0,"356":0,"366":0,"382":0,"413":0,"415":0,"500":0,"508":0,"509":0,"519":0,"520":0,"521":0,"531":0,"532":0,"542":0,"543":0,"556":0,"558":0,"559":0,"570":0,"572":0,"573":0,"574":0,"575":0,"578":0,"579":0,"590":0,"593":0,"594":0,"596":0,"598":0,"615":0,"619":0,"621":0,"623":0,"624":0,"627":0,"628":0,"632":0,"633":0,"634":0,"635":0,"638":0,"639":0,"642":0,"652":0,"653":0,"655":0,"663":0,"664":0,"667":0,"668":0,"672":0,"673":0,"677":0,"678":0,"680":0,"681":0,"683":0,"684":0,"686":0,"688":0,"689":0,"690":0,"691":0,"695":0,"700":0,"701":0,"704":0,"705":0,"707":0,"710":0,"711":0,"713":0,"731":0,"733":0,"735":0,"736":0,"738":0,"739":0,"742":0,"743":0,"745":0,"746":0,"748":0,"749":0,"750":0,"763":0,"766":0,"767":0,"769":0,"770":0,"773":0,"791":0,"793":0,"794":0,"797":0,"805":0,"809":0,"813":0,"819":0,"820":0,"822":0,"824":0,"839":0,"844":0,"845":0,"846":0,"849":0,"850":0,"851":0,"852":0,"858":0,"859":0,"862":0,"866":0,"880":0,"881":0,"882":0,"885":0,"899":0,"906":0,"907":0,"908":0,"910":0};
_yuitest_coverage["build/datatable-paginator/datatable-paginator.js"].functions = {"initializer:75":0,"render:91":0,"attachEvents:113":0,"_buildButtonsGroup:138":0,"_buildGotoGroup:170":0,"_buildPerPageGroup:186":0,"_modelChange:220":0,"_updateControlsUI:244":0,"_updateItemsPerPageUI:281":0,"_controlClick:296":0,"_controlChange:317":0,"_controlSubmit:341":0,"_initClassNames:365":0,"_initStrings:380":0,"Controller:413":0,"firstPage:507":0,"lastPage:518":0,"previousPage:530":0,"nextPage:541":0,"initializer:554":0,"_paginatorRender:569":0,"_afterDataChangeWithPaginator:589":0,"_afterRowsPerPageChange:614":0,"(anonymous 3):683":0,"(anonymous 4):704":0,"(anonymous 2):672":0,"_paginatorRenderUI:651":0,"_uiPgHandler:728":0,"_afterPaginatorModelChange:762":0,"getPage:804":0,"size:812":0,"each:818":0,"_augmentData:790":0,"_setPageSizesFn:838":0,"_setPaginatorModel:879":0,"_getConstructor:898":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatable-paginator/datatable-paginator.js"].coveredLines = 186;
_yuitest_coverage["build/datatable-paginator/datatable-paginator.js"].coveredFunctions = 37;
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 1);
YUI.add('datatable-paginator', function (Y, NAME) {

/**
 Adds support for paging through data in the DataTable.

 @module datatable
 @submodule datatable-paginator
 @since @SINCE@
 */

_yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 11);
var Model,
    View,
    PaginatorTemplates = Y.DataTable.Templates.Paginator,
    sub = Y.Lang.sub,
    getClassName = Y.ClassNameManager.getClassName,
    CLASS_DISABLED = getClassName(NAME, 'control-disabled'),
    EVENT_UI = 'paginator:ui';


/**
 @class DataTable.Paginator.Model
 @extends Model
 @since @SINCE@
 */
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 25);
Model = Y.Base.create('dt-pg-model', Y.Model, [Y.Paginator.Core]),

/**
 @class DataTable.Paginator.View
 @extends View
 @since @SINCE@
 */
View = Y.Base.create('dt-pg-view', Y.View, [], {
    /**
     Array of event handles to keep track of what should be destroyed later
     @protected
     @property _eventHandles
     @type {Array}
     @SINCE@
     */
    _eventHandles: [],

    /**
     Template for this view's container.
     @property containerTemplate
     @type {String}
     @default '<div class="yui3-datatable-paginator"/>'
     @SINCE@
     */
    containerTemplate: '<div class="{paginator}"/>',

    /**
     Template for content. Helps maintain order of controls.
     @property contentTemplate
     @type {String}
     @default '{buttons}{goto}{perPage}'
     @SINCE@
     */
    contentTemplate: '{buttons}{goto}{perPage}',

    /**
     Disables ad-hoc ATTRS for our view.
     @protected
     @property _allowAdHocAttrs
     @type {Boolean}
     @default false
     @SINCE@
     */
    _allowAdHocAttrs: false,

    /**
     Sets classnames on the templates and bind events
     @method initializer
     @SINCE@
     */
    initializer: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "initializer", 75);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 76);
this.containerTemplate = sub(this.containerTemplate, {
            paginator: getClassName(NAME)
        });

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 80);
this._initStrings();
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 81);
this._initClassNames();

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 83);
this.attachEvents();
    },

    /**
     @method render
     @chainable
     @SINCE@
     */
    render: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "render", 91);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 92);
var model = this.get('model'),
            content = sub(this.contentTemplate, {
                'buttons': this._buildButtonsGroup(),
                'goto': this._buildGotoGroup(),
                'perPage': this._buildPerPageGroup()
            });

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 99);
this.get('container').append(content);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 101);
this._rendered = true;

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 103);
this._updateControlsUI(model.get('page'));
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 104);
this._updateItemsPerPageUI(model.get('itemsPerPage'));

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 106);
return this;
    },

    /**
     @method attachEvents
     @SINCE@
     */
    attachEvents: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "attachEvents", 113);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 114);
View.superclass.attachEvents.apply(this, arguments);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 116);
var container = this.get('container');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 118);
if (!this.classNames) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 119);
this._initClassNames();
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 122);
this._attachedViewEvents.push(
            container.delegate('click', this._controlClick, '.' + this.classNames.control, this),
            container.after('change', this._controlChange, this, 'select'),
            container.after('submit', this._controlSubmit, this, 'form'),
            this.get('model').after('change', this._modelChange, this)
        );

    },

    /**
     Returns a string built from the button and buttons templates.
     @protected
     @method _buildButtonsGroup
     @return {String}
     @SINCE@
     */
    _buildButtonsGroup: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_buildButtonsGroup", 138);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 139);
var strings = this.get('strings'),
            classNames = this.classNames,
            buttons;

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 143);
buttons = PaginatorTemplates.button({
                    type: 'first', label: strings.first, classNames: classNames
                }) +
                PaginatorTemplates.button({
                    type: 'prev',  label: strings.prev,  classNames: classNames
                }) +
                PaginatorTemplates.button({
                    type: 'next',  label: strings.next,  classNames: classNames
                }) +
                PaginatorTemplates.button({
                    type: 'last',  label: strings.last,  classNames: classNames
                });

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 156);
return PaginatorTemplates.buttons({
            classNames: classNames,
            buttons: buttons
        });

    },

    /**
     Returns a string built from the gotoPage template.
     @protected
     @method _buildGotoGroup
     @return {String}
     @SINCE@
     */
    _buildGotoGroup: function () {

        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_buildGotoGroup", 170);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 172);
return PaginatorTemplates.gotoPage({
            classNames: this.classNames,
            strings: this.get('strings'),
            page: this.get('model').get('page')
        });
    },

    /**
     Returns a string built from the perPage template
     @protected
     @method _buildPerPageGroup
     @return {String}
     @SINCE@
     */
    _buildPerPageGroup: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_buildPerPageGroup", 186);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 187);
var options = this.get('pageSizes'),
            rowsPerPage = this.get('model').get('rowsPerPage'),
            option,
            len,
            i;

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 193);
for (i = 0, len = options.length; i < len; i++ ) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 194);
option = options[i];

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 196);
if (typeof option !== 'object') {
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 197);
option = {
                    value: option,
                    label: option
                };
            }
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 202);
option.selected = (option.value === rowsPerPage) ? ' selected' : '';
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 205);
return PaginatorTemplates.perPage({
            classNames: this.classNames,
            strings: this.get('strings'),
            options: this.get('pageSizes')
        });

    },

    /**
     Update the UI after the model has changed.
     @protected
     @method _modelChange
     @param {EventFacade} e
     @SINCE@
     */
    _modelChange: function (e) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_modelChange", 220);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 221);
var changed = e.changed,
            page = (changed && changed.page),
            itemsPerPage = (changed && changed.itemsPerPage);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 225);
if (page) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 226);
this._updateControlsUI(page.newVal);
        }
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 228);
if (itemsPerPage) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 229);
this._updateItemsPerPageUI(itemsPerPage.newVal);
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 230);
if (!page) {
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 231);
this._updateControlsUI(e.target.get('page'));
            }
        }

    },

    /**
     Updates the button controls and the gotoPage form
     @protected
     @method _updateControlsUI
     @param {Number} val Page number to set the UI input to
     @SINCE@
     */
    _updateControlsUI: function (val) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_updateControlsUI", 244);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 245);
if (!this._rendered) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 246);
return;
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 249);
var model = this.get('model'),
            controlClass = '.' + this.classNames.control,
            container = this.get('container'),
            hasPrev = model.hasPrevPage(),
            hasNext = model.hasNextPage();

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 255);
container.one(controlClass + '-first')
                 .toggleClass(CLASS_DISABLED, !hasPrev)
                 .set('disabled', !hasPrev);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 259);
container.one(controlClass + '-prev')
                 .toggleClass(CLASS_DISABLED, !hasPrev)
                 .set('disabled', !hasPrev);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 263);
container.one(controlClass + '-next')
                 .toggleClass(CLASS_DISABLED, !hasNext)
                 .set('disabled', !hasNext);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 267);
container.one(controlClass + '-last')
                 .toggleClass(CLASS_DISABLED, !hasNext)
                 .set('disabled', !hasNext);

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 271);
container.one('form input').set('value', val);
    },

    /**
     Updates the drop down select for items per page
     @protected
     @method _updateItemsPerPageUI
     @param {Number} val Number of items to display per page
     @SINCE@
     */
    _updateItemsPerPageUI: function (val) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_updateItemsPerPageUI", 281);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 282);
if (!this._rendered) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 283);
return;
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 286);
this.get('container').one('select').set('value', val);
    },

    /**
     Fire EVENT_UI when an enabled control button is clicked
     @protected
     @method _controlClick
     @param {EventFacade} e
     @SINCE@
     */
    _controlClick: function (e) { // buttons
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_controlClick", 296);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 297);
e.preventDefault();
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 298);
var control = e.currentTarget;
        // register click events from the four control buttons
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 300);
if (control.hasClass(CLASS_DISABLED)) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 301);
return;
        }
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 303);
this.fire(EVENT_UI, {
            type: control.getData('type'),
            val: control.getData('page') || null
        });
    },

    /**
     Fire EVENT_UI with `type:perPage` after the select drop down changes
     @protected
     @method _controlChange
     @param {EventFacade} e
     @param {String} selector
     @SINCE@
     */
    _controlChange: function (e, selector) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_controlChange", 317);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 318);
var control = e.target,
            val;

        // register change events from the perPage select
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 322);
if (
            control.hasClass(CLASS_DISABLED) ||
            ( selector && !(control.test(selector)) )
        ) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 326);
return;
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 329);
val = e.target.get('value');
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 330);
this.fire(EVENT_UI, { type: 'perPage', val: parseInt(val, 10) });
    },

    /**
     Fire EVENT_UI with `type:page` after form is submitted
     @protected
     @method _controlSubmit
     @param {EventFacade} e
     @param {String} selector
     @SINCE@
     */
    _controlSubmit: function (e, selector) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_controlSubmit", 341);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 342);
var control = e.target,
            input;

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 345);
if (
            control.hasClass(CLASS_DISABLED) ||
            ( selector && !(control.test(selector)) )
        ) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 349);
return;
        }

        // the only form we have is the go to page form
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 353);
e.preventDefault();

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 355);
input = e.target.one('input');
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 356);
this.fire(EVENT_UI, { type: 'page', val: input.get('value') });
    },

    /**
     Initializes classnames to be used with the templates
     @protected
     @method _initClassNames
     @SINCE@
     */
    _initClassNames: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_initClassNames", 365);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 366);
this.classNames = {
            control: getClassName(NAME, 'control'),
            controls: getClassName(NAME, 'controls'),
            group: getClassName(NAME, 'group'),
            perPage: getClassName(NAME, 'per-page')
        };
    },

    /**
     Initializes strings used for internationalization
     @protected
     @method _initStrings
     @SINCE@
     */
    _initStrings: function () {
        // Not a valueFn because other class extensions may want to add to it
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_initStrings", 380);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 382);
this.set('strings', Y.mix((this.get('strings') || {}),
            Y.Intl.get('datatable-paginator')));
    }
}, {
    ATTRS: {
        /**
         Array of values used to populate the drop down for items per page
         @attribute pageSizes
         @type {Array}
         @default [ 10, 50, 100, { label: 'Show All', value: -1 } ]
         @SINCE@
         */
        pageSizes: {
            value: [ 10, 50, 100, { label: 'Show All', value: -1 } ]
        },

        /**
         Model used for this view
         @attribute model
         @type {Y.Model}
         @default null
         @since @SINCE@
         */
        model: {}
    }
});

/**
 @class DataTable.Paginator
 @since @SINCE@
 */
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 413);
function Controller () {}

_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 415);
Controller.ATTRS = {
    /**
     A model instance or a configuration object for the Model.
     @attribute paginatorModel
     @type {Y.Model | Object}
     @default null
     @since @SINCE@
     */
    paginatorModel: {
        setter: '_setPaginatorModel',
        value: null,
        writeOnce: 'initOnly'
    },

    /**
     A pointer to a Model object to be instantiated, or a String off of the
     `Y` namespace.

     This is only used if the `pagiantorModel` is a configuration object or
     is null.
     @attribute paginatorModelType
     @type {Y.Model | String}
     @default 'DataTable.Paginator.Model'
     @since @SINCE@
     */
    paginatorModelType: {
        getter: '_getConstructor',
        value: 'DataTable.Paginator.Model',
        writeOnce: 'initOnly'
    },

    /**
     A pointer to a `Y.View` object to be instantiated. A new view will be
     created for each location provided. Each view created will be given the
     same model instance.
     @attribute paginatorView
     @type {Y.View | String}
     @default 'DataTable.Paginator.View'
     @since @SINCE@
     */
    paginatorView: {
        getter: '_getConstructor',
        value: 'DataTable.Paginator.View',
        writeOnce: 'initOnly'
    },

    // PAGINATOR CONFIGS
    /**
     Array of values used to populate the values in the Paginator UI allowing
     the end user to select the number of items to display per page.
     @attribute pageSizes
     @type {Array}
     @default [10, 50, 100, { label: 'Show All', value: -1 }]
     @since @SINCE@
     */
    pageSizes: {
        setter: '_setPageSizesFn',
        value: [10, 50, 100, { label: 'Show All', value: -1 }]
    },

    /**
     Number of rows to display per page. As the UI changes the number of pages
     to display, this will update to reflect the value selected in the UI
     @attribute rowsPerPage
     @type {Number | null}
     @default null
     @since @SINCE@
     */
    rowsPerPage: {
        value: null
    },

    /**
     String of `footer` or `header`, a Y.Node, or an Array or any combination
     of those values.
     @attribute paginatorLocation
     @type {String | Array | Y.Node}
     @default footer
     @since @SINCE@
     */
    paginatorLocation: {
        value: 'footer'
    }
};

_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 500);
Y.mix(Controller.prototype, {
    /**
     Sets the `paginatorModel` to the first page.
     @method firstPage
     @chainable
     @since @SINCE@
     */
    firstPage: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "firstPage", 507);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 508);
this.get('paginatorModel').set('page', 1);
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 509);
return this;
    },

    /**
     Sets the `paginatorModel` to the last page.
     @method lastPage
     @chainable
     @since @SINCE@
     */
    lastPage: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "lastPage", 518);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 519);
var model = this.get('paginatorModel');
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 520);
model.set('page', model.get('totalPages'));
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 521);
return this;
    },

    /**
     Sets the `paginatorModel` to the previous page.
     @method previousPage
     @chainable
     @since @SINCE@
     */
    previousPage: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "previousPage", 530);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 531);
this.get('paginatorModel').prevPage();
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 532);
return this;
    },

    /**
     Sets the `paginatorModel` to the next page.
     @method nextPage
     @chainable
     @since @SINCE@
     */
    nextPage: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "nextPage", 541);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 542);
this.get('paginatorModel').nextPage();
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 543);
return this;
    },


    /// Init and protected
    /**
     Constructor logic
     @protected
     @method initializer
     @since @SINCE@
     */
    initializer: function () {
        // allow DT to use paged data
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "initializer", 554);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 556);
this._augmentData();

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 558);
if (!this._eventHandles.paginatorRender) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 559);
this._eventHandles.paginatorRender = Y.Do.after(this._paginatorRender, this, 'render');
        }
    },

    /**
     Renders the paginator into locations and attaches events.
     @protected
     @method _paginatorRender
     @since @SINCE@
     */
    _paginatorRender: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_paginatorRender", 569);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 570);
var model = this.get('paginatorModel');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 572);
this._paginatorRenderUI();
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 573);
model.after('change', this._afterPaginatorModelChange, this);
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 574);
this.after('dataChange', this._afterDataChangeWithPaginator, this);
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 575);
this.after('rowsPerPageChange', this._afterRowsPerPageChange, this);

        // ensure our model has the correct totalItems set
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 578);
model.set('itemsPerPage', this.get('rowsPerPage'));
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 579);
model.set('totalItems', this.get('data').size());
    },

    /**
     After the data changes, we ensure we are on the first page and the data
     is augmented
     @protected
     @method _afterDataChangeWithPaginator
     @since @SINCE@
     */
    _afterDataChangeWithPaginator: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_afterDataChangeWithPaginator", 589);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 590);
var data = this.get('data'),
            model = this.get('paginatorModel');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 593);
if (model.get('page') !== 1) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 594);
this.firstPage();
        } else {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 596);
this._augmentData();

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 598);
data.fire.call(data, 'reset', {
                src: 'reset',
                models: data._items.concat()
            });
        }
    },

    /**
     After the rowsPerPage changes, update the UI to reflect the new number of
     rows to be displayed. If the new value is `null`, destroy all instances
     of the paginators.
     @protected
     @method _afterRowsPerPageChange
     @param {EventFacade} e
     @since @SINCE@
     */
    _afterRowsPerPageChange: function (e) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_afterRowsPerPageChange", 614);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 615);
var data = this.get('data'),
            model = this.get('paginatorModel'),
            view;

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 619);
if (e.newVal !== null) {
            // turning on
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 621);
this._paginatorRenderUI();

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 623);
if (!(data._paged)) {
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 624);
this._augmentData();
            }

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 627);
data._paged.index = (model.get('page') - 1) * model.get('itemsPerPage');
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 628);
data._paged.length = model.get('itemsPerPage');

        } else { // e.newVal === null
            // destroy!
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 632);
while(this._pgViews.length) {
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 633);
view = this._pgViews.shift();
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 634);
view.destroy({ remove: true });
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 635);
view._rendered = null;
            }

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 638);
data._paged.index = 0;
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 639);
data._paged.length = null;
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 642);
this.get('paginatorModel').set('itemsPerPage', parseInt(e.newVal, 10));
    },

    /**
     Parse each location and render a new view into each area.
     @protected
     @method _paginatorRenderUI
     @since @SINCE@
     */
    _paginatorRenderUI: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_paginatorRenderUI", 651);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 652);
if (!this.get('rowsPerPage')) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 653);
return;
        }
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 655);
var views = this._pgViews,
            ViewClass = this.get('paginatorView'),
            viewConfig = {
                pageSizes: this.get('pageSizes'),
                model: this.get('paginatorModel')
            },
            locations = this.get('paginatorLocation');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 663);
if (!Y.Lang.isArray(locations)) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 664);
locations = [locations];
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 667);
if (!views) { // set up initial rendering of views
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 668);
views = this._pgViews = [];
        }

        // for each placement area, push to views
        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 672);
Y.Array.each(locations, function (location) {
            _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "(anonymous 2)", 672);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 673);
var view = new ViewClass(viewConfig),
                container = view.render().get('container'),
                row;

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 677);
view.after('*:ui', this._uiPgHandler, this);
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 678);
views.push(view);

            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 680);
if (location._node) { // assume Y.Node
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 681);
location.append(container);
                // remove this container row if the view is ever destroyed
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 683);
this.after('destroy', function (/* e */) {
                    _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "(anonymous 3)", 683);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 684);
view.destroy({ remove: true });
                });
            } else {_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 686);
if (location === 'footer') { // DT Footer
                // Render a table footer if there isn't one
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 688);
if (!this.foot) {
                    _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 689);
this.foot = new Y.DataTable.FooterView({ host: this });
                    _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 690);
this.foot.render();
                    _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 691);
this.fire('renderFooter', { view: this.foot });
                }

                // create a row for the paginator to sit in
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 695);
row = Y.Node.create(PaginatorTemplates.rowWrapper({
                    wrapperClass: getClassName(NAME, 'wrapper'),
                    numOfCols: this.get('columns').length
                }));

                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 700);
row.one('td').append(container);
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 701);
this.foot.tfootNode.append(row);

                // remove this container row if the view is ever destroyed
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 704);
view.after('destroy', function (/* e */) {
                    _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "(anonymous 4)", 704);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 705);
row.remove(true);
                });
            } else {_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 707);
if (location === 'header') {
                // 'header' means insert before the table
                // placement with the caption may need to be addressed
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 710);
if (this.view && this.view.tableNode) {
                    _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 711);
this.view.tableNode.insert(container, 'before');
                } else {
                    _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 713);
this.get('contentBox').prepend(container);
                }
            }}}
        }, this);

    },

    /**
     Handles the paginator's UI event into a single location. Updates the
     `paginatorModel` according to what type is provided.
     @protected
     @method _uiPgHandler
     @param {EventFacade} e
     @since @SINCE@
     */
    _uiPgHandler: function (e) {
        // e.type = control type (first|prev|next|last|page|perPage)
        // e.val = value based on the control type to pass to the model
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_uiPgHandler", 728);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 731);
var model = this.get('paginatorModel');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 733);
switch (e.type) {
            case 'first':
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 735);
model.set('page', 1);
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 736);
break;
            case 'last':
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 738);
model.set('page', model.get('totalPages'));
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 739);
break;
            case 'prev':
            case 'next': // overflow intentional
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 742);
model[e.type + 'Page']();
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 743);
break;
            case 'page':
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 745);
model.set('page', e.val);
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 746);
break;
            case 'perPage':
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 748);
model.set('itemsPerPage', e.val);
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 749);
model.set('page', 1);
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 750);
break;
        }
    },

    /**
     Augments the model list with a paged structure, or updates the paged
     data. Then fires reset on the model list.
     @protected
     @method _afterPaginatorModelChange
     @param {EventFacade} [e]
     @since @SINCE@
     */
    _afterPaginatorModelChange: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_afterPaginatorModelChange", 762);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 763);
var model = this.get('paginatorModel'),
            data = this.get('data');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 766);
if (!data._paged) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 767);
this._augmentData();
        } else {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 769);
data._paged.index = (model.get('page') - 1) * model.get('itemsPerPage');
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 770);
data._paged.length = model.get('itemsPerPage');
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 773);
data.fire.call(data, 'reset', {
            src: 'reset',
            models: data._items.concat()
        });
    },

    /**
     Augments the model list data structure with paged implementations.

     The model list will contain a method for `getPage` that will return the
     given number of items listed within the range.

     `each` will also loop over the items in the page
     @protected
     @method _augmentData
     @since @SINCE@
     */
    _augmentData: function () {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_augmentData", 790);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 791);
var model = this.get('paginatorModel');

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 793);
if (this.get('rowsPerPage') === null) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 794);
return;
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 797);
Y.mix(this.get('data'), {

            _paged: {
                index: (model.get('page') - 1) * model.get('itemsPerPage'),
                length: model.get('itemsPerPage')
            },

            getPage: function () {
                _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "getPage", 804);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 805);
var _pg = this._paged,
                    min = _pg.index,
                    max = (_pg.length >= 0) ? min + _pg.length : undefined;

                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 809);
return this._items.slice(min, max);
            },

            size: function (paged) {
                _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "size", 812);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 813);
return (paged && this._paged.length >=0 ) ?
                    this._paged.length :
                    this._items.length;
            },

            each: function () {
                _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "each", 818);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 819);
var args = Array.prototype.slice.call(arguments);
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 820);
args.unshift(this.getPage());

                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 822);
Y.Array.each.apply(null, args);

                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 824);
return this;
            }
        }, true);
    },

    /**
     Ensures `pageSizes` value is an array of objects to be used in the
     paginator view.
     @protected
     @method _setPageSizesFn
     @param {Array} val
     @return Array
     @since @SINCE@
     */
    _setPageSizesFn: function (val) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_setPageSizesFn", 838);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 839);
var i,
            len = val.length,
            label,
            value;

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 844);
if (!Y.Lang.isArray(val)) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 845);
val = [val];
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 846);
len = val.length;
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 849);
for ( i = 0; i < len; i++ ) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 850);
if (typeof val[i] !== 'object') {
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 851);
label = val[i];
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 852);
value = val[i];

                // We want to check to see if we have a number or a string
                // of a number. If we do not, we want the value to be -1 to
                // indicate "all rows"
                /*jshint eqeqeq:false */
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 858);
if (parseInt(value, 10) != value) {
                    _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 859);
value = -1;
                }
                /*jshint eqeqeq:true */
                _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 862);
val[i] = { label: label, value: value };
            }
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 866);
return val;
    },

    /**
     Ensures the object provided is an instance of a `Y.Model`. If it is not,
     it assumes it is the configuration of a model, and gets the new model
     type from `paginatorModelType`.
     @protected
     @method _setPaginatorModel
     @param {Y.Model | Object} model
     @return Y.Model instance
     @since @SINCE@
     */
    _setPaginatorModel: function (model) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_setPaginatorModel", 879);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 880);
if (!(model && model._isYUIModel)) {
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 881);
var ModelConstructor = this.get('paginatorModelType');
            _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 882);
model = new ModelConstructor(model);
        }

        _yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 885);
return model;
    },

    /**
     Returns a pointer to an object to be instantiated if the provided type is
     a string
     @protected
     @method _getConstructor
     @param {Object | String} type Type of Object to contruct. If `type` is a
       String, we assume it is a namespace off the Y object
     @return
     @since @SINCE@
     */
    _getConstructor: function (type) {
        _yuitest_coverfunc("build/datatable-paginator/datatable-paginator.js", "_getConstructor", 898);
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 899);
return typeof type === 'string' ?
            Y.Object.getValue(Y, type.split('.')) :
            type;
    }
}, true);


_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 906);
Y.DataTable.Paginator = Controller;
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 907);
Y.DataTable.Paginator.Model = Model;
_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 908);
Y.DataTable.Paginator.View = View;

_yuitest_coverline("build/datatable-paginator/datatable-paginator.js", 910);
Y.Base.mix(Y.DataTable, [Y.DataTable.Paginator]);


}, '@VERSION@', {
    "requires": [
        "model",
        "view",
        "paginator-core",
        "datatable-foot",
        "datatable-paginator-templates"
    ],
    "lang": [
        "en"
    ],
    "skinnable": true
});
