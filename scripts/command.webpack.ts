import webpack from 'webpack';
import portfinder from 'portfinder';
import WebpackDevServer from 'webpack-dev-server';

import { createDevServerConfig, createMainConfig, createRendererConfig } from './webpack.config';

export async function watch() {
  const port = await portfinder.getPortPromise();

  const compiler = {
    main: webpack(createMainConfig({ mode: 'development', port })),
    renderer: webpack(createRendererConfig({ mode: 'development', port })),
  };

  const clearConsole = () => process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');

  compiler.main.hooks.watchRun.tap('watchRun', clearConsole);
  compiler.renderer.hooks.watchRun.tap('watchRun', clearConsole);

  const devServer = new WebpackDevServer(compiler.renderer, createDevServerConfig({ port }));

  devServer.listen(port, process.env.HOST || '0.0.0.0', err => {
    if (err) {
      return console.error(err);
    }
  });

  compiler.main.watch({}, (err, stats) => {
    if (err) {
      return console.error(err);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors.toString());
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings.toString());
    }
  });
}

export function build() {
  const compilers = [webpack(createMainConfig({ mode: 'production' })), webpack(createRendererConfig({ mode: 'production' }))];
  try {
    Promise.all(
      compilers.map(compiler => {
        return new Promise((resolve, reject) => {
          compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
              reject(stats.toJson().errors.toString());
            }
            resolve(stats);
          });
        });
      }),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
