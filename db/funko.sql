-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema parcial2_funko
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `parcial2_funko` ;

-- -----------------------------------------------------
-- Schema parcial2_funko
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parcial2_funko` DEFAULT CHARACTER SET utf8 ;
USE `parcial2_funko` ;

-- -----------------------------------------------------
-- Table `funko`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `funko` ;

CREATE TABLE IF NOT EXISTS `funko` (
  `id_funko` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(150) NOT NULL,
  `imagen` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_funko`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `funko`
-- -----------------------------------------------------
START TRANSACTION;
USE `parcial2_funko`;
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (1, 'Eleven', 'Series', 'Funko pop de Eleven de Stranger Things', 'img/eleven.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (2, 'Darth Vader', 'Peliculas', 'Funko pop de Darth Vader de Star Wars', 'img/darthvader.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (3, 'Spiderman', 'Peliculas', 'Funko pop de Spiderman', 'img/spiderman.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (4, 'Harry Potter', 'Peliculas', 'Funko pop de Harry Potter', 'img/harrypotter.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (5, 'Tanjiro', 'Anime', 'Funko pop de Tanjiro', 'img/tanjiro.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (6, 'Goku', 'Anime', 'Funko pop de Goku de Dragon Ball', 'img/goku.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (7, 'Batman', 'Peliculas', 'Funko pop de Batman', 'img/batman.png');
INSERT INTO `funko` (`id_funko`, `nombre`, `categoria`, `descripcion`, `imagen`) VALUES (8, 'Luffy', 'Anime', 'Funko pop de Luffy', 'img/luffy.png');

COMMIT;

