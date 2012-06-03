ghes.modules['settings'] = {
    name: 'Settings',
    description: 'Lets you configure ghes',
    authors: [
        'Jason Tokoph <jason@tokoph.net>'
    ],
    urls: Array(
        /https?:\/\/github.com\/.*/i
    ),
    run: function() {
        console.log('The settings module!');
        var $buttonLI = $('<li>'),
            $buttonA = $('<a class="tooltipped downwards" title="ghes Settings" href="#" id="ghes-settings-link">').appendTo($buttonLI),
            $buttonIcon = $('<span class="mini-icon mini-icon-wrench" id="ghes-settings-icon"></span>').prependTo($buttonA);
        $buttonA.attr('href', 'http://dev.ghes.io/login');
        $buttonLI.insertBefore('#user-links li:last-child');

        // hack to get around process isolation and use github's jquery(tipsy)
        var script = document.createElement('script');
        script.text = '$("#ghes-settings-link").tipsy({gravity:"n"});';
        document.body.appendChild(script);
        document.body.removeChild(script)
    }
};
