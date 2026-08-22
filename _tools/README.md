# Website generation tools

## Build and validate the site

Run the source generator, then the repository checker:

```sh
node _tools/build-docs.mjs
node _tools/check-docs.mjs
```

## Regenerate the llms.txt v2 article screenshots

The article uses privacy-safe SourceShelf 1.0.2 assets from the deterministic App Store screenshot corpus. The source-selection image renders the shipping Safari-extension HTML and CSS with synthetic documentation titles; it does not redraw or invent SourceShelf controls.

From the website repository, run:

```sh
node _tools/generate-llms-txt-v2-screenshots.mjs
```

The script expects the sibling `VaultMarkDesktop` application repository, the sibling `SourceShelfResources` screenshot corpus, Google Chrome, and `cwebp`. It writes localized source assets under `_blog/assets/`; the normal site build copies them into `assets/blog/`.
