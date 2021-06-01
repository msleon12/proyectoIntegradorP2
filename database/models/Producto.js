
module.exports = function (sequelize,dataTypes){
    // 1) Definir un alias: un nombre al modelo para que sequelize lo pueda identificar internamente al archivo
    let alias = 'Producto'; 

    // 2) Descibir las configuración de las columnas de la tabla productos. Cada atributo del objeto literal va a ser el nomre de cada columna. Si bien se recomienda, no es necesario que se escriban las columnas en orden. Lo que sí es imporante es que los nombres coincidan con los de la tabal de mysql
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            
        },
        idUsuario: {
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        } ,
        fechaPublicacion:{
            type: dataTypes.DATE 
        } ,
        updatedAt: {
            type: dataTypes.DATE
        },
        marca: {
            type: dataTypes.STRING
        },
        ml: {
            type: dataTypes.INTEGER
        } ,
        anio: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING
        }
    } // ID
    let config = {
        tables: 'productos',
        timestamps: false, //Usamos timestampes, pero no las columnas createdAt y updatedAt. Entonces lo ponemos en false
        underscored: false, // No tenemos 
    }

    const Producto = sequelize.define(alias, cols, config) // Estamos ejecutando un callback: una función dentro de otra función

    Producto.associate = function(models){
        Producto.belongsTo(models.Usuario,{
            as: 'usuario',
            foreignKey: 'idUsuario'
        }) //Usuario
        Producto.hasMany(models.Comentario,{
           as: 'comentarios',
           foreignKey: 'idProducto' 
        }) // Comentario
    } //Associate

    return Producto;

} //Module.exports