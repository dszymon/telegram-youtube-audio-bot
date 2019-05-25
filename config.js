const {youtube, telegram} = require('yargs')
    .option('youtube', {
        alias: 'yt',
        describe: 'YouTube API key',
    })
    .option('telegram', {
        alias: 'tg',
        describe: 'Telegram API key'
    })
    .demand(['yt', 'tg'], 'Please provide Telegram and YouTube API keys')
    .argv;

module.exports = {
    keys: {
        youtube,
        telegram,
    },
};
