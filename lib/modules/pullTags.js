ghes.modules['pullTags'] = {
    name: 'Pull Request Tags',
    description: 'Shows tags on pull requests',
    authors: [
        'Jason Tokoph <jason@tokoph.net>'
    ],
    urls: Array(
        /https?:\/\/github.com\/[^\/]+\/[^\/]+\/pull\/.*/i,
        /https?:\/\/github.com\/[^\/]+\/[^\/]+\/pulls/i
    ),
    run: function() {
        console.log('Running pull request module');
    }
};
