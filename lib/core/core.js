/*
 * Core functions
 */
ghes.fns = {};

ghes.fns.boot = function () {
    var run = false, i;
    for (module in ghes.modules) {
        run = false;
        for (i = ghes.modules[module].urls.length - 1; i >= 0; i--){
            if(ghes.modules[module].urls[i].test(window.location.href)) {
                run = true;
                break;
            }
        }

        if (ghes.modules[module].blockedUrls) {
            for (i = ghes.modules[module].blockedUrls.length - 1; i >= 0; i--){
                if(ghes.modules[module].blockedUrls[i].test(window.location.href)) {
                    run = false;
                    break;
                }
            }
        }

        if (run) {
            try {
                ghes.modules[module].run();
            } catch (e) {
                console.log('Module: "' + module + '" failed to run.');
            }
        }
    }
};

/*
 * Basic storage
 */
ghes.storage = localStorage;

/*
 * Boot when in chrome
 */
if (typeof(chrome) != 'undefined') {
    chrome.extension.sendRequest({requestType: 'boot'}, function(res) {
        ghes.storage = res.localStorage;

        ghes.storage.getItem = function(item) {
            if (typeof(ghes.storage[item]) != 'undefined') return ghes.storage[item];
            return null;
        };

        ghes.storage.setItem = function(item, value) {
            if (ghes.storage[item] != value) {
                ghes.storage[item] = item;
                chrome.extension.sendRequest({requestType: 'localStorage.setItem', item: item, value: value});
            }
        };

        ghes.storage.removeItem = function(item) {
            delete ghes.storage[item];
            chrome.extension.sendRequest({requestType: 'localStorage.removeItem', item: item});
        };

        ghes.fns.boot();
    });
}
