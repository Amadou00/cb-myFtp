
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
        client.write(`USER ${this.userName} \n\r`);
    }
    //A ne jamais faire dans une bd
    setUserPassword(){
        client.write(`${this.password} \n\r`);
    }
    
    connectServer(){
        client.connect(5000, '127.0.0.1', () => {
          console.log('connected');
          this.setUserName();
        })
        
        client.on('data', (data) => {
          console.log(data.toString())
        })
    }
}

let user1 = new User("Amadou", "azerty");
user1.connectServer();