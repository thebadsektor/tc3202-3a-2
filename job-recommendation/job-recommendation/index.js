const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// ✅ Setup Nodemailer Transporter using Firebase Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user, // Set this in Firebase Config
    pass: functions.config().email.pass, // Set this in Firebase Config
  },
});

// ✅ Cloud Function to Send OTP Email when a new document is created in Firestore
exports.sendOtpEmail = functions.firestore
  .document("otps/{otpId}")
  .onCreate(async (snap, context) => {
    const otpData = snap.data();
    const otpRef = snap.ref; // Reference to Firestore document

    if (!otpData.email || !otpData.otp) {
      functions.logger.error("Missing email or OTP in Firestore document.");
      return null;
    }

    const mailOptions = {
      from: `Your App <${functions.config().email.user}>`,
      to: otpData.email,
      subject: "Your Login OTP Code",
      text: `Your OTP code is: ${otpData.otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP code is: <strong>${otpData.otp}</strong></p><p>It will expire in 10 minutes.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      await otpRef.update({ sent: true, sentAt: admin.firestore.FieldValue.serverTimestamp() });
      functions.logger.info(`OTP email sent successfully to ${otpData.email}`);
    } catch (error) {
      functions.logger.error("Error sending OTP email:", error);
      await otpRef.update({ sent: false, error: error.message });
    }
  });
