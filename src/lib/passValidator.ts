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

  if (password === 'password' || password === 'Password') {
    return { success: false, msg: 'That\'s what everyone tries. Look closer at the placeholder.' };
  }

  if (password === 'PassWord') {
    return { success: false, msg: 'Warm. The structure is right. One character is lying to you.' };
  }

  if (password === 'passW0RD') {
    return { success: false, msg: 'Getting dangerously close. Mind your case sensitivity.' };
  }

  if (password === 'PASSW0RD') {
    return { success: false, msg: 'You hit the zero. You lost the case war. Try again.' };
  }

  if (password === 'passw0rd') {
    return { success: false, msg: 'The zero was correct. That\'s the only thing you got right.' };
  }

  if (password === 'PassW0Rd') {
    return { success: false, msg: 'So painfully close. One letter is betraying you at the end.' };
  }

  if (password === 'passwOrd') {
    return { success: false, msg: 'You tried to be case-sensitive. Bold. Wrong. Try again.' };
  }

  if (password === 'PassWORD') {
    return { success: false, msg: 'The zero-for-O trade. We see it. We don\'t accept it.' };
  }

  if (password.toLowerCase() === 'password123') {
    return { success: false, msg: 'Adding 123 to the end. Creative. Incorrect. Try harder.' };
  }

  if (password === 'Passw0rd' || password === 'passW0rd') {
    return { success: false, msg: 'You\'re circling the answer. The placeholder is not a riddle.' };
  }

  const classicFails = ['admin', 'root', 'qwerty', 'letmein', 'iloveyou', 'abc123', 'monkey', 'dragon'];
  if (classicFails.includes(password.toLowerCase())) {
    return { success: false, msg: 'A classic. A truly legendary wrong answer.' };
  }

  const numericFails = ['123', '1234', '12345', '123456', '0000', '1234567890'];
  if (numericFails.includes(password)) {
    return { success: false, msg: 'Outstanding. You are a pioneer of wrong answers.' };
  }

  if (password === 'genie' || password === 'Genie' || password === 'scream' || password === 'Scream') {
    return { success: false, msg: 'Nice try, thematic answer. Still wrong though.' };
  }

  if (password.length < 3) {
    return { success: false, msg: 'That\'s not even a password. That\'s a sound.' };
  }

  return { success: false, msg: 'Not even close. The answer was right in front of you.' };
}
