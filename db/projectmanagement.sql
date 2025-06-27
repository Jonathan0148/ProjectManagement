-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: projectmanagement
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fetish`
--

DROP TABLE IF EXISTS `fetish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fetish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Nombre del permiso',
  `state` int NOT NULL DEFAULT '1' COMMENT 'Estado de la tarea (1 completada, 2 en progreso, 3 finalizada)',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fetish`
--

LOCK TABLES `fetish` WRITE;
/*!40000 ALTER TABLE `fetish` DISABLE KEYS */;
/*!40000 ALTER TABLE `fetish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Nombre del modulo',
  `description` text COMMENT 'Descripcion del modulo',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Roles','Módulo para registrar los roles de la plataforma y parametrizar los permisos sobre los modulos',1,'2025-06-27 02:25:29',1,'2025-06-27 02:11:01',1),(2,'Usuarios','Módulo para registrar los usuarios y asignarles un rol sobre la plataforma',1,'2025-06-27 02:25:46',1,'2025-06-27 02:11:01',1);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules_roles`
--

DROP TABLE IF EXISTS `modules_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles_id` int NOT NULL,
  `modules_id` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_permits_roles_roles1_idx` (`roles_id`),
  KEY `fk_modules_roles_modules1_idx` (`modules_id`),
  CONSTRAINT `fk_modules_roles_modules1` FOREIGN KEY (`modules_id`) REFERENCES `modules` (`id`),
  CONSTRAINT `fk_permits_roles_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules_roles`
--

LOCK TABLES `modules_roles` WRITE;
/*!40000 ALTER TABLE `modules_roles` DISABLE KEYS */;
INSERT INTO `modules_roles` VALUES (1,2,1,1,NULL,NULL,'2025-06-27 02:12:09',1),(2,2,2,1,NULL,NULL,'2025-06-27 02:12:09',1),(3,5,1,1,NULL,NULL,'2025-06-27 03:57:28',2),(4,6,1,1,NULL,NULL,'2025-06-27 03:59:33',2),(5,7,1,0,'2025-06-27 11:06:55',2,'2025-06-27 04:02:31',2),(6,8,1,0,'2025-06-27 04:25:03',2,'2025-06-27 04:18:32',2),(7,9,1,1,NULL,NULL,'2025-06-27 04:20:27',2),(8,8,2,0,'2025-06-27 04:25:03',2,'2025-06-27 04:22:23',2),(9,10,2,0,'2025-06-27 12:12:09',2,'2025-06-27 12:11:22',2),(10,10,1,0,'2025-06-27 12:12:09',2,'2025-06-27 12:11:22',2),(11,10,2,1,NULL,NULL,'2025-06-27 12:12:09',2),(12,10,1,1,NULL,NULL,'2025-06-27 12:12:09',2);
/*!40000 ALTER TABLE `modules_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules_roles_permits`
--

DROP TABLE IF EXISTS `modules_roles_permits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules_roles_permits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modules_roles_id` int NOT NULL,
  `permits_id` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_modules_roles_permits_modules_roles1_idx` (`modules_roles_id`),
  KEY `fk_modules_roles_permits_permits1_idx` (`permits_id`),
  CONSTRAINT `fk_modules_roles_permits_modules_roles1` FOREIGN KEY (`modules_roles_id`) REFERENCES `modules_roles` (`id`),
  CONSTRAINT `fk_modules_roles_permits_permits1` FOREIGN KEY (`permits_id`) REFERENCES `permits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules_roles_permits`
--

