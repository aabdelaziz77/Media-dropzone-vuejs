# Media-dropzone-vuejs

**Vue** component that provides drag and drop **Files** upload with preview.



<hr>

## Installation
```sh
npm install media-dropzone-vuejs
```

## Basic usage
```html
<template>
    <media-dropzone-vuejs ref="dropzone" :options="options" />
</template>
<script>
    import MediaDropzoneVuejs from "media-dropzone-vuejs"
    ...
    export default {
            components: {
                MediaDropzoneVuejs,
            },
    ...
</script>
```
## Configuration options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `rtl` | `Boolean` | `false` | Displayed Files Direction ( from Right to Left). |
| `maxFilesize` | `Number` | `256` | The maximum filesize (in bytes) that is allowed to be uploaded |
| `maxFiles` | `Number` | `null` | whether to include default Dropzone styles on the component |
| `clickable` | `Boolean`, `Array`, `String` | `true` | If `true`, the dropzone element itself will be clickable, if `false` nothing will be clickable. You can also pass an HTML element, a CSS selector (for multiple elements) or an array of those. In that case, all of those elements will trigger an upload when clicked.|
| `internalCliclable` | `Boolean` | `false` | If `false`, nothing will be clickable Inside Dropzone. if `true` it will add clickable  Inside dropzone When it is empty of files |
| `acceptedFiles` | `Boolean`, `Array`, `String` | `null` | The default implementation of `accept` checks the file's mime type or extension against this list. This is a comma separated list of mime types or file extensions. This option will also be used as [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)|
| `showOnDrop` | `Boolean`, `Array`, `String` | `false` | If `false`, nothing will be. if `true` Dropzone will disappear and will appear when files are added. You can also pass two HTML element or a CSS selector.First Element mean Dragging Element (default `body`). second Element mean Dropzone Display Element (default `body`) Eg.:`true`or `div.container,div.container`or `['div.container','div.container']`|
| `thumbnailWidth` | `Number` `String` | `null` | This with for file thumbnail |
| `thumbnailHeight` | `Number` `String` | `null` | The same as `thumbnailWidth` |
| `icons` | `Object`| `{}` | Set Icon for Displayed Files Eg.:{ pdf: 'icon' } accept `iconFont` `image` `svg` |
| `containerClass` | `String` | `null` | Set Class Name to Dropzone Element |
| `previewClass` | `String` | `null` | Set Class Name to Displayed Files Element |
| `internalButtonClass` | `String` | `null` | Set Class Name to Internal Button |
| `title` | `String` | Drop files here to upload" | The text used before any files are dropped |
| `subtitle` | `String` | Drop files here to upload" | The text used before any files are dropped and after title |
| `msFileTooBig` | `String` | `null` | If the filesize is too big. `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values. |
| `msgInvalidFileType` | `String`| Invalid extension for file `{{fileName}}`. | If the file doesn't match the file type. |
| `msgFilesTooMany` | `String` | Number of files selected for upload `{{filesCount}}` exceeds maximum allowed limit of `{{maxFiles}}`. | Displayed if `maxFiles` is st and exceeded. The string `{{maxFiles}}` will be replaced by the configuration value.|

## Slots
All content is configurable by [slots](https://vuejs.org/v2/guide/components-slots.html).  
Slots receive the instance itself as their [scope](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots), meaning all relevant fields are directly accessible.  

Example
```html
<media-dropzone-vuejs :options="options">
    <template v-slot="{files, showViewer, removeFile}">
        <figure v-for="file in files" :key="file.id" @click="showViewer(file)">
            <img v-if="file.thumbnail" :src="file.thumbnail" :alt="file.name" />
            <figcaption>
                {{file.name}}
            </figcaption>
            <button @click="removeFile">remove</button>
        </figure>
    </template>
    <template #title>
        <h4>Drag and drop to upload content</h4>
    </template>
    <template #subtitle>
        <div>...or click to select a file from your computer</div>
    </template>
</media-dropzone-vuejs>
```
#### Solts Properties
| Name | Scoped |  Description |
| --- | --- | --------- |
| `default` | `files` `removeFile` `showViewer` | Change the design of all files `all types`. |
| `image` | `files` `removeFile` `showViewer` | Change the design of all files `Only Image`. |
| `video` | `files` `removeFile` `showViewer` | Change the design of all files `Only Video`. |
| `pdf` | `files` `removeFile` `showViewer` | Change the design of all files `Only Pdf`. |
| `withIcon` | `files` `removeFile` | Change the design of all files `all types` Except `image, video and pdf`. |
| `remove-button` | `removeFile` | Remove File. |
| `title` | No | The text used before any files are dropped |
| `subTitle` | No |The text used before any files are dropped and after title. |

#### Slot scoped properties
| Property | Type |  Description |
| --- | --- | --------- |
| `files` | `Object` | Display Dropped Files. |
| `removeFile` | `Function` | Remove File. accept one parameter(`File`). |
| `showViewer` | `Function` | Display File. accept one parameter(`File`). |



## Events

Use [standard Vue event handling](https://vuejs.org/v2/guide/events.html) to listen for events and respond to them.

```html
<media-dropzone-vuejs
    :options="options"
    @drop="onDrop"
    @success="onSuccess"
/>
```
#### Events List
| Name | Description |
| --- | --- |
| `drop` | The user dropped something onto the dropzone |
| `dragstart` | The user started to drag anywhere |
| `dragend` | Dragging has ended |
| `dragenter` |The user dragged a file onto the Dropzone |
| `dragover` | The user is dragging a file over the Dropzone |
| `dragleave` |The user dragged a file out of the Dropzone |
| `files` | Array of all files |
| `error` | Get Error |
| `change` | Fired when new images are added or deleted it always returns uploaded files |



