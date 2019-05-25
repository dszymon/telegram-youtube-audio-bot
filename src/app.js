const Telegraf = require('telegraf');
const {searchYoutube, getVideoUrl} = require('./youtube');
const {keys} = require('./config');
const InlineQueryResult = require('./InlineQueryResult');

const bot = new Telegraf(keys.telegram);
bot.on('inline_query', async (ctx) => {
    const {update: {inline_query: inlineQuery}} = ctx;

    if (inlineQuery.query.trim().length === 0) {
        return;
    }

    const youtubeResults = await searchYoutube(inlineQuery.query);

    const videoUrls = await Promise.all(
        youtubeResults.map(item => getVideoUrl(item.id.videoId)),
    );

    ctx.answerInlineQuery(
        youtubeResults.map(
            (item, index) => new InlineQueryResult(index, item.snippet.title, item.snippet.channelTitle, videoUrls[index]),
        ),
    );
});
bot.launch({
    timeout: 3,
    allowedUpdates: ['inline_query'],
});
