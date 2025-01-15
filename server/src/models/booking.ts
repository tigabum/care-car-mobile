import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  customer: mongoose.Types.ObjectId;
  washer?: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
  serviceType: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  scheduledFor: Date;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    washer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    serviceType: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true },
    },
    scheduledFor: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
