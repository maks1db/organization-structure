export const updateQueryParameter = (
  key: string,
  value: string | number,
  uri: string
) => {
  const re = new RegExp(`([?&])${key}=?.*?(&|$)`, 'i');
  let separator = uri.indexOf('?') !== -1 ? '&' : '?';

  if (value === undefined) {
    return uri
      .replace(re, '$1$2')
      .replace(/(\?|&)$/, '')
      .replace(/\?&/, '?');
  }

  const currentValue = encodeURIComponent(value);
  separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${currentValue}$2`);
  }
  return `${uri + separator + key}=${currentValue}`;
};
