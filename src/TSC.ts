import { TSCOptions } from './TSCOptions.js';
import { CommandOptions } from './CommandOptions.js';
import { Logger } from './Logger.js';
import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { promisify } from 'util';
import { TSConfig, TSConfigReference } from './TSConfig.js';

const execAsync = promisify(exec);

export class TSC {

  private logger: Logger;

  public constructor () {
    this.logger = new Logger();
  }

  public async build (options: CommandOptions): Promise<void> {
    const tscOptions: TSCOptions = await this.getTSCOptions(options);
    await this.executeCommand(`tsc --project ${tscOptions.project}`);
  }

  public async buildReferences (options: CommandOptions): Promise<void> {
    const tsconfig = await this.getTsConfig(options);

    let references: Array<TSConfigReference> = [];

    if (tsconfig.references !== undefined) {
      references = tsconfig.references;
    }

    for (const reference of references) {
      reference.tsconfig = reference.tsconfig ? reference.tsconfig : './tsconfig.json';

      await this.executeCommand(`cd ${reference.path} && tsc --project ${reference.tsconfig}`);

      if (!reference.command) {
        continue;
      }

      this.logger.print(`Running ${reference.command} on ${reference.path}`);

      const output = await execAsync(`cd ${reference.path} && ${reference.command}`);
      this.logger.print(output.stdout, 'dim');

      if (output.stderr) {
        this.logger.print(output.stderr, 'dim');
      }
    }
  }

  public async getTsConfig (options: CommandOptions): Promise<TSConfig> {
    const tscOptions: TSCOptions = await this.getTSCOptions(options);
    const dataBuffer = readFileSync(tscOptions.project);

    return JSON.parse(dataBuffer.toString());
  }

  private async executeCommand (command: string): Promise<void> {
    this.logger.print('Running Typescript compiler...', 'dim');

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        this.logger.removeLastLine();

        if (!error) {
          this.logger.print('Typescript compiled successfully :sunglasses:\n', 'greenBright');

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
      project: options.project,
      only_references: options.onlyReferences,
    };
  }

}