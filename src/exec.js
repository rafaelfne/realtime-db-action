const admin = require('firebase-admin');
const core = require('@actions/core');

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function exec({
    project_id,
    private_key,
    private_key_id,
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
    databaseURL,
    operation,
    reference,
    data
}) {
    try {
        const app = admin.initializeApp({
            credential: admin.credential.cert({
                type: 'service_account',
                project_id,
                private_key,
                private_key_id,
                client_email,
                client_id,
                auth_uri,
                token_uri,
                auth_provider_x509_cert_url,
                client_x509_cert_url
            }),
            databaseURL
        });

        const database = app.database();

        if (operation === 'get') {
            database.ref(reference).once('value')
                .then((value) => {
                    core.setOutput('result', value.val());
                })
                .catch((reason) => {
                    core.setOutput('result', reason);
                })
                .finally(() => process.exit(0));
        }

        if (operation === 'set') {
            if (isJsonString(data)) data = JSON.parse(data);
            database.ref(reference).set(data)
                .then(() => {
                    core.setOutput('result', 'set data was succesfull');
                })
                .catch((reason) => {
                    core.setOutput('result', reason);
                })
                .finally(() => process.exit(0));
        }
    } catch (error) {
        core.setFailed(error.message);
        process.exit(0);
    }
}

module.exports = exec

