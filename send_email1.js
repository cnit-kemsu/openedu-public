const { createConnection } = require('net');
const { connect } = require('tls');
const dns = require('dns');
const CRLF = '\r\n';

const resolveMx = dns.promises.resolveMx;

function sortByPriorities(a, b) {
  return a.priority > b.priority;
}

function _createConnection(port, domain) {

  return new Promise(
    (resolve, reject) => {

      const socket = createConnection(port, domain);

      socket.on('error', error => {
        //console.error('error while trying to connect:', domain, error);
        reject(error);
      });
    
      socket.on('connect', () => {
        //console.log('connected:', domain);
        socket.removeAllListeners('error');
        resolve(socket);
      });

    }
  );
}

async function connectMx(port, domain) {

  try {

    const data = await resolveMx(domain);

    data.sort(sortByPriorities);
    console.log('mx resolved:', data);

    if (data == null || data.length === 0) {
      throw new Error(`can not resolve mx of <${domain}>`);
    }
    
    for (const _data of data) {
      try {
        const socket = await _createConnection(port, _data.exchange);
        console.log('connected to:', _data.exchange);
        return socket;
      } catch (error) {
        console.error('can not connect:', _data.exchange, error);
      }
    }

  } catch (error) {
    throw(error);
  }

}

function getHost(email) {
  const m = /[^@]+@([\w\d\-.]+)/.exec(email);
  return m && m[1];
}

// async function sendToSMTP(port, domain, from, to, body) {

//   const socket = await connectMx(port, domain);
//   if (!socket) throw new Error('error on connectMx');

//   const write = value => {
//     console.log(`send <${domain}> ${value}`);
//     socket.write(value + CRLF);
//   };

//   socket.setEncoding('utf8');

//   let data = '';
//   let step = 0;
//   let loginStep = 0;
//   const queue = [];
//   const login = [];
//   let parts;
//   let cmd;
//   let upgraded = false;

//   let msg = '';
//   function onLine (line) {
//     console.log(`recv <${domain}> ${line}`);

//     msg += (line + CRLF);

//     if (line[3] === ' ') {
//         // 250-information dash is not complete.
//         // 250 OK. space is complete.
//       let lineNumber = parseInt(line.substr(0, 3));
//       response(lineNumber, msg);
//       msg = '';
//     }
//   }

//   socket.on('data', function (chunk) {
//     data += chunk;
//     parts = data.split(CRLF);
//     const parts_length = parts.length - 1;
//     for (let i = 0, len = parts_length; i < len; i++) {
//       onLine(parts[i]);
//     }
//     data = parts[parts.length - 1];
//   });

//   sock.on('error', function (err) {
//     logger.error('fail to connect ' + domain);
//     callback(err);
//   });

//   connectMx(domain, function (err, sock) {


//     queue.push(`MAIL FROM:<${from}>`);
//     queue.push(`RCPT TO:<${to}>`);
//     queue.push('DATA');
//     queue.push('QUIT');
//     queue.push('');

//     function response (code, msg) {
//       switch (code) {
//         case 220:
//           //*   220   on server ready
//           //*   220   服务就绪
//           if(upgraded === "in-progress"){
//             sock.removeAllListeners('data');

//             let original = sock;
//             original.pause();

//             let opts = {
//               socket: sock,
//               host: sock._host,
//               rejectUnauthorized,
//             };

//             sock = connect(
//                 opts,
//                 () => {
//                   sock.on('data', function (chunk) {
//                     data += chunk;
//                     parts = data.split(CRLF);
//                     const parts_length = parts.length - 1;
//                     for (let i = 0, len = parts_length; i < len; i++) {
//                       onLine(parts[i])
//                     }
//                     data = parts[parts.length - 1]
//                   });
    
//                   sock.removeAllListeners('close');
//                   sock.removeAllListeners('end');

//                   return;
//                 }
//             );

//             sock.on('error', function (err) {
//               logger.error('Error on connectMx for: ', err);
//             });

//             original.resume();
//             upgraded = true;
//             w("EHLO " + srcHost);
//             break;
//           } else
//           {
//             if (/\besmtp\b/i.test(msg) || autoEHLO) {
//               // TODO:  determin AUTH type; auth login, auth crm-md5, auth plain
//               cmd = 'EHLO';
//             } else {
//               upgraded = true;
//               cmd = 'HELO';
//             }
//             w(cmd + ' ' + srcHost);
//             break;
//           } 

//         case 221: // bye
//           sock.end();
//           callback(null, msg);
//           break;
//         case 235: // verify ok
//         case 250: // operation OK
//           if(upgraded != true){
//             if(/\bSTARTTLS\b/i.test(msg)){
//               w('STARTTLS');
//               upgraded = "in-progress";
//             } else {
//               upgraded = true;
//             }
            
//             break;
//           }

//         case 251: // foward
//           if (step === queue.length - 1) {
//             logger.info('OK:', code, msg);
//             callback(null, msg);
//           }
//           w(queue[step]);
//           step++;
//           break;

//         case 354: // start input end with . (dot)
//           logger.info('sending mail', body);
//           w(body);
//           w('');
//           w('.');
//           break;

//         case 334: // input login
//           w(login[loginStep]);
//           loginStep++;
//           break;

//         default:
//           if (code >= 400) {
//             logger.warn('SMTP responds error code', code);
//             callback(new Error('SMTP code:' + code + ' msg:' + msg));
//             sock.end();
//           }
//       }
//     }

//   })
// }

async function test() {
  const from = 'johncooper87@mail.ru';
  console.log(getHost(from));

  const socket = await connectMx(25, 'gmail.com');



  process.exit();
}

test();