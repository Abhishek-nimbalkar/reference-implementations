const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkIssue = (dirPath) => {
  let issueObj = {};

  try {
    let issue = fs.readFileSync(dirPath + `/${constants.RET_ISSUE}.json`);
    console.log('issue', issue)
    issue = JSON.parse(issue);

    try {
      console.log(`Validating Schema for ${constants.RET_ISSUE} API`);
      const vs = validateSchema("retail", constants.RET_ISSUE, issue);
      if (vs != "error") {
        Object.assign(issueObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE}`,
        error
      );
    }

    console.log(`Checking context for ${constants.RET_ISSUE} API`); //checking context
    try {
      res = checkContext(issue.context, constants.RET_ISSUE);
      if (!res.valid) {
        Object.assign(issueObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `Some error occurred while checking /${constants.RET_ISSUE} context`,
        error
      );
    }

    dao.setValue("issueObj", issueObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ISSUE} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkIssue;
