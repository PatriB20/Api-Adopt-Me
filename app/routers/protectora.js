const express = require('express');
const routes = express.Router();
const mysqlConnection  = require('../../config/sql');

routes.get('/protectora',(req, res)=>{
    let sql;
    if (req.query.id == null)
        sql = "SELECT * FROM protectora";
    else
        sql = "SELECT * FROM protectora WHERE id_Protectora=" + req.query.id;

    mysqlConnection.query(sql, function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            res.send(result);
        }
    })
});

routes.put('/protectora',(req, res)=>{
    console.log(req.body);
    let params = [ 
                    req.body.nombre, 
                    req.body.direccion, 
                    req.body.localidad,
                    req.body.telefono,
                    req.body.imagen,
                    req.body.descripcion,
                    req.body.id_Protectora]

    let sql = "UPDATE protectora SET nombre = COALESCE(?, nombre) , " + 
                "direccion = COALESCE(?, direccion) , " + 
                "localidad = COALESCE(?, localidad) , " + 
                "telefono = COALESCE(?, telefono) , " + 
                "imagen = COALESCE(?, imagen) , " + 
                "descripcion = COALESCE(?, descripcion)  WHERE id_Protectora = ?";
    console.log(sql); 
    mysqlConnection.query(sql, params,function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            res.send(result);
        }
    })
})

// routes.delete('/protectora',(req, res)=>{
//      console.log(req.body);
//     let sql = "DELETE FROM protectora WHERE id_Protectora = '" + req.body.id_Protectora + "'";
//     console.log(sql); 
//     mysqlConnection.query(sql, function (err, result) 
//     {
//         if (err) 
//             console.log(err);
//         else 
//         {
//             res.send(result);
//         }
//     })
// })
module.exports = routes;