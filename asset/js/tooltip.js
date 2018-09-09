/* Tooltipster v3.3.0 */ ;
(function(e, t, n) {
    function s(t, n) {
        this.bodyOverflowX;
        this.callbacks = {
            hide: [],
            show: []
        };
        this.checkInterval = null;
        this.Content;
        this.$el = e(t);
        this.$elProxy;
        this.elProxyPosition;
        this.enabled = true;
        this.options = e.extend({}, i, n);
        this.mouseIsOverProxy = false;
        this.namespace = "tooltipster-" + Math.round(Math.random() * 1e5);
        this.Status = "hidden";
        this.timerHide = null;
        this.timerShow = null;
        this.$tooltip;
        this.options.iconTheme = this.options.iconTheme.replace(".", "");
        this.options.theme = this.options.theme.replace(".", "");
        this._init()
    }

    function o(t, n) {
        var r = true;
        e.each(t, function(e, i) {
            if (typeof n[e] === "undefined" || t[e] !== n[e]) {
                r = false;
                return false
            }
        });
        return r
    }

    function f() {
        return !a && u
    }

    function l() {
        var e = n.body || n.documentElement,
            t = e.style,
            r = "transition";
        if (typeof t[r] == "string") {
            return true
        }
        v = ["Moz", "Webkit", "Khtml", "O", "ms"], r = r.charAt(0).toUpperCase() + r.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof t[v[i] + r] == "string") {
                return true
            }
        }
        return false
    }
    var r = "tooltipster",
        i = {
            animation: "fade",
            arrow: true,
            arrowColor: "",
            autoClose: true,
            content: null,
            contentAsHTML: false,
            contentCloning: true,
            debug: true,
            delay: 200,
            minWidth: 0,
            maxWidth: null,
            functionInit: function(e, t) {},
            functionBefore: function(e, t) {
                t()
            },
            functionReady: function(e, t) {},
            functionAfter: function(e) {},
            hideOnClick: false,
            icon: "(?)",
            iconCloning: true,
            iconDesktop: false,
            iconTouch: false,
            iconTheme: "tooltipster-icon",
            interactive: false,
            interactiveTolerance: 350,
            multiple: false,
            offsetX: 0,
            offsetY: 0,
            onlyOne: false,
            position: "top",
            positionTracker: false,
            positionTrackerCallback: function(e) {
                if (this.option("trigger") == "hover" && this.option("autoClose")) {
                    this.hide()
                }
            },
            restoration: "current",
            speed: 350,
            timer: 0,
            theme: "tooltipster-default",
            touchDevices: true,
            trigger: "hover",
            updateAnimation: true
        };
    s.prototype = {
        _init: function() {
            var t = this;
            if (n.querySelector) {
                var r = null;
                if (t.$el.data("tooltipster-initialTitle") === undefined) {
                    r = t.$el.attr("title");
                    if (r === undefined) r = null;
                    t.$el.data("tooltipster-initialTitle", r)
                }
                if (t.options.content !== null) {
                    t._content_set(t.options.content)
                } else {
                    t._content_set(r)
                }
                var i = t.options.functionInit.call(t.$el, t.$el, t.Content);
                if (typeof i !== "undefined") t._content_set(i);
                t.$el.removeAttr("title").addClass("tooltipstered");
                if (!u && t.options.iconDesktop || u && t.options.iconTouch) {
                    if (typeof t.options.icon === "string") {
                        t.$elProxy = e('<span class="' + t.options.iconTheme + '"></span>');
                        t.$elProxy.text(t.options.icon)
                    } else {
                        if (t.options.iconCloning) t.$elProxy = t.options.icon.clone(true);
                        else t.$elProxy = t.options.icon
                    }
                    t.$elProxy.insertAfter(t.$el)
                } else {
                    t.$elProxy = t.$el
                }
                if (t.options.trigger == "hover") {
                    t.$elProxy.on("mouseenter." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t.mouseIsOverProxy = true;
                            t._show()
                        }
                    }).on("mouseleave." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t.mouseIsOverProxy = false
                        }
                    });
                    if (u && t.options.touchDevices) {
                        t.$elProxy.on("touchstart." + t.namespace, function() {
                            t._showNow()
                        })
                    }
                } else if (t.options.trigger == "click") {
                    t.$elProxy.on("click." + t.namespace, function() {
                        if (!f() || t.options.touchDevices) {
                            t._show()
                        }
                    })
                }
            }
        },
        _show: function() {
            var e = this;
            if (e.Status != "shown" && e.Status != "appearing") {
                if (e.options.delay) {
                    e.timerShow = setTimeout(function() {
                        if (e.options.trigger == "click" || e.options.trigger == "hover" && e.mouseIsOverProxy) {
                            e._showNow()
                        }
                    }, e.options.delay)
                } else e._showNow()
            }
        },
        _showNow: function(n) {
            var r = this;
            r.options.functionBefore.call(r.$el, r.$el, function() {
                if (r.enabled && r.Content !== null) {
                    if (n) r.callbacks.show.push(n);
                    r.callbacks.hide = [];
                    clearTimeout(r.timerShow);
                    r.timerShow = null;
                    clearTimeout(r.timerHide);
                    r.timerHide = null;
                    if (r.options.onlyOne) {
                        e(".tooltipstered").not(r.$el).each(function(t, n) {
                            var r = e(n),
                                i = r.data("tooltipster-ns");
                            e.each(i, function(e, t) {
                                var n = r.data(t),
                                    i = n.status(),
                                    s = n.option("autoClose");
                                if (i !== "hidden" && i !== "disappearing" && s) {
                                    n.hide()
                                }
                            })
                        })
                    }
                    var i = function() {
                        r.Status = "shown";
                        e.each(r.callbacks.show, function(e, t) {
                            t.call(r.$el)
                        });
                        r.callbacks.show = []
                    };
                    if (r.Status !== "hidden") {
                        var s = 0;
                        if (r.Status === "disappearing") {
                            r.Status = "appearing";
                            if (l()) {
                                r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + r.options.animation + "-show");
                                if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                                r.$tooltip.queue(i)
                            } else {
                                r.$tooltip.stop().fadeIn(i)
                            }
                        } else if (r.Status === "shown") {
                            i()
                        }
                    } else {
                        r.Status = "appearing";
                        var s = r.options.speed;
                        r.bodyOverflowX = e("body").css("overflow-x");
                        e("body").css("overflow-x", "hidden");
                        var o = "tooltipster-" + r.options.animation,
                            a = "-webkit-transition-duration: " + r.options.speed + "ms; -webkit-animation-duration: " + r.options.speed + "ms; -moz-transition-duration: " + r.options.speed + "ms; -moz-animation-duration: " + r.options.speed + "ms; -o-transition-duration: " + r.options.speed + "ms; -o-animation-duration: " + r.options.speed + "ms; -ms-transition-duration: " + r.options.speed + "ms; -ms-animation-duration: " + r.options.speed + "ms; transition-duration: " + r.options.speed + "ms; animation-duration: " + r.options.speed + "ms;",
                            f = r.options.minWidth ? "min-width:" + Math.round(r.options.minWidth) + "px;" : "",
                            c = r.options.maxWidth ? "max-width:" + Math.round(r.options.maxWidth) + "px;" : "",
                            h = r.options.interactive ? "pointer-events: auto;" : "";
                        r.$tooltip = e('<div class="tooltipster-base ' + r.options.theme + '" style="' + f + " " + c + " " + h + " " + a + '"><div class="tooltipster-content"></div></div>');
                        if (l()) r.$tooltip.addClass(o);
                        r._content_insert();
                        r.$tooltip.appendTo("body");
                        r.reposition();
                        r.options.functionReady.call(r.$el, r.$el, r.$tooltip);
                        if (l()) {
                            r.$tooltip.addClass(o + "-show");
                            if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                            r.$tooltip.queue(i)
                        } else {
                            r.$tooltip.css("display", "none").fadeIn(r.options.speed, i)
                        }
                        r._interval_set();
                        e(t).on("scroll." + r.namespace + " resize." + r.namespace, function() {
                            r.reposition()
                        });
                        if (r.options.autoClose) {
                            e("body").off("." + r.namespace);
                            if (r.options.trigger == "hover") {
                                if (u) {
                                    setTimeout(function() {
                                        e("body").on("touchstart." + r.namespace, function() {
                                            r.hide()
                                        })
                                    }, 0)
                                }
                                if (r.options.interactive) {
                                    if (u) {
                                        r.$tooltip.on("touchstart." + r.namespace, function(e) {
                                            e.stopPropagation()
                                        })
                                    }
                                    var p = null;
                                    r.$elProxy.add(r.$tooltip).on("mouseleave." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p);
                                        p = setTimeout(function() {
                                            r.hide()
                                        }, r.options.interactiveTolerance)
                                    }).on("mouseenter." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p)
                                    })
                                } else {
                                    r.$elProxy.on("mouseleave." + r.namespace + "-autoClose", function() {
                                        r.hide()
                                    })
                                }
                                if (r.options.hideOnClick) {
                                    r.$elProxy.on("click." + r.namespace + "-autoClose", function() {
                                        r.hide()
                                    })
                                }
                            } else if (r.options.trigger == "click") {
                                setTimeout(function() {
                                    e("body").on("click." + r.namespace + " touchstart." + r.namespace, function() {
                                        r.hide()
                                    })
                                }, 0);
                                if (r.options.interactive) {
                                    r.$tooltip.on("click." + r.namespace + " touchstart." + r.namespace, function(e) {
                                        e.stopPropagation()
                                    })
                                }
                            }
                        }
                    }
                    if (r.options.timer > 0) {
                        r.timerHide = setTimeout(function() {
                            r.timerHide = null;
                            r.hide()
                        }, r.options.timer + s)
                    }
                }
            })
        },
        _interval_set: function() {
            var t = this;
            t.checkInterval = setInterval(function() {
                if (e("body").find(t.$el).length === 0 || e("body").find(t.$elProxy).length === 0 || t.Status == "hidden" || e("body").find(t.$tooltip).length === 0) {
                    if (t.Status == "shown" || t.Status == "appearing") t.hide();
                    t._interval_cancel()
                } else {
                    if (t.options.positionTracker) {
                        var n = t._repositionInfo(t.$elProxy),
                            r = false;
                        if (o(n.dimension, t.elProxyPosition.dimension)) {
                            if (t.$elProxy.css("position") === "fixed") {
                                if (o(n.position, t.elProxyPosition.position)) r = true
                            } else {
                                if (o(n.offset, t.elProxyPosition.offset)) r = true
                            }
                        }
                        if (!r) {
                            t.reposition();
                            t.options.positionTrackerCallback.call(t, t.$el)
                        }
                    }
                }
            }, 200)
        },
        _interval_cancel: function() {
            clearInterval(this.checkInterval);
            this.checkInterval = null
        },
        _content_set: function(e) {
            if (typeof e === "object" && e !== null && this.options.contentCloning) {
                e = e.clone(true)
            }
            this.Content = e
        },
        _content_insert: function() {
            var e = this,
                t = this.$tooltip.find(".tooltipster-content");
            if (typeof e.Content === "string" && !e.options.contentAsHTML) {
                t.text(e.Content)
            } else {
                t.empty().append(e.Content)
            }
        },
        _update: function(e) {
            var t = this;
            t._content_set(e);
            if (t.Content !== null) {
                if (t.Status !== "hidden") {
                    t._content_insert();
                    t.reposition();
                    if (t.options.updateAnimation) {
                        if (l()) {
                            t.$tooltip.css({
                                width: "",
                                "-webkit-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-moz-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-o-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-ms-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                transition: "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                            }).addClass("tooltipster-content-changing");
                            setTimeout(function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.removeClass("tooltipster-content-changing");
                                    setTimeout(function() {
                                        if (t.Status !== "hidden") {
                                            t.$tooltip.css({
                                                "-webkit-transition": t.options.speed + "ms",
                                                "-moz-transition": t.options.speed + "ms",
                                                "-o-transition": t.options.speed + "ms",
                                                "-ms-transition": t.options.speed + "ms",
                                                transition: t.options.speed + "ms"
                                            })
                                        }
                                    }, t.options.speed)
                                }
                            }, t.options.speed)
                        } else {
                            t.$tooltip.fadeTo(t.options.speed, .5, function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.fadeTo(t.options.speed, 1)
                                }
                            })
                        }
                    }
                }
            } else {
                t.hide()
            }
        },
        _repositionInfo: function(e) {
            return {
                dimension: {
                    height: e.outerHeight(false),
                    width: e.outerWidth(false)
                },
                offset: e.offset(),
                position: {
                    left: parseInt(e.css("left")),
                    top: parseInt(e.css("top"))
                }
            }
        },
        hide: function(n) {
            var r = this;
            if (n) r.callbacks.hide.push(n);
            r.callbacks.show = [];
            clearTimeout(r.timerShow);
            r.timerShow = null;
            clearTimeout(r.timerHide);
            r.timerHide = null;
            var i = function() {
                e.each(r.callbacks.hide, function(e, t) {
                    t.call(r.$el)
                });
                r.callbacks.hide = []
            };
            if (r.Status == "shown" || r.Status == "appearing") {
                r.Status = "disappearing";
                var s = function() {
                    r.Status = "hidden";
                    if (typeof r.Content == "object" && r.Content !== null) {
                        r.Content.detach()
                    }
                    r.$tooltip.remove();
                    r.$tooltip = null;
                    e(t).off("." + r.namespace);
                    e("body").off("." + r.namespace).css("overflow-x", r.bodyOverflowX);
                    e("body").off("." + r.namespace);
                    r.$elProxy.off("." + r.namespace + "-autoClose");
                    r.options.functionAfter.call(r.$el, r.$el);
                    i()
                };
                if (l()) {
                    r.$tooltip.clearQueue().removeClass("tooltipster-" + r.options.animation + "-show").addClass("tooltipster-dying");
                    if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                    r.$tooltip.queue(s)
                } else {
                    r.$tooltip.stop().fadeOut(r.options.speed, s)
                }
            } else if (r.Status == "hidden") {
                i()
            }
            return r
        },
        show: function(e) {
            this._showNow(e);
            return this
        },
        update: function(e) {
            return this.content(e)
        },
        content: function(e) {
            if (typeof e === "undefined") {
                return this.Content
            } else {
                this._update(e);
                return this
            }
        },
        reposition: function() {
            var n = this;
            if (e("body").find(n.$tooltip).length !== 0) {
                n.$tooltip.css("width", "");
                n.elProxyPosition = n._repositionInfo(n.$elProxy);
                var r = null,
                    i = e(t).width(),
                    s = n.elProxyPosition,
                    o = n.$tooltip.outerWidth(false),
                    u = n.$tooltip.innerWidth() + 1,
                    a = n.$tooltip.outerHeight(false);
                if (n.$elProxy.is("area")) {
                    var f = n.$elProxy.attr("shape"),
                        l = n.$elProxy.parent().attr("name"),
                        c = e('img[usemap="#' + l + '"]'),
                        h = c.offset().left,
                        p = c.offset().top,
                        d = n.$elProxy.attr("coords") !== undefined ? n.$elProxy.attr("coords").split(",") : undefined;
                    if (f == "circle") {
                        var v = parseInt(d[0]),
                            m = parseInt(d[1]),
                            g = parseInt(d[2]);
                        s.dimension.height = g * 2;
                        s.dimension.width = g * 2;
                        s.offset.top = p + m - g;
                        s.offset.left = h + v - g
                    } else if (f == "rect") {
                        var v = parseInt(d[0]),
                            m = parseInt(d[1]),
                            y = parseInt(d[2]),
                            b = parseInt(d[3]);
                        s.dimension.height = b - m;
                        s.dimension.width = y - v;
                        s.offset.top = p + m;
                        s.offset.left = h + v
                    } else if (f == "poly") {
                        var w = [],
                            E = [],
                            S = 0,
                            x = 0,
                            T = 0,
                            N = 0,
                            C = "even";
                        for (var k = 0; k < d.length; k++) {
                            var L = parseInt(d[k]);
                            if (C == "even") {
                                if (L > T) {
                                    T = L;
                                    if (k === 0) {
                                        S = T
                                    }
                                }
                                if (L < S) {
                                    S = L
                                }
                                C = "odd"
                            } else {
                                if (L > N) {
                                    N = L;
                                    if (k == 1) {
                                        x = N
                                    }
                                }
                                if (L < x) {
                                    x = L
                                }
                                C = "even"
                            }
                        }
                        s.dimension.height = N - x;
                        s.dimension.width = T - S;
                        s.offset.top = p + x;
                        s.offset.left = h + S
                    } else {
                        s.dimension.height = c.outerHeight(false);
                        s.dimension.width = c.outerWidth(false);
                        s.offset.top = p;
                        s.offset.left = h
                    }
                }
                var A = 0,
                    O = 0,
                    M = 0,
                    _ = parseInt(n.options.offsetY),
                    D = parseInt(n.options.offsetX),
                    P = n.options.position;

                function H() {
                    var n = e(t).scrollLeft();
                    if (A - n < 0) {
                        r = A - n;
                        A = n
                    }
                    if (A + o - n > i) {
                        r = A - (i + n - o);
                        A = i + n - o
                    }
                }

                function B(n, r) {
                    if (s.offset.top - e(t).scrollTop() - a - _ - 12 < 0 && r.indexOf("top") > -1) {
                        P = n
                    }
                    if (s.offset.top + s.dimension.height + a + 12 + _ > e(t).scrollTop() + e(t).height() && r.indexOf("bottom") > -1) {
                        P = n;
                        M = s.offset.top - a - _ - 12
                    }
                }
                if (P == "top") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left + D - j / 2;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom", "top")
                }
                if (P == "top-left") {
                    A = s.offset.left + D;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-left", "top-left")
                }
                if (P == "top-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-right", "top-right")
                }
                if (P == "bottom") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left - j / 2 + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top", "bottom")
                }
                if (P == "bottom-left") {
                    A = s.offset.left + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-left", "bottom-left")
                }
                if (P == "bottom-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-right", "bottom-right")
                }
                if (P == "left") {
                    A = s.offset.left - D - o - 12;
                    O = s.offset.left + D + s.dimension.width + 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A < 0 && O + o > i) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2,
                            q = o + A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        A = s.offset.left - D - q - 12 - I;
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A < 0) {
                        A = s.offset.left + D + s.dimension.width + 12;
                        r = "left"
                    }
                }
                if (P == "right") {
                    A = s.offset.left + D + s.dimension.width + 12;
                    O = s.offset.left - D - o - 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A + o > i && O < 0) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2,
                            q = i - A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A + o > i) {
                        A = s.offset.left - D - o - 12;
                        r = "right"
                    }
                }
                if (n.options.arrow) {
                    var R = "tooltipster-arrow-" + P;
                    if (n.options.arrowColor.length < 1) {
                        var U = n.$tooltip.css("background-color")
                    } else {
                        var U = n.options.arrowColor
                    }
                    if (!r) {
                        r = ""
                    } else if (r == "left") {
                        R = "tooltipster-arrow-right";
                        r = ""
                    } else if (r == "right") {
                        R = "tooltipster-arrow-left";
                        r = ""
                    } else {
                        r = "left:" + Math.round(r) + "px;"
                    }
                    if (P == "top" || P == "top-left" || P == "top-right") {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")),
                            W = n.$tooltip.css("border-bottom-color")
                    } else if (P == "bottom" || P == "bottom-left" || P == "bottom-right") {
                        var z = parseFloat(n.$tooltip.css("border-top-width")),
                            W = n.$tooltip.css("border-top-color")
                    } else if (P == "left") {
                        var z = parseFloat(n.$tooltip.css("border-right-width")),
                            W = n.$tooltip.css("border-right-color")
                    } else if (P == "right") {
                        var z = parseFloat(n.$tooltip.css("border-left-width")),
                            W = n.$tooltip.css("border-left-color")
                    } else {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")),
                            W = n.$tooltip.css("border-bottom-color")
                    }
                    if (z > 1) {
                        z++
                    }
                    var X = "";
                    if (z !== 0) {
                        var V = "",
                            J = "border-color: " + W + ";";
                        if (R.indexOf("bottom") !== -1) {
                            V = "margin-top: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("top") !== -1) {
                            V = "margin-bottom: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("left") !== -1) {
                            V = "margin-right: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("right") !== -1) {
                            V = "margin-left: -" + Math.round(z) + "px;"
                        }
                        X = '<span class="tooltipster-arrow-border" style="' + V + " " + J + ';"></span>'
                    }
                    n.$tooltip.find(".tooltipster-arrow").remove();
                    var K = '<div class="' + R + ' tooltipster-arrow" style="' + r + '">' + X + '<span style="border-color:' + U + ';"></span></div>';
                    n.$tooltip.append(K)
                }
                n.$tooltip.css({
                    top: Math.round(M) + "px",
                    left: Math.round(A) + "px"
                })
            }
            return n
        },
        enable: function() {
            this.enabled = true;
            return this
        },
        disable: function() {
            this.hide();
            this.enabled = false;
            return this
        },
        destroy: function() {
            var t = this;
            t.hide();
            if (t.$el[0] !== t.$elProxy[0]) {
                t.$elProxy.remove()
            }
            t.$el.removeData(t.namespace).off("." + t.namespace);
            var n = t.$el.data("tooltipster-ns");
            if (n.length === 1) {
                var r = null;
                if (t.options.restoration === "previous") {
                    r = t.$el.data("tooltipster-initialTitle")
                } else if (t.options.restoration === "current") {
                    r = typeof t.Content === "string" ? t.Content : e("<div></div>").append(t.Content).html()
                }
                if (r) {
                    t.$el.attr("title", r)
                }
                t.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
            } else {
                n = e.grep(n, function(e, n) {
                    return e !== t.namespace
                });
                t.$el.data("tooltipster-ns", n)
            }
            return t
        },
        elementIcon: function() {
            return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : undefined
        },
        elementTooltip: function() {
            return this.$tooltip ? this.$tooltip[0] : undefined
        },
        option: function(e, t) {
            if (typeof t == "undefined") return this.options[e];
            else {
                this.options[e] = t;
                return this
            }
        },
        status: function() {
            return this.Status
        }
    };
    e.fn[r] = function() {
        var t = arguments;
        if (this.length === 0) {
            if (typeof t[0] === "string") {
                var n = true;
                switch (t[0]) {
                    case "setDefaults":
                        e.extend(i, t[1]);
                        break;
                    default:
                        n = false;
                        break
                }
                if (n) return true;
                else return this
            } else {
                return this
            }
        } else {
            if (typeof t[0] === "string") {
                var r = "#*$~&";
                this.each(function() {
                    var n = e(this).data("tooltipster-ns"),
                        i = n ? e(this).data(n[0]) : null;
                    if (i) {
                        if (typeof i[t[0]] === "function") {
                            var s = i[t[0]](t[1], t[2])
                        } else {
                            throw new Error('Unknown method .tooltipster("' + t[0] + '")')
                        }
                        if (s !== i) {
                            r = s;
                            return false
                        }
                    } else {
                        throw new Error("You called Tooltipster's \"" + t[0] + '" method on an uninitialized element')
                    }
                });
                return r !== "#*$~&" ? r : this
            } else {
                var o = [],
                    u = t[0] && typeof t[0].multiple !== "undefined",
                    a = u && t[0].multiple || !u && i.multiple,
                    f = t[0] && typeof t[0].debug !== "undefined",
                    l = f && t[0].debug || !f && i.debug;
                this.each(function() {
                    var n = false,
                        r = e(this).data("tooltipster-ns"),
                        i = null;
                    if (!r) {
                        n = true
                    } else if (a) {
                        n = true
                    } else if (l) {
                        console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')
                    }
                    if (n) {
                        i = new s(this, t[0]);
                        if (!r) r = [];
                        r.push(i.namespace);
                        e(this).data("tooltipster-ns", r);
                        e(this).data(i.namespace, i)
                    }
                    o.push(i)
                });
                if (a) return o;
                else return this
            }
        }
    };
    var u = !!("ontouchstart" in t);
    var a = false;
    e("body").one("mousemove", function() {
        a = true
    })
})(jQuery, window, document);;
/*! flip - v1.1.1 - 2016-05-25
 * https://github.com/nnattawat/flip
 * Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */

