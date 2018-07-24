
var options = {
    apiVersion: 'v1', // default
    endpoint: 'http://127.0.0.1:8080', // default
    token: 'd21a430e-39dd-0eca-b369-19236e56cb64'  // optional client token; can be fetched after valid initialization of the server
   // token: 'b5a93c2b-78dc-2bdc-8bbb-33ebd5dba56f'   // optional client token; can be fetched after valid initialization of the server
};
  
  // get new instance of the client
  var vault = require("node-vault")(options);
  const mountPoint = 'approle';
const roleName = 'my-role';
  
  
  vault.auths()
  //.then(() => vault.addApproleRole({ role_name: roleName, policies: 'secret_getter' }))
  .then(() => Promise.all([vault.getApproleRoleId({ role_name: roleName }),
    vault.getApproleRoleSecret({ role_name: roleName })])
  )
  .then((result) => {
    const roleId = result[0].data.role_id;
    const secretId = result[1].data.secret_id;
    console.log("role: ", roleId , secretId)
    return vault.approleLogin({ role_id: roleId, secret_id: secretId });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err.message));



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