LOCK TABLES `modules_roles_permits` WRITE;
/*!40000 ALTER TABLE `modules_roles_permits` DISABLE KEYS */;
INSERT INTO `modules_roles_permits` VALUES (1,1,1,1,NULL,NULL,'2025-06-27 02:12:45',1),(2,1,2,1,NULL,NULL,'2025-06-27 02:12:45',1),(3,1,3,1,NULL,NULL,'2025-06-27 02:12:45',1),(4,1,4,1,NULL,NULL,'2025-06-27 02:12:45',1),(5,2,1,1,NULL,NULL,'2025-06-27 02:12:45',1),(6,2,2,1,NULL,NULL,'2025-06-27 02:12:45',1),(7,2,3,1,NULL,NULL,'2025-06-27 02:12:45',1),(8,2,4,1,NULL,NULL,'2025-06-27 02:12:45',1),(9,1,3,1,NULL,NULL,'2025-06-27 03:57:28',2),(10,2,3,1,NULL,NULL,'2025-06-27 03:57:28',2),(11,4,1,1,NULL,NULL,'2025-06-27 03:59:33',2),(12,4,2,1,NULL,NULL,'2025-06-27 03:59:33',2),(13,5,1,0,'2025-06-27 11:06:55',2,'2025-06-27 04:02:31',2),(14,5,2,0,'2025-06-27 11:06:55',2,'2025-06-27 04:02:31',2),(15,6,1,0,'2025-06-27 04:25:03',2,'2025-06-27 04:18:32',2),(16,6,3,0,'2025-06-27 04:25:03',2,'2025-06-27 04:18:32',2),(17,7,1,1,NULL,NULL,'2025-06-27 04:20:27',2),(18,7,2,1,NULL,NULL,'2025-06-27 04:20:27',2),(19,6,3,0,'2025-06-27 04:25:03',2,'2025-06-27 04:21:39',2),(20,6,3,0,'2025-06-27 04:25:03',2,'2025-06-27 04:22:23',2),(21,8,2,0,'2025-06-27 04:25:03',2,'2025-06-27 04:22:23',2),(22,8,4,0,'2025-06-27 04:25:03',2,'2025-06-27 04:22:23',2),(23,9,1,0,'2025-06-27 12:12:09',2,'2025-06-27 12:11:22',2),(24,10,3,0,'2025-06-27 12:12:09',2,'2025-06-27 12:11:22',2),(25,9,2,0,'2025-06-27 12:12:09',2,'2025-06-27 12:11:22',2),(26,11,2,1,NULL,NULL,'2025-06-27 12:12:09',2),(27,12,4,1,NULL,NULL,'2025-06-27 12:12:09',2);
/*!40000 ALTER TABLE `modules_roles_permits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permits`
--

DROP TABLE IF EXISTS `permits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Nombre del permiso',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permits`
--

LOCK TABLES `permits` WRITE;
/*!40000 ALTER TABLE `permits` DISABLE KEYS */;
INSERT INTO `permits` VALUES (1,'Ver',1,NULL,NULL,'2025-06-27 02:11:46',1),(2,'Crear',1,NULL,NULL,'2025-06-27 02:11:46',1),(3,'Editar',1,NULL,NULL,'2025-06-27 02:11:46',1),(4,'Eliminar',1,NULL,NULL,'2025-06-27 02:11:46',1);
/*!40000 ALTER TABLE `permits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Nombre del permiso',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Pruebaa',1,'2025-06-27 12:30:43',2,'2025-06-27 12:30:29',1),(2,'PRUEBA DE PROYETOASDAS',0,'2025-06-27 12:42:24',2,'2025-06-27 12:42:15',1);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT 'Nombre del rol',
  `description` text COMMENT 'Descripción del rol',
  `active` tinyint(1) DEFAULT '1' COMMENT 'Estado del rol(1 activo, 0 inactivo)',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Base de datos','Rol encargado de manipular las consultas de la base de datos',0,1,'2025-06-26 14:37:42',1,'2025-06-26 14:28:50',1),(2,'Administrador','Rol encargado de administrar la plataforma',1,1,'2025-06-26 14:54:37',1,'2025-06-26 14:53:46',1),(5,'Prueba','Pruebaa',1,1,NULL,NULL,'2025-06-27 03:57:28',2),(6,'Prueba','Pruebaa',1,1,NULL,NULL,'2025-06-27 03:59:33',2),(7,'Prueba222333','Pruebaa2222',1,0,'2025-06-27 11:06:55',2,'2025-06-27 04:02:31',2),(8,'Vigilante','Vigilante',1,0,'2025-06-27 04:25:03',2,'2025-06-27 04:18:32',2),(9,'Vigilante','Vigilante',1,1,NULL,NULL,'2025-06-27 04:20:27',2),(10,'Pruebaaa','Pruebaaa',1,1,'2025-06-27 12:12:09',2,'2025-06-27 12:11:22',2);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Nombre del permiso',
  `state` int NOT NULL DEFAULT '1' COMMENT 'Estado de la tarea (1 completada, 2 en progreso, 3 finalizada)',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  `projects_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_tasks_projects1_idx` (`projects_id`),
  CONSTRAINT `fk_tasks_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Tarea A',4,1,NULL,2,'2025-06-27 13:16:18',1,1),(2,'asdas',1,1,NULL,NULL,'2025-06-27 13:45:30',1,1),(3,'asdas',1,1,NULL,NULL,'2025-06-27 13:45:30',1,1),(4,'asdas',1,0,NULL,2,'2025-06-27 13:45:30',1,1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles_id` int NOT NULL,
  `names` varchar(100) NOT NULL COMMENT 'Nombres del usuario',
  `surnames` varchar(100) NOT NULL COMMENT 'Apellidos del usuario',
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL COMMENT 'Correo del usuario',
  `image` varchar(150) DEFAULT NULL COMMENT 'Imagen del usuario, este campo guarda la url donde deberia estar accesible las imagen',
  `active` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Estado del usuario, (1 activo, 0 inactivo)',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Borrado lógico de los registros de la tabla, (1 existente, 0 eliminado)',
  `update_date` datetime DEFAULT NULL COMMENT 'Fecha y hora en la cual se hizo la última modificación',
  `update_user_id` int DEFAULT NULL COMMENT 'Usuario que hizo la última modificación',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora en la cual se hizo la inserción del registro',
  `insert_user_id` int NOT NULL DEFAULT '1' COMMENT 'Usuario que hizo la inserción del registro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_users_roles_idx` (`roles_id`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'BD','Base de datos','BDatos','e71198086b7284b4ecf26ba6d51c0c02','',NULL,0,1,'2025-06-26 18:36:41',1,'2025-06-26 14:33:03',1),(2,2,'Jonathan','Bohorquez','JBohorquez','88849fcb99958d58498d00a41ead5f8d','bohorquezvillamiljonathan@gmail.com',NULL,1,1,'2025-06-26 18:38:44',1,'2025-06-26 14:56:18',1),(3,2,'Pruebaa222','Pruebaa','Pruebaa','575a0afc038341610db49f35c284a6e2',NULL,NULL,1,0,'2025-06-27 03:33:54',2,'2025-06-27 03:33:06',2),(4,1,'Prueba','Prueba','Prueba','7bc56f76dc936c0449964bac35fc9942','',NULL,1,1,NULL,NULL,'2025-06-27 09:57:45',2),(6,1,'2133212132','2133212132','2133212132','76a3f76a6fe3710b466f471de2d82e52','',NULL,1,1,NULL,NULL,'2025-06-27 09:58:48',2),(8,1,'4121212','4121212','4121212','672f7ea329915ff0462dfd3a4f59ee5c','4121212@gmail.com',NULL,1,1,NULL,NULL,'2025-06-27 10:01:09',2),(9,9,'dasadasd','asdasasd','asdsaasd','d4ce21f7a103695480efa0328b730477','',NULL,1,1,NULL,NULL,'2025-06-27 10:09:27',2),(10,9,'sdasdas','asdsaasd','saddsads','6de9ef02b52a151ecc6085d49a41ef7a','',NULL,1,1,NULL,NULL,'2025-06-27 10:11:27',2),(11,9,'Rocio','Mendez','A1221213','a0f0bbae8cc31aae6e8e46d9401ad758','rocio@gmail.com',NULL,1,0,'2025-06-27 10:36:40',2,'2025-06-27 10:18:04',2),(12,7,'12312213','213123123','1213123123','f2ecb09913010c4a94a3f1868a85a878','',NULL,1,0,'2025-06-27 10:36:36',2,'2025-06-27 10:27:13',2),(13,9,'41241fds','fsdfsf23','4Fsdfsf23','5bda1246de98cd0481a32bfca732be3b','',NULL,1,1,NULL,NULL,'2025-06-27 10:27:18',2),(14,9,'12312adadd1','221311sssa','1221311sssa','c362d2b6c3643c1e493dc46b52ef0f3c704553910a8ba860e3e8764e1dfbde95','',NULL,1,0,'2025-06-27 10:34:30',2,'2025-06-27 10:27:24',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-27 14:02:29
