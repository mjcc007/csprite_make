// https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/32
delete process.env.TS_NODE_PROJECT;

import yargs from 'yargs';

import { watch, build } from './command.webpack';
import { compile_win32, compile_darwin, compile_linux, compile_dir } from './command.builder';

yargs
  .command('watch', 'watch', yargs => yargs, watch)
  .command('build', 'build', yargs => yargs, build)
  .command('compile_dir', 'compile_dir', yargs => yargs, compile_dir)
  .command('compile_win32', 'compile_win32', yargs => yargs, compile_win32)
  .command('compile_darwin', 'compile_darwin', yargs => yargs, compile_darwin)
  .command('compile_linux', 'compile_linux', yargs => yargs, compile_linux)
  .argv; // prettier-ignore
