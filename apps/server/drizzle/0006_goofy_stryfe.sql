ALTER TABLE `activity` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2026-03-03 08:05:30.776';--> statement-breakpoint
ALTER TABLE `activity` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2026-03-03 08:05:30.776';--> statement-breakpoint
ALTER TABLE `bundle` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2026-03-03 08:05:30.776';--> statement-breakpoint
ALTER TABLE `bundle` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2026-03-03 08:05:30.776';--> statement-breakpoint
ALTER TABLE `purchase_history` MODIFY COLUMN `purchased_at` datetime NOT NULL DEFAULT '2026-03-03 08:05:30.776';--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `joined_at` datetime NOT NULL DEFAULT '2026-03-03 08:05:30.764';