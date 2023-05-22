import mongoose, { Schema, model } from "mongoose";

export interface CategoryType {
  _id?: string;
  type: string;
  text: string;
}
