const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
}

const DB_NAME = `https://iamzaboiler-default-rtdb.firebaseio.com/`
const dbInstance = admin.app().database(DB_NAME)

exports.addFriend = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
    // const { data, auth } = request
    // if (isBlank(auth)) {
    //     return returnObject({
    //         responseMsg: "Not authorized",
    //         isDoneAndSent: false
    //     })
    // }

    // if (isBlank(data)) {
    //     return returnObject({
    //         responseMsg: "No data found",
    //         isDoneAndSent: false
    //     })
    // }

    const { friend, uid } = req.query;

    if (isBlank(uid) || isBlank(friend)) {
        return returnObject({
            responseMsg: "No data found",
            isDoneAndSent: false
        }, res)
    }

    const rtdbFriendsCheck = await getDataFromRtdb_selfCheck(DB_NAME, `WriteChecks/${uid}`)

    const friendIds = Object.keys(rtdbFriendsCheck.m ?? {})
    const friendsOjects = Object.values(rtdbFriendsCheck.m ?? {})
    const duplicateName = friendsOjects.some((eachFriend) => eachFriend.friend === friend)

    const friendId = generateUniqueId(friendIds)
    if (isBlank(friendId)) {
        return returnObject({
            responseMsg: "Failed to generate ID for friend",
            isDoneAndSent: false
        }, res)
    }

    await db.collection("Friends").doc(uid).set({}, { merge: true });

    // adding the friend to the firestore
    const writeCheck = await db.collection("Friends").doc(uid).update({
        [`list.${friendId}`]: {
            name: friend,
            id: friendId
        }
    });

    // adding the write check to rtdb
    await dbInstance.ref(`WriteChecks/${uid}`).update({
        [`${friendId}`]: { ...writeCheck, friend, friendId }
    })

    return returnObject({
        responseMsg: `${rtdbFriendsCheck.b ? "Friend" : "First ever friend"} added successfully${duplicateName ? " but a duplicate entry was found in history" : ""}. ID: ${friendId}`,
        isDoneAndSent: true,
    }, res)
});

exports.removeFriend = functions.runWith(runtimeOpts).https.onRequest(async (req, res) => {
    const { friendId, uid } = req.query;

    if (isBlank(uid) || isBlank(friendId)) {
        return returnObject({
            responseMsg: "No data found",
            isDoneAndSent: false
        }, res)
    }

    const friendDoc = await getDocument("Friends", uid)

    if (isBlank(friendDoc)) {
        return returnObject({
            responseMsg: "No friends are in the list",
            isDoneAndSent: false
        }, res)
    }

    const friendObjectList = friendDoc.list
    const friendObject = friendId in friendObjectList ? friendObjectList[friendId] : null

    if (isBlank(friendObject)) {
        return returnObject({
            responseMsg: `Friend with ID ${friendId} not found`,
            isDoneAndSent: false
        }, res)
    }

    const writeCheck = await db.collection("Friends").doc(uid).update({
        [`list.${friendId}`]: admin.firestore.FieldValue.delete()
    });

    return returnObject({
        responseMsg: `Removed ${friendObject.name} from friends`,
        isDoneAndSent: true
    }, res)
})

exports.notifyUserOnFriendChange = functions.runWith(runtimeOpts).firestore.document('Friends/{uid}').onUpdate(async (change, context) => {
    const { uid } = context.params

    const friendsRecordAfter = change.after.data()
    const friendsRecordBefore = change.before.data()

    const friendsListAfter = Object.values(friendsRecordAfter?.list ?? {})
    const friendsListBefore = Object.values(friendsRecordBefore?.list ?? {})

    const changesReported = compareLists(friendsListBefore, friendsListAfter)
    if (changesReported.length === 0) {
        return functions.logger.log("No changes:", changesReported)
    }

    const notificationId = db.collection("Notifications").doc().id
    await db.collection("Notifications").doc(notificationId).set({
        notificationId,
        uid,
        changes: changesReported
    }, { merge: true });

    return functions.logger.log("Changes:", changesReported)

});

// Helper functions
function compareLists(list1 = [], list2 = []) {
    const changes = [];

    list1.forEach(obj1 => {
        const obj2 = list2.find(o => o.id === obj1.id);
        if (obj2) {
            if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
                changes.push({ id: obj1.id, changes: { ...obj2 } });
            }
        } else {
            changes.push({ id: obj1.id, status: 'deleted' });
        }
    });

    list2.forEach(obj2 => {
        if (!list1.find(o => o.id === obj2.id)) {
            changes.push({ id: obj2.id, status: 'added', ...obj2 });
        }
    });

    return changes;
}

function generateUniqueId(existingIds = []) {
    let uniqueId;
    let retries = 0;

    do {
        uniqueId = generateNumericPIN();
        retries++;
    } while (existingIds.includes(uniqueId) && retries < 10);

    if (retries === 10) {
        return null
    }

    return uniqueId;
}

function generateNumericPIN(length = 9) {
    const minDigit = 0;
    const maxDigit = 9;

    let pin = '';
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
        pin += digit.toString();
    }

    return pin;
}

async function getDocument(col, key) {
    functions.logger.log("getDocument: ", col, key)
    try {
        const data = (await db.collection(col).doc(key).get()).data()
        functions.logger.log("getDocument: ", data)
        return data;
    } catch (err) {
        functions.logger.log("getDocument: ", err)
        return undefined;
    }
}

function isBlank(data) {
    return (data === null || data === undefined)
}

async function getDataFromRtdb(dbInstanceName, path) {
    const dbInstance = admin.app().database(dbInstanceName)
    const dbRef = dbInstance.ref(path)
    const dbData = await (await dbRef.once("value")).val();
    return dbData
}

async function getDataFromRtdb_selfCheck(dbInstanceName, path) {
    const data = await getDataFromRtdb(dbInstanceName, path)
    return {
        b: !!data,
        m: data ?? "No data available"
    }
}

function returnObject({ isDoneAndSent = true, responseMsg }, res) {
    if (isBlank(res)) {
        return { isDoneAndSent, responseMsg }
    }
    return res.send({ isDoneAndSent, responseMsg })
}