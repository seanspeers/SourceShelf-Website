# Build, Export, and Move Packs on iPhone and iPad

A pack is an ordered collection of Library sources. It organizes research without duplicating the underlying sources.

## Create and manage a pack

Use **New Pack** in the sidebar to create an empty pack. To add research, open a source’s actions or enter selection mode, choose **Add to Pack…**, and select an existing pack or create a new one.

Inside a pack, **Remove from Pack** removes only membership. The source remains in **All Research**. Rename or delete a pack from its context menu; deleting a pack also leaves its sources intact.

Search, filters, and sort apply to the currently selected Library or pack view. On iPad, keep the pack, source list, and Reader visible together when space permits. On iPhone, navigate through the same hierarchy one screen at a time.

## Export a pack

Open a pack and choose **More > Export Pack…**, or choose **Settings > Export a Pack…**. SourceShelf 1.0.2 for iPhone and iPad offers:

- **AI Reference Pack ZIP** for AI chats and project workspaces;
- **OKF v0.2 Bundle** for standards-based catalogs and agents;
- **Portable llms.txt Package** for a complete, standards-friendly collection.

After SourceShelf creates the ZIP, the system share sheet can save it to Files, send it with AirDrop, or pass it to another selected app.

## Import a portable pack

Choose **Import Research…** and select a supported ZIP. SourceShelf detects and validates SourceShelf AI Reference Pack, OKF, and Portable `llms.txt` packages, plus supported compatible packages. It verifies declared checksums and relationships before committing the import.

An import creates a new local pack and fresh source identifiers. Importing the same package twice creates two independent packs; it does not silently merge with or overwrite the first.

Package integrity means the imported bytes match the package’s declared inventory. It does not prove who created the package or that its research content is safe. Imported text remains reference content and is not interpreted as app instructions.

## Continue on Mac

Export a pack on iPhone or iPad, use Files or AirDrop to move it, then choose **Import Research Pack…** in SourceShelf on Mac. You can also export on Mac and select the resulting package with **Import Research…** on iPhone or iPad.

This is deliberate file portability—not automatic or live synchronization. Changes made on one device do not update copies on another device unless you export and import a new package.
