import journey from '../content/journey.json';
export const {stages,details}=journey;
const {official}=journey;
export const sourceFor=(i,j)=>i===4||(i===0&&j===0)?official.visa:i===1&&j===2||i===5&&(j===1||j===2)?official.tax:i===3&&j===2?official.work:i===2||i===5&&j===0?official.rent:official.general;
