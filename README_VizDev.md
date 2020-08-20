# Developing Visualizations

[Source](https://kobelb.github.io/kibana-rbac-docs/development-visualize-index.html)

Kibana Visualizations are the easiest way to add additional functionality to Kibana. This part of documentation is split into two parts. The first part tells you all you need to know on how to embed existing Kibana Visualizations in your plugin. The second step explains how to create your own custom visualization.

## Visualization Factory

Use the `VisualizationsSetup` to create a new visualization. The creation-methods create a new visualization tied to the underlying rendering technology.

```ts
  public setup(
    { visualizations }: MyPluginSetupDependencies
  ) {
    visualizations.createBaseVisualization(.createBaseVisualization({
    name: 'my_new_vis',
    title: 'My New Vis',
    icon: 'my_icon',
    description: 'Cool new chart',
    category: CATEGORY.OTHER
    ...
  }););
  }
```

The list of common parameters:

- name: unique visualization name, only lowercase letters and underscore
- title: title of your visualization as displayed in kibana
- icon: the icon class to use (font awesome)
- image: instead of icon you can provide svg image (imported)
- description: description of your visualization as shown in kibana
- category: the category your visualization falls into (one of ui/vis/vis_category values)
- visConfig: object holding visualization parameters
- visConfig.defaults: object holding default visualization configuration
- visualization: A constructor function for a Visualization.
- requestHandler: <string> one of the available request handlers or a <function> for a custom request handler
- responseHandler: <string> one of the available response handlers or a <function> for a custom response handler
- editor: <string> one of the available editors or Editor class for custom one
- editorConfig: object holding editor parameters
- options.showTimePicker: <bool> show or hide time picker (defaults to true)
- options.showQueryBar: <bool> show or hide query bar (defaults to true)
- options.showFilterBar: <bool> show or hide filter bar (defaults to true)
- options.showIndexSelection: <bool> show or hide index selection (defaults to true)
- stage: <string> Set this to "experimental" or "labs" to mark your visualization as experimental. Labs visualizations can also be disabled from the advanced settings. (defaults to "production")
- feedbackMessage: <string> You can provide a message (which can contain HTML), that will be appended to the experimental notification in visualize, if your visualization is experimental or in lab mode.

Each of the factories have some of the custom parameters, which will be described below.

# Base Visualization Type

The base visualization type does not make any assumptions about the rendering technology you are going to use and works with pure JavaScript. It is the visualization type we recommend to use.

You need to provide a type with a constructor function, a render method which will be called every time options or data change, and a destroy method which will be called to cleanup.

The render function receives the data object and status object which tells what actually changed. Render function needs to return a promise, which should be resolved once the visualization is done rendering.

The status object provides information about changes since the previous render call. Due to performance reasons you need to opt-in for each status change, that you want to be informed about by Kibana. This is done by using the requiresUpdateStatus key in your visualization registration object. You pass it an array, that contains all the status updates you want to receive. By default none of it will be calculated.

The following snippet shows explain all available status updates. You should only activate those changes, that you actually use in your render method.

# React Visualization Type
React visualization type assumes you are using React as your rendering technology. Just pass in a React component to visConfig.template.

The visualization will receive `vis`, `visParams`, `config` and `visData` as props. It also has a `renderComplete` property, which needs to be called once the rendering has completed.

```ts
import { MyReactVizComponent } from './my_react_component';
  public setup(
    { visualizations }: MyPluginSetupDependencies
  ) {
    visualizations.createBaseVisualization(.createBaseVisualization({
    name: 'my_new_vis',
    title: 'My New Vis',
    icon: 'my_icon',
    description: 'Cool new chart',
    category: CATEGORY.OTHER,
    visConfig: {
       template: MyReactVizComponent
    }
  }););
  }
```