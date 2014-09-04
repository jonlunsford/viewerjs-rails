function Viewer(c) {
    function M() {
        var a, b, A, d, f;
        c && (A = c.getPluginName(), d = c.getPluginVersion(), f = c.getPluginURL());
        a = document.createElement("div");
        a.id = "aboutDialogCentererTable";
        b = document.createElement("div");
        b.id = "aboutDialogCentererCell";
        n = document.createElement("div");
        n.id = "aboutDialog";
        n.innerHTML = '<h1>ViewerJS</h1><p>Open Source document viewer for webpages, built with HTML and JavaScript.</p><p>Learn more and get your own copy on the <a href="http://viewerjs.org/" target="_blank">ViewerJS website</a>.</p>' +
            (c ? '<p>Using the <a href = "' + f + '" target="_blank">' + A + '</a> (<span id = "pluginVersion">' + d + "</span>) plugin to show you this document.</p>" : "") + '<p>Supported by <a href="http://nlnet.nl" target="_blank"><br><img src="../../images/nlnet.png" width="160" height="60" alt="NLnet Foundation"></a></p><p>Made by <a href="http://kogmbh.com" target="_blank"><br><img src="../../images/kogmbh.png" width="172" height="40" alt="KO GmbH"></a></p><button id = "aboutDialogCloseButton" class = "toolbarButton textButton">Close</button>';
        u.appendChild(a);
        a.appendChild(b);
        b.appendChild(n);
        a = document.createElement("button");
        a.id = "about";
        a.className = "toolbarButton textButton about";
        a.title = "About";
        a.innerHTML = "ViewerJS";
        N.appendChild(a);
        a.addEventListener("click", function () {
            u.style.display = "block"
        });
        document.getElementById("aboutDialogCloseButton").addEventListener("click", function () {
            u.style.display = "none"
        })
    }

    function B(a) {
        var b = O.options, c, d = !1, f;
        for (f = 0; f < b.length; f += 1)c = b[f], c.value !== a ? c.selected = !1 : d = c.selected = !0;
        return d
    }

    function C(a, c, d) {
        a !== b.getZoomLevel() && (b.setZoomLevel(a), d = document.createEvent("UIEvents"), d.initUIEvent("scalechange", !1, !1, window, 0), d.scale = a, d.resetAutoSettings = c, window.dispatchEvent(d))
    }

    function D() {
        var a;
        if (c.onScroll)c.onScroll();
        c.getPageInView && (a = c.getPageInView()) && (k = a, document.getElementById("pageNumber").value = a)
    }

    function E(a) {
        window.clearTimeout(F);
        F = window.setTimeout(function () {
            D()
        }, a)
    }

    function e(a, b, g) {
        var e, f;
        if (e = "custom" === a ? parseFloat(document.getElementById("customScaleOption").textContent) /
            100 : parseFloat(a))C(e, !0, g); else {
            e = d.clientWidth - p;
            f = d.clientHeight - p;
            switch (a) {
                case "page-actual":
                    C(1, b, g);
                    break;
                case "page-width":
                    c.fitToWidth(e);
                    break;
                case "page-height":
                    c.fitToHeight(f);
                    break;
                case "page-fit":
                    c.fitToPage(e, f);
                    break;
                case "auto":
                    c.isSlideshow() ? c.fitToPage(e + p, f + p) : c.fitSmart(e)
            }
            B(a)
        }
        E(300)
    }

    function q() {
        l = !l;
        r && !l && b.togglePresentationMode()
    }

    function v() {
        s && (w.className = "viewer-touched", window.clearTimeout(G), G = window.setTimeout(function () {
            w.className = ""
        }, 5E3))
    }

    function x() {
        h.classList.add("viewer-touched");
        m.classList.add("viewer-touched");
        window.clearTimeout(H);
        H = window.setTimeout(function () {
            I()
        }, 5E3)
    }

    function I() {
        h.classList.remove("viewer-touched");
        m.classList.remove("viewer-touched")
    }

    function P() {
        h.classList.contains("viewer-touched") ? I() : x()
    }

    var b = this, p = 40, r = !1, l = !1, J = !1, s = !1, y, g = document.getElementById("viewer"), d = document.getElementById("canvasContainer"), w = document.getElementById("overlayNavigator"), h = document.getElementById("titlebar"), m = document.getElementById("toolbarContainer"), K = document.getElementById("toolbarLeft"),
        Q = document.getElementById("toolbarMiddleContainer"), O = document.getElementById("scaleSelect"), u = document.getElementById("dialogOverlay"), N = document.getElementById("toolbarRight"), n, L, t = [], k, F, G, H;
    this.initialize = function () {
        var a = String(document.location), z = a.indexOf("#"), a = a.substr(z + 1);
        -1 === z || 0 === a.length ? console.log("Could not parse file path argument.") : (y = a, L = y.replace(/^.*[\\\/]/, ""), document.title = L, document.getElementById("documentName").innerHTML = document.title, c.onLoad = function () {
            document.getElementById("pluginVersion").innerHTML =
                c.getPluginVersion();
            (s = c.isSlideshow()) ? (d.classList.add("slideshow"), K.style.visibility = "visible") : (Q.style.visibility = "visible", c.getPageInView && (K.style.visibility = "visible"));
            J = !0;
            t = c.getPages();
            document.getElementById("numPages").innerHTML = "of " + t.length;
            b.showPage(1);
            e("auto");
            d.onscroll = D;
            E()
        }, c.initialize(d, a))
    };
    this.showPage = function (a) {
        0 >= a ? a = 1 : a > t.length && (a = t.length);
        c.showPage(a);
        k = a;
        document.getElementById("pageNumber").value = k
    };
    this.showNextPage = function () {
        b.showPage(k + 1)
    };
    this.showPreviousPage =
        function () {
            b.showPage(k - 1)
        };
    this.download = function () {
        var a = y.split("#")[0];
        window.open(a + "#viewer.action=download", "_parent")
    };
    this.toggleFullScreen = function () {
        l ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() : g.requestFullScreen ? g.requestFullScreen() : g.mozRequestFullScreen ? g.mozRequestFullScreen() : g.webkitRequestFullScreen ?
            g.webkitRequestFullScreen() : g.msRequestFullscreen && g.msRequestFullscreen()
    };
    this.togglePresentationMode = function () {
        var a = document.getElementById("overlayCloseButton");
        r ? (h.style.display = m.style.display = "block", a.style.display = "none", d.classList.remove("presentationMode"), d.onmouseup = function () {
        }, d.oncontextmenu = function () {
        }, d.onmousedown = function () {
        }, e("auto"), s = c.isSlideshow()) : (h.style.display = m.style.display = "none", a.style.display = "block", d.classList.add("presentationMode"), s = !0, d.onmousedown =
            function (a) {
                a.preventDefault()
            }, d.oncontextmenu = function (a) {
            a.preventDefault()
        }, d.onmouseup = function (a) {
            a.preventDefault();
            1 === a.which ? b.showNextPage() : b.showPreviousPage()
        }, e("page-fit"));
        r = !r
    };
    this.getZoomLevel = function () {
        return c.getZoomLevel()
    };
    this.setZoomLevel = function (a) {
        c.setZoomLevel(a)
    };
    this.zoomOut = function () {
        var a = (b.getZoomLevel() / 1.1).toFixed(2), a = Math.max(0.25, a);
        e(a, !0)
    };
    this.zoomIn = function () {
        var a = (1.1 * b.getZoomLevel()).toFixed(2), a = Math.min(4, a);
        e(a, !0)
    };
    (function () {
        M();
        c && (b.initialize(),
            document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen || (document.getElementById("fullscreen").style.visibility = "hidden", document.getElementById("presentation").style.visibility = "hidden"), document.getElementById("overlayCloseButton").addEventListener("click", b.toggleFullScreen), document.getElementById("fullscreen").addEventListener("click", b.toggleFullScreen), document.getElementById("presentation").addEventListener("click", function () {
            l ||
            b.toggleFullScreen();
            b.togglePresentationMode()
        }), document.addEventListener("fullscreenchange", q), document.addEventListener("webkitfullscreenchange", q), document.addEventListener("mozfullscreenchange", q), document.addEventListener("MSFullscreenChange", q), document.getElementById("download").addEventListener("click", function () {
            b.download()
        }), document.getElementById("zoomOut").addEventListener("click", function () {
            b.zoomOut()
        }), document.getElementById("zoomIn").addEventListener("click", function () {
            b.zoomIn()
        }),
            document.getElementById("previous").addEventListener("click", function () {
                b.showPreviousPage()
            }), document.getElementById("next").addEventListener("click", function () {
            b.showNextPage()
        }), document.getElementById("previousPage").addEventListener("click", function () {
            b.showPreviousPage()
        }), document.getElementById("nextPage").addEventListener("click", function () {
            b.showNextPage()
        }), document.getElementById("pageNumber").addEventListener("change", function () {
            b.showPage(this.value)
        }), document.getElementById("scaleSelect").addEventListener("change",
            function () {
                e(this.value)
            }), d.addEventListener("click", v), w.addEventListener("click", v), d.addEventListener("click", P), h.addEventListener("click", x), m.addEventListener("click", x), window.addEventListener("scalechange", function (a) {
            var b = document.getElementById("customScaleOption"), c = B(String(a.scale));
            b.selected = !1;
            c || (b.textContent = Math.round(1E4 * a.scale) / 100 + "%", b.selected = !0)
        }, !0), window.addEventListener("resize", function (a) {
            J && (document.getElementById("pageWidthOption").selected || document.getElementById("pageAutoOption").selected) &&
            e(document.getElementById("scaleSelect").value);
            v()
        }), window.addEventListener("keydown", function (a) {
            var c = a.shiftKey;
            switch (a.keyCode) {
                case 33:
                case 38:
                case 37:
                    b.showPreviousPage();
                    break;
                case 34:
                case 40:
                case 39:
                    b.showNextPage();
                    break;
                case 32:
                    c ? b.showPreviousPage() : b.showNextPage()
            }
        }))
    })()
};