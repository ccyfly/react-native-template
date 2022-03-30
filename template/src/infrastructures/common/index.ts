const hex2RGB = (hex: string): number[] => {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1)
  }
  if ((hex.length < 2) || (hex.length > 6)) {
    return []
  }
  const values = hex.split('')
  let r
  let g
  let b

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16)
    g = r
    b = r
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16)
    g = parseInt(values[1].toString() + values[1].toString(), 16)
    b = parseInt(values[2].toString() + values[2].toString(), 16)
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16)
    g = parseInt(values[2].toString() + values[3].toString(), 16)
    b = parseInt(values[4].toString() + values[5].toString(), 16)
  } else {
    return []
  }

  return [
    r, g, b,
  ]
}

const hex2RGBColor = (hex: string, opacity: number = 1.0) => {
  const rgb: number[] = hex2RGB(hex)
  if (rgb.length === 3) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`
  }

  return false
}

export {
  hex2RGB,
  hex2RGBColor,
}
