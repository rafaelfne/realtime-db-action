const admin = require('firebase-admin');
const core = require('@actions/core');
const github = require('@actions/github');

try {
    // const credential = JSON.parse(core.getInput('CREDENTIAL'));
    const databaseURL = core.getInput('database_default_url');
    const reference = core.getInput('reference');
    const data = JSON.parse(core.getInput('data'));
    const operation = core.getInput('operation');

    const project_id = core.getInput('project_id');
    const private_key = core.getInput('private_key');
    const private_key_id = core.getInput('private_key_id'); 
    const client_email = core.getInput('client_email');
    const client_id = core.getInput('client_id');
    const auth_uri = core.getInput('auth_uri');
    const token_uri = core.getInput('token_uri');
    const auth_provider_x509_cert_url = core.getInput('auth_provider_x509_cert_url');
    const client_x509_cert_url = core.getInput('client_x509_cert_url');

    core.debug(private_key);

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
