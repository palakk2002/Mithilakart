/**
 * User Module — Auth API Service Layer
 * All API functions with placeholders.
 * Returns dummy validation outcomes/delays; ready to swap with real API calls.
 */

const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendPhoneOtp = async (countryCode, phoneNumber) => {
  await delay(600);
  // Real API integration pattern:
  // return axiosInstance.post('/auth/send-phone-otp', { countryCode, phoneNumber });
  console.log(`[API Mock] Sending Phone OTP to ${countryCode} ${phoneNumber}`);
  return { success: true, message: 'OTP sent successfully' };
};

export const verifyPhoneOtp = async (countryCode, phoneNumber, otp) => {
  await delay(800);
  console.log(`[API Mock] Verifying Phone OTP ${otp} for ${countryCode} ${phoneNumber}`);
  if (phoneNumber === '9111966732' && otp === '123456') {
    return { 
      success: true, 
      token: 'dummy_user_token_phone_123',
      user: { mobile: phoneNumber, name: 'User' }
    };
  }
  throw new Error('Invalid Phone Number or OTP.');
};

export const sendEmailOtp = async (email) => {
  await delay(600);
  // Real API integration pattern:
  // return axiosInstance.post('/auth/send-email-otp', { email });
  console.log(`[API Mock] Sending Email OTP to ${email}`);
  return { success: true, message: 'OTP sent successfully' };
};

export const verifyEmailOtp = async (email, otp) => {
  await delay(800);
  console.log(`[API Mock] Verifying Email OTP ${otp} for ${email}`);
  if (email === 'mithilakart@gmail.com' && otp === '123456') {
    return { 
      success: true, 
      token: 'dummy_user_token_email_123',
      user: { email, name: 'User' }
    };
  }
  throw new Error('Invalid Email Address or OTP.');
};
