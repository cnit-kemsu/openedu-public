// function extractArgTypes(query) {
//   const _temp = query.toString()
//   |> #.slice(#.indexOf('(') + 1, #.indexOf(')'));

//   if (_temp === '') return {};

//   const args = _temp.slice(_temp.indexOf('{') + 1, _temp.indexOf('}')).split(',');
//   const _args = {};
//   for (const arg of args) {
//     let [name, type] = arg.split('=');
//     name = name.replace(/\s/g, '').split(':')[0];
//     type = type.replace(/\s/g, '').slice(1, -1);
//     _args[name] = type;
//   }
//   return _args;
// }

// function _query({ asd = 'Int', qwe: rty = 'String!' }) {
//   return `
//     someQuery
//   `;
// }

// extractArgTypes(_query) |> console.log;

function measperf(target, count = 1000, label) {
  const start = process.hrtime();
  for (let counter = 0; counter < count; counter++) {
    target();
  }
  const time = process.hrtime(start);
  const seconds = time[0];
  const nanonseconds = ('   ' + (time[1] / 1000000) + '000000').split('.') |> [#[0].substring(#[0].length - 3, #.length[0]), #[1].substring(0, 6)].join('.');
  console.log((label || target.name) + ':', seconds + ' s ' + nanonseconds + ' ms ');
}

const length = 1000;
let tmp;

function test1() {
  const arr = [];
  for (let index = 0; index < length; index++) {
    arr.push(index);
    tmp = arr[index];
  }
}

function test2() {
  const arr = [];
  for (let index = 0; index < length; index++) {
    arr[index] = index;
    tmp = arr[index];
  }
}

function test3() {
  const arr = new Array(length);
  for (let index = 0; index < length; index++) {
    arr[index] = index;
    tmp = arr[index];
  }
}

function test4() {
  const map = new Map();
  for (let index = 0; index < length; index++) {
    map.set(index, index);
    tmp = map.get(index);
  }
}

const count = 10000;

measperf(test1, count);
measperf(test2, count);
measperf(test3, count);
measperf(test4, count);