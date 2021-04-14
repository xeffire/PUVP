CREATE TABLE `users` (
	`id` INT(5) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `projects` (
	`id` INT(5) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`description` VARCHAR(511),
	`state` BOOLEAN NOT NULL DEFAULT '0',
	`tasks_total` INT(5) NOT NULL DEFAULT '0',
	`tasks_done` INT(5) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
	`id` INT(5) NOT NULL AUTO_INCREMENT,
	`project_id` INT(5) NOT NULL,
	`description` VARCHAR(511) NOT NULL,
	`created` TIMESTAMP NOT NULL,
	`updated` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk0` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`);

