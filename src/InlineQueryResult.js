const unescape = require('unescape');

module.exports = class InlineQueryResult {
    constructor(id, title, author, url) {
        this.id = id;
        this.title = unescape(title);
        this.author = unescape(author);
        this.url = url;
    }

    toJSON() {
        return {
            type: 'audio',
            id: this.id,
            audio_url: this.url,
            title: this.title,
            parse_mode: 'HTML',
            performer: this.author,
        };
    }
};
