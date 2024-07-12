import { isEmail } from 'class-validator';
import mongoose from 'mongoose';
import { isMobilePhone } from 'validator';

export const VisitorSchema = new mongoose.Schema(
  {
    complex_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complex',
      required: true,
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      validate: [isEmail, 'Invalid email address'],
    },
    phone: {
      type: String,
      validate: [isMobilePhone, 'Invalid phone number'],
    },
    id_number: { type: String },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approved_by: {
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
  },
  { timestamps: true },
);

// Indexes
VisitorSchema.index({ complex_id: 1, host_id: 1 });
VisitorSchema.index({ expected_arrival: 1 });
VisitorSchema.index({ status: 1 });
VisitorSchema.index({ vehicle_plate: 1 });

VisitorSchema.index({ first_name: 'text', last_name: 'text', purpose: 'text' });

// Virtuals
VisitorSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

VisitorSchema.set('toJSON', { virtuals: true });
VisitorSchema.set('toObject', { virtuals: true });

// Methods
VisitorSchema.methods.approve = function () {
  this.status = 'approved';
  return this.save();
};

VisitorSchema.methods.deny = function () {
  this.status = 'denied';
  return this.save();
};

export const Visitor = mongoose.model('Visitor', VisitorSchema);
