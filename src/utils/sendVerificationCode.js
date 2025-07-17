export async function sendVerificationCode(verificationCode, email, res) {
  try {
    const vCode = generateVOtpTemplate(verificationCode);
    snedEmail({
      email,
      subject: 'verification code',
      messgage,
    });

    res.status(200).json({
        success: true,
        message: "Verification code send successfully!".
    });

  } catch (error) {
    res.status(500).jon({
      success: false,
      messgage: 'Failed to send verification code!',
    });
  }
}
