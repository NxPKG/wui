
# Wazuh WUI Framework

> The Wazuh WUI Framework is a collection of React UI components for quickly building user interfaces
> at Wazuh. Not using React? No problem! You can still use the CSS behind each component.


## Installation

To install the Wazuh WUI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```
yarn add @wazuh/wui
```

Note that WUI has [several `peerDependencies` requirements](package.json) that will also need to be installed if starting with a blank project.

```
yarn add @wazuh/wui @elastic/datemath moment prop-types
```


## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```
nvm install
```

### Documentation

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running the following.

```
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```
yarn start --port 9000
```
## License

The Wazuh WUI Framework is licensed under the [Apache License 2.0][license].

[license]: LICENSE
[faq]: FAQ.md
[consuming]: wiki/consuming.md
[docs]: https://elastic.github.io/eui/

## Credits and Thanks

This library was forked from the [@elastic/eui](https://github.com/elastic/eui) and our changes were made from the [v29.3.2](https://github.com/elastic/eui/tree/v29.3.2) tag. The original license is [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Thanks so much to the original authors for their work.