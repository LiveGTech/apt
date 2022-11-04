# LiveG APT Repository
Our Debian APT repository for storing and distributing custom packages.

## Adding this repo to APT
To add this repo to APT so that you can install its packages, run the following commands:

```bash
$ curl -s --compressed https://opensource.liveg.tech/liveg-apt/KEY.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/liveg-apt.gpg > /dev/null
$ sudo curl -s --compressed https://opensource.liveg.tech/liveg-apt/liveg-apt.list -o /etc/apt/sources.list.d/liveg-apt.list
$ sudo apt update
```

## Updating this repo's metadata
To update the metadata for this repo, you will need the GPG keychain for `hi@liveg.tech`. With this keychain, run:

```bash
$ tools/update.sh
```

## Building a package in the `sources` directory
To build a package included in the `sources` directory, run:

```bash
$ tools/buildsource.sh $PACKAGE_NAME
```

Where `$PACKAGE_NAME` is the name of the package in the `sources` directory to build for. This will also update the repo's metadata.