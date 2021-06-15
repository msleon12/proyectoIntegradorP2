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
    productos INT UNSIGNED,
    seguidores INT UNSIGNED, 
    comentarios INT UNSIGNED,
    imagen VARCHAR(500)
);

ALTER TABLE usuarios 
ADD createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE usuarios
CHANGE mail email VARCHAR(200) NOT NULL;

ALTER TABLE usuarios 
ADD updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Insertamos valores a la tabla de usuarios
INSERT INTO usuarios 
VALUES 
(DEFAULT, "Martin", "Moragues Hansen", "moragueshanse@gmail.com","Boquita", 1143568675, "2000-02-14",43657837,6,20,30,"img-perfil1.png", DEFAULT, DEFAULT),
(DEFAULT, "Nicolas", "Vivone", "nicovivone@gmail.com","vamosboca!", 1156647234, "1995-10-10",36748956,13,40,10,"img-perfil2.png", DEFAULT, DEFAULT),
(DEFAULT, "Agustín", "Levy", "aguslevy@hotmail.com", "elmasfacha423",1164738899,"2005-12-10", 46879090,2,5,7, "img-perfil3.png", DEFAULT, DEFAULT),
(DEFAULT, "Matías", "Gutierrez", "matielfacha@gmail.com", "quefachaquesoy765",1154435566,"2001-07-11", 42004987,6,8,7, "img-perfil4.png", DEFAULT, DEFAULT), 
(DEFAULT, "Milena", "Rivadavia", "milerivadavia@gmail.com", "bocamivida324", 1154637788, "2003-05-07", 46758938, 2,4,0, "img-perfil5.png", DEFAULT, DEFAULT);

ALTER TABLE usuarios
DROP productos;

ALTER TABLE usuarios
DROP comentarios;  

ALTER TABLE usuarios
DROP seguidores;

SELECT * FROM usuarios;

-- Creamos tabla de productos
CREATE TABLE productos(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT UNSIGNED,
	nombre VARCHAR(200) NOT NULL,
	imagen VARCHAR(500),
	fechaPublicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	marca VARCHAR(200) NOT NULL, 
	ml INT UNSIGNED NOT NULL,
	anio INT UNSIGNED, 
	descripcion VARCHAR(1000),
    
	FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);
 ALTER TABLE productos
 ADD updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; 
	
