import { isEmail, isMobilePhone } from 'class-validator';
import mongoose from 'mongoose';
import { RolesEnum } from 'src/shared/enum/roles.enum';

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Invalid email address'],
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Date },
    role: {
      type: String,
      enum: RolesEnum,
      required: true,
      default: RolesEnum.USER,
    },
    phone: { type: String, validate: [isMobilePhone, 'Invalid phone number'] },
    active: { type: Boolean, default: true },
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],

    data: {
      user: {
        // User specific data
        houses: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'House',
          },
        ],
        vehicles: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
          },
        ],
      },
      guard: {
        // Relationships
        complexes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Complex',
          },
        ],
        schedule: [
          [
            {
              day: {
                type: String,
                required: true,
              },
              start: {
                type: Date,
                required: true,
              },
              end: {
                type: Date,
                required: true,
              },
              complex_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Complex',
              },
              access_point: {
                type: String,
                ref: 'Complex.access_points.name',
              },
            },
          ],
        ],
      },
      admin: {
        // Relationships
        complexes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Complex',
          },
        ],
      },
    },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 });
UserSchema.index({ uid: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ complex_ids: 1 });
UserSchema.index({ houses: 1 });
UserSchema.index({ vehicles: 1 });

UserSchema.index({ role: 1, complex_ids: 1 });
UserSchema.index({ role: 1, email: 1 });
UserSchema.index({ last_name: 1, first_name: 1 });

UserSchema.index({ first_name: 'text', last_name: 'text' });

// Full name virtual
UserSchema.virtual('fullName').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

// Age virtual (assuming we add a birthDate field)
UserSchema.virtual('age').get(function () {
  return Math.floor(
    (Date.now() - this.birth_date.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
  );
});

// Houses count virtual
UserSchema.virtual('houses_count').get(function () {
  return this.data.user.houses.length;
});

// Vehicles count virtual
UserSchema.virtual('vehicles_count').get(function () {
  return this.data.user.vehicles.length;
});

// Complexes count virtual
UserSchema.virtual('guard_complexes_count').get(function () {
  return this.data.guard.complexes.length;
});

// Admin complexes count virtual
UserSchema.virtual('admin_complexes_count').get(function () {
  return this.data.admin.complexes.length;
});

// Schedule count virtual

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Check if user is an admin
UserSchema.methods.isAdmin = function () {
  return this.role === RolesEnum.ADMIN;
};

// Check if user belongs to a specific complex
UserSchema.methods.belongsToComplex = function (complex_id) {
  return this.complex_ids.includes(complex_id);
};

// Add a vehicle to the user
UserSchema.methods.addVehicle = function (vehicle_id) {
  if (!this.vehicles.includes(vehicle_id)) {
    this.vehicles.push(vehicle_id);
    return this.save();
  }
  return Promise.resolve(this);
};

// Remove a vehicle from the user
UserSchema.methods.removeVehicle = function (vehicle_id) {
  this.vehicles = this.vehicles.filter((v) => !v.equals(vehicle_id));
  return this.save();
};

// Set active user status
UserSchema.methods.setActive = function () {
  this.active = true;
  return this.save();
};

// Set inactive user status
UserSchema.methods.setInactive = function () {
  this.active = false;
  return this.save();
};

// Add a house to the user
UserSchema.methods.addHouse = function (house_id) {
  if (!this.houses.includes(house_id)) {
    this.houses.push(house_id);
    return this.save();
  }
  return Promise.resolve(this);
};

// Remove a house from the user
UserSchema.methods.removeHouse = function (house_id) {
  this.houses = this.houses.filter((h) => !h.equals(house_id));
  return this.save();
};

export const User = mongoose.model('User', UserSchema);
