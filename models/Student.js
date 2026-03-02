const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // ── IDs ──────────────────────────────────────────────
  enrollmentId: { type: String, unique: true, sparse: true },  // प्रवेश क्रमांक
  saralId: { type: String, default: '' },                       // सरल आय. डि. नं
  udiseNo: { type: String, default: '' },                       // युडायस नंबर
  rollNo: { type: String, default: '' },                        // क्रमांक

  // ── Personal (Marathi) ───────────────────────────────
  name: { type: String, required: true, trim: true },           // विद्यार्थ्याचे पूर्ण नाव
  aadharNo: { type: String, default: '' },                      // आधार नंबर
  dateOfBirth: { type: Date },                                   // जन्म दिनांक (अंकात)
  dateOfBirthInWords: { type: String, default: '' },            // जन्म दिनांक (अक्षरात)
  gender: { type: String, default: '' },                        // लिंग
  nationality: { type: String, default: 'भारतीय' },            // राष्ट्रीयत्व
  religion: { type: String, default: '' },                      // धर्म
  caste: { type: String, default: '' },                         // जात
  category: { type: String, default: 'सर्वसाधारण' },          // प्रवर्ग
  motherTongue: { type: String, default: 'मराठी' },            // मातृभाषा
  birthPlace: { type: String, default: '' },                    // जन्मस्थळ

  // ── Family ──────────────────────────────────────────
  fatherName: { type: String, default: '' },                    // वडिलांचे नाव
  motherName: { type: String, default: '' },                    // आईचे नाव
  guardianName: { type: String, default: '' },                  // पालकाचे नाव
  parentContact: { type: String, default: '' },                 // पालकाचा संपर्क
  parentEmail: { type: String, default: '' },
  address: { type: String, default: '' },                       // पत्ता

  // ── Academic ────────────────────────────────────────
  currentClass: { type: String, required: true },               // वर्तमान वर्ग
  currentSection: { type: String, default: '' },                // तुकडी
  admissionClass: { type: String, default: '' },                // प्रवेशाच्या वेळेस वर्ग
  admissionDate: { type: Date },                                 // प्रवेश दिनांक
  academicYear: { type: String, default: '' },                  // शैक्षणिक वर्ष

  // ── Previous School ─────────────────────────────────
  previousSchool: { type: String, default: '' },                // पूर्वीची शाळा

  // ── Leaving / Utara ─────────────────────────────────
  leavingClass: { type: String, default: '' },                  // शाळा सोडताना वर्ग
  leavingDate: { type: Date },                                   // शाळा सोडताना दिनांक
  reasonForLeaving: { type: String, default: '' },              // शाळा सोडण्याचे कारण
  remarks: { type: String, default: '' },                       // शेरा

  // ── Bonafide specific ───────────────────────────────
  // Uses: name, currentClass, dateOfBirth, dateOfBirthInWords, caste, aadharNo, academicYear

  // ── Conduct / Other ─────────────────────────────────
  generalConduct: { type: String, default: 'चांगले' },
  photo: { type: String, default: '' },

  // ── Meta ────────────────────────────────────────────
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  bonafideGenerated: { type: Boolean, default: false },
  bonafideGeneratedAt: { type: Date },
  utaraGenerated: { type: Boolean, default: false },
  utaraGeneratedAt: { type: Date },
}, { timestamps: true });

// Auto-generate enrollment ID
studentSchema.pre('save', async function (next) {
  try {
    if (this.isNew && !this.enrollmentId) {
      const count = await mongoose.model('Student').countDocuments();
      const year = new Date().getFullYear().toString().slice(-2);
      this.enrollmentId = `TVV${year}${String(count + 1).padStart(5, '0')}`;
    }
    next();
  } catch (err) { next(err); }
});

module.exports = mongoose.model('Student', studentSchema);
