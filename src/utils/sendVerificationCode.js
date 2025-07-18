import { generateVOtpTemplate } from './emailTemplate.js';
import { snedEmail } from './snedEmail.js';

export async function sendVerificationCode(verificationCode, email, res) {
  try {
    const vCode = generateVOtpTemplate(verificationCode);
    snedEmail({
      email,
      subject: 'verification code',
      vCode,
    });

    res.status(200).json({
      success: true,
      message: 'verification code send successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messgage: `Failed to send verification code! ${error}`,
    });
  }
}
