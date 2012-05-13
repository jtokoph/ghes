modules['demo'] = {
    name: 'Demo',
    description: 'Just a simple demo',
    authors: [
        'Jason Tokoph <jason@tokoph.net>'
    ],
    urls: Array(
        /https?:\/\/github.com\/.*/i
    ),
    run: function() {
        console.log('The demo works!');
    }
};
