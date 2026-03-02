const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: '' },
  qualification: { type: String, default: '' },
  subject: { type: String, default: '' },
  classAssigned: { type: String, default: '' },
  section: { type: String, default: '' },
  joiningDate: { type: Date, default: Date.now },
  address: { type: String, default: '' },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'teacher' },
  lastLogin: { type: Date },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

// Auto-generate Employee ID + Hash password in one hook
teacherSchema.pre('save', async function (next) {
  try {
    // Generate employee ID only for new docs
    if (this.isNew && !this.employeeId) {
      const count = await mongoose.model('Teacher').countDocuments();
      this.employeeId = `RIS-T${String(count + 1).padStart(4, '0')}`;
    }
    // Hash password only if modified
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (err) {
    next(err);
  }
});

teacherSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
