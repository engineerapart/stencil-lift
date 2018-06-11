exports.config = {
  enableCache: false,
  namespace: 'stencil-lift',
  flags: { prerender: true },
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false,
      console: console,
      logLevel: 'debug'
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
