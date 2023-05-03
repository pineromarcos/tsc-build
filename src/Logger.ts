import { LoggerOptions } from 'LoggerOptions';
import chalk, { ColorName, ModifierName } from 'chalk';
import emoji from 'node-emoji';

export class Logger {

  public clear (): void {
    process.stdout.write('\u001B[2J\u001B[0;0f');
  }

  public removeLastLine (): void {
    if (!process.stdout.isTTY) {
      return;
    }
    process.stdout.moveCursor(0, -1);
    process.stdout.clearScreenDown();
  }

  public print (message: string, color: ColorName | ModifierName = 'white', options: LoggerOptions = { break_line: true }): void {
    message = this.replaceEmoji(message);
    message = this.addColor(message, color);

    if (options.break_line) {
      message += '\n';
    }

    process.stdout.write(`${message}`,);
  }

  private replaceEmoji (message: string): string {
    return emoji.emojify(message);
  }

  private addColor (message: string, color: ColorName | ModifierName): string {
    return chalk[color](message);
  }

}