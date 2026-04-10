export interface ValidationResult {
  success: boolean;
  msg?: string;
}

export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim().length === 0) {
    return { success: false, msg: 'Password cannot be empty.' };
  }

  if (password === 'PassW0RD') {
    return { success: true };
  }
  if (password === 'password') {
    return { success: false, msg: 'password is tooo correct please enter PassW0RD'}
  }
  if (password === 'PassWord') {
    return { success: false, msg: 'Password is some-some correct 🤏 please enter PassW0RD'}
  }
  if (password === 'PassW0rd') {
    return {
      success: false,
      msg: 'PassW0rd is Toooo much correct 💥 please enter PassW0RD'
    }
  }
  const numPass = ['123', '1234', '12345', '123456', '0000'];
  if (numPass.includes(password)) {
    return {
      success: false,
      msg: 'you are genius 👾'
    }
  }

  return { success: false, msg: 'Incorrect password. Try again.' };
}
