CREATE TABLE `activity_draft` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('mind','read','act','sense') NOT NULL,
	`type` enum('write','list','acrostic','timer','read','sense') NOT NULL,
	`raw_json` json NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`reject_reason` longtext,
	`generated_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	`reviewed_at` datetime,
	`reviewed_by` int,
	CONSTRAINT `activity_draft_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity_guide_step` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activity_id` int NOT NULL,
	`order` tinyint NOT NULL,
	`text` longtext NOT NULL,
	`image_url` varchar(500),
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	CONSTRAINT `activity_guide_step_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity_prompt` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activity_id` int NOT NULL,
	`prompt` longtext NOT NULL,
	`sub_prompt` longtext,
	`keyword` varchar(100),
	`n_count` int,
	`duration_sec` int,
	`complete_message` longtext,
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	CONSTRAINT `activity_prompt_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bundle_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`instruction` longtext NOT NULL,
	`icon` enum('book','lightbulb','electronic','sound','vision') NOT NULL,
	`duration` enum('1','5','10','15','20','30','60') NOT NULL,
	`category` enum('mind','read','act','sense') NOT NULL,
	`type` enum('write','list','acrostic','timer','read','sense') NOT NULL,
	`is_free` boolean NOT NULL DEFAULT false,
	`recommend_at` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	CONSTRAINT `activity_id` PRIMARY KEY(`id`),
	CONSTRAINT `activity_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `activity_text_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activity_id` int NOT NULL,
	`text_content_id` int NOT NULL,
	CONSTRAINT `activity_text_content_id` PRIMARY KEY(`id`)
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
CREATE TABLE `text_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`author` varchar(100),
	`category` enum('essay','short_story','poem','quote') NOT NULL,
	`pages` json NOT NULL,
	`estimated_min` tinyint NOT NULL,
	`tags` json DEFAULT ('[]'),
	`is_approved` boolean NOT NULL DEFAULT false,
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	CONSTRAINT `text_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bundle_ownership` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`bundle_id` int NOT NULL,
	`acquired_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	CONSTRAINT `bundle_ownership_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bundle` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` longtext NOT NULL,
	`price` int NOT NULL DEFAULT 1900,
	`created_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
	`updated_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.473',
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
	`joined_at` datetime NOT NULL DEFAULT '2026-03-04 02:20:28.461',
	`provider` enum('google','apple') NOT NULL DEFAULT 'google',
	`oauth_id` varchar(255) NOT NULL,
	`last_played_at` datetime,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_oauth_id_unique` UNIQUE(`oauth_id`)
);
--> statement-breakpoint
ALTER TABLE `activity_draft` ADD CONSTRAINT `activity_draft_reviewed_by_user_id_fk` FOREIGN KEY (`reviewed_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_guide_step` ADD CONSTRAINT `activity_guide_step_activity_id_activity_id_fk` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_prompt` ADD CONSTRAINT `activity_prompt_activity_id_activity_id_fk` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity` ADD CONSTRAINT `activity_bundle_id_bundle_id_fk` FOREIGN KEY (`bundle_id`) REFERENCES `bundle`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_text_content` ADD CONSTRAINT `activity_text_content_activity_id_activity_id_fk` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_text_content` ADD CONSTRAINT `activity_text_content_text_content_id_text_content_id_fk` FOREIGN KEY (`text_content_id`) REFERENCES `text_content`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `play_history` ADD CONSTRAINT `play_history_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `play_history` ADD CONSTRAINT `play_history_activity_id_activity_id_fk` FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bundle_ownership` ADD CONSTRAINT `bundle_ownership_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bundle_ownership` ADD CONSTRAINT `bundle_ownership_bundle_id_bundle_id_fk` FOREIGN KEY (`bundle_id`) REFERENCES `bundle`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_status` ON `activity_draft` (`status`);--> statement-breakpoint
CREATE INDEX `idx_activity_order` ON `activity_guide_step` (`activity_id`,`order`);--> statement-breakpoint
CREATE INDEX `idx_activity_id` ON `activity_prompt` (`activity_id`);--> statement-breakpoint
CREATE INDEX `idx_recommend_filter` ON `activity` (`recommend_at`,`duration`,`is_free`);--> statement-breakpoint
CREATE INDEX `idx_activity_id` ON `activity_text_content` (`activity_id`);--> statement-breakpoint
CREATE INDEX `idx_text_content_id` ON `activity_text_content` (`text_content_id`);--> statement-breakpoint
CREATE INDEX `idx_user_played` ON `play_history` (`user_id`,`played_at`);--> statement-breakpoint
CREATE INDEX `idx_activity_id` ON `play_history` (`activity_id`);--> statement-breakpoint
CREATE INDEX `idx_category_approved` ON `text_content` (`category`,`is_approved`);