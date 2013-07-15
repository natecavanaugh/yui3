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
_yuitest_coverage["build/tree/tree.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree/tree.js",
    code: []
};
_yuitest_coverage["build/tree/tree.js"].code=["YUI.add('tree', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**","Provides a generic tree data structure and related functionality.","","A tree has a root node, which may contain any number of child nodes, which may","themselves contain child nodes, ad infinitum.","","Child nodes are lightweight function instances which delegate to the tree for","all significant functionality, so trees remain performant and memory-efficient","even with thousands and thousands of nodes.","","@module tree","@main tree","**/","","/**","The `Tree` class represents a generic tree data structure. A tree has a root","node, which may contain any number of child nodes, which may themselves contain","child nodes, ad infinitum.","","This class doesn't expose any UI, but is intended to be used as a data structure","or base class for other components. For example, the SmugMug TreeView gallery","module extends Tree and provides a TreeView UI.","","@class Tree","@param {Object} [config] Config options.","    @param {Object[]|Tree.Node[]} [config.nodes] Array of tree node config","        objects or `Tree.Node` instances to add to this tree at initialization","        time.","    @param {Object|Tree.Node} [config.rootNode] Node to use as the root node of","        this tree.","@constructor","@extends Base","**/","","var Lang = Y.Lang,","","    /**","    Fired when a node is added to this Tree. The `src` property will indicate","    how the node was added (\"append\", \"insert\", \"prepend\", etc.).","","    @event add","    @param {Number} index Index at which the node will be added.","    @param {Tree.Node} node Node being added.","    @param {Tree.Node} parent Parent node to which the node will be added.","    @param {String} src Source of the event (\"append\", \"insert\", \"prepend\",","        etc.).","    @preventable _defAddFn","    **/","    EVT_ADD = 'add',","","    /**","    Fired when this Tree is cleared.","","    @event clear","    @param {Tree.Node} rootNode New root node of this tree (the old root node is","        always destroyed when a tree is cleared).","    @param {String} src Source of the event.","    @preventable _defClearFn","    **/","    EVT_CLEAR = 'clear',","","    /**","    Fired when a node is removed from this Tree.","","    @event remove","    @param {Boolean} destroy Whether or not the node will be destroyed after","        being removed from this tree.","    @param {Tree.Node} node Node being removed.","    @param {Tree.Node} parent Parent node from which the node will be removed.","    @param {String} src Source of the event.","    @preventable _defRemoveFn","    **/","    EVT_REMOVE = 'remove';","","var Tree = Y.Base.create('tree', Y.Base, [], {","    // -- Public Properties ----------------------------------------------------","","    /**","    Reference to the `children` array of this Tree's `rootNode`.","","    This is a convenience property to allow you to type `tree.children` instead","    of `tree.rootNode.children`.","","    @property {Tree.Node[]} children","    @readOnly","    **/","","    /**","    The `Tree.Node` class or subclass that should be used for nodes created by","    this tree.","","    You may specify an actual class reference or a string that resolves to a","    class reference at runtime.","","    @property {String|Tree.Node} nodeClass","    @default Y.Tree.Node","    **/","    nodeClass: Y.Tree.Node,","","    /**","    Optional array containing one or more extension classes that should be mixed","    into the `nodeClass` when this Tree is instantiated. The resulting composed","    node class will be unique to this Tree instance and will not affect any","    other instances, nor will it modify the defined `nodeClass` itself.","","    This provides a late-binding extension mechanism for nodes that doesn't","    require them to extend `Y.Base`, which would incur a significant performance","    hit.","","    @property {Array} nodeExtensions","    @default []","    **/","    nodeExtensions: [],","","    /**","    Root node of this Tree.","","    @property {Tree.Node} rootNode","    @readOnly","    **/","","    // -- Protected Properties -------------------------------------------------","","    /**","    Simple way to type-check that this is a Tree instance.","","    @property {Boolean} _isYUITree","    @default true","    @protected","    **/","    _isYUITree: true,","","    /**","    Composed node class based on `nodeClass` that mixes in any extensions","    specified in `nodeExtensions`. If there are no extensions, this will just be","    a reference to `nodeClass`.","","    @property {Tree.Node} _nodeClass","    @protected","    **/","","    /**","    Mapping of node ids to node instances for nodes in this tree.","","    @property {Object} _nodeMap","    @protected","    **/","","    /**","    Default config object for the root node.","","    @property {Object} _rootNodeConfig","    @protected","    **/","    _rootNodeConfig: {canHaveChildren: true},","","    // -- Lifecycle ------------------------------------------------------------","    initializer: function (config) {","        config || (config = {});","","        if (config.nodeClass) {","            this.nodeClass = config.nodeClass;","        }","","        if (config.nodeExtensions) {","            this.nodeExtensions = this.nodeExtensions.concat(config.nodeExtensions);","        }","","        /**","        Hash of published custom events.","","        @property {Object} _published","        @default {}","        @protected","        **/","        this._published || (this._published = {});","        this._nodeMap = {};","","        // Allow all extensions to initialize, then finish up.","        this.onceAfter('initializedChange', function () {","            this._composeNodeClass();","","            this.clear(config.rootNode, {silent: true});","","            if (config.nodes) {","                this.insertNode(this.rootNode, config.nodes, {silent: true});","            }","        });","    },","","    destructor: function () {","        this.destroyNode(this.rootNode, {silent: true});","","        this.children   = null;","        this.rootNode   = null;","        this._nodeClass = null;","        this._nodeMap   = null;","        this._published = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Appends a node or array of nodes as the last child of the specified parent","    node.","","    If a node being appended is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method appendNode","    @param {Tree.Node} parent Parent node.","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to append","        to the given parent. Node config objects will automatically be converted","        into node instances.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were","        appended.","    **/","    appendNode: function (parent, node, options) {","        return this.insertNode(parent, node, Y.merge(options, {","            index: parent.children.length,","            src  : 'append'","        }));","    },","","    /**","    Clears this tree by destroying the root node and all its children. If a","    `rootNode` argument is provided, that node will become the root node of this","    tree; otherwise, a new root node will be created.","","    @method clear","    @param {Object|Tree.Node} [rootNode] If specified, this node will be used as","        the new root node.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `clear` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    clear: function (rootNode, options) {","        return this._fireTreeEvent(EVT_CLEAR, {","            rootNode: this.createNode(rootNode || this._rootNodeConfig),","            src     : options && options.src","        }, {","            defaultFn: this._defClearFn,","            silent   : options && options.silent","        });","    },","","    /**","    Creates and returns a new `Tree.Node` instance associated with (but not","    yet appended to) this tree.","","    @method createNode","    @param {Object|Tree.Node} [config] Node configuration. If a `Tree.Node`","        instance is specified instead of a config object, that node will be","        adopted into this tree (if it doesn't already belong to this tree) and","        removed from any other tree to which it belongs.","    @return {Tree.Node|null} New node, or `null` if a node could not be created","        from the given _config_.","    **/","    createNode: function (config) {","        config || (config = {});","","        // If `config` is already a node, just ensure it hasn't been destroyed","        // and is in the node map, then return it.","        if (config._isYUITreeNode) {","            if (config.state.destroyed) {","                Y.error('Cannot insert a node that has already been destroyed.', null, 'tree');","                return null;","            }","","            this._adoptNode(config);","            return config;","        }","","        // First, create nodes for any children of this node.","        if (config.children) {","            var children = [];","","            for (var i = 0, len = config.children.length; i < len; i++) {","                children.push(this.createNode(config.children[i]));","            }","","            config = Y.merge(config, {children: children});","        }","","        var node = new this._nodeClass(this, config);","","        return this._nodeMap[node.id] = node;","    },","","    /**","    Removes and destroys a node and all its child nodes. Once destroyed, a node","    is eligible for garbage collection and cannot be reused or re-added to the","    tree.","","    @method destroyNode","    @param {Tree.Node} node Node to destroy.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, `remove` events will","            be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting events. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @chainable","    **/","    destroyNode: function (node, options) {","        var child, i, len;","","        options || (options = {});","","        for (i = 0, len = node.children.length; i < len; i++) {","            child = node.children[i];","","            // Manually remove the child from its parent; this makes destroying","            // all children of the parent much faster since there's no splicing","            // involved.","            child.parent = null;","","            // Destroy the child.","            this.destroyNode(child, options);","        }","","        if (node.parent) {","            this.removeNode(node, options);","        }","","        node.children  = [];","        node.data      = {};","        node.state     = {destroyed: true};","        node.tree      = null;","        node._indexMap = {};","","        delete this._nodeMap[node.id];","","        return this;","    },","","    /**","    Removes all children from the specified node. The removed children will","    still be reusable unless the `destroy` option is truthy.","","    @method emptyNode","    @param {Tree.Node} node Node to empty.","    @param {Object} [options] Options.","        @param {Boolean} [options.destroy=false] If `true`, the children will","            also be destroyed, which makes them available for garbage collection","            and means they can't be reused.","        @param {Boolean} [options.silent=false] If `true`, `remove` events will","            be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting events. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @return {Tree.Node[]} Array of removed child nodes.","    **/","    emptyNode: function (node, options) {","        var children = node.children,","            removed  = [];","","        for (var i = children.length - 1; i > -1; --i) {","            removed[i] = this.removeNode(children[i], options);","        }","","        return removed;","    },","","    /**","    Performs a depth-first traversal of _node_, passing it and each of its","    descendants to the specified _callback_, and returning the first node for","    which the callback returns a truthy value.","","    Traversal will stop as soon as a truthy value is returned from the callback.","","    See `traverseNode()` for more details on how depth-first traversal works.","","    @method findNode","    @param {Tree.Node} node Node to traverse.","    @param {Object} [options] Options.","        @param {Number} [options.depth] Depth limit. If specified, descendants","            will only be traversed to this depth before backtracking and moving","            on.","    @param {Function} callback Callback function to call with the traversed","        node and each of its descendants. If this function returns a truthy","        value, traversal will be stopped and the current node will be returned.","","        @param {Tree.Node} callback.node Node being traversed.","","    @param {Object} [thisObj] `this` object to use when executing _callback_.","    @return {Tree.Node|null} Returns the first node for which the _callback_","        returns a truthy value, or `null` if the callback never returns a truthy","        value.","    **/","    findNode: function (node, options, callback, thisObj) {","        var match = null;","","        // Allow callback as second argument.","        if (typeof options === 'function') {","            thisObj  = callback;","            callback = options;","            options  = {};","        }","","        this.traverseNode(node, options, function (descendant) {","            if (callback.call(thisObj, descendant)) {","                match = descendant;","                return Tree.STOP_TRAVERSAL;","            }","        });","","        return match;","    },","","    /**","    Returns the tree node with the specified id, or `undefined` if the node","    doesn't exist in this tree.","","    @method getNodeById","    @param {String} id Node id.","    @return {Tree.Node} Node, or `undefined` if not found.","    **/","    getNodeById: function (id) {","        return this._nodeMap[id];","    },","","    /**","    Inserts a node or array of nodes at the specified index under the given","    parent node, or appends them to the parent if no index is specified.","","    If a node being inserted is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method insertNode","    @param {Tree.Node} parent Parent node.","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config","        object, array of child nodes, or array of node config objects to insert","        under the given parent. Node config objects will automatically be","        converted into node instances.","","    @param {Object} [options] Options.","        @param {Number} [options.index] Index at which to insert the child node.","            If not specified, the node will be appended as the last child of the","            parent.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","        @param {String} [options.src='insert'] Source of the change, to be","            passed along to the event facade of the resulting event. This can be","            used to distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were inserted.","    **/","    insertNode: function (parent, node, options) {","        options || (options = {});","        parent  || (parent = this.rootNode);","","        // If `node` is an array, recurse to insert each node it contains.","        //","        // Note: If you're getting an exception here because `node` is null when","        // you've passed in a reference to some other node's `children` array,","        // that's happening because nodes must be removed from their current","        // parent before being added to the new one, and the `children` array is","        // being modified while the nodes are inserted.","        //","        // Solution: pass a copy of the other node's `children` array instead of","        // the original. Doing the copy operation here would have a negative","        // impact on performance, so you're on your own since this is such a","        // rare edge case.","        if ('length' in node && Lang.isArray(node)) {","            var hasIndex      = 'index' in options,","                insertedNodes = [],","                insertedNode;","","            for (var i = 0, len = node.length; i < len; i++) {","                insertedNode = this.insertNode(parent, node[i], options);","","                if (insertedNode) {","                    insertedNodes.push(insertedNode);","","                    if (hasIndex) {","                        options.index += 1;","                    }","                }","            }","","            return insertedNodes;","        }","","        node = this.createNode(node);","","        if (node) {","            var index = options.index;","","            if (typeof index === 'undefined') {","                index = this._getDefaultNodeIndex(parent, node, options);","            }","","            this._fireTreeEvent(EVT_ADD, {","                index : index,","                node  : node,","                parent: parent,","                src   : options.src || 'insert'","            }, {","                defaultFn: this._defAddFn,","                silent   : options.silent","            });","        }","","        return node;","    },","","    /**","    Prepends a node or array of nodes at the beginning of the specified parent","    node.","","    If a node being prepended is from another tree, it and all its children will","    be removed from that tree and moved to this one.","","    @method prependNode","    @param {Tree.Node} parent Parent node.","    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node,","        node config object, array of child nodes, or array of node config","        objects to prepend to the given parent. Node config objects will","        automatically be converted into node instances.","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `add` event will","            be suppressed.","    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were","        prepended.","    **/","    prependNode: function (parent, node, options) {","        return this.insertNode(parent, node, Y.merge(options, {","            index: 0,","            src  : 'prepend'","        }));","    },","","    /**","    Removes the specified node from its parent node. The removed node will still","    be reusable unless the `destroy` option is truthy.","","    @method removeNode","    @param {Tree.Node} node Node to remove.","    @param {Object} [options] Options.","        @param {Boolean} [options.destroy=false] If `true`, the node and all its","            children will also be destroyed, which makes them available for","            garbage collection and means they can't be reused.","        @param {Boolean} [options.silent=false] If `true`, the `remove` event","            will be suppressed.","        @param {String} [options.src] Source of the change, to be passed along","            to the event facade of the resulting event. This can be used to","            distinguish between changes triggered by a user and changes","            triggered programmatically, for example.","    @return {Tree.Node} Node that was removed.","    **/","    removeNode: function (node, options) {","        options || (options = {});","","        this._fireTreeEvent(EVT_REMOVE, {","            destroy: !!options.destroy,","            node   : node,","            parent : node.parent,","            src    : options.src || 'remove'","        }, {","            defaultFn: this._defRemoveFn,","            silent   : options.silent","        });","","        return node;","    },","","    /**","    Returns the total number of nodes in this tree, at all levels.","","    Use `rootNode.children.length` to get only the number of top-level nodes.","","    @method size","    @return {Number} Total number of nodes in this tree.","    **/","    size: function () {","        return this.rootNode.size() + 1;","    },","","    /**","    Serializes this tree to an object suitable for use in JSON.","","    @method toJSON","    @return {Object} Serialized tree object.","    **/","    toJSON: function () {","        return this.rootNode.toJSON();","    },","","    /**","    Performs a depth-first traversal of _node_, passing it and each of its","    descendants to the specified _callback_.","","    If the callback function returns `Tree.STOP_TRAVERSAL`, traversal will be","    stopped immediately. Otherwise, it will continue until the deepest","    descendant of _node_ has been traversed, or until each branch has been","    traversed to the optional maximum depth limit.","","    Since traversal is depth-first, that means nodes are traversed like this:","","                1","              / | \\","             2  8  9","            / \\     \\","           3   7    10","         / | \\      / \\","        4  5  6    11 12","","    @method traverseNode","    @param {Tree.Node} node Node to traverse.","    @param {Object} [options] Options.","        @param {Number} [options.depth] Depth limit. If specified, descendants","            will only be traversed to this depth before backtracking and moving","            on.","    @param {Function} callback Callback function to call with the traversed","        node and each of its descendants.","","        @param {Tree.Node} callback.node Node being traversed.","","    @param {Object} [thisObj] `this` object to use when executing _callback_.","    @return {Mixed} Returns `Tree.STOP_TRAVERSAL` if traversal was stopped;","        otherwise returns `undefined`.","    **/","    traverseNode: function (node, options, callback, thisObj) {","        if (node.state.destroyed) {","            Y.error('Cannot traverse a node that has been destroyed.', null, 'tree');","            return;","        }","","        // Allow callback as second argument.","        if (typeof options === 'function') {","            thisObj  = callback;","            callback = options;","            options  = {};","        }","","        options || (options = {});","","        var stop      = Tree.STOP_TRAVERSAL,","            unlimited = typeof options.depth === 'undefined';","","        if (callback.call(thisObj, node) === stop) {","            return stop;","        }","","        var children = node.children;","","        if (unlimited || options.depth > 0) {","            var childOptions = unlimited ? options : {depth: options.depth - 1};","","            for (var i = 0, len = children.length; i < len; i++) {","                if (this.traverseNode(children[i], childOptions, callback, thisObj) === stop) {","                    return stop;","                }","            }","        }","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Moves the specified node and all its children from another tree to this","    tree.","","    @method _adoptNode","    @param {Tree.Node} node Node to adopt.","    @param {Object} [options] Options to pass along to `removeNode()`.","    @protected","    **/","    _adoptNode: function (node, options) {","        var oldTree = node.tree;","","        if (oldTree === this) {","            return;","        }","","        for (var i = 0, len = node.children.length; i < len; i++) {","            this._adoptNode(node.children[i], {silent: true});","        }","","        oldTree.removeNode(node, options);","        delete oldTree._nodeMap[node.id];","","        // If this node isn't an instance of this tree's composed _nodeClass,","        // then we need to recreate it to avoid potentially breaking things in","        // really weird ways.","        if (!(node instanceof this._nodeClass)","                || oldTree._nodeClass !== this._nodeClass) {","","            node = this.createNode(node.toJSON());","        }","","        node.tree = this;","        this._nodeMap[node.id] = node;","    },","","    /**","    Composes a custom late-bound tree node class (if necessary) based on the","    classes specified in this Tree's `nodeClass` and `nodeExtensions`","    properties.","","    The composed class is stored in this Tree's `_nodeClass` property. If","    composition wasn't necessary, then `_nodeClass` will just be a reference to","    `nodeClass`.","","    @method _composeNodeClass","    @protected","    **/","    _composeNodeClass: function () {","        var nodeClass      = this.nodeClass,","            nodeExtensions = this.nodeExtensions,","            composedClass;","","        if (typeof nodeClass === 'string') {","            // Look for a namespaced node class on `Y`.","            nodeClass = Y.Object.getValue(Y, nodeClass.split('.'));","","            if (nodeClass) {","                this.nodeClass = nodeClass;","            } else {","                Y.error('Node class not found: ' + nodeClass, null, 'tree');","                return;","            }","        }","","        if (!nodeExtensions.length) {","            this._nodeClass = nodeClass;","            return;","        }","","        // Compose a new class by mixing extensions into nodeClass.","        composedClass = function () {","            var extensions = composedClass._nodeExtensions;","","            nodeClass.apply(this, arguments);","","            for (var i = 0, len = extensions.length; i < len; i++) {","                extensions[i].apply(this, arguments);","            }","        };","","        Y.extend(composedClass, nodeClass);","","        for (var i = 0, len = nodeExtensions.length; i < len; i++) {","            Y.mix(composedClass.prototype, nodeExtensions[i].prototype, true);","        }","","        composedClass._nodeExtensions = nodeExtensions;","        this._nodeClass = composedClass;","    },","","    /**","    Utility method for lazily publishing and firing events.","","    @method _fireTreeEvent","    @param {String} name Event name to fire.","    @param {Object} facade Event facade.","    @param {Object} [options] Options.","        @param {Function} [options.defaultFn] Default handler for this event.","        @param {Boolean} [options.silent=false] Whether the default handler","            should be executed directly without actually firing the event.","    @chainable","    @protected","    **/","    _fireTreeEvent: function (name, facade, options) {","        if (options && options.silent) {","            if (options.defaultFn) {","                facade.silent = true; // intentionally modifying the facade","                options.defaultFn.call(this, facade);","            }","        } else {","            if (options && options.defaultFn && !this._published[name]) {","                this._published[name] = this.publish(name, {","                    defaultFn: options.defaultFn","                });","            }","","            this.fire(name, facade);","        }","","        return this;","    },","","    /**","    Returns the default insertion index that should be used when _node_ is","    inserted as a child of _parent_ without an explicit index.","","    The primary purpose of this method is to serve as a hook point for","    extensions and plugins that need to customize insertion order.","","    @method _getDefaultNodeIndex","    @param {Tree.Node} parent Parent node.","    @param {Tree.Node} node Node being inserted.","    @param {Object} [options] Options passed to `insertNode()`.","    @return {Number} Index at which _node_ should be inserted into _parent_'s","        `children` array.","    @protected","    **/","    _getDefaultNodeIndex: function (parent/*, node, options*/) {","        return parent.children.length;","    },","","    /**","    Removes the specified node from its parent node if it has one.","","    @method _removeNodeFromParent","    @param {Tree.Node} node Node to remove.","    @protected","    **/","    _removeNodeFromParent: function (node) {","        var parent = node.parent,","            index;","","        if (parent) {","            index = parent.indexOf(node);","","            if (index > -1) {","                var children = parent.children;","","                if (index === children.length - 1) {","                    children.pop();","                } else {","                    children.splice(index, 1);","                    parent._isIndexStale = true;","                }","","                node.parent = null;","            }","        }","    },","","    // -- Default Event Handlers -----------------------------------------------","    _defAddFn: function (e) {","        var index  = e.index,","            node   = e.node,","            parent = e.parent,","            oldIndex;","","        // Remove the node from its existing parent if it has one.","        if (node.parent) {","            // If the node's existing parent is the same parent it's being","            // inserted into, adjust the index to avoid an off-by-one error.","            if (node.parent === parent) {","                oldIndex = parent.indexOf(node);","","                if (oldIndex === index) {","                    // Old index is the same as the new index, so just don't do","                    // anything.","                    return;","                } else if (oldIndex < index) {","                    // Removing the node from its old index will affect the new","                    // index, so decrement the new index by one.","                    index -= 1;","                }","            }","","            this.removeNode(node, {","                silent: e.silent,","                src   : 'add'","            });","        }","","        // Add the node to its new parent at the desired index.","        node.parent = parent;","        parent.children.splice(index, 0, node);","","        parent.canHaveChildren = true;","        parent._isIndexStale   = true;","    },","","    _defClearFn: function (e) {","        var newRootNode = e.rootNode;","","        if (this.rootNode) {","            this.destroyNode(this.rootNode, {silent: true});","        }","","        this._nodeMap = {};","        this._nodeMap[newRootNode.id] = newRootNode;","","        this.rootNode = newRootNode;","        this.children = newRootNode.children;","    },","","    _defRemoveFn: function (e) {","        var node = e.node;","","        if (e.destroy) {","            this.destroyNode(node, {silent: true});","        } else if (e.parent) {","            this._removeNodeFromParent(node);","        } else if (this.rootNode === node) {","            // Guess we'll need a new root node!","            this.rootNode = this.createNode(this._rootNodeConfig);","            this.children = this.rootNode.children;","        }","    }","}, {","    /**","    Return this value from a `Tree#traverseNode()` or `Tree.Node#traverse()`","    callback to immediately stop traversal.","","    @property STOP_TRAVERSAL","    @static","    **/","    STOP_TRAVERSAL: {}","});","","Y.Tree = Y.mix(Tree, Y.Tree);","","","}, '@VERSION@', {\"requires\": [\"base-build\", \"tree-node\"]});"];
_yuitest_coverage["build/tree/tree.js"].lines = {"1":0,"39":0,"79":0,"163":0,"165":0,"166":0,"169":0,"170":0,"180":0,"181":0,"184":0,"185":0,"187":0,"189":0,"190":0,"196":0,"198":0,"199":0,"200":0,"201":0,"202":0,"227":0,"251":0,"273":0,"277":0,"278":0,"279":0,"280":0,"283":0,"284":0,"288":0,"289":0,"291":0,"292":0,"295":0,"298":0,"300":0,"320":0,"322":0,"324":0,"325":0,"330":0,"333":0,"336":0,"337":0,"340":0,"341":0,"342":0,"343":0,"344":0,"346":0,"348":0,"370":0,"373":0,"374":0,"377":0,"407":0,"410":0,"411":0,"412":0,"413":0,"416":0,"417":0,"418":0,"419":0,"423":0,"435":0,"466":0,"467":0,"481":0,"482":0,"486":0,"487":0,"489":0,"490":0,"492":0,"493":0,"498":0,"501":0,"503":0,"504":0,"506":0,"507":0,"510":0,"521":0,"544":0,"569":0,"571":0,"581":0,"593":0,"603":0,"641":0,"642":0,"643":0,"647":0,"648":0,"649":0,"650":0,"653":0,"655":0,"658":0,"659":0,"662":0,"664":0,"665":0,"667":0,"668":0,"669":0,"687":0,"689":0,"690":0,"693":0,"694":0,"697":0,"698":0,"703":0,"706":0,"709":0,"710":0,"726":0,"730":0,"732":0,"734":0,"735":0,"737":0,"738":0,"742":0,"743":0,"744":0,"748":0,"749":0,"751":0,"753":0,"754":0,"758":0,"760":0,"761":0,"764":0,"765":0,"782":0,"783":0,"784":0,"785":0,"788":0,"789":0,"794":0,"797":0,"816":0,"827":0,"830":0,"831":0,"833":0,"834":0,"836":0,"837":0,"839":0,"840":0,"843":0,"850":0,"856":0,"859":0,"860":0,"862":0,"865":0,"866":0,"869":0,"873":0,"880":0,"881":0,"883":0,"884":0,"888":0,"890":0,"891":0,"894":0,"895":0,"897":0,"898":0,"902":0,"904":0,"905":0,"906":0,"907":0,"908":0,"910":0,"911":0,"925":0};
_yuitest_coverage["build/tree/tree.js"].functions = {"(anonymous 2):184":0,"initializer:162":0,"destructor:195":0,"appendNode:226":0,"clear:250":0,"createNode:272":0,"destroyNode:319":0,"emptyNode:369":0,"(anonymous 3):416":0,"findNode:406":0,"getNodeById:434":0,"insertNode:465":0,"prependNode:543":0,"removeNode:568":0,"size:592":0,"toJSON:602":0,"traverseNode:640":0,"_adoptNode:686":0,"composedClass:748":0,"_composeNodeClass:725":0,"_fireTreeEvent:781":0,"_getDefaultNodeIndex:815":0,"_removeNodeFromParent:826":0,"_defAddFn:849":0,"_defClearFn:887":0,"_defRemoveFn:901":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree/tree.js"].coveredLines = 187;
_yuitest_coverage["build/tree/tree.js"].coveredFunctions = 27;
_yuitest_coverline("build/tree/tree.js", 1);
YUI.add('tree', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
Provides a generic tree data structure and related functionality.

A tree has a root node, which may contain any number of child nodes, which may
themselves contain child nodes, ad infinitum.

Child nodes are lightweight function instances which delegate to the tree for
all significant functionality, so trees remain performant and memory-efficient
even with thousands and thousands of nodes.

@module tree
@main tree
**/

/**
The `Tree` class represents a generic tree data structure. A tree has a root
node, which may contain any number of child nodes, which may themselves contain
child nodes, ad infinitum.

This class doesn't expose any UI, but is intended to be used as a data structure
or base class for other components. For example, the SmugMug TreeView gallery
module extends Tree and provides a TreeView UI.

@class Tree
@param {Object} [config] Config options.
    @param {Object[]|Tree.Node[]} [config.nodes] Array of tree node config
        objects or `Tree.Node` instances to add to this tree at initialization
        time.
    @param {Object|Tree.Node} [config.rootNode] Node to use as the root node of
        this tree.
@constructor
@extends Base
**/

_yuitest_coverfunc("build/tree/tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree/tree.js", 39);
var Lang = Y.Lang,

    /**
    Fired when a node is added to this Tree. The `src` property will indicate
    how the node was added ("append", "insert", "prepend", etc.).

    @event add
    @param {Number} index Index at which the node will be added.
    @param {Tree.Node} node Node being added.
    @param {Tree.Node} parent Parent node to which the node will be added.
    @param {String} src Source of the event ("append", "insert", "prepend",
        etc.).
    @preventable _defAddFn
    **/
    EVT_ADD = 'add',

    /**
    Fired when this Tree is cleared.

    @event clear
    @param {Tree.Node} rootNode New root node of this tree (the old root node is
        always destroyed when a tree is cleared).
    @param {String} src Source of the event.
    @preventable _defClearFn
    **/
    EVT_CLEAR = 'clear',

    /**
    Fired when a node is removed from this Tree.

    @event remove
    @param {Boolean} destroy Whether or not the node will be destroyed after
        being removed from this tree.
    @param {Tree.Node} node Node being removed.
    @param {Tree.Node} parent Parent node from which the node will be removed.
    @param {String} src Source of the event.
    @preventable _defRemoveFn
    **/
    EVT_REMOVE = 'remove';

_yuitest_coverline("build/tree/tree.js", 79);
var Tree = Y.Base.create('tree', Y.Base, [], {
    // -- Public Properties ----------------------------------------------------

    /**
    Reference to the `children` array of this Tree's `rootNode`.

    This is a convenience property to allow you to type `tree.children` instead
    of `tree.rootNode.children`.

    @property {Tree.Node[]} children
    @readOnly
    **/

    /**
    The `Tree.Node` class or subclass that should be used for nodes created by
    this tree.

    You may specify an actual class reference or a string that resolves to a
    class reference at runtime.

    @property {String|Tree.Node} nodeClass
    @default Y.Tree.Node
    **/
    nodeClass: Y.Tree.Node,

    /**
    Optional array containing one or more extension classes that should be mixed
    into the `nodeClass` when this Tree is instantiated. The resulting composed
    node class will be unique to this Tree instance and will not affect any
    other instances, nor will it modify the defined `nodeClass` itself.

    This provides a late-binding extension mechanism for nodes that doesn't
    require them to extend `Y.Base`, which would incur a significant performance
    hit.

    @property {Array} nodeExtensions
    @default []
    **/
    nodeExtensions: [],

    /**
    Root node of this Tree.

    @property {Tree.Node} rootNode
    @readOnly
    **/

    // -- Protected Properties -------------------------------------------------

    /**
    Simple way to type-check that this is a Tree instance.

    @property {Boolean} _isYUITree
    @default true
    @protected
    **/
    _isYUITree: true,

    /**
    Composed node class based on `nodeClass` that mixes in any extensions
    specified in `nodeExtensions`. If there are no extensions, this will just be
    a reference to `nodeClass`.

    @property {Tree.Node} _nodeClass
    @protected
    **/

    /**
    Mapping of node ids to node instances for nodes in this tree.

    @property {Object} _nodeMap
    @protected
    **/

    /**
    Default config object for the root node.

    @property {Object} _rootNodeConfig
    @protected
    **/
    _rootNodeConfig: {canHaveChildren: true},

    // -- Lifecycle ------------------------------------------------------------
    initializer: function (config) {
        _yuitest_coverfunc("build/tree/tree.js", "initializer", 162);
_yuitest_coverline("build/tree/tree.js", 163);
config || (config = {});

        _yuitest_coverline("build/tree/tree.js", 165);
if (config.nodeClass) {
            _yuitest_coverline("build/tree/tree.js", 166);
this.nodeClass = config.nodeClass;
        }

        _yuitest_coverline("build/tree/tree.js", 169);
if (config.nodeExtensions) {
            _yuitest_coverline("build/tree/tree.js", 170);
this.nodeExtensions = this.nodeExtensions.concat(config.nodeExtensions);
        }

        /**
        Hash of published custom events.

        @property {Object} _published
        @default {}
        @protected
        **/
        _yuitest_coverline("build/tree/tree.js", 180);
this._published || (this._published = {});
        _yuitest_coverline("build/tree/tree.js", 181);
this._nodeMap = {};

        // Allow all extensions to initialize, then finish up.
        _yuitest_coverline("build/tree/tree.js", 184);
this.onceAfter('initializedChange', function () {
            _yuitest_coverfunc("build/tree/tree.js", "(anonymous 2)", 184);
_yuitest_coverline("build/tree/tree.js", 185);
this._composeNodeClass();

            _yuitest_coverline("build/tree/tree.js", 187);
this.clear(config.rootNode, {silent: true});

            _yuitest_coverline("build/tree/tree.js", 189);
if (config.nodes) {
                _yuitest_coverline("build/tree/tree.js", 190);
this.insertNode(this.rootNode, config.nodes, {silent: true});
            }
        });
    },

    destructor: function () {
        _yuitest_coverfunc("build/tree/tree.js", "destructor", 195);
_yuitest_coverline("build/tree/tree.js", 196);
this.destroyNode(this.rootNode, {silent: true});

        _yuitest_coverline("build/tree/tree.js", 198);
this.children   = null;
        _yuitest_coverline("build/tree/tree.js", 199);
this.rootNode   = null;
        _yuitest_coverline("build/tree/tree.js", 200);
this._nodeClass = null;
        _yuitest_coverline("build/tree/tree.js", 201);
this._nodeMap   = null;
        _yuitest_coverline("build/tree/tree.js", 202);
this._published = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Appends a node or array of nodes as the last child of the specified parent
    node.

    If a node being appended is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method appendNode
    @param {Tree.Node} parent Parent node.
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config
        object, array of child nodes, or array of node config objects to append
        to the given parent. Node config objects will automatically be converted
        into node instances.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were
        appended.
    **/
    appendNode: function (parent, node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "appendNode", 226);
_yuitest_coverline("build/tree/tree.js", 227);
return this.insertNode(parent, node, Y.merge(options, {
            index: parent.children.length,
            src  : 'append'
        }));
    },

    /**
    Clears this tree by destroying the root node and all its children. If a
    `rootNode` argument is provided, that node will become the root node of this
    tree; otherwise, a new root node will be created.

    @method clear
    @param {Object|Tree.Node} [rootNode] If specified, this node will be used as
        the new root node.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `clear` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    clear: function (rootNode, options) {
        _yuitest_coverfunc("build/tree/tree.js", "clear", 250);
_yuitest_coverline("build/tree/tree.js", 251);
return this._fireTreeEvent(EVT_CLEAR, {
            rootNode: this.createNode(rootNode || this._rootNodeConfig),
            src     : options && options.src
        }, {
            defaultFn: this._defClearFn,
            silent   : options && options.silent
        });
    },

    /**
    Creates and returns a new `Tree.Node` instance associated with (but not
    yet appended to) this tree.

    @method createNode
    @param {Object|Tree.Node} [config] Node configuration. If a `Tree.Node`
        instance is specified instead of a config object, that node will be
        adopted into this tree (if it doesn't already belong to this tree) and
        removed from any other tree to which it belongs.
    @return {Tree.Node|null} New node, or `null` if a node could not be created
        from the given _config_.
    **/
    createNode: function (config) {
        _yuitest_coverfunc("build/tree/tree.js", "createNode", 272);
_yuitest_coverline("build/tree/tree.js", 273);
config || (config = {});

        // If `config` is already a node, just ensure it hasn't been destroyed
        // and is in the node map, then return it.
        _yuitest_coverline("build/tree/tree.js", 277);
if (config._isYUITreeNode) {
            _yuitest_coverline("build/tree/tree.js", 278);
if (config.state.destroyed) {
                _yuitest_coverline("build/tree/tree.js", 279);
Y.error('Cannot insert a node that has already been destroyed.', null, 'tree');
                _yuitest_coverline("build/tree/tree.js", 280);
return null;
            }

            _yuitest_coverline("build/tree/tree.js", 283);
this._adoptNode(config);
            _yuitest_coverline("build/tree/tree.js", 284);
return config;
        }

        // First, create nodes for any children of this node.
        _yuitest_coverline("build/tree/tree.js", 288);
if (config.children) {
            _yuitest_coverline("build/tree/tree.js", 289);
var children = [];

            _yuitest_coverline("build/tree/tree.js", 291);
for (var i = 0, len = config.children.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 292);
children.push(this.createNode(config.children[i]));
            }

            _yuitest_coverline("build/tree/tree.js", 295);
config = Y.merge(config, {children: children});
        }

        _yuitest_coverline("build/tree/tree.js", 298);
var node = new this._nodeClass(this, config);

        _yuitest_coverline("build/tree/tree.js", 300);
return this._nodeMap[node.id] = node;
    },

    /**
    Removes and destroys a node and all its child nodes. Once destroyed, a node
    is eligible for garbage collection and cannot be reused or re-added to the
    tree.

    @method destroyNode
    @param {Tree.Node} node Node to destroy.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, `remove` events will
            be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting events. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @chainable
    **/
    destroyNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "destroyNode", 319);
_yuitest_coverline("build/tree/tree.js", 320);
var child, i, len;

        _yuitest_coverline("build/tree/tree.js", 322);
options || (options = {});

        _yuitest_coverline("build/tree/tree.js", 324);
for (i = 0, len = node.children.length; i < len; i++) {
            _yuitest_coverline("build/tree/tree.js", 325);
child = node.children[i];

            // Manually remove the child from its parent; this makes destroying
            // all children of the parent much faster since there's no splicing
            // involved.
            _yuitest_coverline("build/tree/tree.js", 330);
child.parent = null;

            // Destroy the child.
            _yuitest_coverline("build/tree/tree.js", 333);
this.destroyNode(child, options);
        }

        _yuitest_coverline("build/tree/tree.js", 336);
if (node.parent) {
            _yuitest_coverline("build/tree/tree.js", 337);
this.removeNode(node, options);
        }

        _yuitest_coverline("build/tree/tree.js", 340);
node.children  = [];
        _yuitest_coverline("build/tree/tree.js", 341);
node.data      = {};
        _yuitest_coverline("build/tree/tree.js", 342);
node.state     = {destroyed: true};
        _yuitest_coverline("build/tree/tree.js", 343);
node.tree      = null;
        _yuitest_coverline("build/tree/tree.js", 344);
node._indexMap = {};

        _yuitest_coverline("build/tree/tree.js", 346);
delete this._nodeMap[node.id];

        _yuitest_coverline("build/tree/tree.js", 348);
return this;
    },

    /**
    Removes all children from the specified node. The removed children will
    still be reusable unless the `destroy` option is truthy.

    @method emptyNode
    @param {Tree.Node} node Node to empty.
    @param {Object} [options] Options.
        @param {Boolean} [options.destroy=false] If `true`, the children will
            also be destroyed, which makes them available for garbage collection
            and means they can't be reused.
        @param {Boolean} [options.silent=false] If `true`, `remove` events will
            be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting events. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @return {Tree.Node[]} Array of removed child nodes.
    **/
    emptyNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "emptyNode", 369);
