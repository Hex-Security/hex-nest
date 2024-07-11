import mongoose from 'mongoose';

const AccessSchema = new mongoose.Schema(
  {
    visitor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visitor',
      required: true,
    },
    house_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
    complex_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complex',
      required: true,
    },
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assigned_guard_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    expected_arrival: { type: Date, required: true },
    expected_departure: { type: Date },
    actual_arrival: { type: Date },
    actual_departure: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'approved', 'denied'],
      default: 'pending',
    },
    purpose: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true },
);

// Indexes
AccessSchema.index({ visitor_id: 1, house_id: 1, complex_id: 1 });
AccessSchema.index({ expected_arrival: 1 });
AccessSchema.index({ status: 1 });

AccessSchema.index({ purpose: 'text', notes: 'text' });

// Virtuals
AccessSchema.virtual('visit_duration').get(function () {
  if (this.actual_arrival && this.actual_departure) {
    return this.actual_departure.getTime() - this.actual_arrival.getTime();
  }
  return null;
});

AccessSchema.set('toJSON', { virtuals: true });
AccessSchema.set('toObject', { virtuals: true });

export default mongoose.model('Access', AccessSchema);
