export const getPhoneNumber = (value: string) => {
  if (value.length > 1 && !/^(01)/.test(value)) {
    return value[0];
  }

  const phoneNumberRegex1 = /^(01[016789])(\d{1,4})$/;
  const phoneNumberRegex2 = /^(01[016789])(\d{3})(\d{1,4})$/;
  const phoneNumberRegex3 = /^(01[016789])(\d{3,4})(\d{4})$/;

  return value
    .replace(/\D/g, '')
    .replace(phoneNumberRegex1, '$1-$2')
    .replace(phoneNumberRegex2, '$1-$2-$3')
    .replace(phoneNumberRegex3, '$1-$2-$3');
};