<template>
  <div>
    <h1>Props</h1>
    <p>The following props are available for the Vue2-Dropzone component.</p>
    <simple-table :headers="['Prop Name', 'Type', 'Default', 'Description']" :rows="props" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

export default {
  data: function() {
    return {
      props: [
        ['rtl	', 'Boolean','false', 'Displayed Files Direction ( from Right to Left).'],
        ['maxFilesize', 'Number','256', 'The maximum filesize (in bytes) that is allowed to be uploaded'],
        ['maxFiles', 'Number','null', 'whether to include default Dropzone styles on the component'],
        ['clickable', 'Boolean, Array, String','True', 'If true, the dropzone element itself will be clickable, if false nothing will be clickable. You can also pass an HTML element, a CSS selector (for multiple elements) or an array of those. In that case, all of those elements will trigger an upload when clicked.'],
        ['internalCliclable','Boolean','False','If false, nothing will be clickable Inside Dropzone. if true it will add clickable Inside dropzone When it is empty of files'],
        ['acceptedFiles','Boolean, Array, String','null','The default implementation of accept checks the file\'s mime type or extension against this list. This is a comma separated list of mime types or file extensions. This option will also be used as [accept](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)'],
        ['showOnDrop','Boolean, Array, String','false','If false, nothing will be. if true Dropzone will disappear and will appear when files are added. You can also pass two HTML element or a CSS selector.First Element mean Dragging Element (default body). second Element mean Dropzone Display Element (default body) Eg.:true or div.container,div.containeror `["div.container","div.container"]`'],
        ['thumbnailWidth','Number String','null','This with for file thumbnail'],
        ['thumbnailHeight','Number String','null','The same as thumbnailWidth'],
        ['icons','Object','{}','Set Icon for Displayed Files Eg.:{ pdf: "icon" } accept iconFont image svg'],
        ['containerClass','String','null','Set Class Name to Dropzone Element'],
        ['previewClass','String','null','Set Class Name to Displayed Files Element'],
        ['internalButtonClass','String','null','Set Class Name to Internal Button'],
        ['title','String','Drop files here to upload"	','The text used before any files are dropped'],
        ['subtitle','String','null','The text used before any files are dropped and after title.'],
        ['msFileTooBig','String','null','If the filesize is too big. {{filesize}} and {{maxFilesize}} will be replaced with the respective configuration values.'],
        ['msgInvalidFileType','String','Invalid extension for file {{fileName}}.','If the file doesn\'t match the file type.'],
        ['msgFilesTooMany','String','Number of files selected for upload {{filesCount}} exceeds maximum allowed limit of {{maxFiles}}.','Displayed if maxFiles is st and exceeded. The string {{maxFiles}} will be replaced by the configuration value.'],
      ]
    }
  },
  components: {
    'simple-table': SimpleTable,
  }
}
</script>

