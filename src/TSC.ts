import { TSCOptions } from 'TSCOptions.js';
import { CommandOptions } from './CommandOptions.js';
import { Logger } from './Logger.js';
import { exec } from 'child_process';

export class TSC {

  private logger: Logger;

  public constructor () {
    this.logger = new Logger();
  }

  public async run (options: CommandOptions): Promise<void> {
    const tscOptions: TSCOptions = await this.getTSCOptions(options);

    this.logger.print('Running Typescript compiler...', 'dim');

    return new Promise((resolve, reject) => {
      exec(`tsc --project ${tscOptions.config_file_path} --incremental`, (error, stdout, stderr) => {
        this.logger.removeLastLine();

        if (!error) {
          this.logger.print('Typescript executed successfully :sunglasses:\n', 'greenBright');

          return resolve();
        }

        this.logger.print('Typescript errors:\n', 'redBright');
        this.logger.print(stdout, 'dim');
        if (stderr) {
          this.logger.print(stderr, 'dim');
        }
        this.logger.print('Please fix Typescript errors :point_up_2:\n', 'redBright');

        return reject();
      });
    });
  }

  private async getTSCOptions (options: CommandOptions): Promise<TSCOptions> {
    return {
      config_file_path: options.tsConfig,
      only_references: options.tsOnlyReferences,
    };
  }

}