const net = require('net');
const fs = require('fs');
const readline = require('readline');


class server{
    constructor(){
    }
    /*setNameUser(name){
        this.name = name;
    }
    getNameDirective(){
        return this.name;
    }*/
    trouveUnNom(){
        let i = 0;
        let name = "a";
        const server = net.createServer((socket) => {
        console.log('new connection')
        
        socket.on('data', (data) => {
            const [directive, parameter] = data.toString().split(' ')
            const input = fs.createReadStream("./connection.json");
            const rl = readline.createInterface({ input });
            const regex = new RegExp(`${parameter}`);
            
            // switch(directive) {
            //     case 'USER':
            //         // check if user exist in database
            //         // if true
            //         rl.on('line', (line) => {
            //             if (line.match(regex) != null){
            //                 this.setNameUser(line.match(regex));
            //                 console.log(i);
            //             }
            //             i++;
            //         });
            //         this.setNameUser(name)
            //         socket.write('200 successfuly connected')
            //         break;
            //     }
            if (directive == "USER"){
                //essayer le export
                rl.on('line', (line) => {
                        if (line.match(regex) != null){
                            name = line.match(regex);
                            //console.log(name);
                        }
                        
                        i++;
                }); 
                const listener = rl.rawListeners('line');
                console.log(listener[0]);
            }
                //set
        })
            
            socket.write('Hello from server')
    })
        
        server.listen(5000, () => {
          console.log('Server started at port 5000')
        })
    }
}

let server1 = new server();
server1.trouveUnNom();