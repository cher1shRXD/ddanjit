CREATE TABLE `activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`bundle_id` int NOT NULL,
	`instruction` longtext NOT NULL,
	`icon` enum('book','lightbulb','electronic','sound','vision') NOT NULL,
	`duration` enum('1','5','10','15','20','30','60') NOT NULL,
	`content` json NOT NULL DEFAULT ('{}'),
	`is_free` boolean NOT NULL DEFAULT false,
	`recommend_at` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 03:22:02.527',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 03:22:02.527',
	`is_accepted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `activity_id` PRIMARY KEY(`id`),
	CONSTRAINT `activity_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `play_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`activity_id` int NOT NULL,
	`played_at` datetime NOT NULL,
	`result` json NOT NULL,
	`is_skipped_recommendation` enum('no','one','all') NOT NULL DEFAULT 'no',
	CONSTRAINT `play_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bundle_ownership` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`bundle_id` int NOT NULL,
	`acquired_at` datetime NOT NULL DEFAULT '2026-03-04 03:22:02.527',
	CONSTRAINT `bundle_ownership_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bundle` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` longtext NOT NULL,
	`price` int NOT NULL DEFAULT 1900,
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 03:22:02.527',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 03:22:02.527',
	`is_public` boolean NOT NULL DEFAULT false,
	CONSTRAINT `bundle_id` PRIMARY KEY(`id`),
	CONSTRAINT `bundle_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(10),
	`birth_year` int NOT NULL DEFAULT 0,
	`gender` enum('남자','여자'),
	`email` varchar(255) NOT NULL,
	`job` varchar(50),
	`emoji` enum('smile','sunglasses') NOT NULL DEFAULT 'smile',
	`level` int NOT NULL DEFAULT 1,
	`coin` int NOT NULL DEFAULT 0,
	`benefit` enum('none','founding','inviter','invitee') NOT NULL DEFAULT 'none',
	`role` enum('admin','user','tester') NOT NULL DEFAULT 'user',
	`acquisition_source` varchar(255),
	`joined_at` datetime NOT NULL DEFAULT '2026-03-04 03:22:02.513',
	`provider` enum('google','apple') NOT NULL DEFAULT 'google',
	`oauth_id` varchar(255) NOT NULL,
	`last_played_at` datetime,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_oauth_id_unique` UNIQUE(`oauth_id`)
);
--> statement-breakpoint
ALTER TABLE `activity` ADD CONSTRAINT `activity_bundle_id_bundle_id_fk` FOREIGN KEY (`bundle_id`) REFERENCES `bundle`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `play_history` ADD CONSTRAINT `play_history_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `play_history` ADD CONSTRAINT `play_history_activity_id_activity_id_fk` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bundle_ownership` ADD CONSTRAINT `bundle_ownership_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bundle_ownership` ADD CONSTRAINT `bundle_ownership_bundle_id_bundle_id_fk` FOREIGN KEY (`bundle_id`) REFERENCES `bundle`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_recommend_filter` ON `activity` (`recommend_at`,`duration`,`is_free`);