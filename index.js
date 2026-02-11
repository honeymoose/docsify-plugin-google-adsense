(function (window) {
    window.DocsifyAds = {
        create(caPub, slot) {
            return function (hook, vm) {
                hook.ready(function () {
                    window.DocsifyAds.injectCarbonStyle();
                });

                hook.doneEach(function () {
                    window.DocsifyAds.injectScript(caPub, slot);
                });
            };
        },

        injectScript(caPub, slot) {
            const adEl = document.querySelector("#adsense");
            const scriptID = "_adsense_js";
            const sidebarEl = document.querySelector(".sidebar-nav");


            if (!adEl && sidebarEl) {
                let scriptEl = document.querySelector(`#${scriptID}`);
                let scriptIns = document.querySelector(`#${scriptID}`);
                let scriptAdPush = document.querySelector(`#${scriptID}`);

                if (scriptEl) {
                    scriptEl = scriptEl.parentNode.removeChild(scriptEl);
                } else {
                    scriptEl = document.createElement("script");
                    scriptEl.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${caPub}`;
                    scriptEl.async = "async";
                    scriptEl.id = scriptID;
                    scriptEl.crossOrigin = "anonymous";

                    scriptIns = document.createElement("ins");
                    scriptIns.className = `adsbygoogle`;
                    scriptIns.style = 'display:inline-block;width:300px;height:150px';
                    scriptIns.setAttribute("data-ad-client", `${caPub}`);
                    scriptIns.setAttribute("data-ad-slot", `${slot}`);

                    scriptAdPush = document.createElement("script");
                    scriptAdPush.text = "(adsbygoogle = window.adsbygoogle || []).push({});";

                }

                sidebarEl.insertBefore(scriptEl, sidebarEl.firstChild);
                sidebarEl.insertBefore(scriptIns, sidebarEl.lastChild);
                sidebarEl.insertBefore(scriptAdPush, sidebarEl.lastChild);
            }
        },

        injectCarbonStyle() {
            const styleEl = document.createElement("style");

            styleEl.textContent = `
        #carbonads * {
          margin: initial;
          padding: initial;
        }
      `;

            document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
        },
    };
})(window);