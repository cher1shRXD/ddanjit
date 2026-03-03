ALTER TABLE `activity` RENAME COLUMN `fitted_time` TO `recommend_at`;--> statement-breakpoint
ALTER TABLE `activity` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2026-03-03 07:40:49.870';--> statement-breakpoint
ALTER TABLE `activity` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2026-03-03 07:40:49.870';--> statement-breakpoint
ALTER TABLE `bundle` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2026-03-03 07:40:49.869';--> statement-breakpoint
ALTER TABLE `bundle` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2026-03-03 07:40:49.869';--> statement-breakpoint
ALTER TABLE `purchase_history` MODIFY COLUMN `purchased_at` datetime NOT NULL DEFAULT '2026-03-03 07:40:49.869';--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `joined_at` datetime NOT NULL DEFAULT '2026-03-03 07:40:49.857';