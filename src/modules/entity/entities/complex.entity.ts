import { isEmail } from 'class-validator';
import mongoose from 'mongoose';

export const ComplexSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    contact_number: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [isEmail, 'Invalid email address'],
    },
    active: { type: Boolean, default: true },
    admin_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    guard_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    house_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
      },
    ],
    access_points: [
      {
        name: { type: String, required: true },
        location: { type: String, required: true },
        active: { type: Boolean, default: true },
        current_guard_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        guard_ids: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

// Indexes
ComplexSchema.index({ name: 1 });
ComplexSchema.index({ city: 1, state: 1 });
ComplexSchema.index({ zip_code: 1 });
ComplexSchema.index({ admin_ids: 1 });
ComplexSchema.index({ guard_ids: 1 });
ComplexSchema.index({ house_ids: 1 });
ComplexSchema.index({ access_points: 1 });

ComplexSchema.index({ name: 'text', address: 'text', city: 'text' });

// Virtuals
ComplexSchema.virtual('full_address').get(function () {
  return `${this.address}, ${this.city}, ${this.state} ${this.zip_code}`;
});

ComplexSchema.virtual('admin_count').get(function () {
  return this.admin_ids.length;
});

ComplexSchema.virtual('guard_count').get(function () {
  return this.guard_ids.length;
});

ComplexSchema.virtual('house_count').get(function () {
  return this.house_ids.length;
});

ComplexSchema.virtual('access_point_count').get(function () {
  return this.access_points.length;
});

ComplexSchema.set('toJSON', { virtuals: true });
ComplexSchema.set('toObject', { virtuals: true });

// Methods
ComplexSchema.methods.addAdmin = function (admin_id) {
  if (!this.admin_ids.includes(admin_id)) {
    this.admin_ids.push(admin_id);
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.removeAdmin = function (admin_id) {
  this.admin_ids = this.admin_ids.filter((a) => !a.equals(admin_id));
  return this.save();
};

ComplexSchema.methods.addGuard = function (guard_id) {
  if (!this.guard_ids.includes(guard_id)) {
    this.guard_ids.push(guard_id);
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.removeGuard = function (guard_id) {
  this.guard_ids = this.guard_ids.filter((g) => !g.equals(guard_id));
  return this.save();
};

ComplexSchema.methods.addHouse = function (house_id) {
  if (!this.house_ids.includes(house_id)) {
    this.house_ids.push(house_id);
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.removeHouse = function (house_id) {
  this.house_ids = this.house_ids.filter((h) => !h.equals(house_id));
  return this.save();
};

ComplexSchema.methods.setActive = function () {
  this.active = true;
  return this.save();
};

ComplexSchema.methods.setInactive = function () {
  this.active = false;
  return this.save();
};

ComplexSchema.methods.addAccessPoint = function (access_point) {
  this.access_points.push(access_point);
  return this.save();
};

ComplexSchema.methods.removeAccessPoint = function (access_point_id) {
  this.access_points = this.access_points.filter(
    (a) => !a._id.equals(access_point_id),
  );
  return this.save();
};

ComplexSchema.methods.updateAccessPoint = function (access_point_id, data) {
  const access_point = this.access_points.find((a) =>
    a._id.equals(access_point_id),
  );
  if (access_point) {
    Object.assign(access_point, data);
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.addGuardToAccessPoint = function (
  access_point_id,
  guard_id,
) {
  const access_point = this.access_points.find((a) =>
    a._id.equals(access_point_id),
  );
  if (access_point && !access_point.guard_ids.includes(guard_id)) {
    access_point.guard_ids.push(guard_id);
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.removeGuardFromAccessPoint = function (
  access_point_id,
  guard_id,
) {
  const access_point = this.access_points.find((a) =>
    a._id.equals(access_point_id),
  );
  if (access_point) {
    access_point.guard_ids = access_point.guard_ids.filter(
      (g) => !g.equals(guard_id),
    );
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.setCurrentGuard = function (access_point_id, guard_id) {
  const access_point = this.access_points.find((a) =>
    a._id.equals(access_point_id),
  );
  if (access_point) {
    access_point.current_guard_id = guard_id;
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.setAccessPointActive = function (access_point_id) {
  const access_point = this.access_points.find((a) =>
    a._id.equals(access_point_id),
  );
  if (access_point) {
    access_point.active = true;
    return this.save();
  }
  return Promise.resolve(this);
};

ComplexSchema.methods.setAccessPointInactive = function (access_point_id) {
  const access_point = this.access_points.find((a) =>
    a._id.equals(access_point_id),
  );
  if (access_point) {
    access_point.active = false;
    return this.save();
  }
  return Promise.resolve(this);
};

export const Complex = mongoose.model('Complex', ComplexSchema);
