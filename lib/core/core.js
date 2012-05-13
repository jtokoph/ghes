for (module in modules) {
    for (var i = modules[module].urls.length - 1; i >= 0; i--){
        if(modules[module].urls[i].test(window.location.href)) {
            modules[module].run();
            break;
        }
    };
}
