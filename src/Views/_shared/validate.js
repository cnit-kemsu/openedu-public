const validEmail = /\S+@\S+\.\S+/;

export function validateEmail(value) {
  if (!value) return 'Необходимо указать адрес электронной почты';
  if (!validEmail.test(value)) return 'Указан неверный адрес электронной почты';
}

export function validatePassword(value) {
  if (!value) return 'Необходимо ввести пароль';
}

export function validateConfirmPassword({ password, confirmPassword }) {
  if (!confirmPassword) return {
    confirmPassword: 'Необходимо подтвердить пароль'
  };
  if (password && confirmPassword) if (password !== confirmPassword) return {
    password: 'Пароли должны совпадать',
    confirmPassword: 'Пароли должны совпадать'
  };
}