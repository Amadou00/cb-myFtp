const net = require('net');
const fs = require('fs');
const readline = require('readline');

function server(port = 5000){
    let userNameExist = false;
    let correctPass = false;
    let reCode = 0;
    let i = 0;
    let indexPassWord;
    const server = net.createServer((socket) => {
        console.log('new connection');
        
        socket.on('data', (data) => {
            let [directive, parameter] = data.toString().split(' ');
            directive = directive.toUpperCase();
            const input = fs.createReadStream("./connection.json");
            const rl = readline.createInterface({ input });
            const list = fs.readdirSync(__dirname);
            
            switch(directive) {
                case 'USER':
                    rl.on('line', (line) => {            
                        // vérifie la ligne dans laquelle la condition est remplie
                        if (line.match(parameter) != null){
                            userNameExist = true;
                            // Si la valeur est trouvé on initialise la position d'un potentiel mdp
                            indexPassWord = i+1;
                            socket.write('\x1b[32m Username exist in the database\x1b[37m');
                        }
                        i++;
                    });
                    break;

                case 'PASS':
                    if (userNameExist){
                        i = 0;
                        rl.on('line', (line) => {
                            if (line.match(parameter) != null && i == indexPassWord){
                                correctPass = true;
                                reCode = "230";
                                socket.write('\x1b[32m Correct password \x1b[37m')
                            }
                            i++;
                        })
                    }
                    break;

                case 'HELP':
                    socket.write("\x1b[32m"+"\
                        USER <username>: check if the user existPASS <password>: authenticate the user with a password\n\
                        LIST: list the current directory of the server\n\
                        CWD <directory>: change the current directory of the server\n\
                        RETR <filename>: transfer a copy of the file FILE from the server to the client\n\
                        STOR <filename>: transfer a copy of the file FILE from the client to the server\n\
                        PWD: display the name of the current directory of the server\n\
                        HELP: send helpful information to the client\n\
                        QUIT: close the connection and stop the program"+"\x1b[37m"
                    );
                    break;

                case 'QUIT':
                    reCode = "221";
                    socket.write("\x1b[31m\nGood bye\x1b[37m");
                    socket.emit("end");
                    console.log("The client leave us")
                    break;

                case 'PWD':
                    if(correctPass){
                        socket.write(`\x1b[32m ${__dirname} \x1b[37m`);
                    }
                    else{
                        socket.write("\x1b[32m please you need to connect first \x1b[37m");
                    }
                    break;
                
                case 'LIST':
                    if (correctPass){
                        let files = "\n";
                        list.forEach(file => {
                            files += `${file}\n`;
                        });
                        socket.write(`\x1b[32m ${files} \x1b[37m`);
                    }
                    else{
                        socket.write("\x1b[32m please you need to connect first \x1b[37m");
                    }
                    break;
                
                // Partie à traiter    
                case 'CWD':
                    if (correctPass){
                        socket.write("\x1b[32m It's not available \x1b[37m");
                    }
                    else{
                        socket.write("\x1b[32m please you need to connect first \x1b[37m");
                    }
                    break;

                case 'RETR':
                    if (correctPass){
                        socket.write("\x1b[32m It's not available \x1b[37m");
                    }
                    else{
                        socket.write("\x1b[32m please you need to connect first \x1b[37m");
                    }
                    break;

                case 'STOR':
                    if (correctPass){
                        socket.write("\x1b[32m It's not available \x1b[37m");
                    }
                    else{
                        socket.write("\x1b[32m please you need to connect first \x1b[37m");
                    }
                    break;    
            }
        })
    })
    
    server.listen(port, () => {
        console.log(`Server started at port ${port}`)
    })

}
let port = process.argv[2];
server(port);