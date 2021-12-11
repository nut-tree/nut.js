var UnityWebgl = function (e) {
    "use strict";

    function t(e) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, t(e)
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function i(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e
    }

    function o(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function u(e, t) {
        return u = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        }, u(e, t)
    }

    function c(e, n) {
        if (n && ("object" === t(n) || "function" == typeof n)) return n;
        if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
        return o(e)
    }

    function a(e) {
        return a = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, a(e)
    }

    function s(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    var l = "__UnityLib__",
        f = function () {
            function e() {
                n(this, e), s(this, "eventMap", new Map), void 0 !== window && void 0 === window.__UnityLib__ && (window.__UnityLib__ = {})
            }
            return i(e, [{
                key: "global_name",
                get: function () {
                    return l
                }
            }, {
                key: "on",
                value: function (e, t) {
                    return this.eventMap.set(e, t), void 0 !== window.__UnityLib__ && (window.__UnityLib__[e] = t), this
                }
            }, {
                key: "once",
                value: function (e, t) {
                    return this.on(e, function n() {
                        t && t.apply(this, arguments), this.off(e, n)
                    }.bind(this)), this
                }
            }, {
                key: "off",
                value: function (e) {
                    return this.eventMap.delete(e), void 0 !== window.__UnityLib__ && delete window.__UnityLib__[e], this
                }
            }, {
                key: "clear",
                value: function () {
                    return void 0 !== window.__UnityLib__ && this.eventMap.forEach((function (e, t) {
                        delete window.__UnityLib__[t]
                    })), this.eventMap.clear(), this
                }
            }, {
                key: "emit",
                value: function (e) {
                    var t = this.eventMap.get(e);
                    if (void 0 !== t) {
                        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                        t.apply(void 0, r)
                    }
                    return this
                }
            }]), e
        }();

    function d(e) {
        var t = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function () {
            var n, r = a(e);
            if (t) {
                var i = a(this).constructor;
                n = Reflect.construct(r, arguments, i)
            } else n = r.apply(this, arguments);
            return c(this, n)
        }
    }

    function y(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function v(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? y(Object(n), !0).forEach((function (t) {
                s(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }
    f.global_name = l;
    var h = function (e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    };

    function p(e) {
        return e instanceof HTMLCanvasElement ? e : "string" == typeof e ? document.querySelector(e) : null
    }
    var b = function (e) {
            ! function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && u(e, t)
            }(c, e);
            var r = d(c);

            function c(e) {
                var t, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (n(this, c), s(o(t = r.call(this)), "unityLoader", null), s(o(t), "canvasElement", null), s(o(t), "unityInstance", null), h(e)) t.config = v({}, e);
                else {
                    t.config = v({}, i);
                    var u = p(e);
                    u && t.create(u)
                }
                return t
            }
            return i(c, [{
                key: "create",
                value: function (e) {
                    if (this.unityInstance && this.canvasElement && this.unityLoader) return console.warn("UnityWebgl: Unity Instance already exists"), !1;
                    var t = p(e);
                    if (!t) return console.warn("UnityWebgl: CanvasElement not found."), !1;
                    this.canvasElement = t;
                    var n, r, i = this,
                        o = ((r = v({}, (n = this).config)).print = function (e) {
                            n.emit("debug", e)
                        }, r.printErr = function (e) {
                            n.emit("error", e)
                        }, r);
                    this.unityLoader = function (e, t) {
                        var n = t.resolve,
                            r = t.reject;
                        if (!e) return r && r(new Error("UnityLoader: src not found.")), null;

                        function i(t) {
                            "ready" === t ? n && n() : r && r(new Error("'UnityLoader: ".concat(e, "' load failed.")))
                        }
                        var o = document.querySelector('script[src="'.concat(e, '"]'));
                        if (null === o) {
                            (o = document.createElement("script")).src = e, o.async = !0, o.setAttribute("data-status", "loading"), document.body.appendChild(o);
                            var u = function (e) {
                                var t, n = "load" === e.type ? "ready" : "error";
                                null === (t = o) || void 0 === t || t.setAttribute("data-status", n)
                            };
                            o.addEventListener("load", u), o.addEventListener("error", u)
                        } else i(o.getAttribute("data-status"));
                        var c = function (e) {
                            i("load" === e.type ? "ready" : "error")
                        };
                        return o.addEventListener("load", c), o.addEventListener("error", c),
                            function () {
                                o && (o.removeEventListener("load", c), o.removeEventListener("error", c), document.body.removeChild(o))
                            }
                    }(o.loaderUrl, {
                        resolve: function () {
                            try {
                                window.createUnityInstance(t, o, (function (e) {
                                    return i._setProgression(e)
                                })).then((function (e) {
                                    i.emit("created"), i.unityInstance = e
                                })).catch((function (e) {
                                    i.emit("error", e), i.unityInstance = null
                                }))
                            } catch (e) {
                                i.emit("error", e), i.unityInstance = null
                            }
                        },
                        reject: function (e) {
                            console.error("UnityWebgl: ", null == e ? void 0 : e.message)
                        }
                    })
                }
            }, {
                key: "_setProgression",
                value: function (e) {
                    1 === e && this.emit("loaded"), this.emit("progress", e)
                }
            }, {
                key: "send",
                value: function (e, n, r) {
                    if (null !== this.unityInstance)
                        if (null == r) this.unityInstance.SendMessage(e, n);
                        else {
                            var i = "object" === t(r) ? JSON.stringify(r) : r;
                            this.unityInstance.SendMessage(e, n, i)
                        } return this
                }
            }, {
                key: "requestPointerLock",
                value: function () {
                    null !== this.canvasElement && this.canvasElement.requestPointerLock()
                }
            }, {
                key: "takeScreenshot",
                value: function (e, t) {
                    var n;
                    return null !== this.canvasElement ? (!0 !== (null === (n = this.config.webglContextAttributes) || void 0 === n ? void 0 : n.preserveDrawingBuffer) && console.warn("Taking a screenshot requires 'preserveDrawingBuffer'."), this.canvasElement.toDataURL(e, t)) : null
                }
            }, {
                key: "setFullscreen",
                value: function (e) {
                    null !== this.unityInstance && this.unityInstance.SetFullscreen(e ? 1 : 0)
                }
            }, {
                key: "quitUnityInstance",
                value: function () {
                    var e = this;
                    null !== this.unityInstance && this.unityInstance.Quit().then((function () {
                        e.unityInstance = null, e.emit("destroyed")
                    }))
                }
            }, {
                key: "destroy",
                value: function () {
                    this.unityLoader && (this.unityLoader(), this.unityLoader = null), this.quitUnityInstance()
                }
            }]), c
        }(f),
        _ = 0;

    function m(e) {
        return /^\d+(px|em|%|vw|vh|rem)?$/.test(e) ? isNaN(e) ? e : e + "px" : ""
    }

    function w(e, t, n, r, i, o, u, c, a, s) {
        "boolean" != typeof u && (a = c, c = u, u = !1);
        const l = "function" == typeof n ? n.options : n;
        let f;
        if (e && e.render && (l.render = e.render, l.staticRenderFns = e.staticRenderFns, l._compiled = !0, i && (l.functional = !0)), r && (l._scopeId = r), o ? (f = function (e) {
                (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), t && t.call(this, a(e)), e && e._registeredComponents && e._registeredComponents.add(o)
            }, l._ssrRegister = f) : t && (f = u ? function (e) {
                t.call(this, s(e, this.$root.$options.shadowRoot))
            } : function (e) {
                t.call(this, c(e))
            }), f)
            if (l.functional) {
                const e = l.render;
                l.render = function (t, n) {
                    return f.call(n), e(t, n)
                }
            } else {
                const e = l.beforeCreate;
                l.beforeCreate = e ? [].concat(e, f) : [f]
            } return n
    }
    var g = w({}, undefined, {
            name: "UnityWebgl",
            props: {
                unity: Object,
                width: {
                    type: [String, Number],
                    default: "100%"
                },
                height: {
                    type: [String, Number],
                    default: "100%"
                }
            },
            computed: {
                canvasStyle: function () {
                    var e = this.width,
                        t = this.height;
                    return {
                        width: m(e),
                        height: m(t)
                    }
                }
            },
            mounted: function () {
                var e = this.$refs.canvas,
                    t = this.unity;
                e && (null == t || t.create(e)), this.$once("hook:beforeDestroy", (function () {
                    null == t || t.destroy()
                }))
            },
            render: function (e) {
                return _++, e("canvas", {
                    ref: "canvas",
                    attrs: {
                        id: "unity-canvas-".concat(_)
                    },
                    style: this.canvasStyle
                })
            }
        }, undefined, undefined, undefined, !1, void 0, void 0, void 0),
        O = function e(t) {
            e.installed || (e.installed = !0, t.component("Unity", g))
        };
    return "undefined" != typeof window && window.Vue && Vue.use(O), b.install = O, e.VueUnity = g, e.default = b, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
}({});