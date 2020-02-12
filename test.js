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

// function measperf(target, count = 1000, label) {
//   const start = process.hrtime();
//   for (let counter = 0; counter < count; counter++) {
//     target();
//   }
//   const time = process.hrtime(start);
//   const seconds = time[0];
//   const nanonseconds = ('   ' + (time[1] / 1000000) + '000000').split('.') |> [#[0].substring(#[0].length - 3, #.length[0]), #[1].substring(0, 6)].join('.');
//   console.log((label || target.name) + ':', seconds + ' s ' + nanonseconds + ' ms ');
// }

// const length = 1000;
// let tmp;

// function test1() {
//   const arr = [];
//   for (let index = 0; index < length; index++) {
//     arr.push(index);
//     tmp = arr[index];
//   }
// }

// function test2() {
//   const arr = [];
//   for (let index = 0; index < length; index++) {
//     arr[index] = index;
//     tmp = arr[index];
//   }
// }

// function test3() {
//   const arr = new Array(length);
//   for (let index = 0; index < length; index++) {
//     arr[index] = index;
//     tmp = arr[index];
//   }
// }

// function test4() {
//   const map = new Map();
//   for (let index = 0; index < length; index++) {
//     map.set(index, index);
//     tmp = map.get(index);
//   }
// }

// const count = 10000;

// measperf(test1, count);
// measperf(test2, count);
// measperf(test3, count);
// measperf(test4, count);

// const net = require('net');

// const socket = net.createConnection(25, 'smtp.gmail.com', async () => {
//   console.log('Connected!');

//   await socket.write('HELO 82.179.1.141\r\n');

//   await socket.write('MAIL FROM: <johnxcooper87@gmail.com>\r\n');

//   await socket.write('RCPT TO: <johnxcooper87@gmail.com>\r\n');

//   await socket.write('DATA\r\n');

//   await socket.write('FROM: <johnxcooper87@gmail.com>\r\n');
//   await socket.write('TO: <johnxcooper87@gmail.com>\r\n');
//   await socket.write('SUBJECT: Testing\r\n');
//   await socket.write('This is cool!\r\n');
//   await socket.write('.\r\n');

//   await socket.write('QUIT\r\n');
// });

// socket.on('data', buff => console.log(buff.toString()));

const net = require('net');
const tls = require('tls');
const fs = require('fs');

//tls.DEFAULT_MAX_VERSION = 'SSLv3';
//tls.DEFAULT_MIN_VERSION = 'TLSv1.2';

const options = {
  //key: fs.readFileSync('private.key'),
  //cert: fs.readFileSync('ssl_certificate.crt'),
  rejectUnauthorized: false,
  //checkServerIdentity: () => { return null; },
};

// const socket = net.createConnection(25, 'alt1.gmail-smtp-in.l.google.com', () => {
//   console.log('Connected!');

//   //socket.write('HELO 82.179.1.141\r\n');
//   socket.write('EHLO bondarev.kemsu.ru\r\n');

// });

const socket = tls.connect(25, 'alt1.gmail-smtp-in.l.google.com', options, async () => {
  console.log('Connected!');

  if (socket.authorized) {
      console.log("Connection authorized by a Certificate Authority.");
  } else {
      console.log("Connection not authorized: " + socket.authorizationError);
  }

  socket.write('EHLO bondarev.kemsu.ru\r\n');

});

let i = 0;
const ops = [
  'MAIL FROM: <no-reply@kemsu.ru>\r\n',
  'RCPT TO: <johnxcooper87@gmail.com>\r\n',
  'DATA\r\n',
  `FROM: noreply <no-reply@kemsu.ru>
  TO: johncooper87 <johnxcooper87@gmail.com>
  SUBJECT: Testing\r\n\r\n
  This is cool!\r\n.\r\n`,
  'QUIT\r\n'
];

