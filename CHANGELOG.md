# Change Log

All notable changes to the "csharp-stuff" extension will be documented in this file.

## Known Issues

- The command palette can not generate items yet, I think it will be the next feature to be added.
- The method to add/remove custom items is too hidden, the user could never notice that option even exit.
- The custom items templates does not contain a method to explain the user how to create new items, this due to an error throw when parsing the json with commends...

## Change log

 Here is a list of the changes I didn't forget to log:

### 0.0.8

- Added support for custom snippets, unlocking the power of creating any kind of Item.
- Fixed #11
- Changed Extension Icon

### 0.0.7

- Removed annoying message when creating unity scripts, reporting multiple parent projects
  Note: This message will be enable again, once we separate the item creator method for Unity items.

### 0.0.6

- Migrating to json snippets: In order to have more clean code, and more readable snippets, a json file with all the snippets is now available, also, this method will be used to allow the user to create items with custom snippets.
- Added unity scripts
- Changed Context Menu names.
- Fixed typos

### 0.0.5

- Fixed typos
- Patched: commands run from the command pallette throwing an error.

### 0.0.4

- Attempt to force vscode to play gif.

### 0.0.3

- Fixed bug that allows user to create items without extension.
- Added a gif to show up what this extension can do, so far.
- Added license.
- Bug Fix.

### 0.0.2

Added xml and json templates.

### 0.0.1

Added templates for basic C# files: Class, Struct, Enum and Interface!.

### 0.0.0

Created basic skeleton.
