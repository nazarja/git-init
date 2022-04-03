import fs from 'fs';
import path from 'path';
import chalk from 'chalk';


export default {
    getCurrentDirectoryBase: () => path.basename(process.cwd()),
    gitDirectoryExists: (filepath) => {
        if (fs.existsSync(filepath)) {
            console.log(
                chalk.yellowBright('Already a Git Repository! \n') +
                chalk.redBright('Exiting Program. \n')
            );
            process.exit();
        }
    }
}