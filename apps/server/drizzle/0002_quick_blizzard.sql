ALTER TABLE `user` MODIFY COLUMN `joined_at` datetime NOT NULL DEFAULT '2026-03-01 16:58:08.917';--> statement-breakpoint
ALTER TABLE `user` ADD `gender` enum('남자','여자');