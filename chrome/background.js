chrome.extension.onRequest.addListener(function (request, sender, callback) {
    switch (request.requestType) {
        case 'boot':
            callback({
                localStorage: localStorage
            });
            break;
        case 'localStorage.setItem':
            localStorage.setItem(request.item, request.value);
            break;
        case 'localStorage.removeItem':
            localStorage.removeItem(request.item, request.value);
            break;
    }
});