<template>
  <div>
    
    <h1>Installation & Usage</h1>
    <pre v-pre data-lang="bash"><code class="lang-bash">npm install media-dropzone-vuejs</code></pre>
    <p><pre>
    <code>&lt;template&gt;
      &lt;media-dropzone-vuejs ref="dropzone" :options="options" /&gt;
  &lt;/template&gt;
  &lt;script&gt;
    import MediaDropzoneVuejs from "media-dropzone-vuejs"
    ...
    export default {
        components: {
            MediaDropzoneVuejs,
        },
    ...
  &lt;/script&gt;
      
    </code></pre></p>

  
  </div>
</template>
<script>

export default {
  data() {
    return {
      ok: true,
    }
  },
  components: {
  }
}
</script>
<style>
.center-c {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
