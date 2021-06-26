module.exports = function (sequelize,dataTypes){
    // 1) Definir un alias: un nombre al modelo para que sequelize lo pueda identificar internamente al archivo
    let alias = 'Comentario'; 

    // 2) Descibir las configuración de las columnas de la tabla productos. Cada atributo del objeto literal va a ser el nomre de cada columna. Si bien se recomienda, no es necesario que se escriban las columnas en orden. Lo que sí es imporante es que los nombres coincidan con los de la tabal de mysql
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        idProducto: {
            type: dataTypes.INTEGER
        },
        idUsuario: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING
        },
        createdAt:{
            type: dataTypes.DATE 
        },
        updatedAt: {
            type:dataTypes.DATE
        }
    } // ID
    let config = {
        tables: 'comentarios',
        timestamps: false, 
        underscored: false, // No tenemos 
    }

    const Comentario = sequelize.define(alias, cols, config) // Estamos ejecutando un callback: una función dentro de otra función

    Comentario.associate = function (models){
        Comentario.belongsTo(models.Producto,{
            as: 'producto',
            foreignKey: 'idProducto'
        }) // Producto
        Comentario.belongsTo(models.Usuario,{
            as:'usuario',
            foreignKey: 'idUsuario'
        }) // Usuario
    } // Associate
    return Comentario;

} //Module.exports