const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkOnIssueStatus = (dirPath, msgIdSet) => {
  let onIssueStatusObj = {};
  try {
    let onIssueStatus = fs.readFileSync(dirPath + `/${constants.RET_ONISSUE_STATUS}.json`);
    onIssueStatus = JSON.parse(onIssueStatus);
    // console.log('onIssueStatus===========', onIssueStatus)

    try {
      console.log(`Validating Schema for ${constants.RET_ONISSUE_STATUS} API`);
      const vs = validateSchema("retail", constants.RET_ONISSUE_STATUS, onIssueStatus);
      console.log("DEBUGGG", vs);
      if (vs != "error") {
        Object.assign(onIssueStatusObj, vs);
      }
    } catch (error) {
      console.log(
        `!!Error occurred while performing schema validation for /${constants.RET_ONISSUE_STATUS}`,
        error
      );
    }

    try {
      console.log(`Checking context for /${constants.RET_ONISSUE_STATUS} API`); //checking context
      res = checkContext(onIssueStatus.context, constants.RET_ONISSUE_STATUS);
      if (!res.valid) {
        Object.assign(onIssueStatusObj, res.ERRORS);
      }
    } catch (error) {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} context`,
        error
      );
    }

    // try {
    //   console.log(
    //     `Comparing city of /${constants.RET_SEARCH} and /${constants.RET_ONISSUE_STATUS}`
    //   );

    //   if (!_.isEqual(dao.getValue("city"), onIssueStatus.context.city)) {
    //     onIssueStatusObj.city = `City code mismatch in /${constants.RET_SEARCH} and /${constants.RET_ONISSUE_STATUS}`;
    //   }
    // } catch (error) {
    //   console.log(
    //     `Error while comparing city in /${constants.RET_SEARCH} and /${constants.RET_ONISSUE_STATUS}`,
    //     error
    //   );
    // }

    // try {
    //   console.log(
    //     `Comparing timestamp of /${constants.RET_ONSELECT} and /${constants.RET_ONISSUE_STATUS}`
    //   );
    //   if (_.gte(dao.getValue("tmpstmp"), onIssueStatus.context.timestamp)) {
    //     onIssueStatusObj.tmpstmp = `Timestamp for  /${constants.RET_ONSELECT} api cannot be greater than or equal to /onIssueStatus api`;
    //   }
    //   dao.setValue("tmpstmp", onIssueStatus.context.timestamp);
    // } catch (error) {
    //   console.log(
    //     `!!Error while comparing timestamp for /${constants.RET_ONSELECT} and /${constants.RET_ONISSUE_STATUS} api`,
    //     error
    //   );
    // }

    // try {
    //   console.log(
    //     `Comparing transaction Ids of /${constants.RET_SELECT} and /${constants.RET_ONISSUE_STATUS}`
    //   );
    //   if (!_.isEqual(dao.getValue("txnId"), onIssueStatus.context.transaction_id)) {
    //     onIssueStatusObj.txnId = `Transaction Id should be same from /${constants.RET_SELECT} onwards`;
    //   }
    // } catch (error) {
    //   console.log(
    //     `!!Error while comparing transaction ids for /${constants.RET_SELECT} and /${constants.RET_ONISSUE_STATUS} api`,
    //     error
    //   );
    // }

    // try {
    //   console.log(`Checking Message Ids of /${constants.RET_ONISSUE_STATUS}`);
    //   // if (!_.isEqual(msgId, onSelect.context.message_id)) {
    //   //   onSlctObj.msgId =
    //   //     "Message Id for /select and /on_select api should be same";
    //   // }

    //   if (msgIdSet.has(onIssueStatus.context.message_id)) {
    //     onIssueStatusObj.msgId2 = "Message Id cannot be same for different sets of APIs";
    //   }
    //   dao.setValue("msgId", onIssueStatus.context.message_id);
    //   // msgIdSet.add(onSelect.context.message_id);
    // } catch (error) {
    //   console.log(
    //     `Error while checking message id for /${constants.RET_ONISSUE_STATUS}`,
    //     error
    //   );
    // }

    // onIssueStatus = onIssueStatus.message.order;

    // try {
    //   console.log(
    //     `Comparing provider object in /${constants.RET_SELECT} and /${constants.RET_ONISSUE_STATUS}`
    //   );

    //   if (dao.getValue("providerId") != onIssueStatus.provider["id"]) {
    //     onIssueStatusObj.prvdId = `Provider Id mismatches in /${constants.RET_SELECT} and /${constants.RET_ONISSUE_STATUS}`;
    //   }

    //   if (dao.getValue("providerLoc") != onIssueStatus.provider.locations[0].id) {
    //     onIssueStatusObj.prvdfrLoc = `Provider.locations[0].id mismatches in /${constants.RET_SELECT} and /${constants.RET_ONISSUE_STATUS}`;
    //   }
    // } catch (error) {
    //   console.log(
    //     `!!Error while checking provider object in /${constants.RET_SELECT} and /${constants.RET_ONISSUE_STATUS}`,
    //     error
    //   );
    // }

    // try {
    //   console.log(`Checking billing object in /${constants.RET_ONISSUE_STATUS}`);
    //   if (!onIssueStatus["billing"]) {
    //     onIssueStatusObj.bill = `Billing object missing in /${constants.RET_ONISSUE_STATUS}`;
    //   } else {
    //     const billing = onIssueStatus.billing;
    //     const tmpstmp = dao.getValue("tmpstmp");
    //     dao.setValue("billing", billing);
    //     if (!_.isEqual(billing.created_at, tmpstmp)) {
    //       onIssueStatusObj.bllngCrtd = `billing.created_at should match context.timestamp`;
    //     }

    //     if (!_.isEqual(onIssueStatus.billing.updated_at, tmpstmp)) {
    //       onIssueStatusObj.bllngUptd = `billing.updated_at should match context.timestamp`;
    //     }
    //     // if (
    //     //   !_.isEqual(onIssueStatus.billing.address.area_code, dao.getValue("buyerAddr"))
    //     // ) {
    //     //   onIssueStatusObj.billAreaCode = `area_code in billing.address does not match with area_code in /${constants.RET_SELECT}`;
    //     // }
    //   }
    // } catch (error) {
    //   console.log(
    //     `!!Error while checking billing object in /${constants.RET_ONISSUE_STATUS}`,
    //     error
    //   );
    // }

    // try {
    //   console.log(
    //     `Comparing item Ids and fulfillment ids in /${constants.RET_ONSELECT} and /${constants.RET_ONISSUE_STATUS}`
    //   );
    //   const itemFlfllmnts = dao.getValue("itemFlfllmnts");
    //   const itemsIdList = dao.getValue("itemsIdList");
    //   let i = 0;
    //   const len = onIssueStatus.items.length;
    //   while (i < len) {
    //     let itemId = onIssueStatus.items[i].id;
    //     if (itemId in itemFlfllmnts) {
    //       if (onIssueStatus.items[i].fulfillment_id != itemFlfllmnts[itemId]) {
    //         let itemkey = `item_FFErr${i}`;
    //         onIssueStatusObj[
    //           itemkey
    //         ] = `items[${i}].fulfillment_id mismatches for Item ${itemId} in /${constants.RET_ONSELECT} and /${constants.RET_ONISSUE_STATUS}`;
    //       }
    //     } else {
    //       let itemkey = `item_FFErr${i}`;
    //       onIssueStatusObj[itemkey] = `Item Id ${itemId} does not exist in /on_select`;
    //     }

    //     if (itemId in itemsIdList) {
    //       if (onIssueStatus.items[i].quantity.count != itemsIdList[itemId]) {
    //         onIssueStatusObj.cntErr = `Warning: items[${i}].quantity.count for item ${itemId} mismatches with the items quantity selected in /${constants.RET_SELECT}`;
    //       }
    //     }
    //     i++;
    //   }
    // } catch (error) {
    //   console.log(
    //     `!!Error while comparing Item and Fulfillment Id in /${constants.RET_ONSELECT} and /${constants.RET_ONISSUE_STATUS}`
    //   );
    // }

    // try {
    //   console.log(`Checking fulfillments objects in /${constants.RET_ONISSUE_STATUS}`);
    //   const itemFlfllmnts = dao.getValue("itemFlfllmnts");
    //   let i = 0;
    //   const len = onIssueStatus.fulfillments.length;
    //   while (i < len) {
    //     //Comparing fulfillment Ids
    //     let id = onIssueStatus.fulfillments[i].id;
    //     if (id) {
    //       if (!Object.values(itemFlfllmnts).includes(id)) {
    //         key = `ffID${id}`;
    //         //MM->Mismatch
    //         onIssueStatusObj[
    //           key
    //         ] = `fulfillment id ${id} does not exist in /${constants.RET_ONSELECT}`;
    //       }

    //       if (
    //         !_.isEqual(
    //           onIssueStatus.fulfillments[i].end.location.gps,
    //           dao.getValue("buyerGps")
    //         )
    //       ) {
    //         gpskey = `gpsKey${i}`;
    //         onIssueStatusObj[
    //           gpskey
    //         ] = `gps coordinates in fulfillments[${i}].end.location mismatch in /${constants.RET_SELECT} & /${constants.RET_ONISSUE_STATUS}`;
    //       }

    //       if (
    //         !_.isEqual(
    //           onIssueStatus.fulfillments[i].end.location.address.area_code,
    //           dao.getValue("buyerAddr")
    //         )
    //       ) {
    //         addrkey = `addrKey${i}`;
    //         onIssueStatusObj[
    //           addrkey
    //         ] = `address.area_code in fulfillments[${i}].end.location mismatch in /${constants.RET_SELECT} & /${constants.RET_ONISSUE_STATUS}`;
    //       }

    //       //Comparing Provider_id
    //       // if (onIssueStatus.fulfillments[i].provider_id) {
    //       //   let prvdrId = onIssueStatus.fulfillments[i].provider_id;
    //       //   if (prvdrId != dao.getValue("bppId")) {
    //       //     let key = `ffPrvdrId${prvdrId}`;
    //       //     onIssueStatusObj[
    //       //       key
    //       //     ] = `Provider Id for fulfillment ${id} should be the bpp_id as per the contract`;
    //       //   }
    //       // }
    //     } else {
    //       onIssueStatusObj.ffId = `fulfillments[${i}].id is missing in /${constants.RET_ONISSUE_STATUS}`;
    //     }

    //     i++;
    //   }
    // } catch (error) {
    //   console.log(
    //     `!!Error while checking fulfillments object in /${constants.RET_ONISSUE_STATUS}`,
    //     error
    //   );
    // }

    dao.setValue("onIssueStatusObj", onIssueStatusObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONISSUE_STATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONISSUE_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkOnIssueStatus;
