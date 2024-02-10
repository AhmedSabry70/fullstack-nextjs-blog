export const slugify = (str)=> {

    const result = typeof str === 'string' ? str.toLowerCase() : '';

    // Replace non-alphanumeric characters with dashes
  const slug = str.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Remove leading and trailing dashes
  return slug.replace(/^-+|-+$/g, '');
}

