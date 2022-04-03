import chalk from 'chalk';
import inquirer from 'inquirer';

import files from './files.js';

const loginLength = login => login.length >= 4;
const tokenLength = token => token.length === 40;
const repoLength = repo => repo.length >= 1 && repo.length <= 100;

const invalidMsg = `Invalid! Please try again...`;


export default {
    askGithubCreds: () => {
        const prompts = [
            {
                name: 'login',
                type: 'input',
                message: 'Enter your github username:',
                validate(login) {
                    return loginLength(login)
                        ? true
                        : chalk.redBright(invalidMsg);
                },
                filter: login => loginLength(login) ? login : '',
            },
            {
                name: 'personal_access_token',
                type: 'password',
                message: 'Enter your github personal access token:',
                validate(token) {
                    return tokenLength(token)
                        ? true
                        : chalk.redBright(invalidMsg);
                },
                filter: token => tokenLength(token) ? token : '',
            }
        ];
        return inquirer.prompt(prompts);
    },
    askRepoDetails: () => {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository:',
                default: files.getCurrentDirectoryBase(),
                validate(repo) {
                    return repoLength(repo)
                        ? true
                        : chalk.redBright(invalidMsg);
                },
                filter: repo => repoLength(repo) ? repo.trim().replace(/[\W_]+/g, '-') : '',
            },
            {
                type: 'input',
                name: 'description',
                default: null,
                message: `Enter a description of the repository: ${chalk.gray('(optional)')}`
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or Private:',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(prompts);
    },
    askIgnoreFiles: filelist => {
        const prompts = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folders you wish to ignore: \n',
                choices: filelist,
                default: ['node_modules', '.env', '.venv']
            }
        ];
        return inquirer.prompt(prompts);
    }
};