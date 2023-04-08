-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-06-2022 a las 04:43:07
-- Versión del servidor: 5.7.38-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendavirtual`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_carrito`
--

CREATE TABLE `tb_carrito` (
  `id` int(11) NOT NULL,
  `tb_producto_id` int(11) DEFAULT NULL,
  `tb_usuario_id` int(11) DEFAULT NULL,
  `cantidad` varchar(200) DEFAULT NULL,
  `compra_confirmada` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_carrito`
--

INSERT INTO `tb_carrito` (`id`, `tb_producto_id`, `tb_usuario_id`, `cantidad`, `compra_confirmada`) VALUES
(1, 1, 3, '1', 0),
(2, 2, 3, '1', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(70) NOT NULL,
  `nick` varchar(20) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id`, `correo`, `nick`, `pass`) VALUES
(1, 'admin@admin.com', 'admin', '21232f297a57a5a743894a0e4a801fc3'),
(3, 'hrendon@hrendon.com', 'hrendon', '4d6ddde01eeca961dce9062f271d1e73');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_productos`
--

CREATE TABLE `tb_productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(5000) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `promo` varchar(2) NOT NULL,
  `imagen` varchar(50) NOT NULL,
  `valor` int(11) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `empresa` text NOT NULL,
  `publicado` text NOT NULL,
  `fecha` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tb_productos`
--

INSERT INTO `tb_productos` (`id`, `nombre`, `descripcion`, `tipo`, `promo`, `imagen`, `valor`, `cantidad`, `empresa`, `publicado`, `fecha`) VALUES
(1, 'Among Us', 'Juega con 4 a 15 en línea o con wifi local mientras intentas preparar la nave para la partida, pero ten cuidado: uno o más jugadores aleatorios de la tripulación son impostores que quieren matar a todos.\n\nNació como juego para fiestas y recomendamos que juegues con amigos en una red local o en línea y uses el chat de voz. Disfruta del juego multiplataforma entre dispositivos móviles y PC', 'Acción y aventura', 'No', '1.jpg', 15200, 28, 'Innersloth', 'Innersloth', '2021-12-13'),
(2, 'Anthem™', 'En un mundo dejado incompleto por los dioses, una facción oculta amenaza a la humanidad. Lo único entre estos villanos y la tecnología antigua que codician son los Freelancers.\n\nÚnete a hasta tres jugadores adicionales y monta exosuits de alta tecnología y poder singular. Explora extensas ruinas, lucha contra enemigos mortíferos y reclama artefactos de otro mundo. Con cada misión, tú y tu exosuit Javelin aumentarán el poder. Lucha contra los peligros de un mundo en constante evolución. Levántate de forma unida para vencer al mal. Triunfa como uno.', 'RPG de acción', 'No', '2.jpg', 179900, 26, 'BioWare', 'Electronic Arts', '2019-02-22'),
(3, 'ARK: Ultimate Survivor Edition', '¡Experimente todo lo que la franquicia ARK tiene para ofrecer en esta colección definitiva! Domestica y monta criaturas primigenias mientras exploras tierras salvajes, únete a otros jugadores para competir en batallas tribales épicas y viaja juntos en la mayor aventura llena de dinosaurios de todos los tiempos.\n\nARK: The Ultimate Survivor Edition incluye ARK: Survival Evolved, junto con estos enormes paquetes de expansión: Scorched Earth, Aberration, Extinction y Genesis Parts 1 y 2. Todo actualizado y optimizado con cada mejora realizada desde el lanzamiento del juego base, agregando ¡hasta miles de horas de juego!\n\nDesde las junglas de las islas primordiales hasta los jardines futuristas de una nave interestelar, ¡todos los entornos en expansión están aquí para que los conquiste! Descubre los cientos de especies únicas que deambulan por estas tierras, desde las prehistóricas hasta las fantásticas, y aprende cómo entablar amistad con estas criaturas o cómo derrotarlas. Completa tu colección de notas y expedientes dejados por exploradores anteriores para conocer la sorprendente historia de las ARK. ¡Pon a prueba tu tribu y tus bestias en batalla con cada desafío de jefe de la franquicia!', 'Acción y aventura', 'No', '3.jpg', 182900, 18, 'Studio Wildcard', 'Studio Wildcard', '2021-05-26 '),
(4, 'Assassins Creed® Origins', 'El antiguo Egipto, una tierra de grandeza e intriga, está desapareciendo por una fiera lucha por poder. Devela los secretos oscuros y mitos olvidados mientras revives el momento de la fundación de la hermandad de los asesinos.\n\nUN PAÍS POR DESCUBRIR\nNavega el Nilo, devela los misterios de las pirámides, o enfréntate a facciones ancestrales y bestias salvajes mientras explores esta gigante e impredecible tierra.\n\nUNA NUEVA HISTORIA CADA VEZ QUE JUEGAS\nParticipa en múltiples misiones e intensas historias mientras te cruzas con fuertes y memorables personajes, desde los más influyentes y adinerados, a los despechados más necesitados.\n\nADOPTA UN RPG DE ACCIÓN\nExperimenta un Nuevo modo de combate completamente nuevo. Obtén y experimenta con docenas de armas con diferentes características y rarezas. Explora dinámicas de progresión exhaustivas y desafía tus habilidades contra jefes poderosos y únicos.', 'Acción y aventura', 'No', '4.jpg', 179900, 9, 'Ubisoft', 'Ubisoft', '2017-10-26'),
(5, 'Back 4 Blood', 'Back 4 Blood es un emocionante juego de disparos cooperativo en primera persona de los creadores de la aclamada franquicia Left 4 Dead. Estás en el centro de una guerra contra los infectados. Un parásito mortal infectó a estos humanos, conviertiéndolos en criaturas aterradoras empeñadas en devorar lo que queda de la civilización. Con la extinción de la humanidad en juego, depende de ti y de tus amigos luchar contra el enemigo, erradicar a los infectados y recuperar el mundo.', 'Acción y aventura', 'No', '5.jpg', 262999, 14, 'Turtle Rock Studios', 'Warner Bros. Games', '2021-10-12'),
(6, 'Battlefield™ V', 'Vive el mayor conflicto de la historia con Battlefield™ V, donde la franquicia regresa a sus orígenes con una recreación jamás vista de la Segunda Guerra Mundial. Descubre un multijugador masivo con tu escuadrón en modos enormes como Grandes operaciones o el cooperativo Armas combinadas, o sé testigo de las catástrofes que se vivieron en este combate global con las Historias de guerra para un solo jugador. Disfruta el Battlefield más completo e inmersivo hasta la fecha mientras juegas en ubicaciones épicas y sorprendentes por todo el mundo. Ahora también incluye Tormenta de fuego, el Battle Royale reimaginado para Battlefield.\n\n• Tormenta de fuego: el Battle Royale reimaginado para Battlefield. Domina en el mapa de Battlefield más grande de la historia con armas y vehículos épicos mientras un círculo de fuego letal se va cerrando. Busca, lucha y sobrevive para que tu escuadrón sea el último en pie.\n\n• La Segunda Guerra Mundial como nunca antes: descubre batallas inesperadas pero cruciales para la guerra ahora que Battlefield regresa a donde comenzó todo.\n\n• Multijugador de 64 jugadores en el caos de la guerra total: lidera tu compañía en un multijugador masivo con nuevas experiencias de juego como el inmenso modo Grandes operaciones. Embárcate en modos clásicos como Conquista o forma un escuadrón con tus amigos en el modo cooperativo Armas combinadas.', 'Shooter', 'No', '6.jpg', 119900, 8, 'DICE', 'Electronic Arts', '2018-10-20'),
(7, 'Batman™: Arkham Knight', 'En este explosivo final de la serie Arkham, Batman enfrenta el máximo peligro. El Espantapájaros regresa junto a súper villanos como El Pingüino, Dos Caras y Harley Quinn, para destruirlo de una vez por todas. Batman: Arkham Knight muestra el Batimóvil creado por Rocksteady, que por primera vez puede controlar el jugador y, junto con la capacidad de juego de la serie Arkham, ofrece la mejor experiencia del universo de Batman, donde se vuela por toda Ciudad Gótica.', 'Acción y aventura', 'No', '7.jpg', 149900, 16, 'Rocksteady Studios', 'Warner Bros. Games', '2015-06-22'),
(8, 'DARK SOULS™ III - Deluxe Edition', 'Regresa a una Tierra apocalíptica en Darksiders III, una aventura de acción hack-n-slash en la que los jugadores adoptan el papel de Furia, cuya misión es perseguir y deshacerse de los siete Pecados Capitales. Furia, la más impredecible y enigmática de los cuatro jinetes del Apocalipsis, deberá tener éxito donde tantos han fallado: devolver el equilibro a las fuerzas que ahora asolan la Tierra. Darksiders III es el esperado tercer capítulo de la aclamada franquicia.', 'Juegos de rol', 'No', '8.jpg', 273900, 20, 'FromSoftware, Inc.', 'BANDAI NAMCO Entertainment', '2016-04-11'),
(9, 'ELDEN RING', 'EL NUEVO RPG DE ACCIÓN DE FANTASÍA.\nLevántate, tiznado, y déjate guiar por la gracia para esgrimir el poder del Anillo de Elden y convertirte en un Señor de Elden en las Tierras Intermedias.\n\n• Un extenso mundo lleno de emoción\nUn extenso mundo donde los campos abiertos, con una amplia variedad de situaciones, y las enormes mazmorras, con diseños complejos y tridimensionales, se conectan con total fluidez. Al explorar, te acompaña el entusiasmo por descubrir amenazas desconocidas y abrumadoras, lo que produce una gran sensación de logro.\n\n• Crea tu propio personaje\nAdemás de personalizar el aspecto de tu personaje, puedes combinar libremente las armas, armadura y magia que desees equipar. Puedes desarrollar tu personaje según tu estilo de juego, como aumentar tu fuerza muscular para convertirte en un fuerte guerrero o dominar la magia.\n\n• Un drama épico nacido de un mito\nUna historia de múltiples capas contada en fragmentos. Un drama épico en el que los diversos pensamientos de los personajes se cruzan en las Tierras Intermedias.\n\n• Modo en línea único que te conecta indirectamente con otros\nAdemás del modo multijugador, donde puedes conectarte directamente con otros jugadores y viajar junto a ellos, el juego presenta un modo en línea asincrónico único, que te permite sentir la presencia de otros jugadores.', 'Juegos de rol', 'No', '9.jpg', 207000, 5, 'FromSoftware, Inc.', 'Bandai Namco Entertainment America Inc.', '2022-02-24'),
(10, 'Prime Evil Collection de Diablo', 'Diablo® II: Resurrected™ es la remasterización definitiva de Diablo® II y su expansión, Lord of Destruction®, dos grandes hitos en la laureada serie de rol y acción con la que Blizzard Entertainment definió el género. Tanto los jugadores veteranos como aquellos que se perdieron el juego original para PC en su momento, hace veinte años, pueden disfrutar ahora de la atemporal jugabilidad de Diablo® II con mejoras en los gráficos y el sonido para aprovechar el hardware de hoy en día.\n\nAsciende por la Torre Olvidada, ábrete paso por las junglas de Kurast y echa abajo las puertas del infierno para derrotar a Diablo en persona. Y luego sube hasta la cima del Monte Arreat para enfrentarte a Baal, Señor de la Destrucción, en la Torre del Mundo de Piedra.\n\nEn la emblemática pantalla de la fogata aguardan siete de los mayores campeones de Santuario: la amazona, la asesina, el bárbaro, el druida, el nigromante, el paladín y la hechicera. Cada uno de ellos se puede personalizar al máximo con incontables opciones de equipación.', 'Juegos de rol', 'No', '10.jpg', 155940, 11, 'Blizzard Entertainment', 'Blizzard Entertainment', '2021-09-23'),
(11, 'Diablo III: Eternal Collection', 'Generaciones de jugadores han peleado contra las hordas demoníacas de Diablo, y ahora es tu turno de formar parte del legado de los RPG de acción. Diablo III: Eternal Collection incluye Diablo III, la expansión Reaper of Souls y el paquete Ascenso del Nigromante, todo en un solo volumen definitivo.  Prepárate, héroe mortal. Las puertas del infierno se están abriendo.', 'Juegos de rol', 'No', '11.jpg', 65967, 5, 'Blizzard Entertainment', 'Blizzard Entertainment', '2017-06-26'),
(12, 'Call of Duty®: Vanguard', 'Rebélate en cada frente: combate sobre el Pacífico, defiende Stalingrado con la precisión de un francotirador, lánzate desde el aire en Francia o atraviesa fuerzas en el norte de África. La franquicia de Call of Duty® regresa con Call of Duty®: Vanguard, desarrollado por Sledgehammer Games, donde los jugadores se sumergirán en el combate visceral de escala global de la Segunda Guerra Mundial.', 'Shooter', 'No', '12.jpg', 369000, 7, 'Activision Publishing Inc.', 'Activision', '2021-11-04'),
(13, 'Hellblade: Senua\s Sacrifice', 'De los creadores de Heavenly Sword, Enslaved: Odyssey to the West y DmC: Devil May Cry llega el viaje brutal de una guerrera hacia el mito y la locura.\n\nAmbientado en la era vikinga, una guerrera celta destrozada se embarca en una misión onírica obsesiva para luchar por el alma de su difunto amante.\n\nCreado en colaboración con neurocientíficos y personas que sufren psicosis, Hellblade: El Sacrificio de Senua te sumerge de lleno en la furia melancólica de la mente desquebrajada de Senua.', 'Acción y aventura', 'No', '13.jpg', 24225, 19, 'Ninja Theory Ltd', 'Ninja Theory Ltd', '2018-04-10'),
(14, 'Shadow of the Tomb Raider', 'En Shadow of the Tomb Raider Definitive Edition, vive el capítulo final de la historia sobre el origen de Lara, en el que se convierte en la saqueadora de tumbas que está destinada a ser. Esta edición incluye el juego básico y siete tumbas de desafío de contenido descargable, así como armas, atuendos y habilidades descargables.', 'Acción y aventura', 'No', '14.jpg', 77900, 13, 'Eidos Montreal', 'Square Enix Ltd', '2019-11-04'),
(15, 'Minecraft: Java & Bedrock', 'Minecraft es un juego en el que se colocan bloques y se ofrecen aventuras continuas. Construye lo que se te ocurra con recursos ilimitados en modo Creativo o disfruta de grandes expediciones en modo Supervivencia, viajando por tierras misteriosas y en las profundidades de tus propios mundos infinitos. ¿Te esconderás de los monstruos o crearás herramientas, armadura y armas para luchar contra ellos? ¡No hace falta que lo hagas solo! Comparte la aventura con amigos en modo multijugador de pantalla dividida en línea.', 'Acción y aventura', 'No', '15.jpg', 129000, 21, 'Mojang', 'Microsoft Studios', '2017-09-20'),
(16, 'Ori and the Blind Forest', 'El bosque de Nibel perece. Tras una poderosa tormenta que desencadena una serie de devastadores acontecimientos, Ori emprende una travesía para encontrar el valor y enfrentarse a una némesis oscura para salvar el bosque de Nibel. \"Ori and the Blind Forest\" cuenta la historia de un joven huérfano destinado a realizar heroicas hazañas, todo ello en un juego de acción y plataforma visualmente impresionante de Moon Studios. Cuenta con dibujos hechos a mano, personajes animados de forma meticulosa, una banda sonora sin igual y decenas de nuevas características. Esta Definitive Edition de \"Ori and the Blind Forest\" explora una profunda y emotiva historia sobre el amor, el sacrificio y la esperanza que vive dentro cada uno de nosotros.', 'Acción y aventura', 'No', '16.jpg', 29899, 14, 'Moon Studios', 'No Game Studios', '2016-03-10'),
(17, 'The Witcher 3: Wild Hunt', 'Conviértete en un brujo, uno de los últimos asesinos de monstruos. Aventúrate por reinos devastados por la guerra para rastrear a la niña de las profecías, un arma viviente capaz de desatar un nivel de destrucción nunca antes visto.', 'Juegos de rol', 'No', '17.jpg', 150000, 4, 'CD PROJEKT RED', 'CD PROJEKT S.A', '2016-08-29'),
(18, 'FIFA 22', 'Con la tecnología de Football™, EA SPORTS™ FIFA 22 acerca el juego aún más a la realidad con avances fundamentales en el juego y una nueva temporada de innovaciones en todos los modos.', 'Deportes', 'No', '18.jpg', 75999, 20, 'EA Canada', 'Electronic Arts', '2017-07-21'),
(19, 'Grand Theft Auto V', 'Cuando un joven estafador, un ladrón de bancos jubilado y un terrorífico psicópata se entremeten con los elementos más temerosos y dementes del submundo criminal, el gobierno de EE. UU. y la industria de entretenimiento, deben llevar a cabo una serie de atracos peligrosos para sobrevivir en una ciudad despiadada en la que no pueden confiar en nadie, y mucho menos unos en los otros.', 'Acción y aventura', 'No', '19.jpg', 159990, 6, 'Rockstar North', 'Rockstar Games', '2017-11-18'),
(20, 'Forza Horizon 5', '¡Te espera tu aventura definitiva en Horizon! Conduce cientos de autos fenomenales de todo el mundo en emocionantes expediciones a lo largo y ancho de los impactantes paisajes de México, en un juego ambientado en un mundo abierto que está en constante evolución.', 'Carreras', 'No', '20.jpg', 207919, 24, 'Playground Games', 'No Game Studios', '2021-11-04'),
(21, 'Need for Speed™ Heat Deluxe Edition', 'No pares de día y arriésgalo todo de noche en NFS™ Heat, una experiencia de conducción que te enfrenta a la fuerza policial corrupta de la ciudad mientras intentas llegar a la élite de las carreras callejeras.\n\nCompra la Deluxe Edition y hazte notar en Need for Speed™ Heat con el coche de iniciación Edición K.S, un diseño exclusivo de No One, 3 coches Edición K.S desbloqueados con progreso, 4 conjuntos de personaje exclusivos y un refuerzo de REP y fondos.', 'Carreras', 'No', '21.jpg', 45980, 26, 'Ghost Games', 'Electronic Arts', '2019-11-08'),
(22, 'Crash Bandicoot™ 4: It’s About Time', '¡Ya era hora de que llegara un juego nuevo de Crash Bandicoot™! Crash se lanza de lleno con tus marsupiales favoritos a una aventura temporal que se cae a pedazos.\n\nNeo Cortex y N. Tropy regresaron a las andadas y esta vez no planean darle con todo al universo, ¡su objetivo es el multiverso entero! Crash y Coco tendrán que juntar cuatro máscaras cuánticas y trastocar las leyes de la realidad para salvar el mundo.\n\n¿Habilidades nuevas? Evidentemente. ¿Más personajes jugables? Sep. ¿Dimensiones alternativas? Obvio. ¿Jefes alocadísimos? Por supuesto. ¿Salsa de la buena? Por sus \'jorts\' puedes apostar que sí. ¿Cómo? ¿Entonces se llaman \'jorts\' de verdad? ¡En este universo no!', 'Acción y aventura', 'No', '22.jpg', 109950, 10, 'Activision Publishing Inc.', 'Activision', '2020-10-01'),
(23, 'Crash™ Team Racing Nitro-Fueled', '¡Crash vuelve al volante! Prepárate para desmelenarte con Crash™ Team Racing Nitro-Fueled. La auténtica experiencia de CTR y mucho más contenido remasterizado al máximo de revoluciones:\n\n- Calienta motores con los modos de juego, personajes, circuitos, potenciadores, armas y controles originales\n- Superderrapa hacia la gloria con karts, arenas y circuitos adicionales de Crash™ Nitro Kart\n- Compite online con tus amigos y arrasa con la competencia en los marcadores\n\nEn Crash™ Team Racing Nitro-Fueled, el riesgo es elevado y los rivales muy duros. Es el CTR de siempre pero a toda potencia.\n\n\nAlgunos elementos requieren una conexión a Internet y una suscripción a No Live Gold, que se vende por separado. Los requisitos de almacenamiento están sujetos a cambios. Puede que sean necesarias actualizaciones obligatorias para jugar. Las compras en el juego son opcionales. Activision no garantiza la disponibilidad del juego ni de las funciones online, y puede modificarlas o interrumpirlas si lo considera oportuno sin previo aviso. Utilizar el software constituye la aceptación del Contrato de licencia del software y de la Política de privacidad disponibles en support.activision.com/license.', 'Carreras', 'No', '23.jpg', 88140, 8, 'Beenox', 'Activision', '2019-06-20'),
(24, 'Gears 5', 'De una de las sagas más aclamadas de los juegos, la famosa campaña de Gears 5 y el modo multijugador renovado están optimizados para la No Series X y No Series S.\n\nCampaña: La guerra total se aproxima y Kait Diaz decide fugarse para investigar su conexión con el enemigo y descubre quién es el mayor peligro para Sera... ella misma. Con las nuevas funciones de campaña podrás llevar a tu personaje con todo y tus diseños de armas a las nuevas modalidades de juego y disfrutar de dificultades y modificadores adicionales.\n\nJcJ: ¡Que gane el mejor equipo! Con nuevos modos y contenidos a partir del lanzamiento, el modo Enfrentamiento recompensa todos los estilos competitivos, desde casual hasta profesional.\n\nJcE: Un esfuerzo cooperativo para sobrevivir. Elige a tu personaje, tu clase y atrinchérate en modo Horda o atraviesa los obstáculos en el modo Escape.', 'Acción y aventura', 'No', '24.jpg', 103960, 14, 'The Coalition', 'No Game Studios', '2020-11-10'),
(25, 'Halo Infinite', 'Lobos solitarios, ¡prepárense para la temporada 2 de Halo Infinite! Disfruta de nuevo contenido que incluye nuevos mapas, modos, eventos temáticos por tiempo limitado y un nuevo Pase de Batalla que nunca caduca.\n\nMultijugador legendario, liberado:\n\n¡El célebre modo multijugador de Halo regresa, reinventado y gratuito! Las actualizaciones de temporada harán evolucionar la experiencia del juego a lo largo del tiempo con eventos únicos, nuevos modos y mapas y contenido dedicado a la comunidad.', 'Shooter', 'No', '25.jpg', 174133, 7, '343 Industries', 'No Game Studios', '2021-11-15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_carrito`
--
ALTER TABLE `tb_carrito`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_carrito`
--
ALTER TABLE `tb_carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