_yuitest_coverline("build/tree/tree.js", 370);
var children = node.children,
            removed  = [];

        _yuitest_coverline("build/tree/tree.js", 373);
for (var i = children.length - 1; i > -1; --i) {
            _yuitest_coverline("build/tree/tree.js", 374);
removed[i] = this.removeNode(children[i], options);
        }

        _yuitest_coverline("build/tree/tree.js", 377);
return removed;
    },

    /**
    Performs a depth-first traversal of _node_, passing it and each of its
    descendants to the specified _callback_, and returning the first node for
    which the callback returns a truthy value.

    Traversal will stop as soon as a truthy value is returned from the callback.

    See `traverseNode()` for more details on how depth-first traversal works.

    @method findNode
    @param {Tree.Node} node Node to traverse.
    @param {Object} [options] Options.
        @param {Number} [options.depth] Depth limit. If specified, descendants
            will only be traversed to this depth before backtracking and moving
            on.
    @param {Function} callback Callback function to call with the traversed
        node and each of its descendants. If this function returns a truthy
        value, traversal will be stopped and the current node will be returned.

        @param {Tree.Node} callback.node Node being traversed.

    @param {Object} [thisObj] `this` object to use when executing _callback_.
    @return {Tree.Node|null} Returns the first node for which the _callback_
        returns a truthy value, or `null` if the callback never returns a truthy
        value.
    **/
    findNode: function (node, options, callback, thisObj) {
        _yuitest_coverfunc("build/tree/tree.js", "findNode", 406);
_yuitest_coverline("build/tree/tree.js", 407);
var match = null;

        // Allow callback as second argument.
        _yuitest_coverline("build/tree/tree.js", 410);
if (typeof options === 'function') {
            _yuitest_coverline("build/tree/tree.js", 411);
thisObj  = callback;
            _yuitest_coverline("build/tree/tree.js", 412);
callback = options;
            _yuitest_coverline("build/tree/tree.js", 413);
options  = {};
        }

        _yuitest_coverline("build/tree/tree.js", 416);
this.traverseNode(node, options, function (descendant) {
            _yuitest_coverfunc("build/tree/tree.js", "(anonymous 3)", 416);
_yuitest_coverline("build/tree/tree.js", 417);
if (callback.call(thisObj, descendant)) {
                _yuitest_coverline("build/tree/tree.js", 418);
match = descendant;
                _yuitest_coverline("build/tree/tree.js", 419);
return Tree.STOP_TRAVERSAL;
            }
        });

        _yuitest_coverline("build/tree/tree.js", 423);
return match;
    },

    /**
    Returns the tree node with the specified id, or `undefined` if the node
    doesn't exist in this tree.

    @method getNodeById
    @param {String} id Node id.
    @return {Tree.Node} Node, or `undefined` if not found.
    **/
    getNodeById: function (id) {
        _yuitest_coverfunc("build/tree/tree.js", "getNodeById", 434);
_yuitest_coverline("build/tree/tree.js", 435);
return this._nodeMap[id];
    },

    /**
    Inserts a node or array of nodes at the specified index under the given
    parent node, or appends them to the parent if no index is specified.

    If a node being inserted is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method insertNode
    @param {Tree.Node} parent Parent node.
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node, node config
        object, array of child nodes, or array of node config objects to insert
        under the given parent. Node config objects will automatically be
        converted into node instances.

    @param {Object} [options] Options.
        @param {Number} [options.index] Index at which to insert the child node.
            If not specified, the node will be appended as the last child of the
            parent.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
        @param {String} [options.src='insert'] Source of the change, to be
            passed along to the event facade of the resulting event. This can be
            used to distinguish between changes triggered by a user and changes
            triggered programmatically, for example.

    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were inserted.
    **/
    insertNode: function (parent, node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "insertNode", 465);
