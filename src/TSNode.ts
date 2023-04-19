import { CommandOptions } from './CommandOptions.js';
import { Logger } from './Logger.js';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export class TSNode {

  private logger: Logger;

  public constructor () {
    this.logger = new Logger();
  }

  public async run (options: CommandOptions): Promise<void> {
    const args: Array<string> = [options.watch, '-r', 'tsconfig-paths/register'];

    if (options.inspect) {
      args.push('--inspect');
      args.push(options.inspect);
    }

    const nodeProcess: ChildProcessWithoutNullStreams = spawn('ts-node', args);

    nodeProcess.stdout.on('data', (dataBuffer) => {
      this.logger.print(dataBuffer.toString());
    });

    nodeProcess.stderr.on('data', (dataBuffer) => {
      this.logger.print(dataBuffer.toString());
    });
  }

}