const { React } = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');
const { encrypt, decrypt } = require('./crypto');

module.exports = class Settings extends React.Component {
    render() {
        const { getSetting, updateSetting } = this.props;
        return (
            <div>
                <TextInput
                    defaultValue={
                        getSetting('youtubeApiKey')
                            ? decrypt(getSetting('youtubeApiKey'))
                            : undefined
                    }
                    onChange={val => {
                        if (val === '')
                            return updateSetting('youtubeApiKey', undefined);
                        updateSetting('youtubeApiKey', encrypt(val));
                    }}
                >
                    Put your Youtube API key here
                </TextInput>
            </div>
        );
    }
};
