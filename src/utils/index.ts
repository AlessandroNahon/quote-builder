export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  )
}

export function convertToCurrency(ammount: number, currency: string) {
  if (!ammount) return

  return ammount.toLocaleString('en-US', { style: 'currency', currency })
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// export function downloadQuote(
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   ref: HTMLHtmlElement | null
// ) {
//   e.preventDefault()
//   const section = ref?.current

//   if (!section) return

//   const a = window.open('', '', 'height=880, width=970')
//   a?.document.write('<html><body >')
//   a?.document.write(section?.outerHTML.toString())
//   a?.document.write('</body></html>')
//   a?.document.close()
//   a?.print()
// }
