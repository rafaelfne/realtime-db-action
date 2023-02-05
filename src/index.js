const core = require('@actions/core');
const exec = require('./exec');

const databaseURL = core.getInput('database_default_url');
const reference = core.getInput('reference');
const data = core.getInput('data');
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

exec({
    project_id,
    private_key_id,
    private_key,
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
    reference,
    data,
    operation,
    databaseURL
});