export const required = value => (value || typeof value === 'number' ? '' : 'Required');
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : '';
