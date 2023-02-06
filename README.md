## Realtime Database Action

This action allows you to perform basic read and write operations on a firebase realtime database. Since the realtime database is reactive to changes and connected clients receive changes when those changes happen, this action can help notify an application when a deployment process has ended.

I made this action precisely with that in mind, because in the company we use the realtime database to control the version number of the application that is available and when the version is modified, the connected clients receive a popup notifying the need for an update.

### Inputs

The inputs of this action receive the service account properties that you get in your project settings in the firebase console.

![](assets/20230205_172737_image.png)

There you also get the URL of your database.

> **Remembering that this configuration will turn your action into admin of your project, so save your service account settings in secrets to keep your project safe.**

```yml


  project_id:
    description: 'Project id'
    required: true
  private_key_id:
    description: 'Private Key Id'
    required: true
  private_key:
    description: 'Private Key'
    required: true
  client_email:
    description: 'Client Email'
    required: true
  client_id:
    description: 'Client Id'
    required: true
  auth_uri:
    description: 'Auth URI'
    required: true
  token_uri:
    description: 'Token URI'
    required: true
  auth_provider_x509_cert_url:
    description: 'Auth Provider x509 Cert URL'
    required: true
  client_x509_cert_url:
    description: 'Client x509 Cert URL'
    required: true
  database_default_url:
    description: 'URL to connect in default database'
    required: true
  reference:
    description: 'Reference to access in database'
    required: true
  operation:
    description: 'The operation to be performed, which can be get or set'
    required: true
  data:
    description: 'New data that will be used to update the reference'
```

You can find a config example [here](https://github.com/rafacolab/realtime-db-action/blob/main/.github/workflows/action.yml)

### Output

```yml
result:
    description: 'Result data from get operation execution'
```

## Third Party Licenses

This GitHub Action uses a couple of Node.js modules to work.

License and other copyright information for each module are included in the release branch of each action version under `node_modules/{module}`.

More information for each package can be found at `https://www.npmjs.com/package/{package}`

## License

[![MIT license](https://camo.githubusercontent.com/5fab2edf3816ef9fb3ebcaf6e613fa7b40ff7652ec69e5f6e7f695aa24bf5ce6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d626c75652e737667)](https://lbesson.mit-license.org/)
