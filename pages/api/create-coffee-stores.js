

var Airtable = require('airtable');
var base = new Airtable({
  apiKey:process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);
  
const table = base('Design projects');


export default async function createCoffeeStore (req, res) {
  if (req.method !== 'POST') return res.staus(400).json({message:'request method should be POST'});

  //handling getting and creating data in airtable
  let {id,name,vote,address,neighborhood,imgUrl} = req.body;
  if (!id) return res.status(400).json({message:'id is required'})
  //find store
    let tableData = await table.select({
      filterByFormula: `id="${id}"`
    }).firstPage();
    if (tableData.length !== 0) {
      let fields = tableData[0].fields;
      res.json(fields)
    } else {
      //create store
      //id & name is required
      let createdStore = await table.create([
        {
          fields: {
            id ,
            vote ,
            name,
            address,
            neighborhood,
            imgUrl
          }
        }
      ])
      let createdStoreData = createdStore[0].fields;
      res.json(createdStoreData)

    }

  
}
