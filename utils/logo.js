import gradient from 'gradient-string';
import chalk from 'chalk';

// Work around to get the version from package.json
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export const { version } = require('../package.json');

export const logLogo = () => {
  console.log(
    gradient.pastel.multiline(
      `
      ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗      ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗███████╗██████╗ 
      ██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝     ██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝██╔════╝██╔══██╗
      ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝█████╗██║     ███████║█████╗  ██║     █████╔╝ █████╗  ██████╔╝
      ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝ ╚════╝██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ ██╔══╝  ██╔══██╗
      ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║        ╚██████╗██║  ██║███████╗╚██████╗██║  ██╗███████╗██║  ██║
      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝         ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                                             `
    )
  );
  console.log(chalk.bgBlueBright(`v${version}`));
};

export const logLogo2 = () => {
  console.log(
    gradient.pastel.multiline(
      `
    
        ██████╗ ███████╗███████╗███████╗███████╗    ████████╗ ██████╗  ██████╗ ██╗     ██████╗  ██████╗ ██╗  ██╗
        ██╔══██╗██╔════╝██╔════╝██╔════╝██╔════╝    ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔══██╗██╔═══██╗╚██╗██╔╝
        ██████╔╝█████╗  █████╗  █████╗  ███████╗       ██║   ██║   ██║██║   ██║██║     ██████╔╝██║   ██║ ╚███╔╝ 
        ██╔══██╗██╔══╝  ██╔══╝  ██╔══╝  ╚════██║       ██║   ██║   ██║██║   ██║██║     ██╔══██╗██║   ██║ ██╔██╗ 
        ██████╔╝███████╗███████╗██║     ███████║       ██║   ╚██████╔╝╚██████╔╝███████╗██████╔╝╚██████╔╝██╔╝ ██╗
        ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚══════╝       ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                                                                       
`
    )
  );
  console.log(chalk.bgBlueBright(`v${version}`));
};