! function(a) {
    var b = function() {
            var a, b = document.createElement("fakeelement"),
                c = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (a in c)
                if (void 0 !== b.style[a]) return c[a]
        },
        c = function(b, c, d) {
            this.setting = {
                axis: "y",
                reverse: !1,
                trigger: "click",
                speed: 500,
                forceHeight: !1,
                forceWidth: !1,
                autoSize: !0,
                front: ".front",
                back: ".back"
            }, this.setting = a.extend(this.setting, c), "string" != typeof c.axis || "x" !== c.axis.toLowerCase() && "y" !== c.axis.toLowerCase() || (this.setting.axis = c.axis.toLowerCase()), "boolean" == typeof c.reverse && (this.setting.reverse = c.reverse), "string" == typeof c.trigger && (this.setting.trigger = c.trigger.toLowerCase());
            var e = parseInt(c.speed);
            isNaN(e) || (this.setting.speed = e), "boolean" == typeof c.forceHeight && (this.setting.forceHeight = c.forceHeight), "boolean" == typeof c.forceWidth && (this.setting.forceWidth = c.forceWidth), "boolean" == typeof c.autoSize && (this.setting.autoSize = c.autoSize), ("string" == typeof c.front || c.front instanceof a) && (this.setting.front = c.front), ("string" == typeof c.back || c.back instanceof a) && (this.setting.back = c.back), this.element = b, this.frontElement = this.getFrontElement(), this.backElement = this.getBackElement(), this.isFlipped = !1, this.init(d)
        };
    a.extend(c.prototype, {
        flipDone: function(a) {
            var c = this;
            c.element.one(b(), function() {
                c.element.trigger("flip:done"), "function" == typeof a && a.call(c.element)
            })
        },
        flip: function(a) {
            if (!this.isFlipped) {
                this.isFlipped = !0;
                var b = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: b + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                }), this.backElement.css({
                    transform: b + "(0deg)",
                    "z-index": "1"
                }), this.flipDone(a)
            }
        },
        unflip: function(a) {
            if (this.isFlipped) {
                this.isFlipped = !1;
                var b = "rotate" + this.setting.axis;
                this.frontElement.css({
                    transform: b + "(0deg)",
                    "z-index": "1"
                }), this.backElement.css({
                    transform: b + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                }), this.flipDone(a)
            }
        },
        getFrontElement: function() {
            return this.setting.front instanceof a ? this.setting.front : this.element.find(this.setting.front)
        },
        getBackElement: function() {
            return this.setting.back instanceof a ? this.setting.back : this.element.find(this.setting.back)
        },
        init: function(a) {
            var b = this,
                c = b.frontElement.add(b.backElement),
                d = "rotate" + b.setting.axis,
                e = 2 * b.element["outer" + ("rotatex" === d ? "Height" : "Width")](),
                f = {
                    perspective: e,
                    position: "relative"
                },
                g = {
                    transform: d + "(" + (b.setting.reverse ? "180deg" : "-180deg") + ")",
                    "z-index": "0"
                },
                h = {
                    "backface-visibility": "hidden",
                    "transform-style": "preserve-3d",
                    position: "absolute",
                    "z-index": "1"
                };
            b.setting.forceHeight ? c.outerHeight(b.element.height()) : b.setting.autoSize && (h.height = "100%"), b.setting.forceWidth ? c.outerWidth(b.element.width()) : b.setting.autoSize && (h.width = "100%"), (window.chrome || window.Intl && Intl.v8BreakIterator) && "CSS" in window && (f["-webkit-transform-style"] = "preserve-3d"), b.element.css(f), b.backElement.css(g), c.css(h).find("*").css({
                "backface-visibility": "hidden"
            }), setTimeout(function() {
                var d = b.setting.speed / 1e3 || .5;
                c.css({
                    transition: "all " + d + "s ease-out"
                }), "function" == typeof a && a.call(b.element)
            }, 20), b.attachEvents()
        },
        clickHandler: function(b) {
            b || (b = window.event), this.element.find(a(b.target).closest('button, a, input[type="submit"]')).length || (this.isFlipped ? this.unflip() : this.flip())
        },
        hoverHandler: function() {
            var b = this;
            b.element.off("mouseleave.flip"), b.flip(), setTimeout(function() {
                b.element.on("mouseleave.flip", a.proxy(b.unflip, b)), b.element.is(":hover") || b.unflip()
            }, b.setting.speed + 150)
        },
        attachEvents: function() {
            var b = this;
            "click" === b.setting.trigger ? b.element.on(a.fn.tap ? "tap.flip" : "click.flip", a.proxy(b.clickHandler, b)) : "hover" === b.setting.trigger && (b.element.on("mouseenter.flip", a.proxy(b.hoverHandler, b)), b.element.on("mouseleave.flip", a.proxy(b.unflip, b)))
        },
        flipChanged: function(a) {
            this.element.trigger("flip:change"), "function" == typeof a && a.call(this.element)
        },
        changeSettings: function(a, b) {
            var c = this,
                d = !1;
            if (void 0 !== a.axis && c.setting.axis !== a.axis.toLowerCase() && (c.setting.axis = a.axis.toLowerCase(), d = !0), void 0 !== a.reverse && c.setting.reverse !== a.reverse && (c.setting.reverse = a.reverse, d = !0), d) {
                var e = c.frontElement.add(c.backElement),
                    f = e.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);
                e.css({
                    transition: "none"
                });
                var g = "rotate" + c.setting.axis;
                c.isFlipped ? c.frontElement.css({
                    transform: g + (c.setting.reverse ? "(-180deg)" : "(180deg)"),
                    "z-index": "0"
                }) : c.backElement.css({
                    transform: g + (c.setting.reverse ? "(180deg)" : "(-180deg)"),
                    "z-index": "0"
                }), setTimeout(function() {
                    e.css(f), c.flipChanged(b)
                }, 0)
            } else c.flipChanged(b)
        }
    }), a.fn.flip = function(b, d) {
        return "function" == typeof b && (d = b), "string" == typeof b || "boolean" == typeof b ? this.each(function() {
            var c = a(this).data("flip-model");
            "toggle" === b && (b = !c.isFlipped), b ? c.flip(d) : c.unflip(d)
        }) : this.each(function() {
            if (a(this).data("flip-model")) {
                var e = a(this).data("flip-model");
                !b || void 0 === b.axis && void 0 === b.reverse || e.changeSettings(b, d)
            } else a(this).data("flip-model", new c(a(this), b || {}, d))
        }), this
    }
}(jQuery);
//# sourceMappingURL=jquery.flip.min.js.map

