CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(10),
	`birth_year` int NOT NULL DEFAULT 0,
	`email` varchar(255) NOT NULL,
	`job` varchar(50),
	`emoji` enum('smile','sunglasses') NOT NULL DEFAULT 'smile',
	`level` int NOT NULL DEFAULT 1,
	`coin` int NOT NULL DEFAULT 0,
	`benefit` enum('none','founding','inviter','invitee') NOT NULL DEFAULT 'none',
	`role` enum('admin','user','tester') NOT NULL DEFAULT 'user',
	`acquisition_source` varchar(255),
	`joined_at` datetime NOT NULL DEFAULT '2026-02-28 10:58:53.417',
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
