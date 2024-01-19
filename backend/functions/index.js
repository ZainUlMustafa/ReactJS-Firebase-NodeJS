const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.friendMgm = require('./modules/friendManagement')