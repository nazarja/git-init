# GIT-INIT

#### A command line program to create both a remote and local git repository

## Usage
- download/clone/unzip package
- open a terminal in package root directory 
- install package globaly with npm, `npm install -g`
- `cd` to directory of chosen folder to make a repository in
- enter global command `git-init`
- follow the onscreen prompts until the program completes
- After, you can simply `add, commit and push` as normal to your remote repo
- If you need to reset your github token, add the flag `--reset`

## Features
- authenticates using your github personal access token,  
(you should only need to enter this once after running `git-init` for the first time)
- creates a remote repository on github, with name and description
- creates a .gitignore file and allows selection of files to ignore before creation
- creates a local git repository
- pushes the first commit containing only the `.gitignore` file

## Requirements
- node and npm installed
- git installed and configured
- a github account with a username and personal access token 

> To install node, if on linux or mac, NVM is highly recommended  
https://nodejs.org/en/download/  
https://github.com/nvm-sh/nvm  

> To configure git you may need to add some details:    
`git config --global user.name "Your Name"`  
`git config --global user.email "your_email@example.com"`

> Learn how to set up a personal access token:  
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token


#### Enjoy :)
