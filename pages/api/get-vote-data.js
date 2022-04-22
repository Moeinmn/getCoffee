var Airtable = require('airtable');
var base = new Airtable({
  apiKey:process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);
  
const table = base('Design projects');

export default async function getVote (req, res){ 
    if (!req.query.id) return res.status(400).json({}) 
    
    let routeId = req.query.id;
    let tableData = await table.select({
        filterByFormula: `id="${routeId}"`
      }).firstPage();
      if (tableData.length !== 0) {
        let vote = tableData[0].fields.vote;
        res.status(200).json({vote});
      }else{
        return res.status(400).json({})
      }
}

