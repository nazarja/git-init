import chalk from 'chalk';
import CLI from 'clui';
import Configstore from 'configstore';
import { createRequire } from 'module';
import { createTokenAuth } from '@octokit/auth-token';
import { Octokit } from '@octokit/rest';

import inquirer from './inquirer.js';

const require = createRequire(import.meta.url);
const conf = new Configstore(require("../package.json").name);


export default {
    getStoredGithubToken: () => conf.get('github.auth'),
    getGithubAuthToken: token => new Octokit({ auth: token.personal_access_token }),
    async createGithubToken() {
        const creds = await inquirer.askGithubCreds();
        const spinner = new CLI.Spinner('Authenticating, please wait...')
        spinner.start();

        const auth = createTokenAuth(creds.personal_access_token);
        const authentication = await auth();

        const octokit = new Octokit({ auth: authentication.token });
        const is_auth = await octokit.rest.users.getAuthenticated();

        // check is valid
        if (is_auth.status === 200) {
            if (is_auth.data.login === creds.login) {
                const token = {
                    login: creds.login,
                    personal_access_token: authentication.token
                };
                conf.set('github.auth', token);
                spinner.stop();
                return token;
            };
        };

        // check is invalid
        spinner.stop();
        console.log(
            chalk.redBright('\nInvalid Credentials, please try again or learn more... \n') +
            chalk.whiteBright('https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token')
        );
        process.exit();
    },
};
