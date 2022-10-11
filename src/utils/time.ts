export const formatDateByUnixtime = (unixtime: number): string => {
  const date = new Date(unixtime * 1000)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}
