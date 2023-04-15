import { Logger } from './Logger.js';
import chokidar from 'chokidar';

export class Watcher {

  private logger: Logger;
  private isRunning: boolean;

  public constructor () {
    this.logger = new Logger();
    this.isRunning = false;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async watch (watchPath: string, callback: Function): Promise<void> {
    const watcher = chokidar.watch(watchPath, {
      persistent: true,
      ignoreInitial: true,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.vscode/**']
    });

    watcher.on('all', async () => {
      if (this.isRunning) {
        return;
      }
      this.isRunning = true;
      setTimeout(async ()=> {
        this.logger.clear();
        this.logger.print('Restarting TSC-Build\n', 'bgBlue');
        await callback();
        this.isRunning = false;
      }, 100);
    });
  }

}