ALTER TABLE `user` MODIFY COLUMN `joined_at` datetime NOT NULL DEFAULT '2026-02-28 13:27:58.652';--> statement-breakpoint
ALTER TABLE `user` ADD `provider` enum('google','apple') DEFAULT 'google' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `oauth_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_oauth_id_unique` UNIQUE(`oauth_id`);