# Build and run Mercury Wallet

## Build

To build mercury wallet clone [mercury wallet repo](https://github.com/commerceblock/mercury-wallet).

Steps for Linux/Windows:
```bash
git clone git@github.com:commerceblock/mercury-wallet.git
cd mercury-wallet
yarn app-linux # for Linux
yarn app-windows # for Windows
yarn app-macos # for macOS
```

You can also use Docker to build for Linux/Windows:
```bash
docker run --rm \
    -v ${PWD}:/project \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine \
    /bin/bash -c "yarn app-linux && yarn app-windows && ls -la dist"
```

This will generate wallet app in ```dist``` folder. To run: ```cd dist``` and execute .AppImage, .exe or .dmg files.


