-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mini_commerce
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,33,'585 Stracke Vista','Fort Edmondtown','Indiana','97359-1481','Reunion',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(2,15,'540 Casimer Crossroad','Hicksville','Alabama','15312','Belarus',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(3,14,'904 Zora Hollow','McCulloughboro','Alabama','50730','Sweden',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(4,14,'18820 Ash Close','Chandler','Nevada','46760-3820','Somalia',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(5,26,'727 Cherry Close','Gusikowskiworth','Kansas','28418','Uganda',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(6,26,'50024 Chestnut Street','Las Vegas','Vermont','65285','Saint Pierre and Miquelon',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(7,49,'49720 State Street','Iowa City','New Jersey','91258','Cayman Islands',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(8,46,'4307 Bruen Cape','New Ramon','Massachusetts','98646','Oman',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(9,46,'152 Hayes Lane','Jordaneburgh','Maine','76281','Anguilla',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(10,10,'178 Edna Lodge','Chattanooga','Montana','34177','Turkey',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(11,11,'447 Bernita Valley','New Clair','Illinois','41348','Moldova',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(12,11,'43502 Washington Avenue','Hillsfield','Wisconsin','83542-7162','Dominica',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(13,11,'2710 Bogan Falls','Aspen Hill','West Virginia','32026-2484','Monaco',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(14,42,'59021 Imogene Brooks','New Stephonborough','Kansas','29404','Eritrea',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(15,42,'27630 Gloria Manor','Haverhill','Nevada','47296','Democratic People\'s Republic of Korea',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(16,3,'17313 Angelina Canyon','West Laurencefort','Nevada','92062-7846','Paraguay',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(17,3,'1478 Jaquelin Plains','Matildafield','Maryland','32972','Paraguay',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(18,3,'2620 W Washington Street','Fort Milanstead','California','86631','Zambia',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(19,21,'617 Pagac Expressway','West Jaquelinemouth','Delaware','14218','Bouvet Island',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(20,21,'184 Grange Close','Lake Jalenbury','California','28917-3386','Barbados',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(21,51,'339 Orn Crest','Kuhnburgh','New York','67245','Bulgaria',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(22,6,'671 Anne Alley','Ernserton','Kansas','16203-7215','Estonia',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(23,6,'3251 Church Path','Pomona','Idaho','38454-5360','Senegal',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(24,6,'465 Wolff Route','Labadieboro','Massachusetts','78971','Morocco',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(25,28,'34710 13th Street','Lancaster','Connecticut','19534','British Indian Ocean Territory (Chagos Archipelago)',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(26,28,'1670 Delta Gateway','Mosciskifort','Iowa','23076-4105','Denmark',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(27,39,'8982 Lake Street','Jakeboro','Texas','35238','Venezuela',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(28,39,'993 Stark Mill','Lake Hiram','South Dakota','59781','Tajikistan',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(29,39,'7776 Waters Fords','Lake Colefield','North Carolina','48972-2111','Fiji',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(30,2,'9928 Lesch Pine','Broomfield','Ohio','11655-0998','Netherlands',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(31,20,'516 W 9th Street','Lake Erinboro','Nevada','53199-7693','Virgin Islands, U.S.',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(32,20,'178 Daniel Route','Rogersport','South Carolina','59729-3031','Egypt',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(33,12,'6585 Parisian Parkways','Alecstead','Ohio','09952','Vietnam',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(34,12,'9751 N Main','Dachberg','Alaska','52044-9387','Gabon',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(35,12,'2902 Witting Alley','Rosemead','Mississippi','19427','Libyan Arab Jamahiriya',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(36,32,'68120 Daniella Circles','Palm Beach Gardens','Nevada','87492-9359','San Marino',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(37,32,'4015 E 1st Street','Tonytown','Texas','19631-1119','Thailand',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(38,36,'7650 Nina Square','New Emmettboro','Indiana','63674-9536','Papua New Guinea',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(39,25,'6084 Torphy Curve','South Kyler','Texas','83280-9389','Canada',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(40,25,'7827 Brakus Orchard','Oro Valley','Rhode Island','41004','Gibraltar',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(41,25,'284 Powlowski Plaza','South Tomascester','North Dakota','29529-3351','Cook Islands',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(42,41,'66892 Gina Station','Feltonfort','Nevada','37811','Norway',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(43,1,'824 Kuphal Lake','North Eric','New Mexico','88476-7910','Trinidad and Tobago',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(44,40,'4829 Willard Via','New Marguerite','Maine','82260-6699','Burundi',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(45,40,'57814 Calista Harbors','Macchester','Illinois','01249-0036','Sierra Leone',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(46,45,'19337 Dicki Stravenue','New Mistyland','Wyoming','28277-5866','Cambodia',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(47,45,'93673 Weldon Squares','Ritchiestad','Wyoming','50028','Guadeloupe',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(48,45,'12228 Adams Street','Merlinfort','Wyoming','87168','Montenegro',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(49,34,'82022 Von Radial','North Irvingport','Utah','88459-5228','Mozambique',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(50,34,'1283 Frami Rapids','Berthaworth','Missouri','22668-2708','Zimbabwe',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(51,34,'71575 Zboncak Shoal','West Hilmafurt','Iowa','11157','Mexico',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(52,44,'55395 Leuschke Village','Lake Sean','Rhode Island','82799-5794','San Marino',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(53,44,'325 Rutherford Rest','East Samara','Arkansas','57046','Faroe Islands',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(54,38,'47944 Uriah Greens','New Alessiachester','Alabama','41389','Haiti',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(55,38,'85567 Boyle Glens','Santa Rosa','New York','29030','Macao',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(56,16,'83852 Littel Underpass','East Emmie','Kansas','61233-8339','Cambodia',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(57,43,'11481 Amani Crescent','Dariantown','Texas','29830-7292','Canada',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(58,27,'129 Lorena Parkways','Huntsville','Nevada','38869','Jordan',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(59,27,'21042 E Front Street','West Brown','Nebraska','62177','Hungary',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(60,37,'9403 Dorothea Bypass','Port Dock','South Dakota','32288-5739','Antigua and Barbuda',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(61,37,'43763 McLaughlin Landing','Murazikchester','Kentucky','43889','Timor-Leste',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(62,4,'9224 Weber Shoal','Lewisville','Maine','13998-7956','Guam',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(63,4,'1292 Larson Forge','Domenicafield','Florida','87144-3562','Iceland',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(64,29,'7577 River Road','West Samantha','Rhode Island','97248','Bulgaria',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(65,29,'2853 E 6th Avenue','Fritschshire','Louisiana','55123','Maldives',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(66,9,'835 Serena Extensions','New Calistastad','Illinois','55943-7060','Western Sahara',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(67,9,'331 Nelda Forks','North Chadd','Arizona','19363-2833','Christmas Island',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(68,9,'34064 5th Street','El Cajon','Missouri','14535','Albania',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(69,7,'44992 Lemke Rest','New Brianahaven','South Carolina','92363-0463','Grenada',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(70,7,'1463 Commercial Road','Las Cruces','Louisiana','05776-8428','Guyana',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(71,50,'9795 Mertz Common','Pinellas Park','Minnesota','69649-5084','Syrian Arab Republic',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(72,50,'18085 Shyann Corners','Cristfurt','Colorado','29847-4551','Tajikistan',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(73,50,'113 Wendell Ville','Port Nia','North Carolina','06749','Slovenia',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(74,5,'3010 Hermiston River','Ivahshire','Nebraska','27542','Barbados',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(75,5,'488 The Copse','North Alessiafurt','Illinois','23027','Vietnam',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(76,22,'45462 Luigi Heights','Lawrence','California','05914','South Georgia and the South Sandwich Islands',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(77,22,'51038 Hand View','Wyattshire','Maine','99362','Bonaire, Sint Eustatius and Saba',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(78,22,'581 N Center Street','East Staceystad','Oklahoma','64059-3114','Peru',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(79,13,'9204 Mount Street','West Josiannefield','Louisiana','75295-6510','Saint Pierre and Miquelon',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(80,13,'1895 West Lane','Bashirianstead','Washington','66785','Virgin Islands, British',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(81,13,'686 Chasity Unions','Harveyfurt','Maryland','60452-0778','San Marino',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(82,35,'4394 Purdy Ways','Port Eleonorestead','Illinois','59998-6247','Virgin Islands, British',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(83,17,'5826 Manor Road','Lucileport','Wisconsin','28702','El Salvador',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(84,17,'469 Kuhlman Way','New Vedafurt','Washington','37159','Senegal',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(85,17,'3718 Gretchen Crossroad','Uptoncester','Missouri','46320-0655','Portugal',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(86,18,'9225 Ray Parkway','Portsmouth','Massachusetts','51478-6910','Sao Tome and Principe',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(87,18,'5613 Orpha Lake','Annandale','New Mexico','85195','Azerbaijan',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(88,30,'531 Shany Hills','South Scotty','Maryland','30262','Austria',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(89,30,'21522 Ward Corners','Beattystad','Kansas','45807','Timor-Leste',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(90,30,'32353 Abdullah Ridge','Delano','Pennsylvania','21136','Netherlands',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(91,47,'58571 Yessenia Union','Manteca','Kentucky','20791-9784','Lao People\'s Democratic Republic',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(92,47,'5488 Thiel Summit','Port Meghanland','Kentucky','14066-8442','Malta',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(93,31,'862 Fannie Stream','South Effieville','North Dakota','91590-9802','France',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(94,31,'2715 N 5th Street','Bednarhaven','New Hampshire','66415-8443','Turkmenistan',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(95,31,'705 Lebsack Inlet','Lake Ivaworth','Maryland','00893-1454','Reunion',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(96,8,'997 London Road','North Emory','Georgia','46993','Honduras',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(97,8,'378 Colin Green','New Einoside','Georgia','00656','India',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(98,8,'7372 Oxford Street','West Hyman','Kentucky','85086','Slovenia',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(99,19,'235 Parkside','West Rubye','Alabama','59953','Bouvet Island',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(100,24,'628 Roxanne Harbors','Elsabury','Indiana','27812-9422','Russian Federation',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(101,24,'246 Woodlands Road','Kittyville','Michigan','31309-7823','Croatia',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(102,48,'8677 Tower Road','Fort Minervamouth','Oklahoma','89461','Trinidad and Tobago',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(103,48,'723 Raul Ferry','East Oren','New Jersey','66914-6277','Spain',0,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(104,23,'5094 Priory Road','New Kailee','Arizona','63211-3442','Hungary',1,'2025-05-09 13:46:15','2025-05-09 13:46:15');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `parent_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics','Innovative Soap featuring lined technology and Concrete construction',NULL,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(2,'Smartphones','The Walter Bacon is the latest in a series of motionless products from Bradtke and Sons',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(3,'Laptops','The Uriah Chips is the latest in a series of uncommon products from McGlynn - Upton',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(4,'Tablets','The Floyd Computer is the latest in a series of illustrious products from Halvorson, Haag and Wuckert',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(5,'Accessories','Innovative Keyboard featuring urban technology and Bronze construction',1,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(6,'Clothing','Our kangaroo-friendly Salad ensures improbable comfort for your pets',NULL,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(7,'Men\'s Clothing','New Tuna model with 100 GB RAM, 380 GB storage, and handsome features',6,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(8,'Women\'s Clothing','Frozen Ball designed with Silk for elderly performance',6,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(9,'Children\'s Clothing','Stylish Pants designed to make you stand out with impressive looks',6,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(10,'Home & Kitchen','Frozen Ball designed with Bronze for terrible performance',NULL,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(11,'Appliances','Savor the smoky essence in our Sausages, designed for subdued culinary adventures',10,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(12,'Furniture','New Chips model with 36 GB RAM, 50 GB storage, and mammoth features',10,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(13,'Kitchenware','Discover the crocodile-like agility of our Bike, perfect for mammoth users',10,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(14,'Books','New Fish model with 94 GB RAM, 287 GB storage, and dark features',NULL,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(15,'Fiction','Discover the kangaroo-like agility of our Sausages, perfect for infatuated users',14,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(16,'Non-fiction','Stylish Hat designed to make you stand out with colossal looks',14,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(17,'Educational','Discover the rosy new Bike with an exciting mix of Steel ingredients',14,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(18,'Sports & Outdoors','Discover the shark-like agility of our Ball, perfect for confused users',NULL,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(19,'Sports Equipment','New Towels model with 8 GB RAM, 979 GB storage, and delectable features',18,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(20,'Camping Gear','Discover the comfortable new Cheese with an exciting mix of Bamboo ingredients',18,'2025-05-09 13:46:15','2025-05-09 13:46:15'),(21,'Fitness','Discover the ostrich-like agility of our Keyboard, perfect for wilted users',18,'2025-05-09 13:46:15','2025-05-09 13:46:15');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_code_lock`
--

DROP TABLE IF EXISTS `order_code_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_code_lock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_sequence` int NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_code_lock`
--

LOCK TABLES `order_code_lock` WRITE;
/*!40000 ALTER TABLE `order_code_lock` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_code_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  `address_id` int NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_pk` (`number`),
  KEY `user_id` (`user_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_code_lock`
--

DROP TABLE IF EXISTS `product_code_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_code_lock` (
  `id` int NOT NULL,
  `last_sequence` int NOT NULL DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_code_lock`
--

LOCK TABLES `product_code_lock` WRITE;
/*!40000 ALTER TABLE `product_code_lock` DISABLE KEYS */;
INSERT INTO `product_code_lock` VALUES (1,100,'2025-05-09 13:48:12');
/*!40000 ALTER TABLE `product_code_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `sequence_number` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'P-0001',NULL,'Awesome Concrete Shoes','New Keyboard model with 24 GB RAM, 771 GB storage, and somber features',146.71,58,10,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(2,'P-0002',NULL,'Handmade Ceramic Tuna','Discover the koala-like agility of our Shirt, perfect for irresponsible users',386.17,13,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(3,'P-0003',NULL,'Fresh Metal Chair','Unbranded Shoes designed with Wooden for primary performance',121.89,26,1,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(4,'P-0004',NULL,'Practical Granite Pizza','New Bike model with 1 GB RAM, 227 GB storage, and mixed features',13.70,40,14,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(5,'P-0005',NULL,'Modern Concrete Ball','Featuring Selenium-enhanced technology, our Car offers unparalleled wrong performance',228.25,87,5,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(6,'P-0006',NULL,'Electronic Wooden Gloves','Featuring Americium-enhanced technology, our Bike offers unparalleled orange performance',495.75,40,11,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(7,'P-0007',NULL,'Fresh Marble Hat','Innovative Chair featuring grandiose technology and Cotton construction',364.59,62,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(8,'P-0008',NULL,'Incredible Marble Chair','Innovative Chair featuring present technology and Bronze construction',104.59,97,14,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(9,'P-0009',NULL,'Handcrafted Silk Shoes','Our rich-inspired Towels brings a taste of luxury to your ambitious lifestyle',159.59,23,8,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(10,'P-0010',NULL,'Elegant Ceramic Fish','Ergonomic Car made with Aluminum for all-day queasy support',360.80,60,7,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(11,'P-0011',NULL,'Incredible Gold Towels','Our bird-friendly Chair ensures unwritten comfort for your pets',469.05,11,14,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(12,'P-0012',NULL,'Refined Marble Shoes','Introducing the Bouvet Island-inspired Chair, blending steep style with local craftsmanship',432.69,15,12,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(13,'P-0013',NULL,'Oriental Cotton Bike','The Carrie Table is the latest in a series of velvety products from Labadie and Sons',34.19,79,17,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(14,'P-0014',NULL,'Bespoke Metal Computer','Ryan - Waters\'s most advanced Pizza technology increases upbeat capabilities',318.09,0,1,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(15,'P-0015',NULL,'Modern Concrete Pants','Stylish Pizza designed to make you stand out with rotating looks',33.15,1,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(16,'P-0016',NULL,'Rustic Bamboo Shoes','Hudson, Adams and Cassin\'s most advanced Gloves technology increases rowdy capabilities',360.29,46,17,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(17,'P-0017',NULL,'Handmade Cotton Hat','The sleek and self-reliant Cheese comes with red LED lighting for smart functionality',177.69,92,4,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(18,'P-0018',NULL,'Handmade Granite Towels','New grey Hat with ergonomic design for unhappy comfort',330.69,25,1,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(19,'P-0019',NULL,'Luxurious Aluminum Chicken','Discover the wobbly new Shirt with an exciting mix of Wooden ingredients',173.01,3,19,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(20,'P-0020',NULL,'Bespoke Wooden Shoes','Stylish Soap designed to make you stand out with broken looks',37.09,53,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(21,'P-0021',NULL,'Unbranded Cotton Chicken','Experience the azure brilliance of our Pants, perfect for definite environments',40.19,74,3,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(22,'P-0022',NULL,'Refined Aluminum Pants','Discover the devoted new Bike with an exciting mix of Aluminum ingredients',214.90,97,13,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(23,'P-0023',NULL,'Incredible Metal Chair','Innovative Table featuring sparse technology and Gold construction',32.89,56,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(24,'P-0024',NULL,'Ergonomic Concrete Computer','Volkman Group\'s most advanced Table technology increases clean capabilities',391.49,22,12,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(25,'P-0025',NULL,'Fresh Bronze Hat','New Shirt model with 8 GB RAM, 112 GB storage, and brown features',115.08,84,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(26,'P-0026',NULL,'Electronic Plastic Towels','Ergonomic Pants made with Granite for all-day immense support',440.15,27,21,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(27,'P-0027',NULL,'Electronic Rubber Tuna','Featuring Nickel-enhanced technology, our Tuna offers unparalleled fatherly performance',282.20,78,8,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(28,'P-0028',NULL,'Generic Gold Pizza','The cyan Salad combines Lebanon aesthetics with Samarium-based durability',22.19,4,7,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(29,'P-0029',NULL,'Luxurious Bronze Cheese','The sleek and babyish Bacon comes with orange LED lighting for smart functionality',197.99,4,11,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(30,'P-0030',NULL,'Bespoke Granite Salad','Soft Car designed with Bamboo for minty performance',63.69,24,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(31,'P-0031',NULL,'Handcrafted Silk Table','New Chair model with 88 GB RAM, 410 GB storage, and pastel features',401.60,29,18,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(32,'P-0032',NULL,'Bespoke Aluminum Mouse','Introducing the Sweden-inspired Shoes, blending true style with local craftsmanship',335.03,85,8,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(33,'P-0033',NULL,'Electronic Aluminum Cheese','Boyer Inc\'s most advanced Shirt technology increases nutritious capabilities',290.90,47,13,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(34,'P-0034',NULL,'Tasty Concrete Hat','The Coty Car is the latest in a series of long-term products from Batz, Balistreri and Bednar',108.89,48,9,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(35,'P-0035',NULL,'Fantastic Aluminum Computer','Discover the rabbit-like agility of our Computer, perfect for posh users',497.50,3,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(36,'P-0036',NULL,'Intelligent Steel Chair','Discover the annual new Salad with an exciting mix of Bronze ingredients',431.59,64,12,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(37,'P-0037',NULL,'Bespoke Ceramic Chicken','Fadel - Zemlak\'s most advanced Tuna technology increases distinct capabilities',160.49,31,9,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(38,'P-0038',NULL,'Recycled Silk Tuna','Our flamingo-friendly Cheese ensures shameless comfort for your pets',160.25,28,5,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(39,'P-0039',NULL,'Recycled Gold Pants','New plum Table with ergonomic design for essential comfort',132.89,0,7,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(40,'P-0040',NULL,'Electronic Metal Salad','Introducing the Guinea-Bissau-inspired Tuna, blending private style with local craftsmanship',323.89,4,6,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(41,'P-0041',NULL,'Frozen Steel Pizza','Professional-grade Salad perfect for elderly training and recreational use',416.75,72,9,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(42,'P-0042',NULL,'Fantastic Gold Car','Stylish Keyboard designed to make you stand out with bright looks',299.79,23,1,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(43,'P-0043',NULL,'Licensed Silk Keyboard','Our frog-friendly Mouse ensures lighthearted comfort for your pets',242.70,99,11,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(44,'P-0044',NULL,'Modern Steel Keyboard','Innovative Tuna featuring firsthand technology and Bamboo construction',339.70,1,8,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(45,'P-0045',NULL,'Handmade Marble Chair','Featuring Helium-enhanced technology, our Soap offers unparalleled insidious performance',138.09,57,14,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(46,'P-0046',NULL,'Small Wooden Ball','New magenta Computer with ergonomic design for determined comfort',99.25,67,6,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(47,'P-0047',NULL,'Gorgeous Granite Salad','Discover the faint new Soap with an exciting mix of Wooden ingredients',305.69,30,13,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(48,'P-0048',NULL,'Modern Marble Ball','Stylish Sausages designed to make you stand out with metallic looks',163.99,76,6,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(49,'P-0049',NULL,'Bespoke Bronze Ball','Our bitter-inspired Salad brings a taste of luxury to your lined lifestyle',91.69,65,6,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(50,'P-0050',NULL,'Handmade Marble Bike','Experience the azure brilliance of our Computer, perfect for damp environments',350.69,0,18,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(51,'P-0051',NULL,'Rustic Wooden Keyboard','Innovative Chair featuring hurtful technology and Granite construction',348.79,1,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(52,'P-0052',NULL,'Handcrafted Metal Shoes','Our creamy-inspired Pants brings a taste of luxury to your afraid lifestyle',127.85,74,5,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(53,'P-0053',NULL,'Fantastic Rubber Soap','The sleek and plump Keyboard comes with indigo LED lighting for smart functionality',22.33,70,2,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(54,'P-0054',NULL,'Modern Silk Cheese','The tan Sausages combines Senegal aesthetics with Selenium-based durability',108.35,51,19,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(55,'P-0055',NULL,'Tasty Metal Ball','Featuring Platinum-enhanced technology, our Bacon offers unparalleled outgoing performance',286.59,30,7,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(56,'P-0056',NULL,'Unbranded Ceramic Chair','Experience the blue brilliance of our Gloves, perfect for experienced environments',496.39,64,2,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(57,'P-0057',NULL,'Fresh Cotton Ball','Stylish Pizza designed to make you stand out with trim looks',235.79,24,9,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(58,'P-0058',NULL,'Soft Gold Ball','Professional-grade Computer perfect for husky training and recreational use',434.15,95,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(59,'P-0059',NULL,'Elegant Cotton Towels','Our delicious-inspired Keyboard brings a taste of luxury to your outlandish lifestyle',365.35,74,21,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(60,'P-0060',NULL,'Electronic Bronze Hat','New cyan Chicken with ergonomic design for disloyal comfort',15.29,3,7,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(61,'P-0061',NULL,'Handmade Plastic Table','Hane - Cassin\'s most advanced Tuna technology increases unhealthy capabilities',294.39,1,19,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(62,'P-0062',NULL,'Small Wooden Keyboard','The sky blue Sausages combines Morocco aesthetics with Helium-based durability',27.39,86,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(63,'P-0063',NULL,'Tasty Wooden Car','Our bat-friendly Shoes ensures unpleasant comfort for your pets',306.95,5,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(64,'P-0064',NULL,'Bespoke Silk Pizza','Discover the butterfly-like agility of our Chair, perfect for obedient users',10.39,45,21,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(65,'P-0065',NULL,'Incredible Metal Cheese','Discover the hippopotamus-like agility of our Car, perfect for happy users',370.49,85,7,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(66,'P-0066',NULL,'Small Marble Salad','Professional-grade Pizza perfect for serpentine training and recreational use',276.39,59,21,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(67,'P-0067',NULL,'Recycled Plastic Sausages','The Sydnie Mouse is the latest in a series of whirlwind products from Collier and Sons',306.89,71,4,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(68,'P-0068',NULL,'Tasty Rubber Fish','Our turtle-friendly Towels ensures inexperienced comfort for your pets',61.05,56,10,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(69,'P-0069',NULL,'Recycled Silk Tuna','New Sausages model with 69 GB RAM, 857 GB storage, and delectable features',452.80,78,8,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(70,'P-0070',NULL,'Handmade Metal Table','The blue Hat combines Bolivia aesthetics with Phosphorus-based durability',16.00,11,11,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(71,'P-0071',NULL,'Bespoke Concrete Gloves','Professional-grade Ball perfect for gloomy training and recreational use',281.50,95,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(72,'P-0072',NULL,'Gorgeous Steel Bike','Ergonomic Fish made with Metal for all-day well-groomed support',456.35,56,19,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(73,'P-0073',NULL,'Oriental Plastic Table','Innovative Mouse featuring victorious technology and Marble construction',105.65,48,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(74,'P-0074',NULL,'Elegant Concrete Tuna','Stylish Soap designed to make you stand out with hoarse looks',357.85,70,21,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(75,'P-0075',NULL,'Fresh Concrete Mouse','Professional-grade Keyboard perfect for weary training and recreational use',166.64,3,2,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(76,'P-0076',NULL,'Handmade Plastic Table','Our bitter-inspired Chair brings a taste of luxury to your discrete lifestyle',293.05,1,18,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(77,'P-0077',NULL,'Fantastic Granite Computer','Innovative Chips featuring lawful technology and Concrete construction',485.19,3,3,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(78,'P-0078',NULL,'Recycled Wooden Bacon','Generic Cheese designed with Metal for monstrous performance',171.09,58,18,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(79,'P-0079',NULL,'Bespoke Marble Fish','Savor the fresh essence in our Cheese, designed for wordy culinary adventures',357.90,55,9,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(80,'P-0080',NULL,'Practical Concrete Chips','The Proactive maximized internet solution Mouse offers reliable performance and probable design',61.54,22,6,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(81,'P-0081',NULL,'Awesome Marble Shoes','Innovative Ball featuring squiggly technology and Wooden construction',223.09,35,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(82,'P-0082',NULL,'Awesome Ceramic Bacon','Ergonomic Keyboard designed with Bamboo for dental performance',272.96,90,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(83,'P-0083',NULL,'Tasty Cotton Table','Ergonomic Ball made with Rubber for all-day wrong support',62.85,4,13,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(84,'P-0084',NULL,'Fresh Granite Chair','Experience the black brilliance of our Keyboard, perfect for idolized environments',348.09,97,9,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(85,'P-0085',NULL,'Gorgeous Gold Pants','Bergnaum, Brown and Feil\'s most advanced Mouse technology increases rapid capabilities',45.09,43,17,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(86,'P-0086',NULL,'Oriental Cotton Chair','The mint green Chicken combines Djibouti aesthetics with Meitnerium-based durability',194.25,0,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(87,'P-0087',NULL,'Small Bronze Mouse','Stracke LLC\'s most advanced Bike technology increases outlying capabilities',29.95,50,8,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(88,'P-0088',NULL,'Oriental Steel Computer','The Peyton Sausages is the latest in a series of voluminous products from Waters - Wisozk',199.35,65,15,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(89,'P-0089',NULL,'Awesome Gold Mouse','Experience the orange brilliance of our Tuna, perfect for heavy environments',152.29,1,18,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(90,'P-0090',NULL,'Recycled Silk Computer','Our zesty-inspired Mouse brings a taste of luxury to your questionable lifestyle',194.80,71,20,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(91,'P-0091',NULL,'Bespoke Ceramic Hat','Experience the cyan brilliance of our Cheese, perfect for flustered environments',7.20,57,16,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(92,'P-0092',NULL,'Luxurious Bronze Soap','Experience the red brilliance of our Shoes, perfect for massive environments',185.90,65,2,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(93,'P-0093',NULL,'Rustic Silk Sausages','Savor the spicy essence in our Bacon, designed for austere culinary adventures',78.15,54,17,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(94,'P-0094',NULL,'Licensed Gold Pants','Introducing the Nepal-inspired Chair, blending trim style with local craftsmanship',221.59,97,17,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(95,'P-0095',NULL,'Elegant Aluminum Chair','Discover the gecko-like agility of our Mouse, perfect for trusty users',115.09,33,17,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(96,'P-0096',NULL,'Oriental Cotton Shirt','Savor the savory essence in our Table, designed for inexperienced culinary adventures',403.05,24,5,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(97,'P-0097',NULL,'Refined Cotton Bike','Ergonomic Fish made with Aluminum for all-day frequent support',98.49,72,21,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(98,'P-0098',NULL,'Luxurious Cotton Hat','Herzog, Schiller and Farrell\'s most advanced Car technology increases pessimistic capabilities',190.99,45,14,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(99,'P-0099',NULL,'Refined Marble Gloves','Stylish Chips designed to make you stand out with judicious looks',164.29,0,6,'2025-05-09 13:46:15','2025-05-09 13:48:04'),(100,'P-0100',NULL,'Handcrafted Ceramic Soap','Stylish Keyboard designed to make you stand out with late looks',382.09,1,1,'2025-05-09 13:46:15','2025-05-09 13:48:04');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_schedule`
--

DROP TABLE IF EXISTS `task_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(100) NOT NULL,
  `task_type` enum('one-time','recurring') NOT NULL,
  `status` enum('pending','running','completed','failed') DEFAULT 'pending',
  `schedule_time` timestamp NOT NULL,
  `last_run_time` timestamp NULL DEFAULT NULL,
  `data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_schedule`
--

LOCK TABLES `task_schedule` WRITE;
/*!40000 ALTER TABLE `task_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@example.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Admin User','1-804-647-6759 x2262','2025-05-09 13:46:15','2025-05-09 14:09:49'),(2,'Demetrius_Willms@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Demetrius Willms','1-460-242-5949','2025-05-09 13:46:15','2025-05-09 14:09:49'),(3,'Myles_Padberg5@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Myles Padberg','1-211-762-0263 x516','2025-05-09 13:46:15','2025-05-09 14:09:50'),(4,'Freeda_Zboncak52@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Freeda Zboncak','358-804-2415 x506','2025-05-09 13:46:15','2025-05-09 14:09:49'),(5,'Lue.Lebsack41@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Lue Lebsack','597.402.3643 x7089','2025-05-09 13:46:15','2025-05-09 14:09:49'),(6,'Hobart.Olson@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Hobart Olson','1-300-806-9111 x535','2025-05-09 13:46:15','2025-05-09 14:09:49'),(7,'Miguel_Gerhold82@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Miguel Gerhold','564.226.3109 x046','2025-05-09 13:46:15','2025-05-09 14:09:49'),(8,'Darrion.Harvey@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Darrion Harvey','846.311.1920','2025-05-09 13:46:15','2025-05-09 14:09:50'),(9,'Jamarcus_Gerhold@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Jamarcus Gerhold','448-573-8808 x5949','2025-05-09 13:46:15','2025-05-09 14:09:50'),(10,'Drew.Dicki48@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Drew Dicki','(722) 825-0120 x320','2025-05-09 13:46:15','2025-05-09 14:09:50'),(11,'Carleton_Crooks-Cole@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Carleton Crooks-Cole','(746) 252-4478 x5076','2025-05-09 13:46:15','2025-05-09 14:09:49'),(12,'Gia_Schoen28@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Gia Schoen','1-628-264-4906 x850','2025-05-09 13:46:15','2025-05-09 14:09:49'),(13,'Agnes.Rodriguez@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Agnes Rodriguez','613-981-2003 x62016','2025-05-09 13:46:15','2025-05-09 14:09:50'),(14,'Willy.Zboncak39@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Willy Zboncak','(487) 581-1891','2025-05-09 13:46:15','2025-05-09 14:09:50'),(15,'Bryce.Wehner46@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Bryce Wehner','(428) 407-7265 x8746','2025-05-09 13:46:15','2025-05-09 14:09:50'),(16,'Daniela.Macejkovic@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Daniela Macejkovic','1-998-683-7691','2025-05-09 13:46:15','2025-05-09 14:09:49'),(17,'Marlene.Hettinger@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Marlene Hettinger','644.246.7444 x592','2025-05-09 13:46:15','2025-05-09 14:09:50'),(18,'Matilde.Beier98@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Matilde Beier','683.394.6313 x580','2025-05-09 13:46:15','2025-05-09 14:09:50'),(19,'Marianna.Pfannerstill@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Marianna Pfannerstill','865-491-9432 x304','2025-05-09 13:46:15','2025-05-09 14:09:50'),(20,'Mabelle_Block61@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Mabelle Block','1-562-685-3522 x4361','2025-05-09 13:46:15','2025-05-09 14:09:49'),(21,'Karlee_Waelchi40@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Karlee Waelchi','1-230-336-2874 x4632','2025-05-09 13:46:15','2025-05-09 14:09:50'),(22,'Daija_Rosenbaum42@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Daija Rosenbaum','604-608-4867 x4041','2025-05-09 13:46:15','2025-05-09 14:09:50'),(23,'Lorenzo.Kirlin28@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Lorenzo Kirlin','992-790-7570 x918','2025-05-09 13:46:15','2025-05-09 14:09:50'),(24,'Kenton.Walker88@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Kenton Walker','954-355-0818 x985','2025-05-09 13:46:15','2025-05-09 14:09:49'),(25,'Lyric.Luettgen@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Lyric Luettgen','1-747-846-5691','2025-05-09 13:46:15','2025-05-09 14:09:50'),(26,'Domenick_Murphy@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Domenick Murphy','(559) 787-8902','2025-05-09 13:46:15','2025-05-09 14:09:49'),(27,'Enrico_Farrell90@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Enrico Farrell','278-364-5327 x31332','2025-05-09 13:46:15','2025-05-09 14:09:50'),(28,'Rogelio_Labadie@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Rogelio Labadie','1-328-806-9838 x448','2025-05-09 13:46:15','2025-05-09 14:09:50'),(29,'Deontae.Heidenreich-Gusikowski@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Deontae Heidenreich-Gusikowski','423.820.6436 x27771','2025-05-09 13:46:15','2025-05-09 14:09:49'),(30,'Carli_Gusikowski25@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Carli Gusikowski','720.304.6044 x5746','2025-05-09 13:46:15','2025-05-09 14:09:50'),(31,'Laron.Hahn13@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Laron Hahn','753.874.8877 x894','2025-05-09 13:46:15','2025-05-09 14:09:49'),(32,'Vernice_Veum93@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Vernice Veum','1-652-451-2104 x664','2025-05-09 13:46:15','2025-05-09 14:09:49'),(33,'Haskell.Schulist@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Haskell Schulist','(322) 333-9835 x164','2025-05-09 13:46:15','2025-05-09 14:09:50'),(34,'Cristobal_Haley@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Cristobal Haley','1-892-871-5655','2025-05-09 13:46:15','2025-05-09 14:09:50'),(35,'Trent.Feeney49@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Trent Feeney','621-877-3548 x4809','2025-05-09 13:46:15','2025-05-09 14:09:50'),(36,'Stone.Windler66@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Stone Windler','1-704-501-2464','2025-05-09 13:46:15','2025-05-09 14:09:49'),(37,'Maryjane_Feest86@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Maryjane Feest','325-515-3380','2025-05-09 13:46:15','2025-05-09 14:09:50'),(38,'Garland_Witting55@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Garland Witting','1-997-243-9497 x6893','2025-05-09 13:46:15','2025-05-09 14:09:50'),(39,'Nina.Wolff@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Nina Wolff','1-356-901-7139','2025-05-09 13:46:15','2025-05-09 14:09:49'),(40,'Queen_VonRueden95@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Queen VonRueden','1-814-296-2759','2025-05-09 13:46:15','2025-05-09 14:09:50'),(41,'Wilhelmine_Effertz19@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Wilhelmine Effertz','1-781-603-7277 x067','2025-05-09 13:46:15','2025-05-09 14:09:49'),(42,'Durward_Kiehn@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Durward Kiehn','(954) 606-7397 x1724','2025-05-09 13:46:15','2025-05-09 14:09:49'),(43,'Antonia.Borer@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Antonia Borer','251.639.9800 x324','2025-05-09 13:46:15','2025-05-09 14:09:49'),(44,'Gayle.Wisoky@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Gayle Wisoky','1-946-784-7258 x5234','2025-05-09 13:46:15','2025-05-09 14:09:49'),(45,'Jay.Emard@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Jay Emard','1-857-438-8296 x352','2025-05-09 13:46:15','2025-05-09 14:09:49'),(46,'Darrel_Hagenes99@hotmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Darrel Hagenes','(705) 462-6787','2025-05-09 13:46:15','2025-05-09 14:09:50'),(47,'Shane.Nader@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Shane Nader','735-612-9264 x702','2025-05-09 13:46:15','2025-05-09 14:09:50'),(48,'Aditya.Mosciski8@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Aditya Mosciski','982.876.3537 x1488','2025-05-09 13:46:15','2025-05-09 14:09:50'),(49,'Michel.Mills@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Michel Mills','(666) 809-7267 x8587','2025-05-09 13:46:15','2025-05-09 14:09:49'),(50,'Vincenzo_Anderson8@gmail.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Vincenzo Anderson','569-748-7731 x772','2025-05-09 13:46:15','2025-05-09 14:09:50'),(51,'Colleen.OConnell@yahoo.com','$2b$10$S9oiIcnJvkBRUDyuyP60suV7tJJoTh3r8Wgx8KQQVWgKEg30.2gR2','Colleen O\'Connell','1-237-235-1334 x7434','2025-05-09 13:46:15','2025-05-09 14:09:50');
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

-- Dump completed on 2025-05-09 21:11:12
