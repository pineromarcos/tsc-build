#!/usr/bin/env node
import { Command } from 'commander';
import { Executer } from './Executer.js';
import { CommandOptions } from './CommandOptions.js';

const program = new Command();
program.version('2.0.0')
  .description('Run typescript compiler, with subcommands supporting project references and ESLint')
  .argument('<entrypoint>', 'Entrypoint')
  .option('--ts-config <value>', 'Typescript: Compile the project using the configuration file present in the given path.', 'tsconfig.json')
  .option('--ts-only-references', 'Typescript: Compile project references only', false)
  .option('--lint-config <value>', 'ESLint: Use this configuration, overriding .eslintrc.* config options', '.eslintrc.json')
  .option('--lint-ignore-path <value>', 'ESLint: Specify path for ignore file', '.eslintignore')
  .option('--lint', 'Enable ESLint', false)
  .option('--lint-folder <value>', 'ESLint folder', './')
  .option('--src-folder <value>', 'Source folder', './')
  .option('--watch', 'Watch input files.', false)
  .option('--inspect <value>', 'Set inspector port', false)
  .action((entrypoint: string, options: CommandOptions) => {
    const executer = new Executer();
    executer.run(entrypoint, options);
  })
  .parse(process.argv);

