import * as builder from 'electron-builder';

const config: builder.Configuration = {
  asar: false,
  npmRebuild: false,
};

export function compile_dir() {
  builder.build({
    dir: true,
    config,
  });
}
export function compile_win32() {
  builder.build({
    targets: builder.Platform.WINDOWS.createTarget(),
    config,
  });
}
export function compile_darwin() {
  builder.build({
    targets: builder.Platform.MAC.createTarget(),
    config,
  });
}
export function compile_linux() {
  builder.build({
    targets: builder.Platform.LINUX.createTarget(),
    config,
  });
}
