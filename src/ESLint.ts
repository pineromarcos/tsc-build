import { CommandOptions } from './CommandOptions.js';
import { ESLintOptions } from './ESLintOptions.js';
import { Logger } from './Logger.js';
import { exec } from 'child_process';

export class ESLint {

  private logger: Logger;

  public constructor () {
    this.logger = new Logger();
  }

  public async run (options: CommandOptions): Promise<void> {
    const esLintOptions: ESLintOptions = await this.getLintOptions(options);
    if (!esLintOptions.enabled) {
      this.logger.print('ESLint Disabled\n', 'dim');

      return;
    }

    this.logger.print('ESLint running...', 'dim');

    return new Promise((resolve) => {
      exec(`eslint ${esLintOptions.folder} --ignore-path ${esLintOptions.ignore_file_path} --config ${esLintOptions.config_file_path}`, (error, stdout, stderr) => {
        this.logger.removeLastLine();

        if (!error) {
          this.logger.print('ESLint executed successfully :sunglasses:\n', 'greenBright');

          return resolve();
        }

        this.logger.print('ESLint errors:', 'redBright');
        this.logger.print(stdout, 'dim', { break_line: false });
        if (stderr) {
          this.logger.print(stderr, 'dim', { break_line: false });
        }
        this.logger.print('Please fix ESLint errors :point_up_2:\n', 'redBright');

        return resolve();
      });
    });
  }

  private async getLintOptions (options: CommandOptions): Promise<ESLintOptions> {
    return {
      enabled: options.lint,
      ignore_file_path: options.lintIgnorePath,
      config_file_path: options.lintConfig,
      folder: options.lintFolder,
    };
  }

}