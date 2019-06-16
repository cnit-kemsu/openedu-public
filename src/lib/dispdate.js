function numToLocStr(value) {
  return value.toLocaleString('en', { minimumIntegerDigits: 2 });
}

export function dispdate(date) {
  return new Date(date)
  |> #.getFullYear()
    + '.' + (#.getMonth() |> numToLocStr)
    + '.' + (#.getDate() |> numToLocStr)
    + ' ' + #.getHours()
    + ':' + #.getMinutes();
}