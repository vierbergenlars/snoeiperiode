// ------- intro.js ------- \\
(function() {
    var tjs = function() {
        var _COMPILED = true;
        var _NODE = false;
        // ------- jquery-fill.js ------- \\
        // Not Node.js ...
        if (!_NODE
        // ... and jQuery loaded
        && window.jQuery) {
            var jQuery = window.jQuery;
        }
        if (!jQuery) {
            var jQuery = (function() {
                var jQuery = {};
                // https://github.com/jquery/jquery/blob/aa1350d9e29571a82d09bb7a2eac4396901daa77/src/core.js#L23
                var core_toString = Object.prototype.toString;
                // https://github.com/jquery/jquery/blob/aa1350d9e29571a82d09bb7a2eac4396901daa77/src/core.js#L79
                var class2type = {};
                // https://github.com/jquery/jquery/blob/aa1350d9e29571a82d09bb7a2eac4396901daa77/src/core.js#L277-339

                jQuery.extend = function() {
                    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

                    // Handle a deep copy situation
                    if ( typeof target === "boolean") {
                        deep = target;
                        target = arguments[1] || {};
                        // skip the boolean and the target
                        i = 2;
                    }

                    // Handle case when target is a string or something (possible in deep copy)
                    if ( typeof target !== "object" && !jQuery.isFunction(target)) {
                        target = {};
                    }

                    // extend jQuery itself if only one argument is passed
                    if (length === i) {
                        target = this; --i;
                    }

                    for (; i < length; i++) {
                        // Only deal with non-null/undefined values
                        if (( options = arguments[i]) != null) {
                            // Extend the base object
                            for (name in options ) {
                                src = target[name];
                                copy = options[name];

                                // Prevent never-ending loop
                                if (target === copy) {
                                    continue;
                                }

                                // Recurse if we're merging plain objects or arrays
                                if (deep && copy && (jQuery.isPlainObject(copy) || ( copyIsArray = jQuery.isArray(copy)) )) {
                                    if (copyIsArray) {
                                        copyIsArray = false;
                                        clone = src && jQuery.isArray(src) ? src : [];

                                    } else {
                                        clone = src && jQuery.isPlainObject(src) ? src : {};
                                    }

                                    // Never move original objects, clone them
                                    target[name] = jQuery.extend(deep, clone, copy);

                                    // Don't bring in undefined values
                                } else if (copy !== undefined) {
                                    target[name] = copy;
                                }
                            }
                        }
                    }

                    // Return the modified object
                    return target;
                };

                // https://github.com/jquery/jquery/blob/aa1350d9e29571a82d09bb7a2eac4396901daa77/src/core.js#L400-460
                jQuery.extend({

                    // See test/unit/core.js for details concerning isFunction.
                    // Since version 1.3, DOM methods and functions like alert
                    // aren't supported. They return false on IE (#2968).
                    isFunction : function(obj) {//
                        return jQuery.type(obj) === "function";
                    },

                    isArray : Array.isArray ||
                    function(obj) {//
                        return jQuery.type(obj) === "array";
                    },

                    isWindow : function(obj) {
                        return obj != null && obj == obj.window;
                    },

                    // ..SNIP..

                    type : function(obj) {//
                        return obj == null ? String(obj) : class2type[ core_toString.call(obj)] || "object";
                    },

                    isPlainObject : function(obj) {//
                        // Must be an Object.
                        // Because of IE, we also have to check the presence of the constructor property.
                        // Make sure that DOM nodes and window objects don't pass through, as well
                        if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                            return false;
                        }

                        try {
                            // Not own constructor property must be Object
                            if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                                return false;
                            }
                        } catch ( e ) {
                            // IE8,9 Will throw exceptions on certain host objects #9897
                            return false;
                        }

                        // Own properties are enumerated firstly, so to speed up,
                        // if last one is own, then all properties are own.

                        var key;
                        for (key in obj ) {
                        }

                        return key === undefined || core_hasOwn.call(obj, key);
                    },

                    isEmptyObject : function(obj) {
                        var name;
                        for (name in obj ) {
                            return false;
                        }
                        return true;
                    }
                });

                // https://github.com/jquery/jquery/blob/aa1350d9e29571a82d09bb7a2eac4396901daa77/src/core.js#L566-605
                jQuery.extend({
                    each : function(obj, callback, args) {
                        var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);

                        if (args) {
                            if (isObj) {
                                for (name in obj ) {
                                    if (callback.apply(obj[name], args) === false) {
                                        break;
                                    }
                                }
                            } else {
                                for (; i < length; ) {
                                    if (callback.apply(obj[i++], args) === false) {
                                        break;
                                    }
                                }
                            }

                            // A special, fast, case for the most common use of each
                        } else {
                            if (isObj) {
                                for (name in obj ) {
                                    if (callback.call(obj[name], name, obj[name]) === false) {
                                        break;
                                    }
                                }
                            } else {
                                for (; i < length; ) {
                                    if (callback.call(obj[i], i, obj[i++]) === false) {
                                        break;
                                    }
                                }
                            }
                        }

                        return obj;
                    }
                });

                // https://github.com/jquery/jquery/blob/aa1350d9e29571a82d09bb7a2eac4396901daa77/src/core.js#L885-888
                //// Populate the class2type map
                jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
                    class2type["[object " + name + "]"] = name.toLowerCase();
                });
                return jQuery;
            })();
        }
        // ------- util.js ------- \\
        var util = {}

        util.verifyCallback = function(callback) {
            if ( typeof callback != "function") {
                return function() {
                };
            }
            return callback;
        }

        util.verifyType = function(variable, type) {
            if ( typeof variable != type) {
                throw new TypeError('Expecting ' + type + ', got ' + typeof variable);
            }
        }

        util.verifyInstance = function(variable, type) {
            if (!( variable instanceof type)) {
                throw new TypeError('Expecting instance of ' + Object.prototype.toString.call(type) + ', got ' + Object.prototype.toString.call(variable))
            }
        }

        util.fileExtension = function(path) {
            util.verifyType(path, 'string');
            var filename = path.split('/').pop();
            var fileparts = filename.split('.');
            if (fileparts.length < 2) {
                return '';
            }
            return fileparts.pop();
        }

        util.argumentsToArray = function(args) {
            return Array.prototype.slice.call(args);
            // Convert arguments object to Array
        }

        util.registerPublicVariables = function(this_obj, obj) {
            if (!this_obj.__defineGetter__) {
                for (var vari in obj) {
                    this_obj[vari] = obj[vari];
                }
            } else {
                for (var vari in obj) {
                    (function(vari) {
                        this_obj.__defineGetter__(vari, function() {
                            return obj[vari]
                        });
                    })(vari);
                }
            }
        }

        util.hasOwnProp = (function() {
            if (Object.prototype.hasOwnProperty) {
                return function(obj, prop) {
                    return obj.hasOwnProperty(prop);
                }
            } else {
                return function(obj, prop) {
                    var proto = obj.__proto__ || obj.constructor.prototype;
                    return ( prop in obj) && (!( prop in proto) || proto[prop] !== obj[prop]);
                }
            }
        })();

        util.wait = function(callback) {
            if (_NODE) {
                process.nextTick(callback);
            } else {
                setTimeout(callback, 10);
            }
        }
        if ( typeof _COMPILED == "undefined") {
            module.exports = util;
        }
        // ------- core/core.js ------- \\
        var T = function(template, callback) {
            callback = util.verifyCallback(callback);
            if (!(this instanceof T)) {
                return new T(template, callback);
            }
            this._busy = 0;
            if (template) {
                this.load(template, callback);
            }
        }
        var _t = {};
        _t.init = {};
        _t.init.data = function() {
            if (!this._data) {
                this._data = {};
            }
        }

        T.prototype.load = function(template, callback) {
            this._busy++;
            callback = util.verifyCallback(callback);
            if ( template instanceof T) {
                if (template._busy) {// The template is busy doing something, wait!
                    var me = this;
                    var cb = function() {
                        T.prototype.load.call(me, template, callback);
                        me._busy--;
                    }
                    util.wait(cb);
                    return;
                } else {
                    var prev_busy = this._busy;
                    var prev_ref = this._ref;
                    for (var vari in template) {
                        if (util.hasOwnProp(template, vari)) {
                            if ( typeof template[vari] == "object") {
                                this[vari] = jQuery.extend(true, {}, template[vari]);
                            } else {
                                this[vari] = template[vari];
                            }
                        }
                    }
                    this._busy = prev_busy;
                    this._ref = prev_ref;
                    callback.call(this, null, this._template);
                    this._busy--;
                }
            }
            if ( template instanceof T.template) {
                this._busy--;
                this._template = template;
                callback.call(this, null, template);
                return this;
            } else if ( typeof template == 'string') {
                var me = this;
                T.transport(template, function(err, data) {
                    me._busy--;
                    if (err) {
                        callback.call(me, err);
                        return;
                    }
                    var ext = util.fileExtension(template);
                    var parser = T.parser.extensions[ext];
                    var templ = new T.template(data, parser);
                    me.load(templ, callback);
                });
                return this;
            }
        }

        T.prototype.bind = function(template, variableName) {
            util.verifyInstance(template, T);
            if (!variableName) {
                variableName = 'outlet';
            }
            this._data[variableName] = template;
        }

        T.prototype.update = function(data, merge, callback) {
            this._busy++;
            if ( typeof merge == 'function') {
                callback = merge;
                merge = null;
            }
            if ( typeof data == 'function') {
                callback = data;
                data = null;
            }

            callback = util.verifyCallback(callback);

            if ( typeof merge == 'undefined' || merge === null) {
                merge = true;
            } else {
                merge = false;
            }

            _t.init.data.call(this);

            if ( typeof data == 'object' && data !== null) {
                _t.update.obj.call(this, data, merge, callback);
            } else if ( typeof data == 'string') {
                _t.update.url.call(this, data, merge, callback);
            } else {
                callback.call(this, null, this._data);
                this._busy--;
            }

        }

        _t.update = {};
        _t.update.obj = function(data, merge, callback) {
            util.verifyType(data, 'object');
            util.verifyType(merge, 'boolean');
            util.verifyType(callback, 'function');

            if (merge) {
                jQuery.extend(true, this._data, data);
            } else {
                var bindings = {};
                jQuery.each(this._data, function(key, template) {
                    if ( template instanceof T) {
                        bindings[key] = template;
                    }
                });
                this._data = data;

                this._data = jQuery.extend(true, {}, bindings, this._data);
            }
            callback.call(this, null, this._data);
            this._busy--;
        }

        _t.update.url = function(url, merge, callback) {
            var me = this;
            T.transport.getJSON(url, function(err, data) {
                me._busy--;
                if (err) {
                    callback.call(me, err);
                    return;
                }
                me.update(data, merge, callback);
            });
        }

        T.prototype.render = function(data, callback) {
            if ( typeof data == "function") {
                callback = data;
                data = null;
            }
            callback = util.verifyCallback(callback);
            if (!this._template) {
                callback.call(this, 'No template loaded');
                return false;
            }
            if (data) {
                util.verifyType(data, 'object');
            } else {
                if (this._busy) {
                    var me = this;
                    var cb = function() {
                        T.prototype.render.call(me, callback);
                    }
                    if (_NODE) {
                        process.nextTick(cb);
                    } else {
                        setTimeout(cb, 10);
                    }
                    return;
                }
                data = this._data;
            }
            var me = this;
            callback = util.verifyCallback(callback);
            var rendered_data = {};
            jQuery.each(data, function(name, value) {
                if ( value instanceof T) {
                    if (value._busy) {
                        var cb = function() {
                            T.prototype.render.call(me, callback);
                        }
                        if (_NODE) {
                            process.nextTick(cb);
                        } else {
                            setTimeout(cb, 10);
                        }
                    }
                    value.render(function(err, rendered) {
                        if (err) {
                            callback.call(me, err);
                            return;
                        }
                        rendered_data[name] = rendered;
                    });
                } else {
                    rendered_data[name] = value;
                }
            })
            var rendered = this._template.render(rendered_data);
            callback.call(this, null, rendered);
            return rendered;
        }
        // ------- parser/parser.js ------- \\
        T.parser = function(parser) {
            if (!(this instanceof T.parser)) {
                return new T.parser(parser);
            }
            if (!T.parser.parsers.hasOwnProperty(parser)) {
                throw new Error('Parser not loaded ' + parser);
            }
            this._parser = T.parser.parsers[parser];
        }

        T.parser.prototype.compile = function(template) {
            return this._parser.compile(template);
        }

        T.parser.prototype.render = function(compiled, data) {
            return this._parser.render(compiled, data);
        }

        T.parser.parsers = {};
        T.parser.extensions = {};

        T.parser.define = function(name, extensions, object) {
            if (!( extensions instanceof Array)) {
                object = extensions;
                extensions = [name];
            }
            jQuery.each(extensions, function() {
                T.parser.extensions[this.toString()] = name;
            });
            T.parser.parsers[name] = object;
        }
        // ------- parser/html.js ------- \\
        T.parser.define('html', ['html', 'htm'], {
            compile : function(template) {
                return template;
            },
            render : function(compiled) {
                return compiled;
            }
        });

        T.parser.fallback = 'html';
        // ------- template.js ------- \\
        T.template = function(template, parser) {
            if (!(this instanceof T.template)) {
                return new T.template(template, parser);
            }
            if (!parser) {
                parser = T.parser.fallback;
            }
            this._parser = new T.parser(parser);
            this.compile(template);
        }

        T.template.prototype.compile = function(template) {
            this._compiled = this._parser.compile(template);
        }

        T.template.prototype.render = function(data) {
            return this._parser.render(this._compiled, data);
        }
        // ------- transport/transport.js ------- \\
        T.transport = function(url, callback) {
            T.transport._func(url, callback);
        }

        T.transport.define = function(func) {
            T.transport._func = func;
        }

        T.transport.define(function(url, callback) {
            callback("No transport registered");
        });

        T.transport.getJSON = function(url, callback) {
            T.transport(url, function(error, data) {
                if (error) {
                    callback(error);
                    return;
                }
                if ( typeof data == "string") {
                    data = JSON.parse(data);
                }
                callback(null, data);
            });
        }
        // ------- core/browser-extensions.js ------- \\
        T.prototype.attach = function(element) {
            if ( typeof jQuery == "function") {
                var elem = jQuery(element);
                if (elem.length != 1) {
                    throw new RangeError('You can only bind a template to exactly one element.');
                }
                elem = elem[0];
            } else {
                if ( typeof element == "string" && document.querySelectorAll) {
                    var elem = document.querySelectorAll(element);
                    if (elem.length != 1) {
                        throw new RangeError('You can only bind a template to exactly one element.');
                    }
                    elem = elem[0];
                } else if ( typeof element == "object") {
                    if (!element.innerHTML) {
                        throw new Error('Pass a DOM element, please!');
                    }
                    var elem = element;
                } else {
                    throw new Error('jQuery is not available and document.querySelectorAll is not supported. Pass a DOM element!');
                }
            }
            this._attached = elem;
            _t.pushToDom.call(this);
        }
        if ( typeof _t == "undefined") {
            var _t = {};
        }
        _t.pushToDom = function() {
            if (!this._attached) {
                return;
            }
            var me = this;
            this.render(function(err, rendered) {
                if (err) {
                    return;
                }
                me._attached.innerHTML = rendered;
            })
        }
        var _orig_update = T.prototype.update;

        T.prototype.update = function(data, merge, callback) {
            if ( typeof merge == 'function') {
                callback = merge;
                merge = null;
            }
            if ( typeof data == 'function') {
                callback = data;
                data = null;
            }
            callback = util.verifyCallback(callback);
            var wrapper = function() {
                _t.pushToDom.call(this);
                callback.apply(this, arguments);
            }
            _orig_update.call(this, data, merge, wrapper);
        }
        // ------- transport/browser.js ------- \\
        if ( typeof jQuery != "undefined" && jQuery.ajax) {
            T.transport.define(function(url, callback) {
                return jQuery.ajax(url, {
                    success : function(data) {
                        callback(null, data);
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        callback(textStatus);
                    },
                    dataType : "text"
                });
            });
        } else {
            T.transport.define(function(url, callback) {
                var new_xhr = function() {
                    try {
                        return new XMLHttpRequest();
                    } catch(e) {
                    }
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                    }
                    throw "XMLHttpRequest not supported";
                    return null;
                };

                var request = new_xhr();
                request.open("GET", url);
                request.onreadystatechange = function() {
                    if (request.readyState != 4)
                        return;
                    if (request.status >= 400) {
                        callback(request.statusText);
                    }
                    var data = request.responseText;
                    callback(null, data);
                };
                request.send();
            });
        }// ------- router/router.js ------- \\
        T.router = function(map, options) {
            if (!options) {
                options = {};
            }
            util.verifyType(map, 'object');
            util.verifyType(options, 'object');
            var me = {};
            me.routes = [];
            jQuery.each(map, function(url, settings) {
                util.verifyType(settings, 'object');
                var merged = jQuery.extend(true, {}, options, settings);
                me.routes.push(new T.router.route(url, merged));
            });

            util.registerPublicVariables(this, me);

        }

        T.router.prototype.parse = function(url, options, callback) {
            if (!options) {
                options = {};
            }
            if ( typeof options == "function") {
                callback = options;
                options = {};
            }
            callback = util.verifyCallback(callback);
            util.verifyType(url, 'string');
            util.verifyType(options, 'object');
            var matched = false;
            var me = this;
            var cb_wrapper = function() {
                callback.apply(me, arguments);
            }
            jQuery.each(this.routes, function() {
                util.verifyInstance(this, T.router.route);
                if (this.test(url)) {
                    matched = true;
                    this.exec(url, options, cb_wrapper);
                }
            });
            if (!matched) {
                callback.call(this, new T.router.HTTPException(404, 'No matching route found.'));
                return false;
            }
            return true;
        }

        T.router.prototype.find = function(url) {
            if ( typeof url == 'string') {
                url = new T.router.url(url);
            }
            var match = false;
            util.verifyInstance(url, T.router.url);
            jQuery.each(this.routes, function() {
                util.verifyInstance(this, T.router.route);
                jQuery.each(this.urls, function() {
                    util.verifyInstance(this, T.router.url);
                    if (this.source == url.source) {
                        match = this;
                        return false;
                    }
                });
                if (match) {
                    return false;
                }
            });
            return match;
        }
        // ------- router/route.js ------- \\
        T.router.route = function(url, options) {
            if (!(this instanceof T.router.route)) {
                return new T.router.route(url, options);
            }
            var aliases = [];
            if ( url instanceof T.router.url || typeof url == 'string') {
                aliases.unshift(url);
            } else {
                options = url;
                url = null;
            }
            if (!options) {
                options = {};
            }
            util.verifyType(options, 'object');
            if (!options.constraints) {
                options.constraints = {};
            }
            util.verifyType(options.constraints, 'object');
            options.callback = util.verifyCallback(options.callback);
            if (options.alias instanceof Array) {
                aliases = aliases.concat(options.alias);
            } else if ( typeof options.alias == 'string' || options.alias instanceof T.router.url) {
                aliases.push(options.alias);
            }
            if (!options.options) {
                options.options = null;
            }

            var me = {};
            me.urls = [];
            jQuery.each(aliases, function(i, value) {
                if ( typeof value == 'string') {
                    value = new T.router.url(value);
                }
                util.verifyInstance(value, T.router.url);
                me.urls.push(value);
            });
            if (me.urls.length < 1) {
                throw new Error('At least one url should be available')
            }
            me.options = options;
            util.registerPublicVariables(this, me);
        }

        T.router.route.prototype.test = function(url) {
            util.verifyType(url, 'string');
            var l = this.urls.length;
            var match = false;
            for (var i = 0; i < l; i++) {
                if (this.urls[i].match(url)) {
                    match = this.urls[i];
                    break;
                }
            }
            return match;
        }

        T.router.route.prototype.exec = function(url, options, callback) {
            if ( typeof options == "function") {
                callback = options;
                options = null;
            }
            callback = util.verifyCallback(callback);
            var match = false;
            for (var l = this.urls.length, i = 0; i < l; i++) {
                var alias = this.urls[i];
                var a_match = alias.match(url);
                if (a_match) {
                    match = a_match;
                    break;
                }
            }
            if (!match) {
                callback.call(this, "The url does not match any aliases");
                return false;
            }
            var template = this.options.template;
            var attach = this.options.attach;
            var source = this.options.source;
            var cb = this.options.callback;

            // Prepare template
            var tpl = new T;
            if (template && template instanceof T.router.url) {
                template = template.fill(match);
            }
            if (source && source instanceof T.router.url) {
                source = source.fill(match);
            }
            var run_2 = false;
            var me = this;
            // Fires the callback function passed to this function
            var fire_function_callback = function(rendered) {
                callback.call(me, null, rendered);
            }
            // Fires the callback function bound to the object
            var fire_obj_callback = function(rendered) {
                if (run_2) {
                    fire_function_callback(rendered);
                    return;
                }
                var obj = {};
                obj.settings = jQuery.extend(true, {}, me.options);
                // No references, plz!
                obj.options = options;
                obj.url = url;
                obj.route = me;

                try {
                    var callback_ret = cb.call(obj);

                    if (callback_ret) {
                        if ( typeof callback_ret == "string") {
                            fire_function_callback(callback_ret);
                        } else if ( callback_ret instanceof T.router) {
                            callback_ret.parse(url, options, callback);
                        } else if ( callback_ret instanceof T) {
                            run_2 = true;
                            tpl.load(callback_ret, tpl_load_callback);
                        } else {
                            fire_function_callback(rendered);
                        }
                    } else {
                        fire_function_callback(rendered);
                    }
                } catch(e) {
                    if ( e instanceof T.router.HTTPException) {
                        callback.call(me, e);
                    } else {
                        throw e;
                    }
                }
            }
            // Callback after template is rendered, fires the callback bound to this function
            var tpl_render_callback = function(err, rendered) {
                if (err) {
                    callback.call(me, err);
                    return;
                }
                fire_obj_callback(rendered);
            }
            // Callback after the source is loaded, renders the template
            var tpl_source_callback = function(err) {
                if (err) {
                    callback.call(me, err);
                    return;
                }
                this.render(tpl_render_callback);
            }
            // Callback after the template is loaded, attachs DOM, loads the source
            var tpl_load_callback = function(err) {
                if (err) {
                    callback.call(me, err);
                    return;
                }
                if (attach && this.attach) {
                    this.attach(attach);
                }
                if (source) {
                    this.update(source, tpl_source_callback)
                } else {
                    tpl_source_callback.call(this);
                }
            }
            if (template) {
                tpl.load(template, tpl_load_callback);
            } else {
                fire_obj_callback('');
            }
        }
        // ------- router/url.js ------- \\
        T.router.url = function(url, constraints) {
            if (!(this instanceof T.router.url)) {
                return new T.router.url(url, constraints);
            }
            var me = {};
            me.source = _t_router_url.normalize(url);
            me.positions = _t_router_url.extractVariables(me.source);
            me.constraints = _t_router_url.registerConstraints(constraints);
            me.regex = _t_router_url.compile(me.source, me.constraints);
            util.registerPublicVariables(this, me);
        };

        var normalize_route_regex = new RegExp(':([a-z][a-z0-9]*):?', 'g');
        var route_variable_regex = new RegExp(':([a-z][a-z0-9]*):', 'g');
        var route_variable_replace = new RegExp('([^/]+)');

        var regexp_escape = function(str) {//Source: https://github.com/slevithan/XRegExp/blob/34d5d5008e628fb2e87c17a2d6a4696fa0ad3d0a/src/xregexp.js#L601-603
            return String.prototype.replace.call(str, /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }
        var _t_router_url = {};

        _t_router_url.normalize = function(url) {
            util.verifyType(url, 'string');
            return url.replace(normalize_route_regex, function(match, name) {
                return ':' + name + ':';
            });
        }

        _t_router_url.extractVariables = function(url) {
            util.verifyType(url, 'string');
            var positions = {};
            var variables = url.match(route_variable_regex);
            if (!variables) {
                return {};
            }
            jQuery.each(variables, function(index, name) {
                name = name.replace(/:/g, '');
                positions[index] = name;
            });
            return positions;
        }

        _t_router_url.registerConstraints = function(constraints) {
            var constraints_out = {};
            if (!constraints) {
                return {};
            }
            util.verifyType(constraints, 'object');
            jQuery.each(constraints, function(variable, constraint) {
                if ( typeof constraint == 'string') {
                    constraint = new RegExp('(' + constraint + ')');
                }
                util.verifyInstance(constraint, RegExp);
                constraints_out[variable] = constraint;
            });
            return constraints_out;
        }

        _t_router_url.compile = function(url, constraints) {
            url = regexp_escape(url);
            var compiled_regex = url.replace(route_variable_regex, function(match, name) {
                if (constraints[name]) {
                    return constraints[name].source;
                }
                return route_variable_replace.source;
            });
            return new RegExp('^' + compiled_regex + '$');
        }

        T.router.url.prototype.match = function(url) {
            util.verifyType(url, 'string');
            if (url.indexOf('/') != 0) {
                url = '/' + url;
            }
            var matches = url.match(this.regex);
            if (!matches) {
                return false;
            }
            var me = this;
            matches.shift();
            var keyed_matches = {};
            jQuery.each(matches, function(index, value) {
                if (!me.positions[index]) {
                    throw new Error('Variable name at index ' + index + ' not found.');
                }
                keyed_matches[me.positions[index]] = value;
            });
            return keyed_matches

        }

        T.router.url.prototype.fill = function(data) {
            util.verifyType(data, 'object');
            if (!this.source) {
                return false;
            }
            var url = this.source;
            var me = this;
            jQuery.each(data, function(name, value) {
                if (!me.constraints[name]) {
                    return;
                }
                if (!me.constraints[name].test(value)) {
                    throw new Error('Variable "' + name + '" does not match the constraint: ' + me.constraints[name].toString());
                }
                url = url.replace(':' + name + ':', value);
            });
            return url;
        }

        T.router.url.prototype.toString = function() {
            return this.source;
        }
        // ------- router/HTTPException.js ------- \\
        T.router.HTTPException = function(code, message) {
            var err = new Error();
            var stack = err.stack;
            if (!this.__defineGetter__) {
                this.code = code;
                this.message = message;
                this.stack = stack;
                return;
            }
            this.__defineGetter__('code', function() {
                return code;
            });
            this.__defineGetter__('message', function() {
                return message;
            });
            this.__defineGetter__('stack', function() {
                return stack;
            })
        };

        T.router.HTTPException.prototype.constructor = T.router.HTTPException;
        T.router.HTTPException.name = 'T.router.HTTPException';

        T.router.HTTPException.prototype.toString = function() {
            return '[object T.router.HTTPException(' + this.code + ') ' + this.message + ' ]';
        };

        // ------- outro.js ------- \\
        return T;
    }
    if ( typeof define == 'function' && define.amd) {
        define('t', [], tjs());
    } else {
        window.T = tjs();
    }
})();
