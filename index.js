const admin = require('firebase-admin');
const core = require('@actions/core');
const github = require('@actions/github');

try {
    // const credential = JSON.parse(core.getInput('CREDENTIAL'));
    const databaseURL = core.getInput('DATABASE_DEFAULT_URL');
    const reference = core.getInput('REFERENCE');
    const data = JSON.parse(core.getInput('DATA'));
    const operation = core.getInput('OPERATION');

    const project_id = core.getInput('PROJECT_ID');
    const private_key = core.getInput('PRIVATE_KEY');
    const private_key_id = core.getInput('PRIVATE_KEY_ID'); 
    const client_email = cored.getInput('CLIENT_EMAIL');
    const client_id = core.getInput('CLIENT_ID');
    const auth_uri = core.getInput('AUTH_URI');
    const token_uri = core.getInput('TOKEN_URI');
    const auth_provider_x509_cert_url = core.getInput('AUTH_PROVIDER_X509_CERT_URL');
    const client_x509_cert_url = core.getInput('CLIENT_X509_CERT_URL');

    core.debug(credential);

    const app = admin.initializeApp({
        credential: {
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
        },
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
