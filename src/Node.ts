import { Logger } from './Logger.js';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export class Node {

  private logger: Logger;

  public constructor () {
    this.logger = new Logger();
  }

  public async run (entrypoint: string): Promise<void> {
    const nodeProcess: ChildProcessWithoutNullStreams = spawn('node', [entrypoint]);

    nodeProcess.stdout.on('data', (dataBuffer) => {
      this.logger.print(dataBuffer.toString());
    });

    nodeProcess.stderr.on('data', (dataBuffer) => {
      this.logger.print(dataBuffer.toString());
    });
  }

}