export interface ValidationResult {
  success: boolean;
  msg?: string;
}

export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim().length === 0) {
    return { success: false, msg: 'Password cannot be empty.' };
  }

  if (password === 'paSSword') {
    return { success: true };
  }
  if (password === 'password') {
    return { success: false, msg: 'password is tooo correct please enter paSSword'}
  }
  if (password === 'Password') {
    return { success: false, msg: 'Password is some-some correct 🤏 please enter paSSword'}
  }
  if (password === 'PaSSword') {
    return {
      success: false,
      msg: 'PaSSword is Toooo much correct 💥 please enter paSSword'
    }
  }

  return { success: false, msg: 'Incorrect password. Try again.' };
}
