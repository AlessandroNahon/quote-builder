export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  )
}

export function convertToCurrency(ammount: number, currency: string) {
  return ammount.toLocaleString('en-US', { style: 'currency', currency })
}
