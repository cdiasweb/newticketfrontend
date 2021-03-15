const defaults = {
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    decimal: ",",
    precision: 2
  }

function between (min: any, n: any, max: any) {
  return Math.max(min, Math.min(n, max))
}
  
function toStr (value: any) {
  return value ? value.toString() : ""
}

// Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed (precision: any) {
  return between(0, precision, 20)
}

function onlyNumbers (input: any) {
  return toStr(input).replace(/\D+/g, "") || "0"
}

function numbersToCurrency (numbers: any, precision: any) {
  const exp = Math.pow(10, precision)
  const float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}

function addThousandSeparator (integer: any, separator: any) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

function currencyToIntegerAndDecimal (float: any) {
  return toStr(float).split(".")
}

function joinIntegerAndDecimal (integer: any, decimal: any, separator: any) {
  return decimal ? integer + separator + decimal : integer
}


function setCursor (el: any, position: any) {
  const setSelectionRange = function () { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}

function format (input: any, opt = defaults) {
  if (typeof input === "number") {
    input = input.toFixed(fixed(opt.precision))
  }
  const negative = input.indexOf("-") >= 0 ? "-" : ""

  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, opt.precision)
  const parts = toStr(currency).split(".")
  let integer = parts[0]
  const decimal = parts[1]
  integer = addThousandSeparator(integer, opt.thousands)
  return opt.prefix + negative + joinIntegerAndDecimal(integer, decimal, opt.decimal) + opt.suffix
}

function unformat (input: any, precision: any) {
  const negative = input.indexOf("-") >= 0 ? -1 : 1
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency) * negative
}

export {
  format,
  unformat
}
