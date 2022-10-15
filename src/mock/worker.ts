/* eslint-disable @typescript-eslint/no-var-requires */
export {}

if (typeof window === 'undefined') {
  import('./server').then(({ server }) => {
    server.listen()
  })
} else {
  const { worker } = require('./browser')
  worker.start()
}
