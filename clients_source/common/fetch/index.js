function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
import 'whatwg-fetch';

let isProduction = process.env.NODE_ENV === 'production';

if(isProduction){
  var headers = {
    mode: 'cors',
    credentials: 'include',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-CSRFToken': readCookie('csrftoken')
    }
  }
}
else {
  var headers = {
    mode: 'cors',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
}

export const defaultParams = headers

/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {
  console.log('body', body);
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}


/**
 * It's the same as create, but without stringify
 */
export function createFile(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body // Doesn't stringify
  });
}

/**
 * It's the same as create, but without stringify
 */
export function updateFile(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body // Doesn't stringify
  });
}

/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  })
}


/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}
