var fontLoadAlt = {
    intialize: function() {
        "use strict";
        console.log('font loader');
        // var pageType = document.getElementsByTagName('Body')[0].getAttribute('data-pageType');
        var woff = '/fonts/fontsWOFF_variant.css';
        var woff2 = '/fonts/fontsWOFF2_variant.css';
        this.loadFont('font-file', woff, woff2)
            // loadFont
    },
    loadFont: function(a, b, c) {
        function d() {
            if (!window.FontFace) return !1;
            var a = new FontFace("t", 'url("data:application/font-woff2,") format("woff2")');
            return a.load(), "loading" === a.status
        }
        var e = navigator.userAgent,
            f = !window.addEventListener || e.match(/(Android (2|3|4.0|4.1|4.2|4.3))|(Opera (Mini|Mobi))/) && !e.match(/Chrome/);
        if (!f) {
            var g = {};
            try {
                g = sessionStorage || {}
            } catch (h) {}
            var i = "y-font-" + a,
                j = i + "url",
                k = i + "css",
                l = g[j],
                m = g[k],
                n = document.createElement("style");
            if (n.rel = "stylesheet", document.head.appendChild(n), !m || l !== b && l !== c) {
                var o = c && d() ? c : b,
                    p = new XMLHttpRequest;
                p.open("GET", o), p.onload = function() {
                    p.status >= 200 && p.status < 400 && (g[j] = o, g[k] = n.textContent = p.responseText)
                }, p.send()
            } else n.textContent = m
        }
    }
};
(function() {
    fontLoadAlt.intialize();
})();
