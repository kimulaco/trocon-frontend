export const typedFetch = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init)
  const body = await response.json()

  if (!response.ok) {
    throw body
  }

  return body as T
}
