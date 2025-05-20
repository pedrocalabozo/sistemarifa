CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id_usuario` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `nombre` VARCHAR(100),
  `apellido` VARCHAR(100),
  `telefono` VARCHAR(20),
  `numero_identificacion` VARCHAR(20), -- Cédula o DNI
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Rifas` (
  `id_rifa` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion_corta` TEXT,
  `descripcion_larga` TEXT,
  `url_imagen` VARCHAR(2048),
  `pista_ia_imagen` VARCHAR(100),
  `precio_por_boleto` DECIMAL(10, 2) NOT NULL,
  `maximo_numeros` INT NOT NULL,
  `fecha_sorteo` DATETIME NOT NULL,
  `estado` ENUM('activa', 'proxima', 'finalizada', 'cancelada') DEFAULT 'proxima',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Boletos` (
  `id_boleto` INT AUTO_INCREMENT PRIMARY KEY,
  `id_rifa` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `numeros_seleccionados` JSON NOT NULL, -- Ejemplo: [10, 25, 103]
  `fecha_compra` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `monto_total` DECIMAL(10, 2) NOT NULL,
  `metodo_pago` ENUM('Pago Movil', 'Cripto Moneda', 'Zinli') NOT NULL,
  `estado_pago` ENUM('pendiente', 'pagado', 'fallido', 'verificando', 'cancelado') DEFAULT 'pendiente',
  `id_transaccion_pago` VARCHAR(255), -- Referencia del pago, TxID, etc.
  `fecha_confirmacion_pago` DATETIME,
  FOREIGN KEY (`id_rifa`) REFERENCES `Rifas`(`id_rifa`),
  FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Ganadores` (
  `id_ganador` INT AUTO_INCREMENT PRIMARY KEY,
  `id_rifa` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_boleto` INT, -- Puede ser NULL si el ganador no es por boleto específico o se registra manualmente.
  `numero_ganador` INT, -- Si aplica, podría ser uno de los `numeros_seleccionados` del boleto.
  `premio_descripcion` TEXT,
  `fecha_anuncio_ganador` DATETIME NOT NULL,
  FOREIGN KEY (`id_rifa`) REFERENCES `Rifas`(`id_rifa`),
  FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`),
  FOREIGN KEY (`id_boleto`) REFERENCES `Boletos`(`id_boleto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos de ejemplo para Rifas (opcional, para pruebas)
-- Ajusta las fechas según sea necesario
INSERT INTO `Rifas` (`titulo`, `descripcion_corta`, `descripcion_larga`, `url_imagen`, `pista_ia_imagen`, `precio_por_boleto`, `maximo_numeros`, `fecha_sorteo`, `estado`) VALUES
('Gran Rifa Navideña', '¡Gana un paquete de vacaciones de lujo para dos!', 'Participa en nuestra Gran Rifa Navideña y ten la oportunidad de ganar un paquete de vacaciones de lujo todo incluido a un paraíso tropical. Incluye vuelos, alojamiento y dinero para gastos. ¡No te pierdas este viaje de ensueño!', 'https://placehold.co/600x400.png', 'vacaciones viajes', 10.00, 900, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'activa'),
('Combo Tecnológico', 'Llévate el último smartphone, laptop y tablet.', '¡Actualiza tu tecnología con nuestra Rifa de Combo Tecnológico! Un afortunado ganador recibirá el smartphone más nuevo, una laptop de alto rendimiento y una tablet versátil. Perfecto para trabajar, jugar y mantenerse conectado.', 'https://placehold.co/600x400.png', 'dispositivos tecnologia', 5.00, 500, DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'activa'),
('Auto para Escapada de Fin de Semana', '¡Llévate a casa un SUV compacto nuevo!', 'Imagina conducir un SUV compacto elegante y confiable. Esta rifa te da la oportunidad de ganar un auto nuevo, perfecto para la ciudad y aventuras de fin de semana. ¡Consigue tus boletos ahora!', 'https://placehold.co/600x400.png', 'auto vehiculo', 20.00, 900, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'proxima'),
('Paquete Remodelación Hogar', 'Gana $5000 para la renovación de tus sueños.', '¡Transforma tu espacio vital con nuestra Rifa de Remodelación del Hogar! El ganador obtiene $5000 para gastar en muebles, decoración o renovaciones. Crea el hogar que siempre has querido.', 'https://placehold.co/600x400.png', 'hogar interior', 15.00, 900, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'finalizada');
