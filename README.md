# Storybook

- using storybook with create-react-app typescript
  - Cannot build (build fail)

> node_modules@storybook\preset-create-react-app\dist\index.js

replace 
```
  var craWebpackConfigPath = path_1.join(scriptsPath, 'config', 'webpack.config');
```
with
```
  var craWebpackConfigPath = path_1.join(scriptsPath, 'react-scripts/config', 'webpack.config');
```
