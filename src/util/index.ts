export const getPhoneNumber = (value: string) => {
  if (value.length > 1 && !/^(01)/.test(value)) {
    return value[0];
  }

  const phoneNumberRegexSmall = /^(01[016789])(\d{1,4})$/;
  const phoneNumberRegexLarge = /^(01[016789])(\d{3,4})(\d{1,4})$/;

  return value
    .replace(/\D/g, '')
    .replace(phoneNumberRegexSmall, '$1-$2')
    .replace(phoneNumberRegexLarge, '$1-$2-$3');
};