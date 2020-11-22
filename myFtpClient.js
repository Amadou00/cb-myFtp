const readline = require('readline');
const net = require('net')

const client = new net.Socket()

class User{

    constructor(){}
    
    connectServer(port = 5000, host = "127.0.0.1"){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        client.connect(port, host, () => {
            console.log('connected\n\
            You can write the commands in lower\
            ');
            
            rl.on('line', (request) =>[
                client.write(`${request} \n\r`)
            ])
            
        })
    
        client.on('data', (data) => {
          console.log(data.toString());
        })

        client.on('close', (close) =>{
            process.exit(0);
        })
    }
}

let user1 = new User();
let port = process.argv[2];
let host = process.argv[3];
user1.connectServer(port, host);