_yuitest_coverline("build/tree/tree.js", 466);
options || (options = {});
        _yuitest_coverline("build/tree/tree.js", 467);
parent  || (parent = this.rootNode);

        // If `node` is an array, recurse to insert each node it contains.
        //
        // Note: If you're getting an exception here because `node` is null when
        // you've passed in a reference to some other node's `children` array,
        // that's happening because nodes must be removed from their current
        // parent before being added to the new one, and the `children` array is
        // being modified while the nodes are inserted.
        //
        // Solution: pass a copy of the other node's `children` array instead of
        // the original. Doing the copy operation here would have a negative
        // impact on performance, so you're on your own since this is such a
        // rare edge case.
        _yuitest_coverline("build/tree/tree.js", 481);
if ('length' in node && Lang.isArray(node)) {
            _yuitest_coverline("build/tree/tree.js", 482);
var hasIndex      = 'index' in options,
                insertedNodes = [],
                insertedNode;

            _yuitest_coverline("build/tree/tree.js", 486);
for (var i = 0, len = node.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 487);
insertedNode = this.insertNode(parent, node[i], options);

                _yuitest_coverline("build/tree/tree.js", 489);
if (insertedNode) {
                    _yuitest_coverline("build/tree/tree.js", 490);
insertedNodes.push(insertedNode);

                    _yuitest_coverline("build/tree/tree.js", 492);
if (hasIndex) {
                        _yuitest_coverline("build/tree/tree.js", 493);
options.index += 1;
                    }
                }
            }

            _yuitest_coverline("build/tree/tree.js", 498);
