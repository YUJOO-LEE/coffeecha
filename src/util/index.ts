export const getPhoneNumber = (value: string) => {
  if (value.length > 1 && !/^(01)/.test(value)) {
    return value[0];
  }

  const phoneNumberRegex = /^(01[016789])(\d{3,4})(\d{4})$/;

  return value
    .replace(/\D/g, '')
    .replace(phoneNumberRegex, '$1-$2-$3');
};