const net = require('net');
const fs = require('fs');
const readline = require('readline');

function server(){
    let userName = false;
    const server = net.createServer((socket) => {
        console.log('new connection')
        
        socket.on('data', (data) => {
            const [directive, parameter] = data.toString().split(' ')
            const regex = new RegExp(`${parameter}`);
            const input = fs.createReadStream("./connection.json");
            const rl = readline.createInterface({ input });
            
            switch(directive) {
                case 'USER':
                    // check if user exist in database
                    // if true
                    rl.on('line', (line) => {
                        if (line.match(regex) != null){
                            userName = true;
                            console.log(line.match(regex));            
                        }
                    });
                    break;
                }
                rl.on('close', function () {
                    console.log(userName)
                if (userName === true){
                    socket.write('User exist in the database');
                }
            });
            socket.write('Hello from server')
        })
    })
    
    server.listen(5000, () => {
        console.log('Server started at port 5000')
    })

    //console.log(gobal.name);
}

server();