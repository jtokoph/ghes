ghes.modules['bookmarks'] = {
    name: 'Bookmarks',
    description: 'Allows you to bookmark repositories',
    authors: [
        'Jason Tokoph <jason@tokoph.net>'
    ],
    urls: Array(
        /https?:\/\/github.com\/[^\/]+\/[^\/]+\/.*/i,
        /https?:\/\/github.com\/[^\/]+\/[^\/]+/i
    ),
    run: function() {
        console.log('Running bookmark module');
        var $buttonLI = $('<li>'),
            $buttonA = $('<a class="minibutton">').html('Bookmark').appendTo($buttonLI),
            $buttonIcon = $('<span class="icon">&#xf241;</span>').prependTo($buttonA);
        
        $buttonIcon.css({
            "float": 'left',
            "margin-right": '6px',
            "font-family": 'Octicons Regular'
        });
        $('.pagehead-actions').prepend($buttonLI);
        
        $buttonA.on('click', function () {
            console.log('bookmark');
        });
    }
};
