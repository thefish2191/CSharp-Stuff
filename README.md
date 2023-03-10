# C# stuff

<!-- [![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/TheFish2191.csharp-stuff?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=TheFish2191.csharp-stuff) -->

## Warning

This version was marked as `preview`, and it's only purpose was to gather enough information to release an better and robust extension, and therefore removed from the marked place once it fulfilled it's purpose. A new version, without the `preview` tag and fully functional will be release any time soon.

## Overview

Adding custom features to VS Code, in order to make c# development smoother and easier.  
Focused on Dotnet 6 and above.


![presentation](/resources/demostration00.gif)

> You can always request a new feature by just raising an issue at [this](https://github.com/thefish2191/CSharp-Stuff) very repo, or directly to [my Twitter](https://twitter.com/thefish2191) account

## Features

There is a list of the features added, working on, or to be added:

- [ ] [Code completion](#code-completion)
- [x] Unity script
- [x] [Add new Item](#creating-c-files-top-level)
- [x] [Snippets](#snippets)

---

### More ahead in the future

List of features I'm going to add, but I'll take my time.

## *Creating C# files (Top level)*

***This function works on folder's context menus:***

- [x] Add new c# files
  - [x] class
  - [x] struct
  - [x] enum
  - [x] interface
  - [x] XML
  - [x] JSON
  - [x] Unity Scripts

- [ ] Add new Web files
  - [ ] controller
  - [ ] apiController
  - [ ] Angular Controller
  - [ ] Angular Directive
  - [ ] Angular Module

- [ ] Add new [templates]
  - [ ] console
  - [ ] angular
  - [ ] classLib
- [ ] Add global using file
- [ ] Move usings to `GlobalUsings.cs` file

---

## ***Use dotnet CLI from where you need it***

**This functions works on `.csproj` files:**

- [ ] dotnet commands
  - [ ] build
  - [ ] run
  - [ ] watch run
- [ ] add reference
- [ ] statically import namespace.

---

### **Code completion**

- [ ] code completion for `csproj` files

Used to have a reference when editing a `.csproj` file, I'll use [this](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview) document from ms' official documentation!

### **Snippets**

Some useful snipers than you may need

- [x] nested for loops

---

## Requirements

There are no requirements so far.

## Extension Settings

Not added so far.

## How to modify/personalize this extension

 So, you decided to contribute, right?  
 Doing so is that easy as:

- Download and install `node`.
- Download this repo.
- Open up this repo in `vscode`.
- Run the `npm install` command
- Press `F5`
- Modify

---

**Enjoy!**
