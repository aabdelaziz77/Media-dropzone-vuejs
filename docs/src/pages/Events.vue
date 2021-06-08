<template>
  <div>
    <h1>Events</h1>
    <p>Use <a href="https://vuejs.org/v2/guide/events.html"> Vue event handling</a> to listen for events and respond to them.
    </p>
    <pre v-pre data-lang="bash"><code class="lang-bash">&lt;vue-auto-dropzone
    :options="options"
    @drop="onDrop"
    @success="onSuccess"
/></code></pre>
      
    <simple-table :headers="['Name', 'Description']" :rows="events" />
  </div>
</template>

<script>
import SimpleTable from '../components/SimpleTable.vue';

export default {
  data: function() {
    return {
      events: [
        ['drop', 'The user dropped something onto the dropzone.'],
        ['dragstart','The user started to drag anywhere'],
        ['dragend','Dragging has ended'],
        ['dragenter','The user dragged a file onto the Dropzone'],
        ['dragover','The user is dragging a file over the Dropzone'],
        ['dragleave','The user dragged a file out of the Dropzone'],
        ['files','Array of all files'],
        ['error','Get Error'],
        ['change','Fired when new images are added or deleted it always returns uploaded files'],
        
      ]
    }
  },
  components: {
    'simple-table': SimpleTable,
  }
}
</script>

