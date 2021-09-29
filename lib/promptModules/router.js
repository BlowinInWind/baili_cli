const chalk = require('chalk');

module.exports = api => {
    api.injectFeature({
        name: 'Router',
        value: 'router',
        description: 'Structure the app with dynamic pages',
        link: 'https://reactrouter.com/',
    });

    api.injectPrompt({
        name: 'historyMode',
        when: answers => answers.features.includes('router'),
        type: 'confirm',
        message: `选择Hash或History ${chalk.yellow(
            `(Requires proper server setup for index fallback in production)`,
        )}`,
        description: `By using the HTML5 History API, the URLs don't need the '#' character anymore.`,
        link: 'https://reactrouter.com/',
    });
};
