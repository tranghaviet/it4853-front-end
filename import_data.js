const fs = require('fs');
const configEls = require('./src/config/els');
const axios = require('./src/utils/axi');

let data = JSON.parse(fs.readFileSync('/home/tranghv/Downloads/it4853_data/mywork.json'));

console.log(`${data.length} records loaded`);
// index must created
indexData(data);

async function indexData(arr) {
  // arr.forEach(async (e) => { // async, why it doesn't work?
  for (const e of arr) { // sequence
    try {
      const res = await axi.post(`/${configEls.index}/_doc`, JSON.stringify(e));
      // console.log(res.status);
    } catch (error) {
      console.log('-----index failed-----');
      // console.log(e.prototype.message);
    }
  }
  // });

  console.log('---------DONE--------');
}
