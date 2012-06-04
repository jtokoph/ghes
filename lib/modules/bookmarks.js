ghes.modules['bookmarks'] = {
    name: 'Bookmarks',
    description: 'Allows you to bookmark repositories',
    authors: [
        'Jason Tokoph <jason@tokoph.net>'
    ],
    urls: Array(
        /^https?:\/\/github.com\/[^\/]+\/[^\/]+/i,
        /^https?:\/\/github.com\/?/i
    ),
    run: function() {
        this.bookmarks = JSON.parse(ghes.storage.getItem('module.bookmarks.bookmarks') || '{}');

        // if we're on a dashboard page
        if ($('#org_your_repos,#your_repos').length) {
            this.showBookmarksPane();
        } else if($('meta[property="og:type"][content="githubog:gitrepository"]').length) {
            this.addBookmarkButton();
        }
    },
    addBookmarkButton: function() {
        var that = this,
            x = /^\/([^\/]+)\/([^\/]+)/i.exec(document.location.pathname);

        if (!x) { return; };

        var reponame = x[1] + '/' + x[2];

        var $buttonLI = $('<li>'),
            $buttonA = $('<a class="minibutton">').appendTo($buttonLI),
            $buttonIcon = $('<span class="icon">&#xf241;</span>');

        if (that.bookmarks[reponame]) {
            $buttonA.html('<span class="ghes_label">Unbookmark</span>');
        } else {
            $buttonA.html('<span class="ghes_label">Bookmark</span>');
        }

        $buttonIcon.css({
            "float": 'left',
            "margin-right": '6px',
            "font-family": 'Octicons Regular'
        }).prependTo($buttonA);

        $('.pagehead-actions').prepend($buttonLI);
        
        $buttonA.on('click', function () {

            var repo = {
                    owner: x[1],
                    name: x[2],
                    visibility: $('h1 > span.repo-label > span').text(),
                    fork: ($('h1 > span.fork-flag').length) ? 1 : 0
                };

            if (that.bookmarks[reponame]) {
                delete that.bookmarks[reponame];
                $(this).find('span.ghes_label').html('Bookmark');
            } else {
                that.bookmarks[reponame] = repo;
                $(this).find('span.ghes_label').html('Unbookmark');
            }

            ghes.storage.setItem('module.bookmarks.bookmarks', JSON.stringify(that.bookmarks));

        });
    },
    showBookmarksPane: function() {
        $panel = $('<div class="repos" id="ghes_bookmarks">');
        $topbar = $('<div class="top-bar">').appendTo($panel);
        $h2 = $('<h2>').text('Bookmarks ').appendTo($topbar);
        $bottombar = $('<div class="bottom-bar">');

        $h2.append($('<em>').text('(' + Object.keys(this.bookmarks).length + ')'));

        // filterbar
        $filterbar = $('#org_your_repos,#your_repos').find('.filter-bar').clone().appendTo($panel);
        $filterbar.children('input').remove();
        // build list
        $ul = $('<ul id="ghes_bookmarks_listing" class="repo_list">');
        
        $.each(this.bookmarks, function(key, repo) {

            var $li = $('<li></li>'),
                $a = $('<a>').attr('href', '/' + repo.owner + '/' + repo.name).appendTo($li),
                $icon = $('<span class="mini-icon">').appendTo($a),
                $owner = $('<span class="owner">').text(repo.owner).appendTo($a),
                $slash = $a.append('/'),
                $repo = $('<span class="repo">').text(repo.name).appendTo($a),
                $arrow = $('<span class="arrow">').appendTo($a);
            
            $li.addClass(repo.visibility);
            if (repo.fork) {
                $li.addClass('fork');
                $icon.addClass('mini-icon-repo-forked');
            } else {
                $li.addClass('source');
                $icon.addClass('mini-icon-' + repo.visibility + '-repo');
            }
            $ul.append($li)
        })
        $ul.appendTo($panel);
        $bottombar.appendTo($panel);

        $filterbar.find('.all_repos a').on('click', function() {
            var $this = $(this);
            $filterbar.find('.filter_selected').removeClass('filter_selected');
            $this.addClass('filter_selected');
            $ul.find('li').show();
            return false;
        });

        $filterbar.find('.all_repos').siblings().find('a').on('click', function() {
            var $this = $(this),
                cls = 'li.' + $this.attr('rel');
            $ul.find('li').hide();
            $ul.find(cls).show();
            $filterbar.find('.filter_selected').removeClass('filter_selected');
            $this.addClass('filter_selected');
            return false;
        });

        
        $('#org_your_repos,#your_repos').parent().append($panel);
    }
};
