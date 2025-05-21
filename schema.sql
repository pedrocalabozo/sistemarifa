-- Tabla para almacenar la información de las rifas
DROP TABLE IF EXISTS Rifas;
CREATE TABLE Rifas (
    id_rifa INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion_corta VARCHAR(500),
    descripcion_larga TEXT,
    url_imagen VARCHAR(2048),
    pista_ia_imagen VARCHAR(100),
    precio_por_boleto DECIMAL(10, 2) NOT NULL,
    maximo_numeros INT NOT NULL,
    fecha_sorteo DATETIME NOT NULL,
    estado ENUM('activa', 'proxima', 'finalizada', 'cancelada') NOT NULL DEFAULT 'proxima',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para almacenar la información de los usuarios
DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE, -- ID de usuario de Google
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    telefono VARCHAR(50),
    numero_id VARCHAR(50), -- Cédula o DNI
    imagen_url VARCHAR(2048),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para almacenar los boletos comprados por los usuarios
DROP TABLE IF EXISTS BoletosComprados;
CREATE TABLE BoletosComprados (
    id_boleto INT AUTO_INCREMENT PRIMARY KEY,
    id_rifa INT NOT NULL,
    id_usuario INT NOT NULL,
    numeros_seleccionados JSON NOT NULL, -- Array de números, ej: [10, 25, 100]
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto_total DECIMAL(10, 2) NOT NULL,
    metodo_pago ENUM('Pago Movil', 'Cripto Moneda', 'Zinli') NOT NULL,
    estado_pago ENUM('pendiente', 'pagado', 'fallido', 'verificando', 'cancelado') NOT NULL DEFAULT 'pendiente',
    id_transaccion_pago VARCHAR(255), -- Referencia del pago
    fecha_confirmacion_pago DATETIME,
    FOREIGN KEY (id_rifa) REFERENCES Rifas(id_rifa),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla para almacenar la información de los ganadores de las rifas
DROP TABLE IF EXISTS Ganadores;
CREATE TABLE Ganadores (
    id_ganador INT AUTO_INCREMENT PRIMARY KEY,
    id_rifa INT NOT NULL,
    id_usuario INT, -- Puede ser nulo si el ganador no es un usuario registrado (poco probable en este sistema)
    id_boleto INT, -- Boleto ganador
    nombre_ganador_manual VARCHAR(255), -- Si se ingresa manualmente y no es un usuario
    numero_ganador INT,
    premio_descripcion TEXT,
    fecha_anuncio_ganador DATETIME NOT NULL,
    FOREIGN KEY (id_rifa) REFERENCES Rifas(id_rifa),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_boleto) REFERENCES BoletosComprados(id_boleto)
);


-- Datos de ejemplo para Rifas
INSERT INTO Rifas (titulo, descripcion_corta, descripcion_larga, url_imagen, pista_ia_imagen, precio_por_boleto, maximo_numeros, fecha_sorteo, estado) VALUES
('Gran Rifa de Verano', 'Gana un increíble paquete de vacaciones.', 'Participa en nuestra Gran Rifa de Verano y podrías ganar un viaje todo incluido para dos personas a Cancún. Incluye vuelos, hotel de 5 estrellas y tours.', 'https://placehold.co/600x400.png', 'playa tropical', 10.00, 500, '2024-08-15 20:00:00', 'activa'),
('Rifa Tecnológica', 'Actualiza tus gadgets con lo último en tecnología.', 'Laptop de última generación, smartphone y audífonos inalámbricos. Todo podría ser tuyo. ¡No te quedes fuera!', 'https://placehold.co/600x400.png', 'gadgets electronicos', 5.00, 1000, '2024-07-30 18:00:00', 'activa'),
('Rifa Hogar Dulce Hogar', 'Renueva tu casa con estos premios.', 'Un conjunto completo de electrodomésticos modernos para tu cocina y una tarjeta de regalo de $500 para muebles.', 'https://placehold.co/600x400.png', 'interior casa moderna', 7.50, 750, '2024-09-01 19:00:00', 'proxima'),
('Rifa de Auto 0KM', 'Llévate un auto nuevo a casa.', 'Participa para ganar un auto compacto 0KM, modelo 2024. ¡La oportunidad de tu vida!', 'https://placehold.co/600x400.png', 'auto nuevo brillante', 20.00, 2000, '2024-10-01 20:00:00', 'proxima'),
('Rifa Fin de Año', 'Cierra el año con broche de oro.', 'Gana un increíble TV 4K de 65 pulgadas y un sistema de sonido envolvente.', 'https://placehold.co/600x400.png', 'sala entretenimiento', 12.00, 600, '2023-12-20 20:00:00', 'finalizada');
