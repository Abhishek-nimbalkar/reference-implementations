const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkOnIssue = (dirPath) => {
  let onissueObj = {};

  try {
    let on_issue = fs.readFileSync(dirPath + `/${constants.RET_ONISSUE}.json`);
    on_issue = JSON.parse(on_issue);

    try {
      console.log(`Validating Schema for ${constants.RET_ONISSUE} API`);
      const vs = validateSchema("retail", constants.RET_ONISSUE, on_issue);
      if (vs != "error") {
        Object.assign(onissueObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE}`,
        error
      );
    }

    console.log(`Checking context for ${constants.RET_ONISSUE} API`); //checking context
    try {
      res = checkContext(on_issue.context, constants.RET_ONISSUE);
      if (!res.valid) {
        Object.assign(onissueObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `Some error occurred while checking /${constants.RET_ONISSUE} context`,
        error
      );
    }

    try {
      console.log(
        `Comparing transaction ID of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      if (
        !_.isEqual(dao.getValue("igmTxnId"), on_issue.context.transaction_id)
      ) {
        onissueObj.igmTxnId = `City code mismatch in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`;
      }
    } catch (error) {
      console.log(
        `Error while comparing transaction ID in /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`,
        error
      );
    }

    try {
      console.log(
        `Comparing Domain of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      if (!_.isEqual(dao.getValue("igmDomain"), on_issue.context.domain)) {
        onissueObj.igmDomain = `Domain for /${constants.RET_ISSUE} api should be equal to /${constants.RET_ONISSUE} api`;
      }
      dao.setValue("igmDomain", on_issue.context.domain);
    } catch (error) {
      console.log(
        `Error while comparing Domain for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      console.log(
        `Comparing core version of /${constants.RET_ISSUE} and /${constants.RET_ONISSUE}`
      );
      dao.setValue("txnId", on_issue.context.core_version);
    } catch (error) {
      console.log(
        `Error while comparing core version for /${constants.RET_ISSUE} and /${constants.RET_ONISSUE} api`,
        error
      );
    }

    try {
      console.log(`Phone Number Check for /${constants.RET_ONISSUE}`);
      // on_issue.message.issue.issue_actions.respondent_actions[0].updated_by.contact.phone
      if (
        !_.isEqual(
          dao.getValue("igmPhn"),
          on_issue.message.issue.complainant_info.contact.phone
        )
      ) {
        if (
          !_.inRange(
            issue.message.issue.complainant_info.contact.phone,
            1000000000,
            99999999999
          )
        ) {
          onissueObj.Phn = `Phone Number for /${constants.RET_ONISSUE} api is not in the valid Range`;
        }
        onissueObj.Phn = `Phone Number for /${constants.RET_ONISSUE} api does not match with /${constants.RET_ISSUE} api`;
      }
    } catch (error) {
      console.log(
        `Error while checking phone number for /${constants.RET_ONISSUE} api`,
        error
      );
    }


    try {
      console.log(
        `Checking Expected Response time for /${constants.RET_ONISSUE}`
      );
      if (
        !_.gt(
          on_issue.context.timestamp,
          on_issue.message.issue.expected_response_time.duration
        )
      ) {
        onissueObj.respTime = `Expected Response Time /${constants.RET_ONISSUE} api should be greater than request time`;
      }
    } catch (error) {
      console.log(
        `Error while checking phone number for /${constants.RET_ONISSUE} api`,
        error
      );
    }


    try {
      console.log(
        `Checking time of creation and updation for /${constants.RET_ONISSUE}`
      );
      if (
        !_.isEqual(
          on_issue.message.issue.created_at,
          on_issue.message.issue.updated_at
        )
      ) {
        issueObj.respTime = `Time of Creation and time of updation for /${constants.RET_ONISSUE} api should be same`;
      }
      if (!_.lte(on_issue.message.issue.created_at,issue.context.timestamp)) {
        onissueObj.updatedTime = `Time of Creation for /${constants.RET_ONISSUE} api should be less than current timestamp`;
      }
      dao.setValue("igmCreatedAt", on_issue.message.issue.created_at);
    } catch (error) {
      console.log(
        `Error while checking time of creation and updation for /${constants.RET_ONISSUE} api`,
        error
      );
    }


    try {
      console.log(`Checking organization's name for /${constants.RET_ONISSUE}`);
      let org_name =
        onissue.message.issue.issue_actions.complainant_actions[0].updated_by.org
          .name;
      let org_id = org_name.split("::");
      if (!_.isEqual(on_issue.context.bap_id, org_id[0])) {
        onissueObj.org_name = `Organization's Name for /${constants.RET_ONISSUE} api mismatched with bap id`;
      }
      if (!_.lte(on_issue.context.domain, org_id[1])) {
        onissueObj.org_domain = `Domain of organization for /${constants.RET_ONISSUE} api mismatched with domain in context`;
      }
    } catch (error) {
      console.log(
        `Error while checking organization's name for /${constants.RET_ONISSUE} api`,
        error
      );
    }



    dao.setValue("onissueObj", onissueObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONISSUE} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssue;
