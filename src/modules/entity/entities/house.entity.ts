import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema(
  {
    complex_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complex',
      required: true,
    },
    number: { type: String, required: true },
    address: { type: String, required: true },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resident_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    vehicle_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    square_feet: { type: Number },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Indexes
HouseSchema.index({ complex_id: 1, number: 1 }, { unique: true });
HouseSchema.index({ owner_id: 1 });
HouseSchema.index({ resident_ids: 1 });
HouseSchema.index({ vehicle_ids: 1 });

HouseSchema.index({ number: 'text', address: 'text' });

// Virtuals
HouseSchema.virtual('full_address').get(function () {
  return `${this.number} ${this.address}`;
});

HouseSchema.virtual('resident_count').get(function () {
  return this.resident_ids.length;
});

HouseSchema.virtual('vehicle_count').get(function () {
  return this.vehicle_ids.length;
});

HouseSchema.set('toJSON', { virtuals: true });
HouseSchema.set('toObject', { virtuals: true });

// Methods
HouseSchema.methods.addResident = function (resident_id) {
  if (!this.resident_ids.includes(resident_id)) {
    this.resident_ids.push(resident_id);
    return this.save();
  }
  return Promise.resolve(this);
};

HouseSchema.methods.removeResident = function (resident_id) {
  this.resident_ids = this.resident_ids.filter((r) => !r.equals(resident_id));
  return this.save();
};

HouseSchema.methods.addOwner = function (owner_id) {
  this.owner_id = owner_id;
  return this.save();
};

HouseSchema.methods.removeOwner = function () {
  this.owner_id = null;
  return this.save();
};

HouseSchema.methods.addVehicle = function (vehicle_id) {
  if (!this.vehicle_ids.includes(vehicle_id)) {
    this.vehicle_ids.push(vehicle_id);
    return this.save();
  }
  return Promise.resolve(this);
};

HouseSchema.methods.removeVehicle = function (vehicle_id) {
  this.vehicle_ids = this.vehicle_ids.filter((v) => !v.equals(vehicle_id));
  return this.save();
};

HouseSchema.methods.setOwner = function (owner_id) {
  this.owner_id = owner_id;
  return this.save();
};

HouseSchema.methods.setActive = function () {
  this.active = true;
  return this.save();
};

HouseSchema.methods.setInactive = function () {
  this.active = false;
  return this.save();
};

export const House = mongoose.model('House', HouseSchema);
