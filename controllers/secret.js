
var options = {
    apiVersion: 'v1', // default
    endpoint: 'http://127.0.0.1:8080', // default
    token: 'd21a430' // optional client token; can be fetched after valid initialization of the server
  };
  
  // get new instance of the client
  var vault = require("node-vault")(options);
  
  
  /**
  vault.read('secret/hello').then( (result) => console.log('test', result))
  .catch(console.error);
   */

module.exports = {
    get:function (req,res){
        console.log(req.body);
        
        vault.read('secret/hello').then( (result) => 
        {
        console.log('test', result)
        res.send(result.data.value)
        }
    )  
      
    },
    post: function(req,res){
        console.log(req.body, req.user);
    
        res.status(200);
    }
}
