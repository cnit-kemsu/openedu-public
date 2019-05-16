function onlyDefined(str) {
  if (str) return true;
  return false;
}

export function dispstr(...strs) {
  return strs.filter(onlyDefined).join(' ');
} 