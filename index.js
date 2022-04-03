#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import files from './lib/files.js';
import github from './lib/github.js';
import repo from './lib/repo.js';


(async () => {
    const printScreen = () => {
        clear();
        console.log(
            chalk.blueBright(
                figlet.textSync('Git Init', {
                    font: 'Star Wars',
                    horizontalLayout: 'full'
                })
            )
        );
    };

    const getGithubToken = async () => {
        let token = github.getStoredGithubToken();
        if (!token) token = await github.createGithubToken();
        return github.getGithubAuthToken(token);
    };

    // start app
    printScreen();
    files.gitDirectoryExists('.git');

    // github processes
    const octokit = await getGithubToken();
    const url = await repo.createRemoteRepo(octokit);
    await repo.createGitIgnore();
    await repo.createLocalRepo(url);
})();





