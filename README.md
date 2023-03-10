# Dotnet-helper

[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/TheFish2191.csharp-stuff?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=TheFish2191.csharp-stuff)

Adding custom features to vs code, in order to make c# development smoother and easier.  
Focused on Dotnet 6 and above.

## Overview

![presentation](/resources/demostration00.gif)

> You can always request a new feature by just raising a issue at [this](https://github.com/thefish2191/CSharp-Stuff) very repo, or directly to [my twitter](https://twitter.com/thefish2191) account

## Features

There is a list of the features added, working on, or to be added:

- [ ] [Code completion](#code-completion)
- [x] [Add new Item](#creating-c-files-top-level)
- [x] [Sippets](#snippets)

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
  </details>  
- [ ] Add global using file
- [ ] Move usings to `GlobalUsings.cs` file

---

## ***Use dotnet cli from where you need it***

**This functions works on `.csproj` files:**

- [ ] dotnet commands
  - [ ] build
  - [ ] run
  - [ ] watch run
- [ ] add reference
- [ ] statically import namespace.

---

### **code completion**

- [ ] code completion for `csproj` files

Used to have a reference when editing a `.cjproj` file, I'll use [this](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview) document from ms' official documentation!

### **Snippets**

Some useful snipers than you may need

- [x] nested for loops

---

## Requirements

There are no requirements so far.

## Extension Settings

`contributes.configuration`  
Groups of importing namespaces for the `GlobalUsings.cs` file

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
