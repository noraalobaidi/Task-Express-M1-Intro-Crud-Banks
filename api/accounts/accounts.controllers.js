// let accounts = require("../../accounts");
const Account = require("../../DB/models/Account");
exports.fetchAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const newAaccount = await Account.create(req.body);
    res.status(201).json(newAaccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //req.body.id=id this works//
  // const id = accounts[accounts.length - 1].id + 1;
  // let newAccount = { id, ...req.body };
  // accounts.push(newAccount);
  // //   res.json(newAccount);
  // res.status(201).json(newAccount);
};

exports.updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      const updatedAccount = await Account.findByIdAndUpdate(
        accountId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedAccount);
    } else {
      res.status(404).json({ message: "Account does not exsist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // const { accountId } = req.params;
  // const account = accounts.find((_account) => _account.id === +accountId);
  // if (account) {
  //   for (key in req.body) {
  //     account[key] = req.body[key];
  //   }
  //   res.status(200).json(account);
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
};
exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.remove();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account does not exsist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // const { accountId } = req.params;
  // const account = accounts.find((_account) => _account.id === +accountId);
  // if (account) {
  //   accounts = accounts.filter((_account) => _account.id !== +accountId);
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
};
exports.getAccountByGreaterFund = async (req, res) => {
  const { fund } = req.params;
  const accounts = await Account.find().where("funds").gt(fund);
  res.json(accounts);
};
