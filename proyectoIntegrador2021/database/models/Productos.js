module.exports = function (sequelize,dataTypes){
    // 1) Definir un alias: un nombre al modelo para que sequelize lo pueda identificar internamente al archivo
    let alias = 'Productos'; 

    // 2) Descibir las configuración de las columnas de la tabla movies. Cada atributo del objeto literal va a ser el nomre de cada columna. Si bien se recomienda, no es necesario que se escriban las columnas en orden. Lo que sí es imporante es que los nombres coincidan con los de la tabal de mysql
    let cols = {
        id : {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            
        },    
        idUsuario: {
            type: dataTypes.STRING
        },
        nombre: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        } ,
        fechaPublicacion:{
            type: dataTypes.DATE // Es un timestamp, ¿Es  "DATE" igual?
        } ,
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
        tables: 'movies',
        timestamps: true, //Si no tiene timestampes lo ponemos en false y viceversa. Esto suele pasar si la tabla no tiene los campos created_at y updated_at
        underscored: true, // Le estamos aclarando que tenemos nombres de columnas con guiones bajos en lugar de camelcase 
    }

    const Movie = sequelize.define(alias, cols, config) // Estamos ejecutando un callback: una función dentro de otra función
    return Movie;

} //Module.exports