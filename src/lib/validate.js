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

export function validateSubsectionAccessDate(value) {
  //if (!value) return 'Необходимо указать дату';
}
export function validateSubsectionExpirationDate(value) {
  //if (!value) return 'Необходимо указать дату';
}
export function validateCourseDeliverySubsectionForm({ accessDate, expirationDate } = {}) {
  if (accessDate && expirationDate && accessDate > expirationDate) return {
    accessDate: 'Дата открытия доступа должна быть раньше чем дата закрытия доступа',
    expirationDate: 'Дата закрытия доступа должна быть позже чем дата открытия доступа'
  };
}

export function validateUnitName(value) {
  if (!value) return 'Необходимо указать название';
}

export function validateAccessPeriod(value) {
  if (value) {
    if (typeof value === 'string' && (value.includes('.') || value.includes(','))) return 'Значение должно быть целочисленным';
    if (typeof value === 'number' &&  value % 1 !== 0) return 'Значение должно быть целочисленным';
    if (value < 0) return 'Значение должно быть больше нуля';
  }
}

export function validateExpirationPeriod(value) {
  if (value) {
    if (typeof value === 'string' && (value.includes('.') || value.includes(','))) return 'Значение должно быть целочисленным';
    if (typeof value === 'number' &&  value % 1 !== 0) return 'Значение должно быть целочисленным';
    if (value < 0) return 'Значение должно быть больше нуля';
  }
}


// export function validateDelayAccessTime({ days, hours, minutes }) {
//   if (days === 0 && hours === 0 && minutes === 0) return 'Необходимо указать не нулевой временной интервал';
// }

// export function validateAccessTimeLimit({ days, hours, minutes }) {
//   if (days === 0 && hours === 0 && minutes === 0) return 'Необходимо указать не нулевой временной интервал';
// }