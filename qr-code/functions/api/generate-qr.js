import qr from 'qrcode'

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400',
    }
  })
}

export async function onRequestPost(context) {
  // Contents of context object
  // const {
  //   request, // same as existing Worker API
  //   env, // same as existing Worker API
  //   params, // if filename includes [id] or [[path]]
  //   waitUntil, // same as ctx.waitUntil in existing Worker API
  //   next, // used for middleware or to fetch assets
  //   data, // arbitrary space for passing data between middlewares
  // } = context;

  const { request } = context

  // read the body from the request
  const { url } = await request.json()

  const qrImage = await qr.toString(url, {
    type: 'svg',
    color: {
      light: '#3685FF',
      dark: '#ffffff'
    }
  })

  // send a response that is a json object
  const response = new Response(JSON.stringify({svg: qrImage}), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers': '*',
    }
  })

  return response
}