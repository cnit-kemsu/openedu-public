function numToLocStr(value) {
  return value.toLocaleString('en', { minimumIntegerDigits: 2 });
}

// export function dispdate(date) {
//   return new Date(date)
//   |> #.getFullYear()
//     + '.' + (#.getMonth() |> numToLocStr)
//     + '.' + (#.getDate() |> numToLocStr)
//     // + ' ' + #.getHours()
//     // + ':' + #.getMinutes();
// }

export function dispdate(date) {
  return new Date(date)
  |> (#.getDate() |> numToLocStr)
  + '.' + (#.getMonth() |> numToLocStr)
  + '.' + #.getFullYear();
  // + ' ' + #.getHours()
  // + ':' + #.getMinutes();
}