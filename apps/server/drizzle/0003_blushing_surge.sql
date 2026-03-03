CREATE TABLE `activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`bundle_id` int NOT NULL,
	`instruction` longtext NOT NULL,
	`icon` enum('book','lightbulb','electronic','sound','vision') NOT NULL,
	`duration` enum('1','5','10','15','20','30') NOT NULL,
	`content` json NOT NULL,
	`is_free` boolean NOT NULL DEFAULT false,
	`fitted_time` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT '2026-03-03 06:28:25.614',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-03 06:28:25.614',
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
CREATE TABLE `bundle` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` longtext NOT NULL,
	`price` int NOT NULL DEFAULT 1900,
	`created_at` datetime NOT NULL DEFAULT '2026-03-03 06:28:25.614',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-03 06:28:25.614',
	CONSTRAINT `bundle_id` PRIMARY KEY(`id`),
	CONSTRAINT `bundle_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `purchase_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`bundle_id` int NOT NULL,
	`is_one_time_purchase` boolean NOT NULL DEFAULT true,
	`purchased_at` datetime NOT NULL DEFAULT '2026-03-03 06:28:25.614',
	CONSTRAINT `purchase_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `joined_at` datetime NOT NULL DEFAULT '2026-03-03 06:28:25.603';--> statement-breakpoint
ALTER TABLE `user` ADD `last_played_at` datetime;--> statement-breakpoint
ALTER TABLE `activity` ADD CONSTRAINT `activity_bundle_id_bundle_id_fk` FOREIGN KEY (`bundle_id`) REFERENCES `bundle`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `play_history` ADD CONSTRAINT `play_history_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `play_history` ADD CONSTRAINT `play_history_activity_id_activity_id_fk` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase_history` ADD CONSTRAINT `purchase_history_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase_history` ADD CONSTRAINT `purchase_history_bundle_id_bundle_id_fk` FOREIGN KEY (`bundle_id`) REFERENCES `bundle`(`id`) ON DELETE no action ON UPDATE no action;