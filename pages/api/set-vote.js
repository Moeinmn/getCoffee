var Airtable = require('airtable');
var base = new Airtable({
  apiKey:process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);
  
const table = base('Design projects');

export default async function setVote (req, res){ 
  
  if (!req.query.id) return res.status(400).json({})  
  
  let routeId = req.query.id;

  let tableData = await table.select({
        filterByFormula: `id="${routeId}"`
      }).firstPage();
    if (tableData.length !== 0) {
      let rowId = tableData[0].id;
      let votePlusOne = tableData[0].fields.vote + 1;
      const updateRecord = await table.update([
        {
          id: rowId,
          fields: {
            vote:votePlusOne,
          }
        }
      ]);
      res.status(200).json({updateRecord})
    }else{
      return res.status(400).json({message:'something went wrong'})
    }
  
    


}
