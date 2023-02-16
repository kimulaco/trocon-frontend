export const STEAM_ID_HELP_URL = 'https://help.steampowered.com/ja/faqs/view/2816-BE67-5B69-0FEC'

export const isValidSteamId = (value: string): boolean => {
  return value.length === 17 && !isNaN(Number(value))
}
