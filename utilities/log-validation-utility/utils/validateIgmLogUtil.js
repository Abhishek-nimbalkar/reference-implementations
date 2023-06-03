const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const checkIssue = require("./igm/retIssue");
const checkOnIssue = require("./igm/retOnIssue");
const checkIssueStatus = require("./igm/retIssueStatus");
const checkOnIssueStatus = require("./igm/retOnIssueStatus");
// const path = require("path");
const { getObjValues } = require("./utils");

const validateIgmLogs = (dirPath) => {
  let msgIdSet = new Set();
  //ISSUE API
  let issueResp = checkIssue(dirPath, msgIdSet);

//   //ON_ISSUE API
//   let onIssueResp = checkOnIssue(dirPath, msgIdSet);

//   // //ISSUE_STATUS API
//   let issueStatusResp = checkIssueStatus(dirPath, msgIdSet);

//   // //ON_ISSUE_STATUS API
//   let onissueStatusResp = checkOnIssueStatus(dirPath, msgIdSet);

  let logReport = "";

  let issueObj = dao.getValue("issueObj");
  let onissueObj = dao.getValue("onissueObj");
  let issueStatObj = dao.getValue("issueStatusObj");
  let onIssueStatObj = dao.getValue("onIssueStatusObj");
  try {
    console.log("Flushing DB Data");
    dao.dropDB();
  } catch (error) {
    console.log("Error while removing LMDB");
  }

  if (!_.isEmpty(issueObj)) {
    logReport += `**/issue** \n${getObjValues(issueObj)}\n`;
  }

  if (!_.isEmpty(onissueObj)) {
    logReport += `**/on_issue** \n${getObjValues(onissueObj)}\n`;
  }

  if (!_.isEmpty(issueStatObj)) {
    logReport += `**/on_issue_status** \n${getObjValues(issueStatObj)}\n`;
  }

  if (!_.isEmpty(onIssueStatObj)) {
    logReport += `**/on_issue_status** \n${getObjValues(onIssueStatObj)}\n`;
  }

  fs.writeFileSync("IGM_log_report.md", logReport);

  console.log("Report Generated Successfully!!");
};
module.exports = { validateIgmLogs };