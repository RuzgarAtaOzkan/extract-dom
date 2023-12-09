'use strict';

function extractDom(data, identifier) {
  const elements = [
    // supported html elements to be extracted
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'a',
    'img',
    'div',
    'li',
    'noscript',
    'script',
    'iframe',
    'span',
  ];

  const props = [
    'id',
    'class',
    'src',
    'alt',
    'type',
    'title',
    'href',
    'loading',
  ];

  const parts = identifier.split('.');

  const element = parts[0];
  const prop = parts[1].split('=')[0];
  const value = parts[1].split('=')[1];

  const result = [];

  if (!value) {
    return null;
  }

  if (!elements.includes(element)) {
    return null;
  }

  if (!props.includes(prop)) {
    return null;
  }

  // continue if current index and rest is not the element that user provided
  let query = '<' + element + ' ';
  for (let i = 0; i < data.length; i++) {
    let read = '';

    for (let j = 0; j < query.length; j++) {
      read = read + data[i + j];
    }

    if (read !== query) {
      continue;
    }

    read = '';

    // extract whole element
    let ctr = 0;
    while (true) {
      if (
        (data[i + ctr] === '<' && data[i + ctr + 1] === '/') ||
        (data[i + ctr] === '/' && data[i + ctr + 1] === '>') ||
        (element === 'img' && data[i + ctr] === '>')
      ) {
        // read = read + data[i + ctr] + data[i + ctr + 1] + data[i + ctr + 2];

        break;
      }

      read = read + data[i + ctr];

      ctr++;
    }

    // extract element props
    const element_obj = { innerHTML: '' };

    for (let j = 0; j < props.length; j++) {
      let read_prop = '';
      let index = read.indexOf(props[j] + '="');

      if (index === -1) {
        continue;
      }

      index = index + props[j].length + 2;

      for (let k = 0; k < read.length; k++) {
        if (read[index + k] === '"') {
          break;
        }

        read_prop = read_prop + read[index + k];
      }

      element_obj[props[j]] = read_prop;
    }

    for (let j = read.indexOf('>') + 1; j < read.length; j++) {
      if (!read[j]) {
        break;
      }

      if (read[j] === '<') {
        break;
      }

      element_obj.innerHTML = element_obj.innerHTML + read[j];
    }

    result.push(element_obj);
  }

  const final = [];

  for (let i = 0; i < result.length; i++) {
    if (result[i][prop] === value) {
      final.push(result[i]);
    }
  }

  return final;
}

module.exports = extractDom;
