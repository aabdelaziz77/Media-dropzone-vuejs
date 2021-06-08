<template>
  <div>
    <h1>Slots</h1>
    <p>All content is configurable by <a href="https://vuejs.org/v2/guide/components-slots.html">slots</a>.
Slots receive the instance itself as their <a href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots">scope</a>, meaning all relevant fields are directly accessible.</p>
    
    <pre v-pre data-lang="bash"><code class="lang-bash">&lt;media-dropzone-vuejs :options="options">
    &lt;template v-slot="{files, showViewer, removeFile}"&gt;
        &lt;figure v-for="file in files" :key="file.id" @click="showViewer(file)">
            &lt;img v-if="file.thumbnail" :src="file.thumbnail" :alt="file.name" />
            &lt;figcaption>
                `{{file.name}}`
            &lt;/figcaption>
            &lt;button @click="removeFile">remove&lt;/button>
        &lt;/figure>
    &lt;/template>
    &lt;template #title>
        &lt;h4>Drag and drop to upload content&lt;/h4>
    &lt;/template>
    &lt;template #subtitle>
        &lt;div>...or click to select a file from your computer&lt;/div&gt;
    &lt;/template&gt;
&lt;/vue-auto-dropzone&gt;</code></pre>
    <h4>Solts Properties</h4>
    <simple-table :headers="['Name', 'Scoped', 'Description']" :rows="methods" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

var example = `
      <vue-dropzone ref="myVueDropzone">
      ....
      methods: {
        someMethod: {
          this.$refs.myVueDropzone.processQueue()
        }
      }
      `
export default {
  data: function() {
    return {
      example: "````" + example + "````",
      methods: [
        ['default','files, removeFile, showViewer','Change the design of all files all types.'],
        ['image','files, removeFile, showViewer','Change the design of all files Only Image.'],
        ['video','files, removeFile, showViewer','Change the design of all files Only Video.'],
        ['pdf','files, removeFile, showViewer','Change the design of all files Only Pdf.'],
        ['','files, removeFile, showViewer',''],
        ['withIcon','files removeFile','Change the design of all files all types Except image, video and pdf.'],
        ['remove-button	','removeFile','Remove File.'],
        ['title','No','The text used before any files are dropped'],
        ['subTitle','No','The text used before any files are dropped and after title.'],
        ['','',''],
        
      ]
    }
  },
  components: {
    'simple-table': SimpleTable,
  }
}
</script>

