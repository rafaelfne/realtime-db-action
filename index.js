const admin = require('firebase-admin');
const core = require('@actions/core');
const github = require('@actions/github');

try {
    const credential = core.getInput('CREDENTIAL');
    const databaseURL = core.getInput('DATABASE_DEFAULT_URL');
    const reference = core.getInput('REFERENCE');
    const data = core.getInput('DATA');
    const operation = core.getInput('OPERATION');

    const app = admin.initializeApp({
        credential,
        databaseURL
    });
    
    const database = app.database();

    if (operation === 'get') {
        database.ref(reference).once('value')
        .then((value) => {
            core.setOutput('RESULT', value.toJSON());
        });
    }

    if (operation === 'set') {
        database.ref(reference).set(data);
    }

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
