# MCP Troubleshooting

Work from SourceShelf outward: snapshot, helper path, client connection, then model behavior.

## 1. Confirm SourceShelf state

Open the saved pack’s **Local AI Access** sheet and verify:

- global sharing is enabled;
- the pack is saved and has no unsaved changes;
- a published snapshot is shown;
- status is **Current**, or you have intentionally retained a **Review Required** snapshot;
- the snapshot contains at least one readable source.

Select **Refresh** if you want to review and publish current changes. Use **Copy MCP Configuration** again after any change to the SourceShelf installation path.

## 2. Test the copied command directly

Paste **Copy Command** into Terminal. A stdio MCP helper normally waits silently for protocol input; it is not an interactive shell application. If it exits immediately and prints a diagnostic, check the message for a missing share, disabled registry, invalid snapshot, or checksum failure. Press Control-C to stop a waiting direct test.

Diagnostics belong on standard error. JSON-RPC protocol messages belong on standard output. Clients that merge or rewrite these streams can break the connection.

## 3. Common errors

### Process exited with code 1 / connection closed

Likely causes:

- the configured app was moved, updated, or replaced;
- the copied share was revoked;
- global MCP sharing is disabled;
- the snapshot or registry cannot be read.

Open SourceShelf, confirm the pack share, and copy a fresh configuration.

### Method not found: `tools/list`

The client reached an older resource-only helper. Install the current SourceShelf version, then recopy the command and restart the client integration. Current SourceShelf advertises `search_pack` and `read_pack_resource`.

### Resource not found

The URI is from another pack, another share, an older snapshot, or is not on the snapshot allowlist. Search again and read the URI returned by the current search result.

### Checksum failure

SourceShelf refuses to serve a snapshot file that no longer matches its published checksum. Refresh the share from SourceShelf. Do not edit files inside `MCP Shares/<share-id>/` manually.

### The client shows resources but the model never calls tools

The MCP connection is working, but the model or host policy is not issuing tool calls. Try:

> First call `search_pack` with query `...`. Then call `read_pack_resource` on the top result. Do not answer before both calls complete.

If that still becomes plain text, test a model known to support function calling.

### Search misses an exact phrase

Use meaningful content terms rather than punctuation-heavy text. Search is local lexical retrieval, not semantic embedding search. Try alternate wording or a shorter phrase.

### A long source is cut off

Call `read_pack_resource` again with the returned cursor. Smaller `max_characters` values help limited-context models.

## 4. Create a new authorization

If the client state remains ambiguous:

1. Remove the server entry from the AI client.
2. In SourceShelf choose **Stop Sharing**.
3. Save and recheck the pack.
4. Create a new Local AI Access authorization.
5. Add the newly copied configuration to the client.

A new authorization gets a new share ID. Old configurations remain invalid.
