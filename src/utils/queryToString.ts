export const queryToString = (query: string | string[]): string => {
  if (Array.isArray(query)) {
    return query.join(',')
  }
  return query
}
