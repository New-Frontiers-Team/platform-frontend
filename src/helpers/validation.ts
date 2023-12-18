import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Fill in this field to continue.'
  },
  string: {
    email: 'This Email is not valid.',
    min: 'Very short value (minimum ${min} characters)',
    max: 'Value too long (maximum ${max} characters)'
  },
  number: {
    min: 'Invalid value (must be greater than or equal to ${min})',
    max: 'Invalid value (must be less than or equal to ${max})'
  }
});

export default yup;