-- Insertamos valores a la tabla de productos
INSERT INTO  productos 
VALUES
(DEFAULT, 2, "212 VIP Men", "img-212vipmen.jpg", DEFAULT, "Carolina Herrera", "40", 2014, "Creada para una nueva generación que reinventa la ciudad, 212 VIP Men, de Carolina Herrera, penetra en nuestra nariz dejando una fragancia moderna imposible de olvidar. No tienen necesidad de romper las reglas, simplemente crean unas nuevas y el resto las sigue.", DEFAULT),
(DEFAULT, 1, "One Million", "img-onemillion.jpg", DEFAULT, "Paco Rabanne", 60, 2017, "1 MILLION, de Paco Rabanne. La esencia del éxito. Ir por el oro que es adrenalina. Caballero Insolente. Elegante e impretinente en igual medida. Comienza con notas frescas y culmina sobre un acorde de cuero picante.", DEFAULT),
(DEFAULT, 2, "Good Girl", "img-goodgirl.jpg", DEFAULT, "Carolina Herrera", 60, 2017, "Good Girl Eau de Parfum Supreme rompe todas las reglas de los perfumes y reinventa su familia olfativa. La dulzura de las jugosas bayas da paso a la afrodisíaca personalidad del intenso jazmín de Egipto, mientras las cremosas habas tonka y el vibrante vetiver le dan un toque moderno a la fórmula final.", DEFAULT),
(DEFAULT, 3, "Invictus", "img-invictus.jpg", DEFAULT, "Paco Rabanne", 80, 2017, "Invictus, Eau de Toilette, la invencible fragancia masculina de Paco Rabanne.Un perfume que contiene sensualidad y frescura a partes iguales. Extremadamente adictivo, la fragancia de los campeones.", DEFAULT),
(DEFAULT, 3, "Eros", "img-eros.jpg", DEFAULT, "Versace", 40, 2014, "Es una fragancia de la familia olfativa Aromática Fougère para Hombres. Esta fragrancia es nueva. Eros se lanzó en 2012. La Nariz detrás de esta fragrancia es Aurelien Guichard. Las Notas de Salida son menta, manzana verde y limón (lima ácida); las Notas de Corazón son haba tonka, geranio y ambroxan; las Notas de Fondo son vainilla de Madagascar, vetiver, musgo de roble, cedro de Virginia y cedro del Atlas.", DEFAULT),
(DEFAULT, 5, "Be", "img-be.jpg", DEFAULT, "Calvin Klein", 40, 2014, "El envoltorio consiste en almizcle blanco transparente con un toque especiado de enebro y notas tónicas de menta y de mandarina. Una pizca de lavanda le imprime un carácter mixto y sostiene las flores de magnolia. El fondo es de almizcle y madera, con una suave y afrutada calidez de piel que caracterizan la fragancia.", DEFAULT), 
(DEFAULT, 4, "Lady Million", "img-ladymillon.jpg", DEFAULT,"Paco Rabanne", 40, 2014, "Lady Million, de Paco Rabanne, representa a la femme-fatale que lleva un aroma para seducir. Deseando la vida y viviendo para la persecución. Flores blancas (sexys) que despiertan sobre la piel con notas frescas, se derraman sobre pachuli.", DEFAULT),
(DEFAULT, 4, "Scandal", "img-scandal.jpg", DEFAULT, "J. P. Gaultier", 40 , 2014, "Scandal representa un nuevo estilo de fragancia femenina, donde su aura elegante es manchada por el espíritu de Pigalle amado por Jean Paul Gaultier. Hasta la señora ministra se siente tentada por este aroma a escandalo. Es mas que un golpe de aire fresco, es un golpe de libertad. De noche, todos (en Jean Paul Gaultier) tienen permitido ser los dueños de las fiestas, crear escenas y hacer escandalos. ", DEFAULT),
(DEFAULT, 5, "Bad Boy", "img-badboy.jpg", DEFAULT, "Carolina Herrera", 50, 2021, "Carolina Herrera presenta un nuevo perfume masculino, innovador y explosivo: Bad Boy. Una fascinante fragancia que actualiza el mito del eterno rebelde, aquel que se atreve a romper las normas y a trazar su propio camino. BAD BOY es una oda a los hombres que luchan por sus principios y son fieles a su propia identidad. BAD BOY es una fragancia Oriental Aromática en la que los opuestos se atraen: la luminosidad de la Salvia, la Bergamota Verde y la Pimienta, se entrelaza con la oscuridad sensual del Haba Tonka, el Cacao y la Madera de Ámbar. BAD BOY expresa, de manera consciente, las luces y las sombras de la naturaleza del hombre actual.", DEFAULT),
(DEFAULT, 1, "Blue Label", "img-bluelabel.jpg", DEFAULT, "Givenchy", 100, 2004, "Creado en 2004, Blue Label ofrece un toque fresco de sensualidad moderna para el hombre Givenchy Pour Homme. Una esencia vigorizante, fresca y amaderada que recuerda al perfume original, pero realzada con notas frescas de pomelo. Blue Label es la fragancia ideal para el hombre que acepta la libertad, la elegancia y la sofisticación con un toque de rebeldía.", DEFAULT);

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
ALTER TABLE comentarios
ADD updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO comentarios 
VALUES
(DEFAULT, 1, 1, "Toda la facha", "2021-01-09", DEFAULT),
(DEFAULT, 1, 3, "La verdad, un desastre", "2021-04-03", DEFAULT), 
(DEFAULT, 1, 4, "Muy buen producto. Ya lo conocía y por eso no me sorprende su calidad. Lo he usado hace un tiempo y mantiene sus características originales.", "2020-05-07", DEFAULT), 
(DEFAULT, 1, 5, "Tremendo, dame mil", "2018-03-05", DEFAULT),
(DEFAULT, 2, 3, "Lo super recomiendo, excelente producto", "2018-12-06", DEFAULT),
(DEFAULT, 2, 4, "Me esperaba algo mejor..", "2017-03-05", DEFAULT), 
(DEFAULT, 2, 1, "No tengo mucho para decir, es un perfume", "2016-03-16", DEFAULT), 
(DEFAULT, 2, 2, "Lo mejor que use en años", "2019-10-03", DEFAULT),
(DEFAULT, 3, 2, "No me gustó nada", "2017-11-03", DEFAULT),
(DEFAULT, 3, 3, "Vienen pifiando hace años", "2016-09-03", DEFAULT),
(DEFAULT, 3, 4, "me encantaaaa", "2018-03-03", DEFAULT),
(DEFAULT, 3, 5, "Esta bueno", "2019-04-03", DEFAULT),
(DEFAULT, 4, 1, "mas o menos, no me convencio", "2021-02-03", DEFAULT),
(DEFAULT, 4, 2, "ME FASCINA", "2018-12-03", DEFAULT),
(DEFAULT, 4, 5, "Notas muy sutiles, recomendadísimo", "2019-07-03", DEFAULT),
(DEFAULT, 4, 4, "Completamente distinto a lo que venía usando", "2018-08-03", DEFAULT),
(DEFAULT, 5, 2, "esta bueno para regalar", "2019-01-03", DEFAULT),
(DEFAULT, 5, 3, "Gran innovación de la marca", "2020-03-03", DEFAULT),
(DEFAULT, 5, 4, "tremendooooo", "2020-02-03", DEFAULT),
(DEFAULT, 5, 1, "mucho humo la publicidad, no me sirve", "2016-05-03", DEFAULT),
(DEFAULT, 6, 1, "Me encanta el frasco!!!!!", "2017-04-03", DEFAULT),
(DEFAULT, 6, 4, "...", "2018-06-03", DEFAULT),
(DEFAULT, 6, 5, "deja que desear", "2019-11-03", DEFAULT),
(DEFAULT, 6, 3, "No fue lo que esperaba para nada", "2020-10-03", DEFAULT),
(DEFAULT, 7, 3, "increible este perfume", "2020-08-03", DEFAULT),
(DEFAULT, 7, 2, "Muy bueno, segunda vez que lo compro", "2021-03-03", DEFAULT),
(DEFAULT, 7, 1, "muy distinto al resto :)", "2021-02-03", DEFAULT),
(DEFAULT, 7, 5, "Super recomendado", "2020-01-03", DEFAULT),
(DEFAULT, 8, 5, "Gran diseño de la marca", "2019-12-03", DEFAULT),
(DEFAULT, 8, 4, "Muy dulce, como me gustan", "2018-11-03", DEFAULT),
(DEFAULT, 8, 2, "esta buenisimo", "2019-01-03", DEFAULT),
(DEFAULT, 8, 1, "la publicidad es real, en el boliche gano gracias a este perfume", "2018-04-03", DEFAULT),
(DEFAULT, 9, 1, "muy disconforme con el producto", "2017-05-03", DEFAULT),
(DEFAULT, 9, 3, "INCREIBLEEEEEE", "2019-05-03", DEFAULT),
(DEFAULT, 9, 2, "Me encantó!", "2020-08-03", DEFAULT),
(DEFAULT, 9, 4, "Muy bueno", "2019-09-03", DEFAULT),
(DEFAULT, 10, 3, "La verdad que fue un regalo de mi mamá y no esperaba mucho, pero me sorprendió gratamente. Recomendado.", "2021-01-03", DEFAULT),
(DEFAULT, 10, 4, "divino este perfume", "2020-05-03", DEFAULT),
(DEFAULT, 10, 5, "VAMO ARRIBAAAA, TREMENDA FRAGANCIA", "2021-03-03", DEFAULT),
(DEFAULT, 10, 2, "Muy malo", "2019-05-03", DEFAULT);

ALTER TABLE comentarios CHANGE fecha createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE productos CHANGE fechaPublicacion createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;

SELECT * FROM comentarios;