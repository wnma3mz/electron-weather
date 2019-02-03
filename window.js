$(() => {

  var http = require('http');
  var querystring = require('querystring');
  var fs = require('fs');

  let rawdata = fs.readFileSync('Meizu_city.json');
  let citys = JSON.parse(rawdata);
  // console.log(citys);

  $('#text-input').bind('input propertychange', function () {
    const cityNames = this.value

    var cityIds = citys.find(function (element) {
      return element.countyname == cityNames;
    });

    var postData = querystring.stringify({
      'msg': 'Hello World!'
    });
    // 101240101
    const url = 'http://aider.meizu.com/app/weather/listWeather?cityIds=' + cityIds['areaid'];


    var data = '';

    var req = http.get(url, (res) => {
      console.log(`${res.statusCode}`);

      res.on('data', (chunk) => {
        data += chunk;
      });

      // console.log(tt);

      res.on('end', () => {
        console.log(JSON.parse(data));
        wea = JSON.parse(data)['value'][0]['realtime'];

        console.log(wea['time']);
        console.log(wea['wD']);
        console.log(wea['wS']);
        console.log(wea['weather']);

        $('#md5-output').text(wea['time']);
        $('#sha1-output').text(wea['wD']);
        $('#sha256-output').text(wea['wS']);
        $('#sha512-output').text(wea['weather']);


      });

    }).on('error', (e) => {
      console.log(`${e.message}`);
    });
  })


  // const crypto = require('crypto')

  // $('#text-input').bind('input propertychange', function () {
  //   const text = this.value

  //   const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
  //   $('#md5-output').text(md5)

  //   const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
  //   $('#sha1-output').text(sha1)

  //   const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
  //   $('#sha256-output').text(sha256)

  //   const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
  //   $('#sha512-output').text(sha512)
  // })

  $('#text-input').focus() // focus input box
})
