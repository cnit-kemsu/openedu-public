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

export function validateFirstname(value) {
  if (!value) return 'Необходимо указать имя';
}
export function validateLastname(value) {
  if (!value) return 'Необходимо указать фамилию';
}

export function validatePasskey(value) {
  if (!value) return 'Необходимо ввести ключ подтверждения';
}

export function validateCourseName(value) {
  if (!value) return 'Необходимо указать название';
}

export function validateSectionName(value) {
  if (!value) return 'Необходимо указать название';
}

export function validateSubsectionName(value) {
  if (!value) return 'Необходимо указать название';
}

export function validateSubsectionStartDate(value) {
  if (!value) return 'Необходимо указать дату';
}
export function validateSubsectionEndDate(value) {
  if (!value) return 'Необходимо указать дату';
}
export function validateSubsectionReleaseForm({ startDate, endDate } = {}) {
  if (startDate && endDate && startDate > endDate) return {
    startDate: 'Дата начала должна быть раньше чем дата окончания',
    endDate: 'Дата окончания должна быть позже чем дата начала'
  };
}

export function validateUnitName(value) {
  if (!value) return 'Необходимо указать название';
}

export function validateDelayAccessTime({ days, hours, minutes }) {
  if (days === 0 && hours === 0 && minutes === 0) return 'Необходимо указать не нулевой временной интервал';
}

export function validateAccessTimeLimit({ days, hours, minutes }) {
  if (days === 0 && hours === 0 && minutes === 0) return 'Необходимо указать не нулевой временной интервал';
}