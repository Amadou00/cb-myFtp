const readline = require('readline');
const net = require('net')

const client = new net.Socket()

class User{

    constructor(userName, password){
        this.userName = userName;
        this.password = password;
    }
    getUserName(){
        return this.userName;
    }
    getUserPassword(){
        return this.password;
    }
    setUserName(){
        client.write(`${this.userName} \n\r`);
    }
    //A ne jamais faire dans une bd
    setUserPassword(){
        client.write(`${this.password} \n\r`);
    }
    
    connectServer(port, host){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
        let test = false; 
        let rep = false;
        client.connect(port, host, () => {
            console.log('connected');
            //client.emit("line");
            rl.on('line', (request) =>[
                client.write(`${request} ${this.userName} \n\r`)
            ])

                // rl.question(`Hello ${this.userName}, write your commands\n` , (answer) => {
                //     client.write(`${answer} ${this.userName} \n\r`);
                //     test = true;
                //     rl.close();
                // });
            
        })
    
        client.on('data', (data) => {
            if (data == "User exist in the database"){
                rep = true;
            }
          console.log(data.toString());
        })
    }
}

let user1 = new User("Amadou", "azerty");
user1.connectServer(5000, '127.0.0.1');

//nom et mdp ne peut être vérifier qu'une seule fois, récuperer la commande avec le lancement du fichier