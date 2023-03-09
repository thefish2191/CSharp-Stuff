# Dotnet-helper

Adding custom features to vs code, in order to make c# development smoother and easier.  
Focused on Dotnet 6 and above.

## Overview

 <!-- insert images of this extension using all it's functions -->

## Upcoming features

There is a list of the features I'll work in:

### Next to be added

[Sippets and code completion](#snippets-and-code-completion)

---

### More ahead in the future

List of features I'm going to add, but I'll take my time.

## *Creating C# files (Top level)*

***This function works on folder's context menus:***

- [ ] Add new c# files <details closed> <summary>See more</summary>
  - [x] class
  - [x] struct
  - [x] enum
  - [x] interface
  - [ ] XML
  - [ ] JSON

</details>

- [ ] Add new Web files <details closed> <summary>See more</summary>
  - [ ] controller
  - [ ] apiController
  - [ ] Angular Controller
  - [ ] Angular Directive
  - [ ] Angular Module

</details>  

- [ ] Add new [templates] <details closed> <summary>See more</summary>
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

### **Snippets and code completion**

Some useful snipers than you may need

- [ ] nested for loops
- [ ] code completion for `csproj` files

---

## Requirements

There are no requirements so far.

## Extension Settings

`contributes.configuration`  
Groups of importing namespaces for the `GlobalUsings.cs` file

## Known Issues

 All good so far! This extension do all the things checked with ( [x] ) in the [Next to be added](#next-to-be-added) section.

## Release Notes

### 0.0.1

Added templates for basic C# files: Class, Struct, Enum and Interface!

### 0.0.0

Created basic skeleton.

---

**Enjoy!**
