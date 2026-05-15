const https = require('https');

https.get('https://getswipe.in/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/CRISP_WEBSITE_ID.*?['"](.*?)['"]/);
    console.log('CRISP_WEBSITE_ID:', match ? match[1] : 'Not found');
  });
}).on('error', (err) => {
  console.error(err);
});
