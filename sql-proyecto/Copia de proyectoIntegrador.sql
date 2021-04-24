CREATE SCHEMA proyectoIntegrador; 
USE proyectoIntegrador;

-- Creamos tabla de usuarios
CREATE TABLE usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    apellido VARCHAR(200) NOT NULL, 
    mail VARCHAR(200) NOT NULL, 
    contrasenia VARCHAR (100) NOT NULL,
    celular INT UNSIGNED,
    nacimiento DATE NOT NULL, 
    dni INT UNSIGNED, 
    productos INT UNSIGNED NOT NULL,
    seguidores INT UNSIGNED NOT NULL, 
    comentarios INT UNSIGNED NOT NULL
);


-- Insertamos valores a la tabla de usuarios
INSERT INTO usuarios 
VALUES 
(DEFAULT, "Martin", "Moragues Hansen", "moragueshanse@gmail.com","Boquita", 1143568675, "2000-02-14",43657837,6,20,30),
(DEFAULT, "Nicolas", "Vivone", "nicovivone@gmail.com","vamosboca!", 1156647234, "1995-10-10",36748956,13,40,10),
(DEFAULT, "Agustín", "Levy", "aguslevy@hotmail.com", "elmasfacha423",1164738899,"2005-12-10", 46879090,2,5,7),
(DEFAULT, "Matías", "Gutierrez", "matielfacha@gmail.com", "quefachaquesoy765",1154435566,"2001-07-11", 42004987,6,8,7), 
(DEFAULT, "Milena", "Rivadavia", "milerivadavia@gmail.com", "bocamivida324", 1154637788, "2003-05-07", 46758938, 2,4,0);

SELECT * FROM usuarios;

