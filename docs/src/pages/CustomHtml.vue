<template>
  <div>
    <h1>Adding Custom HTML to the dropzone using slots</h1>
    <p v-html="marked(description)"></p>
    <media-dropzone ref="myVueDropzone" :options="options" >
      
      <template #title>
        <h3 style="margin-top: 0;color: #00b782;">Drag and drop to upload Files!</h3>
      </template>
      <template #subtitle>
          <div>...or click to select a file from your computer</div>
      </template>
  </media-dropzone>
    <h3>HTML</h3>
    <p v-html="marked(html)"></p>
    <h3>Javascript</h3>
    <p v-html="marked(js)"></p>
    <h3>Style</h3>
    <p v-html="marked(css)"></p>
    <edit-doc :link="'CustomHtml.vue'"></edit-doc>
  </div>
</template>

<script>
import MediaDropzone from "../../../src";
var html = `
    <vue-dropzone :options="dropzoneOptions" :useCustomSlot=true>
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>
    `;
var js = `
  data () {
    return {
      ....
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true
      },
      ....
    }
  }
    `;
var css = `
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
`;

export default {
  data() {
    return {
      description:
        'With the `useCustomSlot` property set to `true` you can insert any html you can to replace the default message for the dropzone. The content will automatically we wrapped inside the `.dz-message` class.',
      html: '````' + html + '````',
      css: '````' + css + '````',
      js: '````' + js + '````',
      options: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true
      }
    };
  },
  components: {
    MediaDropzone,
  },
  methods: {
    getFiles(){
      
    }
  },
  
};
</script>

<style scoped>
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

#dropzone >>> .dz-message {
  font-weight: 700;
  color: #acacac;
}

#dropzone >>> .fa-cloud-upload {
  margin-right: 10px;
}

.dropzone {
  position: relative;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>
