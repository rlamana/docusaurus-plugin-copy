# docusaurus-plugin-copy

Copy assets from source tree to the same path in the output directory.

## Installation

```sh
yarn add docusaurus-plugin-copy
```

Modify your `docusaurus.config.js`

```diff
module.exports = {
  ...
+ plugins: [
+   ['docusaurus-plugin-copy', {
+     path: 'src/docs',
+     context: 'src',
+     include: '**/*.{png,jpg,jpeg,svg}'
+   }]
+ ],
  ...
}
```

### Options

|               Name                |        Type         |                     Default                     | Description                                                                                           |
| :-------------------------------: | :-----------------: | :---------------------------------------------: | :---------------------------------------------------------------------------------------------------- |
|               `path`              |     `{String}`      |                     `docs`                      | Input path.                                                                                           |
|             `include`             |     `{String}`      |            `**/*.{png,jpg,jpeg,svg}`            | Glob or pattern of the files to copy.                                                                 |
|             `context`             |     `{String}`      |                       ''                        | A path that determines how to interpret the defined `path` from where the assets are copied.          |
