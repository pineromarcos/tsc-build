import { ESLint } from './ESLint.js';
import { CommandOptions } from './CommandOptions.js';
import { Logger } from './Logger.js';
import { TSC } from './TSC.js';
import { Watcher } from './Watcher.js';
import { Node } from './Node.js';

export class Executer {

  private logger: Logger;
  private esLint: ESLint;
  private tsc: TSC;
  private watcher: Watcher;
  private node: Node;

  public constructor () {
    this.logger = new Logger();
    this.esLint = new ESLint();
    this.tsc = new TSC();
    this.watcher = new Watcher();
    this.node = new Node();
  }

  public async run (entrypoint: string, options: CommandOptions): Promise<void> {
    this.logger.clear();
    this.logger.print('Starting TSC-Build\n', 'bgBlue');

    this.watcher.watch(options.srcFolder, async () => {
      this.runSubprocess(entrypoint, options);
    });
    this.runSubprocess(entrypoint, options);
  }

  private async runSubprocess (entrypoint: string, options: CommandOptions): Promise<void> {
    await this.esLint.run(options);
    try {
      await this.tsc.run(options);
    } catch (error) {
      return;
    }
    await this.node.run(entrypoint);
  }

}