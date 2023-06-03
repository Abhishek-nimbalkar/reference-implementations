const schemaValidator = require("./retail_api_json_schema/SchemaValidator");
// const igmSchemaValidator = require("./igm_api_json_schema/IgmSchemaValidator");

const fs = require("fs");
const { log } = require("console");

const validate_schema_for_retail_json = (vertical, api, data) => {
  res = schemaValidator[`validate_schema_${api}_${vertical}_for_json`](data);
  console.log("schemaValidator :>> ", schemaValidator);
  return res;
};
// const validate_schema_for_igm_json = (vertical, api, data) => {
//   console.log("kdfjsdlfjksdlfkjsdlfjsdlkfjdslkf=========================");
//   console.log('vertical,api,data :>> ', vertical,api,data);
//   res = igmSchemaValidator[`validate_schema_${api}_${vertical}_for_json`](data);
//   console.log("schemaValidator :>> ", igmSchemaValidator);
//   return res;
// };

module.exports = {
  validate_schema_for_retail_json,
  // validate_schema_for_igm_json,
};