-- Creamos tabla de productos
CREATE TABLE productos(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT UNSIGNED,
	nombre VARCHAR(200) NOT NULL,
	imagen VARCHAR(500) NOT NULL,
	fechaPublicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	marca VARCHAR(200) NOT NULL, 
	ml INT UNSIGNED NOT NULL,
	anio INT UNSIGNED, 
	descripcion VARCHAR(1000),

	FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

ALTER TABLE products
DROP  sexo; 
SELECT * FROM productos;

-- Insertamos valores a la tabla de productos
INSERT INTO  productos 
VALUES
(DEFAULT, 2, "212 VIP Men", "/images/products/img-212vipmen.jpg", "2016-11-07", "Carolina Herrera", "40", 2014, "Creada para una nueva generación que reinventa la ciudad, 212 VIP Men, de Carolina Herrera, penetra en nuestra nariz dejando una fragancia moderna imposible de olvidar. No tienen necesidad de romper las reglas, simplemente crean unas nuevas y el resto las sigue."),
(DEFAULT, 1, "One Million", "/images/products/img-onemillion.jpg", "2019-05-09", "Paco Rabanne", 60, 2017, "1 MILLION, de Paco Rabanne. La esencia del éxito. Ir por el oro que es adrenalina. Caballero Insolente. Elegante e impretinente en igual medida. Comienza con notas frescas y culmina sobre un acorde de cuero picante."),
(DEFAULT, 2, "Good Girl", "/images/products/img-goodgirl.jpg", "2018-10-12", "Carolina Herrera", 60, 2017, "Good Girl Eau de Parfum Supreme rompe todas las reglas de los perfumes y reinventa su familia olfativa. La dulzura de las jugosas bayas da paso a la afrodisíaca personalidad del intenso jazmín de Egipto, mientras las cremosas habas tonka y el vibrante vetiver le dan un toque moderno a la fórmula final."),
(DEFAULT, 3, "Invictus", "/images/products/img-invictus.jpg", "2020-03-10", "Paco Rabanne", 80, 2017, "Invictus, Eau de Toilette, la invencible fragancia masculina de Paco Rabanne.Un perfume que contiene sensualidad y frescura a partes iguales. Extremadamente adictivo, la fragancia de los campeones."),
(DEFAULT, 3, "Eros", "/images/products/img-eros.jpg", "2021-02-11", "Versace", 40, 2014, "Es una fragancia de la familia olfativa Aromática Fougère para Hombres. Esta fragrancia es nueva. Eros se lanzó en 2012. La Nariz detrás de esta fragrancia es Aurelien Guichard. Las Notas de Salida son menta, manzana verde y limón (lima ácida); las Notas de Corazón son haba tonka, geranio y ambroxan; las Notas de Fondo son vainilla de Madagascar, vetiver, musgo de roble, cedro de Virginia y cedro del Atlas."),
(DEFAULT, 5, "Be", "/images/products/img-be.jpg", "2020-07-05", "Calvin Klein", 40, 2014, "El envoltorio consiste en almizcle blanco transparente con un toque especiado de enebro y notas tónicas de menta y de mandarina. Una pizca de lavanda le imprime un carácter mixto y sostiene las flores de magnolia. El fondo es de almizcle y madera, con una suave y afrutada calidez de piel que caracterizan la fragancia."), 
(DEFAULT, 4, "Lady Million", "/images/products/img-ladymillon.jpg", "2019-11-10","Paco Rabanne", 40, 2014, "Lady Million, de Paco Rabanne, representa a la femme-fatale que lleva un aroma para seducir. Deseando la vida y viviendo para la persecución. Flores blancas (sexys) que despiertan sobre la piel con notas frescas, se derraman sobre pachuli."),
(DEFAULT, 4, "Scandal", "/images/products/img-scandal.jpg", "2020-06-12", "J. P. Gaultier", 40 , 2014, "Scandal representa un nuevo estilo de fragancia femenina, donde su aura elegante es manchada por el espíritu de Pigalle amado por Jean Paul Gaultier. Hasta la señora ministra se siente tentada por este aroma a escandalo. Es mas que un golpe de aire fresco, es un golpe de libertad. De noche, todos (en Jean Paul Gaultier) tienen permitido ser los dueños de las fiestas, crear escenas y hacer escandalos. "),
(DEFAULT, 5, "Bad Boy", "/images/products/img-badboy.jpg", "2021-03-03", "Carolina Herrera", 50, 2021, "Carolina Herrera presenta un nuevo perfume masculino, innovador y explosivo: Bad Boy. Una fascinante fragancia que actualiza el mito del eterno rebelde, aquel que se atreve a romper las normas y a trazar su propio camino. BAD BOY es una oda a los hombres que luchan por sus principios y son fieles a su propia identidad. BAD BOY es una fragancia Oriental Aromática en la que los opuestos se atraen: la luminosidad de la Salvia, la Bergamota Verde y la Pimienta, se entrelaza con la oscuridad sensual del Haba Tonka, el Cacao y la Madera de Ámbar. BAD BOY expresa, de manera consciente, las luces y las sombras de la naturaleza del hombre actual."),
(DEFAULT, 1, "Blue Label", "/images/products/img-bluelabel.jpg", "2021-01-10", "Givenchy", 100, 2004, "Creado en 2004, Blue Label ofrece un toque fresco de sensualidad moderna para el hombre Givenchy Pour Homme. Una esencia vigorizante, fresca y amaderada que recuerda al perfume original, pero realzada con notas frescas de pomelo. Blue Label es la fragancia ideal para el hombre que acepta la libertad, la elegancia y la sofisticación con un toque de rebeldía.");

SELECT * FROM productos;

CREATE TABLE comentarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idProducto INT UNSIGNED, 
    idUsuario INT UNSIGNED,
    descripcion VARCHAR(400), 
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
     
    FOREIGN KEY (idProducto) REFERENCES productos(id), 
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

SELECT * FROM comentarios;

INSERT INTO comentarios 
VALUES
(DEFAULT, 1, 1, "Muy bueno, toda la facha", "2021-09-09"),
(DEFAULT, 1, 3, "La verdad, un desastre", "2021-11-03"), 
(DEFAULT, 1, 4, "Muy buen producto. Ya lo conocía y por eso no me sorprende su calidad. Lo he usado hace un tiempo y mantiene sus características originales.", "2020-05-07"), 
(DEFAULT, 1, 5, "Muy buen producto. Ya lo conocía y por eso no me sorprende su calidad. Lo he usado hace un tiempo y mantiene sus características originales.", "2018-03-05"),
(DEFAULT, 2, 3, "Lo super recomiendo, excelente producto", "2018-12-06"),
(DEFAULT, 2, 4, "Me esperaba algo mejor..", "2017-03-05"), 
(DEFAULT, 2, 1, "No tengo mucho para decir, es un perfume", "2016-03-16"), 
(DEFAULT, 2, 3, "Lo mejor que use en años", "2014-05-03"), 

