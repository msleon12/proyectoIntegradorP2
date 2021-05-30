module.exports = function (sequelize,dataTypes){
    // 1) Definir un alias: un nombre al modelo para que sequelize lo pueda identificar internamente al archivo
    let alias = 'Usuario'; 

    // 2) Descibir las configuración de las columnas de la tabla productos. Cada atributo del objeto literal va a ser el nomre de cada columna. Si bien se recomienda, no es necesario que se escriban las columnas en orden. Lo que sí es imporante es que los nombres coincidan con los de la tabal de mysql
    let cols = {
        id: {
            autoincrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        mail: {
            type: dataTypes.STRING
        },
        contrasenia: {
            type: dataTypes.STRING
        },
        celular: {
            type: dataTypes.INTEGER
        },
        nacimiento:{
            type: dataTypes.DATE
        },
        dni: {
            type: dataTypes.INTEGER
        },     
        productos: {
            type: dataTypes.INTEGER
        } ,
        seguidores: {
            type: dataTypes.INTEGER
        },
        comentarios: {
            type: dataTypes.INTEGER
        },
        imagen: {
            type:dataTypes.STRING
        }, 
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    } // ID
    let config = {
        tables: 'usuarios',
        timestamps: false,
        underscored: false, 
    }

    const Usuario = sequelize.define(alias, cols, config) // Estamos ejecutando un callback: una función dentro de otra función
    return Usuario;

} //Module.exports