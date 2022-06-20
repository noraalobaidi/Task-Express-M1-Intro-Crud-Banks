const express = require("express");
const router = express.Router();

const {fetchAccounts,createAccount,updateAccount,deleteAccount,getAccountByGreaterFund}=require("../../api/accounts/accounts.controllers");

router.get("/", fetchAccounts);

router.post("/", createAccount);

router.delete("/:accountId",deleteAccount);
router.put("/:accountId", updateAccount);
router.get("/:fund", getAccountByGreaterFund);

module.exports = router;
