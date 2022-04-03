# GIT-INIT

#### A command line program to create both a remote and local git repository

## Requirements
- node and npm installed
- git installed and configured
- a github account with a username and personal access token 

>Learn how to set up a personal access token:
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

## Usage
- open a terminal in package root directory 
- install package globaly with npm, `npm install -g`
- `cd` to directory of folder to make a repository
- enter global command `git-init`
- follow the onscreen prompts until the program has completes
- After, you can simply `add, commit and push` as normal to your remote repo

## Features
- authenticates using your github personal access token,  
(you should only need to enter this once after running `git-init` for the first time)
- creates a remote repository on github, with name and description
- creates a .gitignore file and allows selection of files to ignore before creation
- creates a local git repository
- pushes the first commit containing only the `.gitignore` file

#### Enjoy :)
