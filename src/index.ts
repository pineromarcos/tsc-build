#!/usr/bin/env node
import { Command } from 'commander';
import { Executer } from './Executer.js';
import { CommandOptions } from './CommandOptions.js';

const program = new Command();
program.version('2.0.0')
  .name('tsc-build')
  .description('Run typescript compiler, with subcommands supporting project references and ESLint')
  .option('--project <value>', 'Typescript: Compile the project using the configuration file present in the given path.', './tsconfig.json')
  .option('--only-references', 'Typescript: Compile project references only and run commands', false)
  .option('--lint', 'Enable ESLint', false)
  .option('--lint-config <value>', 'ESLint: Use this configuration, overriding .eslintrc.* config options', '.eslintrc.json')
  .option('--lint-ignore-path <value>', 'ESLint: Specify path for ignore file', '.eslintignore')
  .option('--watch <entrypoint>', 'Watch input files.')
  .option('--inspect <value>', 'Set inspector port', undefined)
  .action((options: CommandOptions) => {
    // eslint-disable-next-line no-console
    const executer = new Executer();
    executer.run(options);
  })
  .parse(process.argv);
