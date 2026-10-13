import { Schema, model, models, type InferSchemaType } from "mongoose";

const timeRecordSchema = new Schema({
  time: { type: Date, required: true, default: Date.now },
});

export type TimeRecord = InferSchemaType<typeof timeRecordSchema>;

// 熱更新時 model 可能已經註冊過，先沿用既有的
export const TimeRecordModel =
  models.TimeRecord || model("TimeRecord", timeRecordSchema);
