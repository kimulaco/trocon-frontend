export const logger = {
  log(value: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.log(value) // eslint-disable-line no-console
    }
  },
  error(value: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.error(value) // eslint-disable-line no-console
    }
  },
}
