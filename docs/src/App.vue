<template>
     <main>
    <SideBar />
    <section class="content" style="overflow:auto;">
      <article class="markdown-section">
        <router-view></router-view>
        <footer />
      </article>
    </section>
  </main>
</template>

<script>
import MediaDropzone from "../../src";

import SideBar from './sections/SideBar';
import Footer from './sections/Footer';
export default {
    name: "App",
    components: {
        MediaDropzone, SideBar, Footer
    },
    data() {
        return {
            options:{
                maxFiles:5,
                width:'135px',
                //icons:{'pdf': '<i class="fas fa-file-word text-primary"></i>'},
                //allowedFileTypes: ["image", "video"],
                //allowedFileExtensions: ["txt", "md", "ini", "text"],

                //acceptedFiles:"image/png,application/pdf",
                //acceptedFiles:['image','video'],
                //acceptedFiles:'.png,.txt',
                clickable:["span.plus",".pluss"],
                maxFilesize:50,
                internalCliclable:true,
                //showOnDrop:true,
                //viewerFileType : ['pdf']
                containerClass:'deopzone',
                previewClass: "bg-light",
                internalButtonClass:"button"
          },
          files:[]
        };
    },
    computed: {
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
        }
    },
    
    mounted(){
        var file = { size: 123, name: "Icon.png", type: "image/png" };
        let url = "https://api.asm.skype.com/v1/objects/0-weu-d15-310b05630c1c9ae069ec8be7f55e7fdd/views/imgpsh_mobile_save_anim";
        //this.$refs.myVueDropzone.manuallyAddFile(file, url);
    },
    methods: {
        getfiles(files){
            console.log(files,'demo')
        },
    }
};
</script>
