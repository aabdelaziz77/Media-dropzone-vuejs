<template>
  <div>
    <h1>Demo</h1>
    <p>Below you can see Vue2-Dropzone in action.</p>
    <media-dropzone ref="myVueDropzone" class="d-none" :options="options" @files="getfiles" >
      
      <template #title>
        <h3 style="margin-top: 0;color: #00b782;">Drag and drop to upload Files!</h3>
      </template>
      <template #subtitle>
          <div>...or click to select a file from your computer</div>
      </template>
  </media-dropzone>

    
  </div>
</template>

<script>
import MediaDropzone from "../../../src";

export default {
  data() {
    return {
      ok: true,
      options: {
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true
      },
      
    }
  },
  components: {
    MediaDropzone,
  },
  methods: {
    
  },
  
}
</script>

<style scoped>
.active {
  color: #78CB5B;
}

.inactive {
  color: #fff000;
}

.fa.fa-circle:before {
  content: "\25C9";
  /*color: #000;*/
}

th {
  text-align: center;
}

td:nth-child(1) {
  text-align: center;
}

td:nth-child(3) {
  text-align: center;
}

td:nth-child(2) {
  padding-left: 40px;
}

.event-active {
  font-weight: bold;
  color: #78CB5B;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}
</style>
