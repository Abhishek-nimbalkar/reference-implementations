const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkIssueStatus = (dirPath, msgIdSet) => {
  let issueStatusObj = {};
  try {
    let issueStatus = fs.readFileSync(
      dirPath + `/${constants.RET_ISSUE_STATUS}.json`
    );
    issueStatus = JSON.parse(issueStatus);
    try {
      console.log(`Validating Schema for ${constants.RET_ISSUE_STATUS} API`);
      const vs = validateSchema(
        "retail",
        constants.RET_ISSUE_STATUS,
        issueStatus
      );
      console.log("DEBUGGG", vs);

      if (vs != "error") {
        // console.log(vs);
        Object.assign(issueStatusObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ISSUE_STATUS}`,
        error
      );
    }

    //   try {
    //     console.log(`Checking context for /${constants.RET_ISSUE_STATUS}rack API`); //checking context
    //     res = checkContext(track.context, constants.RET_ISSUE_STATUS);
    //     if (!res.valid) {
    //       Object.assign(issueStatusObj, res.ERRORS);
    //     }
    //   } catch (error) {
    //     console.log(
    //       `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} context`
    //     );
    //   }

    //   try {
    //     console.log(
    //       `Comparing city of /${constants.RET_SEARCH} and /${constants.RET_ISSUE_STATUS}`
    //     );
    //     if (!_.isEqual(dao.getValue("city"), track.context.city)) {
    //       issueStatusObj.city = `City code mismatch in /${constants.RET_SEARCH} and /${constants.RET_ISSUE_STATUS}`;
    //     }
    //   } catch (error) {
    //     console.log(
    //       `!!Error while comparing city in /${constants.RET_SEARCH} and /${constants.RET_ISSUE_STATUS}`,
    //       error
    //     );
    //   }

    //   try {
    //     console.log(
    //       `Comparing timestamp of /${constants.RET_ISSUE_STATUS} and /${constants.RET_ONCONFIRM}`
    //     );
    //     if (_.gte(dao.getValue("tmpstmp"), track.context.timestamp)) {
    //       dao.setValue("trckTmpstmp", track.context.timestamp);
    //       issueStatusObj.tmpstmp = `Timestamp for /${constants.RET_ONCONFIRM} api cannot be greater than or equal to /${constants.RET_ISSUE_STATUS} api`;
    //     }
    //   } catch (error) {
    //     console.log(
    //       `!!Error while comparing timestamp for /${constants.RET_ONCONFIRM} and /${constants.RET_ISSUE_STATUS} api`,
    //       error
    //     );
    //   }

    //   try {
    //     console.log(
    //       `Comparing transaction Ids of /select and /${constants.RET_ISSUE_STATUS}`
    //     );
    //     if (!_.isEqual(dao.getValue("txnId"), track.context.transaction_id)) {
    //       issueStatusObj.txnId = `Transaction Id should be same from /${constants.RET_SELECT} onwards`;
    //     }
    //   } catch (error) {
    //     console.log(
    //       `!!Error while comparing transaction ids for /select and /${constants.RET_ISSUE_STATUS} api`,
    //       error
    //     );
    //   }

    //   try {
    //     console.log(`Checking Message Id of /${constants.RET_ISSUE_STATUS}`);
    //     // if (!_.isEqual(msgId, onSelect.context.message_id)) {
    //     //   onSlctObj.msgId =
    //     //     "Message Id for /select and /on_select api should be same";
    //     // }

    //     if (msgIdSet.has(track.context.message_id)) {
    //       issueStatusObj.msgId2 = `Message Id cannot be same for different sets of APIs`;
    //     }
    //     dao.setValue("msgId", track.context.message_id);
    //     // msgIdSet.add(onSelect.context.message_id);
    //   } catch (error) {
    //     console.log(
    //       `!!Error while checking message id for /${constants.RET_ISSUE_STATUS}`
    //     );
    //   }

    //   track = track.message;

    //   try {
    //     console.log(
    //       `Checking Order Id in /${constants.RET_ISSUE_STATUS} and /${constants.RET_CONFIRM}`
    //     );
    //     if (track.order_id != dao.getValue("cnfrmOrdrId")) {
    //       console.log(
    //         `Order Id in /${constants.RET_ISSUE_STATUS} and /${constants.RET_CONFIRM} do not match`
    //       );
    //       issueStatusObj.trackOrdrId = `Order Id in /${constants.RET_ISSUE_STATUS} and /${constants.RET_CONFIRM} do not match`;
    //     }
    //   } catch (error) {
    //     console.log(
    //       `Error while comparing order id in /${constants.RET_ISSUE_STATUS} and /${constants.RET_CONFIRM}`,
    //       error
    //     );
    //     // issueStatusObj.trackOrdrId = "Order Id in /${constants.RET_ISSUE_STATUS} and /${constants.RET_ONCONFIRM} do not match";
    //   }
    dao.setValue("issueStatusObj", issueStatusObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ISSUE_STATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkIssueStatus;
