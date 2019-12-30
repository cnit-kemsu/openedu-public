function _pad(value) {
  return ('0' + value).slice(-2);
}

export function dispdate(date) {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = (_date.getMonth() + 1) |> _pad;
  const __date = _date.getDate() |> _pad;
  return `${__date}.${month}.${year}`;
}