return insertedNodes;
        }

        _yuitest_coverline("build/tree/tree.js", 501);
node = this.createNode(node);

        _yuitest_coverline("build/tree/tree.js", 503);
if (node) {
            _yuitest_coverline("build/tree/tree.js", 504);
var index = options.index;

            _yuitest_coverline("build/tree/tree.js", 506);
if (typeof index === 'undefined') {
                _yuitest_coverline("build/tree/tree.js", 507);
index = this._getDefaultNodeIndex(parent, node, options);
            }

            _yuitest_coverline("build/tree/tree.js", 510);
this._fireTreeEvent(EVT_ADD, {
                index : index,
                node  : node,
                parent: parent,
                src   : options.src || 'insert'
            }, {
                defaultFn: this._defAddFn,
                silent   : options.silent
            });
        }

        _yuitest_coverline("build/tree/tree.js", 521);
return node;
    },

    /**
    Prepends a node or array of nodes at the beginning of the specified parent
    node.

    If a node being prepended is from another tree, it and all its children will
    be removed from that tree and moved to this one.

    @method prependNode
    @param {Tree.Node} parent Parent node.
    @param {Object|Object[]|Tree.Node|Tree.Node[]} node Child node,
        node config object, array of child nodes, or array of node config
        objects to prepend to the given parent. Node config objects will
        automatically be converted into node instances.
    @param {Object} [options] Options.
        @param {Boolean} [options.silent=false] If `true`, the `add` event will
            be suppressed.
    @return {Tree.Node|Tree.Node[]} Node or array of nodes that were
        prepended.
    **/
    prependNode: function (parent, node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "prependNode", 543);