socket.on('data', buff => {
  const res = buff.toString();
  console.log(res);

  if (res.includes('250')) {

    // const opts = {
    //   socket: socket,
    //   host: socket._host,
    //   ...options
    // };
  
    // const socket1 = tls.connect(587, 'smtp.gmail.com', options, () => {
    //   console.log('111');
    //   socket1.on('data', buff1 => {
    //     const res1 = buff1.toString();
    //     console.log(res1);
      
    //     if (!res1.includes('220')) {
    //       if (i >= ops.length) return;
    //       console.log(i);
    //       console.log(ops[i]);
    //       socket.write(ops[i]);
    //       i++;
    //     }
      
    //   });
    // });
  }
  if (!res.includes('220')) {
    if (i >= ops.length) return;
    console.log(i);
    console.log(ops[i]);
    socket.write(ops[i]);
    i++;
  }

});



// const tls = require('tls');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('private.key'),
//   cert: fs.readFileSync('ssl_certificate.crt'),
//   rejectUnauthorized: false
// };

// const socket = tls.connect(465, 'smtp.mail.ru', options, async () => {
//   console.log('Connected!');

//   // Check if the authorization worked
//     if (socket.authorized) {
//       console.log("Connection authorized by a Certificate Authority.");
//   } else {
//       console.log("Connection not authorized: " + socket.authorizationError);
//   }

//   // // Send a friendly message
//   // socket.write("I am the client sending you a message.");

//   let res = await socket.write('HELO 82.179.1.141\r\n');
//   console.log(res);
//   res = await socket.write('MAIL FROM: <no-reply@kemsu.ru>\r\n');
//   console.log(res);
//   res = await socket.write('RCPT TO:<johncooper87@mail.ru>\r\n');
//   console.log(res);
//   // await socket.write('DATA\r\n');

//   // // await socket.write('FROM: <johncooper87@mail.ru>\r\n');
//   // // await socket.write('TO: <johncooper87@mail.ru>\r\n');
//   // // await socket.write('SUBJECT: Testing\r\n');
//   // // await socket.write('This is cool!\r\n');
//   // // await socket.write('.\r\n');

//   // await socket.write('QUIT\r\n');
// });

// socket.on('data', async buff => {
//   const str = buff.toString();
//   console.log(str);

//   if (!str.includes('250 Accepted')) return;

//   await socket.write('DATA\r\n');

//   // await socket.write('FROM: <johncooper87@mail.ru>\r\n');
//   // await socket.write('TO: <johncooper87@mail.ru>\r\n');
//   // await socket.write('SUBJECT: Testing\r\n');
//   // await socket.write('This is cool!\r\n');
//   // await socket.write('.\r\n');

//   await socket.write('QUIT\r\n');
// });

// const tls = require('tls');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('private.key'),
//   cert: fs.readFileSync('ssl_certificate.crt'),
//   //rejectUnauthorized: false
// };

// const socket = tls.connect(465, 'smtp.gmail.com', options, async () => {
//   console.log('Connected!');

//   // Check if the authorization worked
//     if (socket.authorized) {
//       console.log("Connection authorized by a Certificate Authority.");
//   } else {
//       console.log("Connection not authorized: " + socket.authorizationError);
//   }

//   // // Send a friendly message
//   // socket.write("I am the client sending you a message.");

//   await socket.write('HELO 82.179.1.141\r\n');

//   await socket.write('MAIL FROM: <johnxcooper87@gmail.com>\r\n');

//   await socket.write('RCPT TO: <johnxcooper87@gmail.com>\r\n');

//   await socket.write('DATA\r\n');

//   await socket.write('FROM: <johnxcooper87@gmail.com>\r\n');
//   await socket.write('TO: <johnxcooper87@gmail.com>\r\n');
//   await socket.write('SUBJECT: Testing\r\n');
//   await socket.write('This is cool!\r\n');
//   await socket.write('.\r\n');

//   await socket.write('QUIT\r\n');
// });

// socket.on('data', buff => console.log(buff.toString()));