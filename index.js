(function (window) {
    window.DocsifyAds = {
        create(caPub) {
            return function (hook, vm) {
                hook.ready(function () {
                    window.DocsifyAds.injectStyle();
                });

                hook.doneEach(function () {
                    window.DocsifyAds.injectScript(caPub);
                });
            };
        },

        injectScript(caPub) {
            const adEl = document.querySelector("#adsense");
            const scriptID = "_adsense_js";
            const sidebarEl = document.querySelector(".sidebar-nav");

            if (!adEl && sidebarEl) {
                let scriptEl = document.querySelector(`#${scriptID}`);

                if (scriptEl) {
                    scriptEl = scriptEl.parentNode.removeChild(scriptEl);
                } else {
                    scriptEl = document.createElement("script");
                    scriptEl.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${caPub}`;
                    scriptEl.async = "async";
                    scriptEl.id = scriptID;
                }

                sidebarEl.insertBefore(scriptEl, sidebarEl.firstChild);
            }
        },

        injectStyle() {
            const styleEl = document.createElement("style");

            styleEl.textContent = `
        #adsense * {
          margin: initial;
          padding: initial;
        }

      `;

            document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
        },
    };
})(window);
