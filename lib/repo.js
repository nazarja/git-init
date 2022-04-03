import fs from 'fs';
import CLI from 'clui';
import touch from 'touch';
import _ from 'lodash';
import simpleGit from 'simple-git';

import inquirer from './inquirer.js';
import chalk from 'chalk';

import { exec } from 'child_process';

export default {
    createGitIgnore: async () => {
        const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');
        if (filelist.length) {
            const { ignore } = await inquirer.askIgnoreFiles(filelist);
            if (ignore.length) {
                fs.writeFileSync('.gitignore', ignore.join('\n'));
                return;
            };
        };
        touch('.gitignore');
    },
    createLocalRepo: async url => {
        const spinner = new CLI.Spinner('Initialising local repository...');
        spinner.start();
        
        try {
            const git = simpleGit();
            await git.init();
            await git.add('.gitignore');
            await git.commit('first commit', '.gitignore');
            await git.branch('master', ['-M', 'main']);
            await git.addRemote('origin', url);

            exec('git push -u origin main', (err, stdout, stderr) => {
                if (err) {
                    console.log('Unable to push to remote repository, exiting program.');
                    process.exit();
                };
            });
        }
        catch (err) {
            console.log('Unable to create local repository, exiting program.');
            process.exit();
        }
        finally {
            spinner.stop();
            console.log(
                '\n' +
                'status: ' + chalk.greenBright('Complete \n') +
                'remote url: ' + chalk.yellowBright(`${url.split('.git')[0]}/ \n`)
            );
        }
    },
    createRemoteRepo: async octokit => {
        const details = await inquirer.askRepoDetails();
        const spinner = new CLI.Spinner('Creating remote repository...');
        spinner.start();

        try {
            const response = await octokit.repos.createForAuthenticatedUser({
                name: details.name,
                description: details.description,
                private: (details.visibility === 'private'),
            });
            return response.data.clone_url;
        }
        catch (err) {
            console.log(chalk.red('\nThere is already a remote repository with that name! Exiting program.'));
            process.exit();
        }
        finally {
            spinner.stop();
        }
    },
};