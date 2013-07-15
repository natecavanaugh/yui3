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
_yuitest_coverage["build/datatable-paginator-templates/datatable-paginator-templates.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatable-paginator-templates/datatable-paginator-templates.js",
    code: []
};
_yuitest_coverage["build/datatable-paginator-templates/datatable-paginator-templates.js"].code=["YUI.add('datatable-paginator-templates', function (Y, NAME) {","","var engine = new Y.Template(),","","/*","{","    wrapperClass,","    numOfCols","}","*/","rowWrapper = '<tr><td class=\"<%= this.wrapperClass %>\" colspan=\"' +","             '<%= this.numOfCols %>\"/></tr>',","","/*","{","    classNames: {}","}","*/","content = '<%= buttons %><%= this.classNames.gotoPage %>' +","          '<%= this.classNames.perPage %>',","","/*","{","    classNames: {},","    type,","    label","}","*/","button = '<button class=\"<%= this.classNames.control %> ' +","         '<%= this.classNames.control %>-<%= this.type %>\" ' +","         'data-type=\"<%= this.type %>\"><%= this.label %></button>',","","/*","{","    classNames,","    buttons: [","        { type, label }","    ]","}","*/","buttons = '<div class=\"<%= this.classNames.controls %> <%= this.classNames.group %>\">' +","            '<%== this.buttons %>' +","        '</div>',","","/*","{","    classNames,","    strings,","    page","}","*/","gotoPage = '<form action=\"#\" class=\"<%= this.classNames.group %>\">' +","                '<label><%= this.strings.goToLabel %>' +","                '<input type=\"text\" value=\"<%= this.page %>\">' +","                '<button><%= this.strings.goToAction %></button>' +","                '</label>' +","            '</form>',","","/*","{","    classNames,","    strings,","    options","}","*/","perPage = '<div class=\"<%= this.classNames.group %> <%= this.classNames.perPage %>\">' +","                '<label><%= this.strings.perPage %> <select>' +","                '<% Y.Array.each(this.options, function (option, i) { %>' +","                    '<option value=\"<%= option.value %>\" <%= option.selected %>>' +","                    '<%= option.label %></option>'+","                '<% }); %>' +","            '</select></label></div>';","","","","","Y.namespace('DataTable.Templates').Paginator = {","    rowWrapper: engine.compile(rowWrapper),","    button: engine.compile(button),","    content: engine.compile(content),","    buttons: engine.compile(buttons),","    gotoPage: engine.compile(gotoPage),","    perPage: engine.compile(perPage)","};","","}, '@VERSION@', {\"requires\": [\"template\"]});"];
_yuitest_coverage["build/datatable-paginator-templates/datatable-paginator-templates.js"].lines = {"1":0,"3":0,"77":0};
_yuitest_coverage["build/datatable-paginator-templates/datatable-paginator-templates.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/datatable-paginator-templates/datatable-paginator-templates.js"].coveredLines = 3;
_yuitest_coverage["build/datatable-paginator-templates/datatable-paginator-templates.js"].coveredFunctions = 1;
_yuitest_coverline("build/datatable-paginator-templates/datatable-paginator-templates.js", 1);
YUI.add('datatable-paginator-templates', function (Y, NAME) {

_yuitest_coverfunc("build/datatable-paginator-templates/datatable-paginator-templates.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatable-paginator-templates/datatable-paginator-templates.js", 3);
var engine = new Y.Template(),

/*
{
    wrapperClass,
    numOfCols
}
*/
rowWrapper = '<tr><td class="<%= this.wrapperClass %>" colspan="' +
             '<%= this.numOfCols %>"/></tr>',

/*
{
    classNames: {}
}
*/
content = '<%= buttons %><%= this.classNames.gotoPage %>' +
          '<%= this.classNames.perPage %>',

/*
{
    classNames: {},
    type,
    label
}
*/
button = '<button class="<%= this.classNames.control %> ' +
         '<%= this.classNames.control %>-<%= this.type %>" ' +
         'data-type="<%= this.type %>"><%= this.label %></button>',

/*
{
    classNames,
    buttons: [
        { type, label }
    ]
}
*/
buttons = '<div class="<%= this.classNames.controls %> <%= this.classNames.group %>">' +
            '<%== this.buttons %>' +
        '</div>',

/*
{
    classNames,
    strings,
    page
}
*/
gotoPage = '<form action="#" class="<%= this.classNames.group %>">' +
                '<label><%= this.strings.goToLabel %>' +
                '<input type="text" value="<%= this.page %>">' +
                '<button><%= this.strings.goToAction %></button>' +
                '</label>' +
            '</form>',

/*
{
    classNames,
    strings,
    options
}
*/
perPage = '<div class="<%= this.classNames.group %> <%= this.classNames.perPage %>">' +
                '<label><%= this.strings.perPage %> <select>' +
                '<% Y.Array.each(this.options, function (option, i) { %>' +
                    '<option value="<%= option.value %>" <%= option.selected %>>' +
                    '<%= option.label %></option>'+
                '<% }); %>' +
            '</select></label></div>';




_yuitest_coverline("build/datatable-paginator-templates/datatable-paginator-templates.js", 77);
Y.namespace('DataTable.Templates').Paginator = {
    rowWrapper: engine.compile(rowWrapper),
    button: engine.compile(button),
    content: engine.compile(content),
    buttons: engine.compile(buttons),
    gotoPage: engine.compile(gotoPage),
    perPage: engine.compile(perPage)
};

}, '@VERSION@', {"requires": ["template"]});
