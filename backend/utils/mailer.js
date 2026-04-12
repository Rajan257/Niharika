// backend/utils/mailer.js - Niharika Mailing Service
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends an OTP email to the user
 * @param {string} to - Recipient email
 * @param {string} otp - 6-digit OTP
 * @param {string} userName - User's name
 */
const sendOtpEmail = async (to, otp, userName = 'Reader') => {
  const mailOptions = {
    from: `"Niharika Platform" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `🔐 ${otp} is your Niharika verification code`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #8B1A1A; padding: 20px; text-align: center;">
          <h1 style="color: #C9A227; margin: 0; font-size: 28px; letter-spacing: 2px;">NIHARIKA</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Where every word matters</p>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <p style="font-size: 16px; color: #333;">Namaste <strong>${userName}</strong>,</p>
          <p style="font-size: 14px; color: #555; line-height: 1.6;">Welcome to Niharika! To complete your registration and start exploring the world of poetry and philosophy, please use the verification code below:</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <div style="display: inline-block; padding: 15px 30px; background-color: #f9f9f9; border: 2px dashed #8B1A1A; border-radius: 8px;">
              <span style="font-size: 32px; font-weight: bold; color: #8B1A1A; letter-spacing: 5px;">${otp}</span>
            </div>
          </div>
          
          <p style="font-size: 13px; color: #777; line-height: 1.5;">This code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            Explore Poets | Read Kavita | Listen to Sakhi AI<br>
            <strong>All great poetry should be free.</strong>
          </p>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 11px; color: #999;">
          © 2026 Niharika Literature Platform - Founded by Rajan Rai
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[MAILER] OTP sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[MAILER] Error sending OTP to ${to}:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Sends a password reset email
 * @param {string} to - Recipient email
 * @param {string} otp - 6-digit OTP
 * @param {string} userName - User's name
 */
const sendPasswordResetEmail = async (to, otp, userName = 'Reader') => {
    const mailOptions = {
      from: `"Niharika Support" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: `🔑 Reset your Niharika Password`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #8B1A1A; padding: 20px; text-align: center;">
            <h1 style="color: #C9A227; margin: 0; font-size: 28px; letter-spacing: 2px;">NIHARIKA</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Hello <strong>${userName}</strong>,</p>
            <p style="font-size: 14px; color: #555; line-height: 1.6;">We received a request to reset your password. Use the code below to proceed with the reset:</p>
            
            <div style="margin: 30px 0; text-align: center;">
              <div style="display: inline-block; padding: 15px 30px; background-color: #fff9f9; border: 2px solid #8B1A1A; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; color: #8B1A1A; letter-spacing: 5px;">${otp}</span>
              </div>
            </div>
            
            <p style="font-size: 13px; color: #777; line-height: 1.5;">This code is valid for <strong>15 minutes</strong>.</p>
            <p style="font-size: 14px; color: #333;">If you didn't request this, you can safely ignore this email; your password will remain unchanged.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          </div>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 11px; color: #999;">
            © 2026 Niharika Platform - Security Service
          </div>
        </div>
      `
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[MAILER] Reset error:`, error);
      return { success: false, error: error.message };
    }
  };

module.exports = { sendOtpEmail, sendPasswordResetEmail };
