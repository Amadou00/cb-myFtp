const net = require('net')

const server = net.createServer((socket) => {
  console.log('new connection')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ')

    switch(directive) {
        case 'USER':
            // check if user exist in database
            // if true
            socket.write('200 successfuly connected')
            break;
    }
  })

  socket.write('Hello from server')
})

server.listen(5000, () => {
  console.log('Server started at port 5000')
})