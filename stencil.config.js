exports.config = {
  enableCache: false,
  namespace: 'stencil-lift',
  flags: { prerender: true },
  buildEs5: true,
  buildStats: true,
  logLevel: 'debug', // do not turn this off until the Stencil bug is fixed.
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
