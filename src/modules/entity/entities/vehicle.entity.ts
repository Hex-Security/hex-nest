import mongoose from 'mongoose';
import { VehicleDocument } from 'src/shared/types/vehicle.type';

export const VehicleSchema = new mongoose.Schema<VehicleDocument>(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plate: { type: String, required: true, unique: true },
    make: { type: String },
    v_model: { type: String },
    year: { type: Number },
    color: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Indexes
VehicleSchema.index({ owner_id: 1 });
VehicleSchema.index({ plate: 1 });
VehicleSchema.index({ make: 1 });
VehicleSchema.index({ model: 1 });
VehicleSchema.index({ year: 1 });
VehicleSchema.index({ color: 1 });

VehicleSchema.index({ plate: 'text', make: 'text', model: 'text' });

// Virtuals
VehicleSchema.virtual('full_name').get(function () {
  return `${this.make} ${this.model} ${this.year} ${this.color}`;
});

VehicleSchema.set('toJSON', { virtuals: true });
VehicleSchema.set('toObject', { virtuals: true });

export const Vehicle = mongoose.model<VehicleDocument>(
  'Vehicle',
  VehicleSchema,
);
