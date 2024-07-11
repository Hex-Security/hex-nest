import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plate: { type: String, required: true, unique: true },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    color: { type: String, required: true },
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

export default mongoose.model('Vehicle', VehicleSchema);
