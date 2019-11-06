-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: rrhh2
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `altas_ascensos_bajas`
--

DROP TABLE IF EXISTS `altas_ascensos_bajas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `altas_ascensos_bajas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `expediente` varchar(255) DEFAULT NULL,
  `prestaservicioen` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_altas_ascensos_bajas_persona_id` (`persona_id`),
  CONSTRAINT `fk_altas_ascensos_bajas_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `altas_ascensos_bajas`
--

LOCK TABLES `altas_ascensos_bajas` WRITE;
/*!40000 ALTER TABLE `altas_ascensos_bajas` DISABLE KEYS */;
/*!40000 ALTER TABLE `altas_ascensos_bajas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concpremios`
--

DROP TABLE IF EXISTS `concpremios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concpremios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `referencias` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_concpremios_persona_id` (`persona_id`),
  CONSTRAINT `fk_concpremios_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concpremios`
--

LOCK TABLES `concpremios` WRITE;
/*!40000 ALTER TABLE `concpremios` DISABLE KEYS */;
/*!40000 ALTER TABLE `concpremios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databasechangelog`
--

DROP TABLE IF EXISTS `databasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangelog`
--

LOCK TABLES `databasechangelog` WRITE;
/*!40000 ALTER TABLE `databasechangelog` DISABLE KEYS */;
INSERT INTO `databasechangelog` VALUES ('00000000000001','jhipster','config/liquibase/changelog/00000000000000_initial_schema.xml','2019-11-06 01:47:03',1,'EXECUTED','8:7ada49cd380e521a583ada9db2bf1a25','createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; createTable tableName=jhi_persistent_token; addForeignKeyConstraint baseTableName=jhi_user_a...','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003145-1','jhipster','config/liquibase/changelog/20191106003145_added_entity_Persona.xml','2019-11-06 01:47:03',2,'EXECUTED','8:49cacc4df19a07bdf3aa23a2253644d5','createTable tableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003145-1-relations','jhipster','config/liquibase/changelog/20191106003145_added_entity_Persona.xml','2019-11-06 01:47:03',3,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003146-1','jhipster','config/liquibase/changelog/20191106003146_added_entity_Licencia.xml','2019-11-06 01:47:03',4,'EXECUTED','8:896c5abf70bbeed86f9ec253eb168a24','createTable tableName=licencia','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003146-1-relations','jhipster','config/liquibase/changelog/20191106003146_added_entity_Licencia.xml','2019-11-06 01:47:03',5,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003147-1','jhipster','config/liquibase/changelog/20191106003147_added_entity_OtrosServiciosPrestados.xml','2019-11-06 01:47:03',6,'EXECUTED','8:90bda303b2aa4ba45c07eaf80f07ebed','createTable tableName=otros_servicios_prestados','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003147-1-relations','jhipster','config/liquibase/changelog/20191106003147_added_entity_OtrosServiciosPrestados.xml','2019-11-06 01:47:03',7,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003148-1','jhipster','config/liquibase/changelog/20191106003148_added_entity_PenasDisciplinariasSufridas.xml','2019-11-06 01:47:03',8,'EXECUTED','8:cf51a6e78fe36a0f52377b93eb921c16','createTable tableName=penas_disciplinarias_sufridas','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003148-1-relations','jhipster','config/liquibase/changelog/20191106003148_added_entity_PenasDisciplinariasSufridas.xml','2019-11-06 01:47:03',9,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003149-1','jhipster','config/liquibase/changelog/20191106003149_added_entity_Garantia.xml','2019-11-06 01:47:03',10,'EXECUTED','8:8ba16ac917d14da671841024d91df2aa','createTable tableName=garantia','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003149-1-relations','jhipster','config/liquibase/changelog/20191106003149_added_entity_Garantia.xml','2019-11-06 01:47:03',11,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003150-1','jhipster','config/liquibase/changelog/20191106003150_added_entity_AltasAscensosBajas.xml','2019-11-06 01:47:03',12,'EXECUTED','8:3cf0a2ce981cd7d205cb5740b88243f5','createTable tableName=altas_ascensos_bajas','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003150-1-relations','jhipster','config/liquibase/changelog/20191106003150_added_entity_AltasAscensosBajas.xml','2019-11-06 01:47:03',13,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003151-1','jhipster','config/liquibase/changelog/20191106003151_added_entity_Embargos.xml','2019-11-06 01:47:03',14,'EXECUTED','8:5815f009824e2223462f6642d98d1007','createTable tableName=embargos','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003151-1-relations','jhipster','config/liquibase/changelog/20191106003151_added_entity_Embargos.xml','2019-11-06 01:47:03',15,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003152-1','jhipster','config/liquibase/changelog/20191106003152_added_entity_Concpremios.xml','2019-11-06 01:47:03',16,'EXECUTED','8:30e37a8b585aa26a98231a8a5c80eeb9','createTable tableName=concpremios','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003152-1-relations','jhipster','config/liquibase/changelog/20191106003152_added_entity_Concpremios.xml','2019-11-06 01:47:03',17,'EXECUTED','8:d41d8cd98f00b204e9800998ecf8427e','empty','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003146-2','jhipster','config/liquibase/changelog/20191106003146_added_entity_constraints_Licencia.xml','2019-11-06 01:47:03',18,'EXECUTED','8:ccac7fd6243bfb759d03c442f2a0234a','addForeignKeyConstraint baseTableName=licencia, constraintName=fk_licencia_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003147-2','jhipster','config/liquibase/changelog/20191106003147_added_entity_constraints_OtrosServiciosPrestados.xml','2019-11-06 01:47:04',19,'EXECUTED','8:fed35af850f559223a9efa463fd463bc','addForeignKeyConstraint baseTableName=otros_servicios_prestados, constraintName=fk_otros_servicios_prestados_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003148-2','jhipster','config/liquibase/changelog/20191106003148_added_entity_constraints_PenasDisciplinariasSufridas.xml','2019-11-06 01:47:04',20,'EXECUTED','8:724ca625a0a32aeac892ed7d4fd7432c','addForeignKeyConstraint baseTableName=penas_disciplinarias_sufridas, constraintName=fk_penas_disciplinarias_sufridas_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003149-2','jhipster','config/liquibase/changelog/20191106003149_added_entity_constraints_Garantia.xml','2019-11-06 01:47:04',21,'EXECUTED','8:354f90b66fcd70db17293121561748f6','addForeignKeyConstraint baseTableName=garantia, constraintName=fk_garantia_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003150-2','jhipster','config/liquibase/changelog/20191106003150_added_entity_constraints_AltasAscensosBajas.xml','2019-11-06 01:47:04',22,'EXECUTED','8:74ae9c96932da20f647cc15129cf6066','addForeignKeyConstraint baseTableName=altas_ascensos_bajas, constraintName=fk_altas_ascensos_bajas_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003151-2','jhipster','config/liquibase/changelog/20191106003151_added_entity_constraints_Embargos.xml','2019-11-06 01:47:04',23,'EXECUTED','8:48766df7578024833987ffaf97ec68b0','addForeignKeyConstraint baseTableName=embargos, constraintName=fk_embargos_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018'),('20191106003152-2','jhipster','config/liquibase/changelog/20191106003152_added_entity_constraints_Concpremios.xml','2019-11-06 01:47:04',24,'EXECUTED','8:ae401c9e383b45a15e05b7895152e9b7','addForeignKeyConstraint baseTableName=concpremios, constraintName=fk_concpremios_persona_id, referencedTableName=persona','',NULL,'3.6.3',NULL,NULL,'3004820018');
/*!40000 ALTER TABLE `databasechangelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databasechangeloglock`
--

DROP TABLE IF EXISTS `databasechangeloglock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangeloglock`
--

LOCK TABLES `databasechangeloglock` WRITE;
/*!40000 ALTER TABLE `databasechangeloglock` DISABLE KEYS */;
INSERT INTO `databasechangeloglock` VALUES (1,_binary '\0',NULL,NULL);
/*!40000 ALTER TABLE `databasechangeloglock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `embargos`
--

DROP TABLE IF EXISTS `embargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `embargos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `juzgado` varchar(255) DEFAULT NULL,
  `acreedor` varchar(255) DEFAULT NULL,
  `cantidad` varchar(255) DEFAULT NULL,
  `expediente` varchar(255) DEFAULT NULL,
  `fianza_o_deuda_propia` varchar(255) DEFAULT NULL,
  `origen_de_la_deuda` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `levantada` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_embargos_persona_id` (`persona_id`),
  CONSTRAINT `fk_embargos_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `embargos`
--

LOCK TABLES `embargos` WRITE;
/*!40000 ALTER TABLE `embargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `embargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garantia`
--

DROP TABLE IF EXISTS `garantia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garantia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `presentada_fecha` date DEFAULT NULL,
  `garantia` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_garantia_persona_id` (`persona_id`),
  CONSTRAINT `fk_garantia_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garantia`
--

LOCK TABLES `garantia` WRITE;
/*!40000 ALTER TABLE `garantia` DISABLE KEYS */;
/*!40000 ALTER TABLE `garantia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_authority`
--

DROP TABLE IF EXISTS `jhi_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_authority`
--

LOCK TABLES `jhi_authority` WRITE;
/*!40000 ALTER TABLE `jhi_authority` DISABLE KEYS */;
INSERT INTO `jhi_authority` VALUES ('ROLE_ADMIN'),('ROLE_USER');
/*!40000 ALTER TABLE `jhi_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_audit_event`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_persistent_audit_event` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` varchar(50) NOT NULL,
  `event_date` timestamp NULL DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `idx_persistent_audit_event` (`principal`,`event_date`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_audit_event`
--

LOCK TABLES `jhi_persistent_audit_event` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_audit_event` DISABLE KEYS */;
INSERT INTO `jhi_persistent_audit_event` VALUES (1,'admin','2019-11-06 02:21:19','AUTHENTICATION_SUCCESS'),(2,'admin','2019-11-06 02:51:38','AUTHENTICATION_SUCCESS'),(3,'admin','2019-11-06 02:54:07','AUTHENTICATION_SUCCESS'),(4,'admin','2019-11-06 03:47:34','AUTHENTICATION_SUCCESS'),(5,'admin','2019-11-06 03:59:15','AUTHENTICATION_SUCCESS'),(6,'admin','2019-11-06 04:10:10','AUTHENTICATION_SUCCESS');
/*!40000 ALTER TABLE `jhi_persistent_audit_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_audit_evt_data`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_evt_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_persistent_audit_evt_data` (
  `event_id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`name`),
  KEY `idx_persistent_audit_evt_data` (`event_id`),
  CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_audit_evt_data`
--

LOCK TABLES `jhi_persistent_audit_evt_data` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_audit_evt_data` DISABLE KEYS */;
INSERT INTO `jhi_persistent_audit_evt_data` VALUES (1,'remoteAddress','172.18.0.1'),(2,'remoteAddress','172.18.0.1'),(3,'remoteAddress','172.18.0.1'),(4,'remoteAddress','172.18.0.1'),(5,'remoteAddress','172.18.0.1'),(6,'remoteAddress','172.18.0.1');
/*!40000 ALTER TABLE `jhi_persistent_audit_evt_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_token`
--

DROP TABLE IF EXISTS `jhi_persistent_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_persistent_token` (
  `series` varchar(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `token_value` varchar(20) NOT NULL,
  `token_date` date DEFAULT NULL,
  `ip_address` varchar(39) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`series`),
  KEY `fk_user_persistent_token` (`user_id`),
  CONSTRAINT `fk_user_persistent_token` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_token`
--

LOCK TABLES `jhi_persistent_token` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_token` DISABLE KEYS */;
INSERT INTO `jhi_persistent_token` VALUES ('Q3A3crmNoDqP088BBNFF',3,'vp4HZE452h34CTi0FusR','2019-11-06','172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) electron-quick-start/1.0.0 Chrome/78.0.3904.94 Electron/7.1.0 Safari/537.36');
/*!40000 ALTER TABLE `jhi_persistent_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user`
--

DROP TABLE IF EXISTS `jhi_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(10) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_login` (`login`),
  UNIQUE KEY `ux_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user`
--

LOCK TABLES `jhi_user` WRITE;
/*!40000 ALTER TABLE `jhi_user` DISABLE KEYS */;
INSERT INTO `jhi_user` VALUES (1,'system','$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG','System','System','system@localhost','',_binary '','es',NULL,NULL,'system',NULL,NULL,'system',NULL),(2,'anonymoususer','$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO','Anonymous','User','anonymous@localhost','',_binary '','es',NULL,NULL,'system',NULL,NULL,'system',NULL),(3,'admin','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','admin@localhost','',_binary '','es',NULL,NULL,'system',NULL,NULL,'system',NULL),(4,'user','$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K','User','User','user@localhost','',_binary '','es',NULL,NULL,'system',NULL,NULL,'system',NULL);
/*!40000 ALTER TABLE `jhi_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user_authority`
--

DROP TABLE IF EXISTS `jhi_user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user_authority`
--

LOCK TABLES `jhi_user_authority` WRITE;
/*!40000 ALTER TABLE `jhi_user_authority` DISABLE KEYS */;
INSERT INTO `jhi_user_authority` VALUES (1,'ROLE_ADMIN'),(3,'ROLE_ADMIN'),(1,'ROLE_USER'),(3,'ROLE_USER'),(4,'ROLE_USER');
/*!40000 ALTER TABLE `jhi_user_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `licencia`
--

DROP TABLE IF EXISTS `licencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `licencia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_licencia` date DEFAULT NULL,
  `referencias` varchar(255) DEFAULT NULL,
  `numero_de_dias` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `usuarios_mod` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_licencia_persona_id` (`persona_id`),
  CONSTRAINT `fk_licencia_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licencia`
--

LOCK TABLES `licencia` WRITE;
/*!40000 ALTER TABLE `licencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `licencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otros_servicios_prestados`
--

DROP TABLE IF EXISTS `otros_servicios_prestados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otros_servicios_prestados` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `referencias` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_otros_servicios_prestados_persona_id` (`persona_id`),
  CONSTRAINT `fk_otros_servicios_prestados_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otros_servicios_prestados`
--

LOCK TABLES `otros_servicios_prestados` WRITE;
/*!40000 ALTER TABLE `otros_servicios_prestados` DISABLE KEYS */;
/*!40000 ALTER TABLE `otros_servicios_prestados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penas_disciplinarias_sufridas`
--

DROP TABLE IF EXISTS `penas_disciplinarias_sufridas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penas_disciplinarias_sufridas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `expediente` varchar(255) DEFAULT NULL,
  `referencias` varchar(255) DEFAULT NULL,
  `persona_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_penas_disciplinarias_sufridas_persona_id` (`persona_id`),
  CONSTRAINT `fk_penas_disciplinarias_sufridas_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penas_disciplinarias_sufridas`
--

LOCK TABLES `penas_disciplinarias_sufridas` WRITE;
/*!40000 ALTER TABLE `penas_disciplinarias_sufridas` DISABLE KEYS */;
/*!40000 ALTER TABLE `penas_disciplinarias_sufridas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `cuil` varchar(50) NOT NULL,
  `dni` int(11) NOT NULL,
  `legajo` int(11) NOT NULL,
  `apodo` varchar(50) DEFAULT NULL,
  `foto` longblob,
  `foto_content_type` varchar(255) DEFAULT NULL,
  `soltero` varchar(50) DEFAULT NULL,
  `casado` varchar(50) DEFAULT NULL,
  `conviviente` varchar(50) DEFAULT NULL,
  `viudo` varchar(50) DEFAULT NULL,
  `domicilio` varchar(50) DEFAULT NULL,
  `lugar` varchar(50) DEFAULT NULL,
  `calle` varchar(50) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `telefonofijo` varchar(50) DEFAULT NULL,
  `numerodecelular` varchar(50) DEFAULT NULL,
  `oficioprofecion` varchar(50) DEFAULT NULL,
  `niveldeestudios` varchar(50) DEFAULT NULL,
  `gruposanguineo` varchar(50) DEFAULT NULL,
  `factor` varchar(50) DEFAULT NULL,
  `donante` varchar(50) DEFAULT NULL,
  `diabetes` varchar(50) DEFAULT NULL,
  `hipertension` varchar(50) DEFAULT NULL,
  `alergias` varchar(50) DEFAULT NULL,
  `asma` varchar(50) DEFAULT NULL,
  `otros` varchar(50) DEFAULT NULL,
  `fechadeingreso` date DEFAULT NULL,
  `instrumentolegal` varchar(50) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `item` varchar(50) DEFAULT NULL,
  `planta` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `annos` int(11) DEFAULT NULL,
  `meses` int(11) DEFAULT NULL,
  `dias` int(11) DEFAULT NULL,
  `realizocomputodeservicios` varchar(50) DEFAULT NULL,
  `poseeconocimientoenmaquinasviales` varchar(50) DEFAULT NULL,
  `casoemergenciacelular` varchar(50) DEFAULT NULL,
  `casoemergenciafijo` varchar(50) DEFAULT NULL,
  `casoemergencianombre` varchar(50) DEFAULT NULL,
  `casoemergenciacelular_2` varchar(50) DEFAULT NULL,
  `casoemergenciafijo_2` varchar(50) DEFAULT NULL,
  `casoemergencianombre_2` varchar(50) DEFAULT NULL,
  `familiaracargonombre` varchar(50) DEFAULT NULL,
  `familiaracargonombre_2` varchar(50) DEFAULT NULL,
  `familiaracargonombre_3` varchar(50) DEFAULT NULL,
  `familiaracargonombre_4` varchar(50) DEFAULT NULL,
  `familiaracargonombre_5` varchar(50) DEFAULT NULL,
  `familiaracargodni` varchar(50) DEFAULT NULL,
  `familiaracargodni_2` varchar(50) DEFAULT NULL,
  `familiaracargodni_3` varchar(50) DEFAULT NULL,
  `familiaracargodni_4` varchar(50) DEFAULT NULL,
  `familiaracargodni_5` varchar(50) DEFAULT NULL,
  `familiaracargoedad` varchar(50) DEFAULT NULL,
  `familiaracargoedad_2` varchar(50) DEFAULT NULL,
  `familiaracargoedad_3` varchar(50) DEFAULT NULL,
  `familiaracargoedad_4` varchar(50) DEFAULT NULL,
  `familiaracargoedad_5` varchar(50) DEFAULT NULL,
  `altura` varchar(50) DEFAULT NULL,
  `barrio` varchar(50) DEFAULT NULL,
  `estudiosincompletos` varchar(50) DEFAULT NULL,
  `conyugeapellido` varchar(50) DEFAULT NULL,
  `conyugenombre` varchar(50) DEFAULT NULL,
  `conyugedni` int(11) DEFAULT NULL,
  `conyugecuil` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_2` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_3` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_4` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_5` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_6` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_7` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_8` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_9` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_10` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombre_11` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_2` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_3` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_4` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_5` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_6` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_7` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_8` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_9` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_10` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombreedad_11` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombredni` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_2` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_3` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_4` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_5` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_6` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_7` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_8` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_9` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_10` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombredni_11` int(11) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_2` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_4` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_3` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_5` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_6` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_7` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_8` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_9` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_10` varchar(50) DEFAULT NULL,
  `grupofamiliarapellidonombrefamiliar_11` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (2,'fdg','dfsdf','fsdfsdf',3423423,34234,'423423',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-06 23:47:30