;
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s];
                if (null !== a.triggerPoint) {
                    var l = o.oldScroll < a.triggerPoint,
                        h = o.newScroll >= a.triggerPoint,
                        p = l && h,
                        u = !l && !h;
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();;
(function($) {
    $(function() {
        var menuTimer = null;
        if (Modernizr.touch) {
            $('#header nav > ul > li > a').click(function() {
                if ($(window).width() <= 760) return;
                var submenu = $(this).parent().find('ul');
                if (submenu.length && !submenu.is(':visible')) {
                    $('#header nav ul ul').fadeOut();
                    submenu.stop().fadeIn();
                    return false;
                }
            });
        } else {
            $('#header nav > ul > li').mouseenter(function() {
                if ($(window).width() <= 760) return;
                clearTimeout(menuTimer);
                $('#header nav ul ul').fadeOut();
                $(this).find('ul').stop().fadeIn();
            });
            $('#header nav > ul > li').mouseleave(function() {
                if ($(window).width() <= 760) return;
                menuTimer = setTimeout(function() {
                    $('#header nav ul ul').fadeOut();
                }, 500);
            });
        }
        $('#header nav > ul > li > a').click(function() {
            if ($(window).width() > 760) return;
            if ($(this).parent().find('ul').length) {
                $(this).parent().siblings().find('ul').slideUp();
                $(this).parents('ul').siblings().find('ul').slideUp();
                $(this).parent().find('ul').stop().slideToggle();
                return false;
            }
        });
        $('body').on('click touchend', function(e) {
            if (!$(e.target).closest('#header nav').length) {
                $('#header nav ul ul').fadeOut();
                $('body').removeClass('mobile-menu');
            }
        });
        if (!Modernizr.svg) {
            $('img[src*=".svg"]').each(function() {
                var fallback = $(this).attr('data-fallback');
                if (fallback) {
                    $(this).attr('src', fallback);
                }
            });
        }
        $('#header .toggle-menu').click(function() {
            $(this).toggleClass('active');
            $('body').toggleClass('mobile-menu');
            return false;
        });
        $('.banner-slider .slider').flexslider({
            animation: 'slide',
            slideshow: false,
            controlNav: true,
            directionNav: false,
            slideshowSpeed: 5000,
            animationSpeed: 750,
            startAt: 0
        });
        $(function() {
            $('a[href*="#"]').not('[href="#"]').on('click', function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[data-custom-anchor=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        var offset = target.offset().top;
                        offset = offset - 70 - 63 + 2;
                        if (!$('#jump-nav').length) {
                            offset += 63;
                        }
                        $('html,body').animate({
                            scrollTop: offset
                        }, 1000, 'easeOutExpo');
                        location.hash = this.hash;
                        return false;
                    }
                }
            });
        });
        $('.radial-progress-bar').circleProgress({
            value: 0,
            size: 240,
            startAngle: 300,
            thickness: 17,
            emptyFill: '#fff',
            fill: {
                color: '#e84958'
            }
        });
        $('.radial-progress-bar').appear({
            force_process: true
        });
        $('.radial-progress-bar').on('appear', function() {
            var currentValue = $(this).circleProgress('value');
            if (currentValue == 0) {
                $(this).circleProgress({
                    value: $(this).attr('data-value')
                });
            }
        });
        $(window).setBreakpoints({
            distinct: true,
            breakpoints: [761]
        });
        $(window).bind('enterBreakpoint761', function() {
            $('#header nav > ul ul').hide();
        });
        $(window).scroll(function() {
            if ($(document).scrollTop() > 50) {
                $('body').addClass('sticky-header');
            } else {
                $('body').removeClass('sticky-header');
            }
        });
        if ($('#jump-nav').length) {
            $('#jump-nav').scrollspy({
                min: $('#jump-nav').offset().top - 80,
                max: 1000000,
                onEnter: function(element, position) {
                    $('body').addClass('sticky-jump-nav');
                },
                onLeave: function(element, position) {
                    $('body').removeClass('sticky-jump-nav');
                }
            });
        }
        $('.faqs > li > a').click(function() {
            $(this).parent().toggleClass('expanded').find('.answer').slideToggle();
            return false;
        });
        $('#page > section').each(function() {
            var section = $(this);
            section.scrollspy({
                min: function() {
                    return section.offset().top - 70 - 63;
                },
                max: function() {
                    return section.offset().top + section.outerHeight() - 70 - 63 - 1;
                },
                onEnter: function(element, position) {
                    $('#jump-nav li').removeClass('.active');
                    $('#jump-nav a[href="#' + $(element).attr('data-custom-anchor') + '"]').parent().addClass('active');
                },
                onLeave: function(element, position) {
                    $('#jump-nav a[href="#' + $(element).attr('data-custom-anchor') + '"]').parent().removeClass('active');
                }
            });
        });
        $(function() {
            $('.dg-container').gallery();
        });
        $('.dg-container .dg-wrapper a').click(function() {
            return false;
        });
        $('a.video-link, [href^="https://www.youtube.com/watch"]').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $('.team-grid a').click(function() {
            $(this).toggleClass('active');
            $('#bio-dialog').html($(this).html());
            $.magnificPopup.open({
                items: {
                    src: '#bio-dialog',
                    type: 'inline'
                },
                closeOnBgClick: true,
                closeOnContentClick: false,
                modal: false,
                showCloseBtn: true,
                closeBtnInside: true,
                callbacks: {
                    close: function() {
                        $('.team-grid a').removeClass('active');
                    }
                }
            });
            return false;
        });
        $('.tooltip').tooltipster({
            position: 'top'
        });
        $(window).load(function() {
            var reverseLogoCard = true;
            var lastLogoCardIndex = -1;
            $('.logo-card .back').show();
            $('.logo-card').data('reverseLogoCard', reverseLogoCard).flip({
                trigger: 'manual',
                reverse: reverseLogoCard
            });

            function flipLogoCard() {
                var max = $('.logo-card').length;
                if ($('body').width() < 551) max = 6;
                var index = Math.floor(Math.random() * max);
                if (index == lastLogoCardIndex) {
                    index = Math.floor(Math.random() * max);
                }
                lastLogoCardIndex = index;
                var wait = Math.random() * 1000 * Math.floor(Math.random() * 4) + 750;
                var card = $('.logo-card').eq(index);
                reverseLogoCard = card.data('reverseLogoCard') ? false : true;
                card.data('reverseLogoCard', reverseLogoCard);
                card.flip('toggle', function() {
                    card.flip({
                        reverse: reverseLogoCard
                    });
                    setTimeout(function() {
                        flipLogoCard();
                    }, wait);
                });
            }
            setTimeout(function() {
                flipLogoCard();
            }, 1000);
        });
        $('body').on('click', 'a.resumator-job-link', function() {
            if (!$(this).hasClass('resumator-hide-details')) {
                ApptentiveSDK.engage('job-view-details-link-click');
            }
        });
        $('.tweet-callout').click(function() {
            var w = 550;
            var h = 450;
            var y = window.outerHeight / 2 + window.screenY - (h / 2)
            var x = window.outerWidth / 2 + window.screenX - (w / 2)
            window.open($(this).attr('href'), 'Tweet', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + y + ', left=' + x);
            return false;
        });
        $('#logo-banner .row > div').each(function(index, element) {
            $(element).flexslider({
                slideshow: true,
                controlNav: false,
                directionNav: false,
                slideshowSpeed: getRandomInt(2000, 8000),
                animationSpeed: 750,
                before: function(slider) {
                    slider.stop();
                    slider.vars.slideshowSpeed = getRandomInt(4000, 8000);
                    slider.play();
                }
            });

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
        });
        $('.case-study-filter-banner #jump-nav a').click(function() {
            $('.case-study-filter-banner').toggleClass('show-filters');
            return false;
        });
        $('.case-study-filter-banner .close').click(function() {
            $('.case-study-filter-banner').removeClass('show-filters');
            return false;
        });
        $('.case-study-filter-banner [type="checkbox"]').change(function() {
            var industries = [];
            var useCases = [];
            if ($(this).attr('name') == 'all_industries') {
                $('.case-study-filter-banner [name="industry[]"]').prop('checked', $(this).prop('checked'));
            }
            if ($(this).attr('name') == 'all_use_cases') {
                $('.case-study-filter-banner [name="use_case[]"]').prop('checked', $(this).prop('checked'));
            }
            $('.case-study-filter-banner [name="industry[]"]:checked').each(function() {
                industries.push($(this).val());
            });
            $('.case-study-filter-banner [name="use_case[]"]:checked').each(function() {
                useCases.push($(this).val());
            });
            $('.case-study-filter-banner [name="all_industries"]').prop('checked', !!(industries.length == $('.case-study-filter-banner [name="industry[]"]').length));
            $('.case-study-filter-banner [name="all_use_cases"]').prop('checked', !!(useCases.length == $('.case-study-filter-banner [name="use_case[]"]').length));
            if (industries.length || useCases.length) {
                $('.case-studies li').each(function() {
                    var hasIndustry = true;
                    var hasUseCase = true;
                    if (industries.length && industries.indexOf($(this).attr('data-industry')) == -1) hasIndustry = false;
                    if (useCases.length && useCases.indexOf($(this).attr('data-use-case')) == -1) hasUseCase = false;
                    if (hasIndustry && hasUseCase) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            } else {
                $('.case-studies li').show();
            }
        });
        $('.video-banner .play').click(function() {
            $(this).fadeOut();
            $('.video-banner video').get(0).play();
            $('.video-banner video').attr('controls', 'controls');
            return false;
        });
        $('.video-banner video').on('ended', function() {
            $('.video-banner .video .play').fadeIn();
            $('.video-banner video').get(0).load();
        });
    });
})(jQuery);
(function($) {
    $(function() {
        var items_per_page = 4;
        var story_offset = 0;
        var press_release_offset = 0;
        var article_offset = 0;
        var event_offset = 0;
        $('#stories .see-more').click(function() {
            story_offset += items_per_page;
            $.get($(this).attr('href') + '?story_offset=' + story_offset, function(data) {
                var currentMorecontainer = $('#stories .more').last();
                currentMorecontainer.append($(data).find('#stories .articles'));
                currentMorecontainer.slideDown();
                if ($(data).find('#stories article').length < items_per_page) {
                    $('#stories .see-more').addClass('disabled');
                }
            });
            return false;
        });
        $('#press-releases .see-more').click(function() {
            press_release_offset += items_per_page;
            $.get($(this).attr('href') + '?press_release_offset=' + press_release_offset, function(data) {
                var currentMorecontainer = $('#press-releases .more').last();
                currentMorecontainer.append($(data).find('#press-releases .articles'));
                currentMorecontainer.slideDown();
                if ($(data).find('#press-releases article').length < items_per_page) {
                    $('#press-releases .see-more').addClass('disabled');
                }
            });
            return false;
        });
        $('#articles .see-more').click(function() {
            article_offset += items_per_page;
            $.get($(this).attr('href') + '?article_offset=' + article_offset, function(data) {
                var currentMorecontainer = $('#articles .more').last();
                currentMorecontainer.append($(data).find('#articles .articles'));
                currentMorecontainer.slideDown();
                if ($(data).find('#articles article').length < items_per_page) {
                    $('#articles .see-more').addClass('disabled');
                }
            });
            return false;
        });
        $('#events .see-more').click(function() {
            event_offset += items_per_page;
            $.get($(this).attr('href') + '?event_offset=' + event_offset, function(data) {
                var currentMorecontainer = $('#events .more').last();
                currentMorecontainer.append($(data).find('#events .events-grid'));
                currentMorecontainer.slideDown();
                currentMorecontainer.append('<div class="more"></div>');
                if ($(data).find('#events .events-grid > div').length < items_per_page) {
                    $('#events .see-more').addClass('disabled');
                }
            });
            return false;
        });
        $('#alerts .alert-slider').flexslider({
            animation: 'fade',
            smoothHeight: false,
            slideshow: true,
            controlNav: false,
            directionNav: false,
            slideshowSpeed: 5000,
            animationSpeed: 750,
            startAt: 0
        });
        $('.quote-slider').flexslider({
            animation: 'fade',
            slideshow: true,
            controlNav: true,
            directionNav: false,
            slideshowSpeed: 10000,
            animationSpeed: 750,
            startAt: 0
        });
    });
})(jQuery);;
! function(a, b) {
    "use strict";

    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                h = !!navigator.userAgent.match(/Trident.*rv:11\./),
                i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++) {
                if (d = i[c], !d.getAttribute("data-secret")) f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f);
                if (g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
            }
        }
    }
    var d = !1,
        e = !1;
    if (b.querySelector)
        if (a.addEventListener) d = !0;
    if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
        if (a.wp.receiveEmbedMessage = function(c) {
                var d = c.data;
                if (d.secret || d.message || d.value)
                    if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                        var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                            k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                        for (e = 0; e < k.length; e++) k[e].style.display = "none";
                        for (e = 0; e < j.length; e++)
                            if (f = j[e], c.source === f.contentWindow) {
                                if (f.removeAttribute("style"), "height" === d.message) {
                                    if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
                                    else if (~~g < 200) g = 200;
                                    f.height = g
                                }
                                if ("link" === d.message)
                                    if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
                                        if (b.activeElement === f) a.top.location.href = d.value
                            } else;
                    }
            }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);