_yuitest_coverline("build/tree/tree.js", 544);
return this.insertNode(parent, node, Y.merge(options, {
            index: 0,
            src  : 'prepend'
        }));
    },

    /**
    Removes the specified node from its parent node. The removed node will still
    be reusable unless the `destroy` option is truthy.

    @method removeNode
    @param {Tree.Node} node Node to remove.
    @param {Object} [options] Options.
        @param {Boolean} [options.destroy=false] If `true`, the node and all its
            children will also be destroyed, which makes them available for
            garbage collection and means they can't be reused.
        @param {Boolean} [options.silent=false] If `true`, the `remove` event
            will be suppressed.
        @param {String} [options.src] Source of the change, to be passed along
            to the event facade of the resulting event. This can be used to
            distinguish between changes triggered by a user and changes
            triggered programmatically, for example.
    @return {Tree.Node} Node that was removed.
    **/
    removeNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "removeNode", 568);
_yuitest_coverline("build/tree/tree.js", 569);
options || (options = {});

        _yuitest_coverline("build/tree/tree.js", 571);
this._fireTreeEvent(EVT_REMOVE, {
            destroy: !!options.destroy,
            node   : node,
            parent : node.parent,
            src    : options.src || 'remove'
        }, {
            defaultFn: this._defRemoveFn,
            silent   : options.silent
        });

        _yuitest_coverline("build/tree/tree.js", 581);
