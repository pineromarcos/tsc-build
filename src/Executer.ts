import { ESLint } from './ESLint.js';
import { CommandOptions } from './CommandOptions.js';
import { Logger } from './Logger.js';
import { TSC } from './TSC.js';
import { Watcher } from './Watcher.js';
import { TSNode } from './TSNode.js';

export class Executer {

  private logger: Logger;
  private esLint: ESLint;
  private tsc: TSC;
  private watcher: Watcher;
  private tsNode: TSNode;

  public constructor () {
    this.logger = new Logger();
    this.esLint = new ESLint();
    this.tsc = new TSC();
    this.watcher = new Watcher();
    this.tsNode = new TSNode();
  }

  public async run (options: CommandOptions): Promise<void> {
    this.logger.clear();
    this.logger.print('Starting TSC-Build\n', 'bgBlue');

    await this.tsc.buildReferences(options);

    if (options.onlyReferences) {
      this.logger.print('TSC-Build Finished\n', 'bgBlue');

      return;
    }

    const tsconfig = await this.tsc.getTsConfig(options);

    if (!options.watch) {
      await this.esLint.run(tsconfig.compilerOptions.baseUrl, options);
      await this.tsc.build(options);
      this.logger.print('TSC-Build Finished\n', 'bgBlue');

      return;
    }

    this.watcher.watch(tsconfig.compilerOptions.baseUrl, async () => {
      await this.esLint.run(tsconfig.compilerOptions.baseUrl, options);
      await this.tsNode.run(options);
    });
  }

}