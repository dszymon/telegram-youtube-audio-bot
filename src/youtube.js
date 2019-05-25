const YouTube = require('youtube-node');
const ytdl = require('ytdl-core');
const {keys} = require('./config');

const youtube = new YouTube();

youtube.setKey(keys.youtube);
youtube.addParam('order', 'relevance');

module.exports.searchYoutube = (title, totalResults = 10) => new Promise(
    (resolve, reject) => youtube.search(title, totalResults, (error, result) => {
        if (error) {
            return reject(error);
        }

        resolve(result.items.filter(item => item.id.videoId));
    }),
);

module.exports.getVideoUrl = (videoId) => {
    const options = {
        filter: 'audioonly',
        quality: 'highestaudio',
    };
    return new Promise(
        (resolve, reject) => ytdl.getBasicInfo(
            'http://www.youtube.com/watch?v=' + videoId,
            options,
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                const filteredFormats = ytdl.filterFormats(result.formats, options.filter);
                if (filteredFormats.length > 0) {
                    return resolve(filteredFormats[0]);
                }

                resolve(ytdl.chooseFormat(result.formats, {
                    quality: 'lowestvideo',
                }));
            }
        ),
    ).then(format => format.url);
};