return node;
    },

    /**
    Returns the total number of nodes in this tree, at all levels.

    Use `rootNode.children.length` to get only the number of top-level nodes.

    @method size
    @return {Number} Total number of nodes in this tree.
    **/
    size: function () {
        _yuitest_coverfunc("build/tree/tree.js", "size", 592);
_yuitest_coverline("build/tree/tree.js", 593);
return this.rootNode.size() + 1;
    },

    /**
    Serializes this tree to an object suitable for use in JSON.

    @method toJSON
    @return {Object} Serialized tree object.
    **/
    toJSON: function () {
        _yuitest_coverfunc("build/tree/tree.js", "toJSON", 602);
_yuitest_coverline("build/tree/tree.js", 603);
return this.rootNode.toJSON();
    },

    /**
    Performs a depth-first traversal of _node_, passing it and each of its
    descendants to the specified _callback_.

    If the callback function returns `Tree.STOP_TRAVERSAL`, traversal will be
    stopped immediately. Otherwise, it will continue until the deepest
    descendant of _node_ has been traversed, or until each branch has been
    traversed to the optional maximum depth limit.

    Since traversal is depth-first, that means nodes are traversed like this:

                1
              / | \
             2  8  9
            / \     \
           3   7    10
         / | \      / \
        4  5  6    11 12

    @method traverseNode
    @param {Tree.Node} node Node to traverse.
    @param {Object} [options] Options.
        @param {Number} [options.depth] Depth limit. If specified, descendants
            will only be traversed to this depth before backtracking and moving
            on.
    @param {Function} callback Callback function to call with the traversed
        node and each of its descendants.

        @param {Tree.Node} callback.node Node being traversed.

    @param {Object} [thisObj] `this` object to use when executing _callback_.
    @return {Mixed} Returns `Tree.STOP_TRAVERSAL` if traversal was stopped;
        otherwise returns `undefined`.
    **/
    traverseNode: function (node, options, callback, thisObj) {
        _yuitest_coverfunc("build/tree/tree.js", "traverseNode", 640);
_yuitest_coverline("build/tree/tree.js", 641);
if (node.state.destroyed) {
            _yuitest_coverline("build/tree/tree.js", 642);
Y.error('Cannot traverse a node that has been destroyed.', null, 'tree');
            _yuitest_coverline("build/tree/tree.js", 643);
return;
        }

        // Allow callback as second argument.
        _yuitest_coverline("build/tree/tree.js", 647);
if (typeof options === 'function') {
            _yuitest_coverline("build/tree/tree.js", 648);
thisObj  = callback;
            _yuitest_coverline("build/tree/tree.js", 649);
callback = options;
            _yuitest_coverline("build/tree/tree.js", 650);
options  = {};
        }

        _yuitest_coverline("build/tree/tree.js", 653);
options || (options = {});

        _yuitest_coverline("build/tree/tree.js", 655);
var stop      = Tree.STOP_TRAVERSAL,
            unlimited = typeof options.depth === 'undefined';

        _yuitest_coverline("build/tree/tree.js", 658);
if (callback.call(thisObj, node) === stop) {
            _yuitest_coverline("build/tree/tree.js", 659);
return stop;
        }

        _yuitest_coverline("build/tree/tree.js", 662);
var children = node.children;

        _yuitest_coverline("build/tree/tree.js", 664);
if (unlimited || options.depth > 0) {
            _yuitest_coverline("build/tree/tree.js", 665);
var childOptions = unlimited ? options : {depth: options.depth - 1};

            _yuitest_coverline("build/tree/tree.js", 667);
for (var i = 0, len = children.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 668);
if (this.traverseNode(children[i], childOptions, callback, thisObj) === stop) {
                    _yuitest_coverline("build/tree/tree.js", 669);
return stop;
                }
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Moves the specified node and all its children from another tree to this
    tree.

    @method _adoptNode
    @param {Tree.Node} node Node to adopt.
    @param {Object} [options] Options to pass along to `removeNode()`.
    @protected
    **/
    _adoptNode: function (node, options) {
        _yuitest_coverfunc("build/tree/tree.js", "_adoptNode", 686);
_yuitest_coverline("build/tree/tree.js", 687);
var oldTree = node.tree;

        _yuitest_coverline("build/tree/tree.js", 689);
if (oldTree === this) {
            _yuitest_coverline("build/tree/tree.js", 690);
return;
        }

        _yuitest_coverline("build/tree/tree.js", 693);
for (var i = 0, len = node.children.length; i < len; i++) {
            _yuitest_coverline("build/tree/tree.js", 694);
this._adoptNode(node.children[i], {silent: true});
        }

        _yuitest_coverline("build/tree/tree.js", 697);
oldTree.removeNode(node, options);
        _yuitest_coverline("build/tree/tree.js", 698);
delete oldTree._nodeMap[node.id];

        // If this node isn't an instance of this tree's composed _nodeClass,
        // then we need to recreate it to avoid potentially breaking things in
        // really weird ways.
        _yuitest_coverline("build/tree/tree.js", 703);
if (!(node instanceof this._nodeClass)
                || oldTree._nodeClass !== this._nodeClass) {

            _yuitest_coverline("build/tree/tree.js", 706);
node = this.createNode(node.toJSON());
        }

        _yuitest_coverline("build/tree/tree.js", 709);
node.tree = this;
        _yuitest_coverline("build/tree/tree.js", 710);
this._nodeMap[node.id] = node;
    },

    /**
    Composes a custom late-bound tree node class (if necessary) based on the
    classes specified in this Tree's `nodeClass` and `nodeExtensions`
    properties.

    The composed class is stored in this Tree's `_nodeClass` property. If
    composition wasn't necessary, then `_nodeClass` will just be a reference to
    `nodeClass`.

    @method _composeNodeClass
    @protected
    **/
    _composeNodeClass: function () {
        _yuitest_coverfunc("build/tree/tree.js", "_composeNodeClass", 725);
_yuitest_coverline("build/tree/tree.js", 726);
var nodeClass      = this.nodeClass,
            nodeExtensions = this.nodeExtensions,
            composedClass;

        _yuitest_coverline("build/tree/tree.js", 730);
if (typeof nodeClass === 'string') {
            // Look for a namespaced node class on `Y`.
            _yuitest_coverline("build/tree/tree.js", 732);
nodeClass = Y.Object.getValue(Y, nodeClass.split('.'));

            _yuitest_coverline("build/tree/tree.js", 734);
if (nodeClass) {
                _yuitest_coverline("build/tree/tree.js", 735);
this.nodeClass = nodeClass;
            } else {
                _yuitest_coverline("build/tree/tree.js", 737);
Y.error('Node class not found: ' + nodeClass, null, 'tree');
                _yuitest_coverline("build/tree/tree.js", 738);
return;
            }
        }

        _yuitest_coverline("build/tree/tree.js", 742);
if (!nodeExtensions.length) {
            _yuitest_coverline("build/tree/tree.js", 743);
this._nodeClass = nodeClass;
            _yuitest_coverline("build/tree/tree.js", 744);
return;
        }

        // Compose a new class by mixing extensions into nodeClass.
        _yuitest_coverline("build/tree/tree.js", 748);
composedClass = function () {
            _yuitest_coverfunc("build/tree/tree.js", "composedClass", 748);
_yuitest_coverline("build/tree/tree.js", 749);
var extensions = composedClass._nodeExtensions;

            _yuitest_coverline("build/tree/tree.js", 751);
nodeClass.apply(this, arguments);

            _yuitest_coverline("build/tree/tree.js", 753);
for (var i = 0, len = extensions.length; i < len; i++) {
                _yuitest_coverline("build/tree/tree.js", 754);
extensions[i].apply(this, arguments);
            }
        };

        _yuitest_coverline("build/tree/tree.js", 758);
Y.extend(composedClass, nodeClass);

        _yuitest_coverline("build/tree/tree.js", 760);
for (var i = 0, len = nodeExtensions.length; i < len; i++) {
            _yuitest_coverline("build/tree/tree.js", 761);
Y.mix(composedClass.prototype, nodeExtensions[i].prototype, true);
        }

        _yuitest_coverline("build/tree/tree.js", 764);
composedClass._nodeExtensions = nodeExtensions;
        _yuitest_coverline("build/tree/tree.js", 765);
this._nodeClass = composedClass;
    },

    /**
    Utility method for lazily publishing and firing events.

    @method _fireTreeEvent
    @param {String} name Event name to fire.
    @param {Object} facade Event facade.
    @param {Object} [options] Options.
        @param {Function} [options.defaultFn] Default handler for this event.
        @param {Boolean} [options.silent=false] Whether the default handler
            should be executed directly without actually firing the event.
    @chainable
    @protected
    **/
    _fireTreeEvent: function (name, facade, options) {
        _yuitest_coverfunc("build/tree/tree.js", "_fireTreeEvent", 781);
_yuitest_coverline("build/tree/tree.js", 782);
if (options && options.silent) {
            _yuitest_coverline("build/tree/tree.js", 783);
if (options.defaultFn) {
                _yuitest_coverline("build/tree/tree.js", 784);
facade.silent = true; // intentionally modifying the facade
                _yuitest_coverline("build/tree/tree.js", 785);
options.defaultFn.call(this, facade);
            }
        } else {
            _yuitest_coverline("build/tree/tree.js", 788);
if (options && options.defaultFn && !this._published[name]) {
                _yuitest_coverline("build/tree/tree.js", 789);
this._published[name] = this.publish(name, {
                    defaultFn: options.defaultFn
                });
            }

            _yuitest_coverline("build/tree/tree.js", 794);
this.fire(name, facade);
        }

        _yuitest_coverline("build/tree/tree.js", 797);
return this;
    },

    /**
    Returns the default insertion index that should be used when _node_ is
    inserted as a child of _parent_ without an explicit index.

    The primary purpose of this method is to serve as a hook point for
    extensions and plugins that need to customize insertion order.

    @method _getDefaultNodeIndex
    @param {Tree.Node} parent Parent node.
    @param {Tree.Node} node Node being inserted.
    @param {Object} [options] Options passed to `insertNode()`.
    @return {Number} Index at which _node_ should be inserted into _parent_'s
        `children` array.
    @protected
    **/
    _getDefaultNodeIndex: function (parent/*, node, options*/) {
        _yuitest_coverfunc("build/tree/tree.js", "_getDefaultNodeIndex", 815);
_yuitest_coverline("build/tree/tree.js", 816);
return parent.children.length;
    },

    /**
    Removes the specified node from its parent node if it has one.

    @method _removeNodeFromParent
    @param {Tree.Node} node Node to remove.
    @protected
    **/
    _removeNodeFromParent: function (node) {
        _yuitest_coverfunc("build/tree/tree.js", "_removeNodeFromParent", 826);
_yuitest_coverline("build/tree/tree.js", 827);
var parent = node.parent,
            index;

        _yuitest_coverline("build/tree/tree.js", 830);
if (parent) {
            _yuitest_coverline("build/tree/tree.js", 831);
index = parent.indexOf(node);

            _yuitest_coverline("build/tree/tree.js", 833);
if (index > -1) {
                _yuitest_coverline("build/tree/tree.js", 834);
var children = parent.children;

                _yuitest_coverline("build/tree/tree.js", 836);
if (index === children.length - 1) {
                    _yuitest_coverline("build/tree/tree.js", 837);
children.pop();
                } else {
                    _yuitest_coverline("build/tree/tree.js", 839);
children.splice(index, 1);
                    _yuitest_coverline("build/tree/tree.js", 840);
parent._isIndexStale = true;
                }

                _yuitest_coverline("build/tree/tree.js", 843);
node.parent = null;
            }
        }
    },

    // -- Default Event Handlers -----------------------------------------------
    _defAddFn: function (e) {
        _yuitest_coverfunc("build/tree/tree.js", "_defAddFn", 849);
_yuitest_coverline("build/tree/tree.js", 850);
var index  = e.index,
            node   = e.node,
            parent = e.parent,
            oldIndex;

        // Remove the node from its existing parent if it has one.
        _yuitest_coverline("build/tree/tree.js", 856);
if (node.parent) {
            // If the node's existing parent is the same parent it's being
            // inserted into, adjust the index to avoid an off-by-one error.
            _yuitest_coverline("build/tree/tree.js", 859);
if (node.parent === parent) {
                _yuitest_coverline("build/tree/tree.js", 860);
oldIndex = parent.indexOf(node);

                _yuitest_coverline("build/tree/tree.js", 862);
if (oldIndex === index) {
                    // Old index is the same as the new index, so just don't do
                    // anything.
                    _yuitest_coverline("build/tree/tree.js", 865);
return;
                } else {_yuitest_coverline("build/tree/tree.js", 866);
if (oldIndex < index) {
                    // Removing the node from its old index will affect the new
                    // index, so decrement the new index by one.
                    _yuitest_coverline("build/tree/tree.js", 869);
index -= 1;
                }}
            }

            _yuitest_coverline("build/tree/tree.js", 873);
this.removeNode(node, {
                silent: e.silent,
                src   : 'add'
            });
        }

        // Add the node to its new parent at the desired index.
        _yuitest_coverline("build/tree/tree.js", 880);
node.parent = parent;
        _yuitest_coverline("build/tree/tree.js", 881);
parent.children.splice(index, 0, node);

        _yuitest_coverline("build/tree/tree.js", 883);
parent.canHaveChildren = true;
        _yuitest_coverline("build/tree/tree.js", 884);
parent._isIndexStale   = true;
    },

    _defClearFn: function (e) {
        _yuitest_coverfunc("build/tree/tree.js", "_defClearFn", 887);
_yuitest_coverline("build/tree/tree.js", 888);
var newRootNode = e.rootNode;

        _yuitest_coverline("build/tree/tree.js", 890);
if (this.rootNode) {
            _yuitest_coverline("build/tree/tree.js", 891);
this.destroyNode(this.rootNode, {silent: true});
        }

        _yuitest_coverline("build/tree/tree.js", 894);
this._nodeMap = {};
        _yuitest_coverline("build/tree/tree.js", 895);
this._nodeMap[newRootNode.id] = newRootNode;

        _yuitest_coverline("build/tree/tree.js", 897);
this.rootNode = newRootNode;
        _yuitest_coverline("build/tree/tree.js", 898);
this.children = newRootNode.children;
    },

    _defRemoveFn: function (e) {
        _yuitest_coverfunc("build/tree/tree.js", "_defRemoveFn", 901);
_yuitest_coverline("build/tree/tree.js", 902);
var node = e.node;

        _yuitest_coverline("build/tree/tree.js", 904);
if (e.destroy) {
            _yuitest_coverline("build/tree/tree.js", 905);
this.destroyNode(node, {silent: true});
        } else {_yuitest_coverline("build/tree/tree.js", 906);
if (e.parent) {
            _yuitest_coverline("build/tree/tree.js", 907);
this._removeNodeFromParent(node);
        } else {_yuitest_coverline("build/tree/tree.js", 908);
if (this.rootNode === node) {
            // Guess we'll need a new root node!
            _yuitest_coverline("build/tree/tree.js", 910);
this.rootNode = this.createNode(this._rootNodeConfig);
            _yuitest_coverline("build/tree/tree.js", 911);
this.children = this.rootNode.children;
        }}}
    }
}, {
    /**
    Return this value from a `Tree#traverseNode()` or `Tree.Node#traverse()`
    callback to immediately stop traversal.

    @property STOP_TRAVERSAL
    @static
    **/
    STOP_TRAVERSAL: {}
});

_yuitest_coverline("build/tree/tree.js", 925);
Y.Tree = Y.mix(Tree, Y.Tree);


}, '@VERSION@', {"requires": ["base-build", "tree-node"]});
