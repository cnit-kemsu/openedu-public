const a = {
  b: 1,
  c: 2
};

const copy = (obj) => {
  return (() => {}) |> Object.keys(obj).forEach(key => { #[key] = obj[key]; });
};

console.log(copy(a));