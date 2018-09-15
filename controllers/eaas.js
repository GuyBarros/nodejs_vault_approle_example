
var options = {
    apiVersion: 'v1', // default
    endpoint: 'http://127.0.0.1:8200', // default
    token: 'd21a430' // optional client token; can be fetched after valid initialization of the server
  };


  
  // get new instance of the client
  var vault = require("node-vault")(options);
  
  


  module.exports = {
    get:function (req,res){
        console.log(req.body);
        var test;
        var response = {};
        vault.read('secret/hello').then( (result) => 
        {
        console.log('test', result)
        test = Buffer.from(result.data.value).toString('base64');   
        vault.write('transit/encrypt/my-key', { plaintext:test  })
        .then((reply) => {    
            response.encrypted=reply.data.ciphertext;  
               console.log("ENCRYPT:", reply.data.ciphertext)
               vault.write('transit/decrypt/my-key', { ciphertext: response.encrypted  })
               .then((reply1) =>{
                   response.decrypted= Buffer.from(reply1.data.plaintext, 'base64').toString('ascii');
                    console.log("DECRYPT:", response)
                    res.send(response);
                   })
               
            });   
    })  
       
    

      
    },
    post: function(req,res){
        console.log(req.body, req.user);
    
        res.status(200);
    }
}