import { describe, expect, test } from 'vitest'
import { queryToString } from '.'

describe('queryToString', () => {
  test('should return string equal to argument if the argument is string', () => {
    expect(queryToString('str')).toBe('str')
  })

  test('should return concatenated string if the arguments is array', () => {
    expect(queryToString(['1', '2'])).toBe('1,2')
  })
})
