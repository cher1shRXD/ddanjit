export const iconEnum = ["book", "lightbulb", "electronic", "sound", "vision"] as const;
export type Icon = typeof iconEnum[number];

export const durationEnum = ["1", "5", "10", "15", "20", "30", "60"] as const;
export type Duration = typeof durationEnum[number];

export const skippedRecommendationEnum = ["no", "one", "all"] as const;
export type SkippedRecommendation = typeof skippedRecommendationEnum[number];