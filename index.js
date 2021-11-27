const { Plugin } = require('powercord/entities');
const { getModule, channels } = require('powercord/webpack');

const Settings = require('./Settings.jsx');
const { decrypt } = require('./crypto');

const { createBotMessage } = getModule(['createBotMessage'], false);
const { receiveMessage } = getModule(['receiveMessage'], false);

module.exports = class YTSearch extends Plugin {
    async startPlugin() {
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Youtube Search',
            render: Settings
        });

        powercord.api.commands.registerCommand({
            command: 'yt',
            aliases: ['youtube'],
            description: 'Search Youtube for videos.',
            usage: '{c} [query], --send',
            executor: this.executor.bind(this)
        });
    }

    async executor(args) {
        const send = args.includes('--send');
        send ? (args = args.filter(arg => arg !== '--send')) : null;

        const query = args.join(' ');
        if (!query) {
            return this.sendMessage({
                content: 'Please enter a search query.'
            });
        }

        const apiKey = this.settings.get('youtubeApiKey')
            ? decrypt(this.settings.get('youtubeApiKey'))
            : undefined;

        if (!apiKey) {
            return this.sendMessage({
                content:
                    'You have to place your API key in settings of this plugin. More information about how to do this is on https://github.com/XeynQ4/powercord-yt-search.'
            });
        }

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
            query
        )}&key=${apiKey}`;

        const data = await this.getData(url).catch(e => {
            if (e.name === 'quotaExceeded') {
                return this.sendMessage({
                    content:
                        'You have exceeded the daily quota for this API key. Try again tommorow.'
                });
            }
            console.error(e);
            return this.sendMessage({
                content:
                    'An error occured. I printed it in the console if you want to take a look.'
            });
        });

        const video = data.items[0];
        const snippet = video.snippet;

        if (send) {
            return {
                send: true,
                result: `https://www.youtube.com/watch?v=${video.id.videoId}`
            };
        }

        return this.sendMessage({
            embeds: [
                {
                    title: snippet.title,
                    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    description: snippet.description,
                    image: {
                        url: snippet.thumbnails.high.url,
                        width: 480,
                        height: 360
                    }
                }
            ]
        });
    }

    async getData(url) {
        const data = await fetch(url);

        return data.json();
    }

    // This function was yoinked from https://github.com/FC5570/powercord-random-dog-images.
    // Thanks FC#5104!

    sendMessage(options) {
        const received = createBotMessage(channels.getChannelId(), '');
        received.author = {
            ...received.author,
            username: 'YouTube',
            avatar: 'powercord'
        };
        return receiveMessage(received.channel_id, { ...received, ...options });
    }
};
