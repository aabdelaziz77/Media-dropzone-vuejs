<template>
    <div v-show="!isHidden" :class="[
        allOptions.containerClass, 
        $style['d-flex'],
        $style['justify-content-center'],
        [isHovering && allOptions.clickable === true && files.length === 0 ? $style['border-2']+' '+$style['border-dashed']+' '+$style.pointer   : $style['border-1']+' '+$style['border-solid']],
        $style['border-gray'],
        $style['position-relative'],$style['flex-grow-1'],$style['align-items-center'],$style.rounded]"
        v-bind:style="{minHeight:allOptions.thumbnailHeight}"
        style="padding: 20px 10px;"
        ref="dropzoneElement"
        @dragleave.prevent="dragLeave" 
        @dragenter.prevent="dragEnter" 
        @dragover.prevent="dragOver"
        @mouseover="isHovering = true" 
        @mouseout="isHovering = false" 
        >
        <div v-if="files.length == 0 && !dropped" :class="[$style['d-flex'],$style['flex-column'],$style['align-items-center'],$style['align-self-center']]">
            <slot name="title">
                <h4>{{allOptions.title}}</h4>
            </slot>
            <slot name="subtitle" dir="auto" :class="[$style['position-relative'],$style['d-inline'],$style['flex-grow-0'],$style['flex-shrink-1'],$style['overflow-hidden']]">
                <p v-if="allOptions.subtitle">{{allOptions.subtitle}}</p> 
            </slot>
        </div>
        
        

        <div :class="[allOptions.previewClass,[allOptions.rtl ? $style['dir-rtl']:''],$style['d-flex'],$style['justify-content-start'],$style['flex-grow-1']]" v-if="files.length > 0">
            <slot v-bind:files="files" v-bind:removeFile="removeFile" v-bind:showViewer="showViewer" v-bind:style="{height:allOptions.thumbnailHeight}">
            <div :class="[$style['d-flex'],$style['position-relative'],$style.rounded,$style['ml-2'],$style['mr-2'],$style['overflow-hidden']]"
                v-bind:style="{width:allOptions.thumbnailWidth,height:allOptions.thumbnailHeight}"
                v-for="(file, i) in files" :key="i" @click.stop="showViewer(file)">
                <slot name="image" v-if="file.type.startsWith('image')" v-bind:file="file" v-bind:removeFile="removeFile">
                    <image-card  :image="file.thumbnail"/>
                    <slot name="remove-button">
                        <remove :file="file" :removeFile="removeFile"/>
                    </slot>
                </slot>
                <slot name="video" v-else-if="file.type.startsWith('video')">
                    <video-card :options="allOptions" :image="file.thumbnail"/>
                    <slot name="remove-button">
                        <remove :file="file" :removeFile="removeFile"/>
                    </slot>
                </slot>
                <slot name="pdf"  v-else-if="file.type == 'application/pdf'">
                    <pdf-card :options="allOptions" :image="file.thumbnail"/>
                    <slot name="remove-button">
                        <remove :file="file" :removeFile="removeFile"/>
                    </slot>
                </slot>
                <slot name="withIcon" v-else>
                    <icon-card :options="allOptions" :file="file" />
                    <slot name="remove-button">
                        <remove :file="file" :removeFile="removeFile"/>
                    </slot>
                </slot>
                
            </div>
            </slot>
            <div ref="internalCliclable" v-if="allOptions.internalCliclable === true" @click="append" :class="[allOptions.internalButtonClass,$style['d-flex'],$style['justify-content-center'],$style['align-items-center']]">
                <button type="button" 
                    :class="[$style['d-flex'],$style['justify-content-center'],$style['align-items-center'],$style['flex-column'],$style['outline-none'], $style['border-transparent'],$style['border-1'],$style.rounded,$style['text-white'],$style['bg-secondary'],$style.pointer]" 
                    :style="{height:parseInt(allOptions.thumbnailHeight)/3+'px',width:parseInt(allOptions.thumbnailHeight)/3+'px'}">
                    <PlusIcon :size="22"/>
                </button>
            </div>

        </div>
        
        <div role="none" 
            ref="dropped"
            v-show="dropped"
            @drop.prevent="drop"
            :class="[$style['d-flex'],$style['position-absolute'],$style['w-100'],$style['w-100'],$style['justify-content-center'],$style['bg-white'],$style['top-0'],$style['left-0'],$style['right-0'],$style['bottom-0']]" style="opacity: 0.85;">
            <div role="none" :class="[
                $style['d-flex'],
                $style['position-relative'],
                $style['flex-row'],$style['flex-grow-1'],$style['flex-shrink-1'],
                $style['overflow-hidden'],
                $style['align-items-center'],
                $style['align-self-stretch'],
                $style['justify-content-center']]" style="margin: 15px; border-color: rgb(138, 141, 145); border-width: 2px; border-style: dashed;">
                <div role="none" :class="[$style['position-relative'],$style['d-flex'],$style['flex-column'],$style['flex-grow-0'],$style['flex-shrink-1'],$style['overflow-hidden'],$style['align-items-center'],$style['justify-content-center'],]" style="jpadding-left: 20px; padding-right: 20px;">
                    <div dir="auto" :class="[$style['position-relative'],$style['d-inline'],$style['flex-grow-0'],$style['flex-shrink-1'],$style['overflow-hidden']]">
                       <slot name="title"><h4 style="margin-bottom: 5px;margin-top: 0px;">{{allOptions.title}}</h4> </slot>
                    </div>
                    <div dir="auto" :class="[$style['position-relative'],$style['d-inline'],$style['flex-grow-0'],$style['flex-shrink-1'],$style['overflow-hidden']]">
                       <slot name="subtitle"> <p>{{allOptions.subtitle}}</p> </slot>
                    </div>
                </div>
            </div>
        </div>
        <input
            type="file"
            style="visibility: hidden; height: 0px; width: 0px;"
            ref="uploadInput"
            :class="[$style['position-absolute'],$style['top-0'],$style['left-0']]"
            multiple
        />
        <Viewer ref="viewer" v-if="viewerFiles.length > 0" :files="viewerFiles"></Viewer>
        <notifications ref="notifications" group="error" />
        
        
    </div>
</template>

<style module src="./style.css">


</style>
<script>

import defaultOptions from './options.js'
import ImageCard from './components/ImageCard'
import VideoCard from './components/VideoCard'
import PdfCard from './components/PdfCard'
import IconCard from './components/IconCard'
import Viewer from './components/Viewer'
import Remove from './components/Remove'
import PlusIcon from './components/icons/PlusIcon'
//import * as pdfjsLib from "./lib/pdf";
var pdfjsLib = require("pdfjs-dist/es5/build/pdf.min.js");

import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

const mime = require('mime');

import $ from "jquery";

import Vue           from 'vue'
import Notifications from 'vue-notification'
Vue.use(Notifications)

console.log(pdfjsLib)
export default {
    name: "MediaDropzone", // vue component name
    data() {
        return {
            error: null,
            files: [],
            dropped: false,
            clickableElements: [],
            allOptions:[],
            acceptedFiles:[],
            viewerFiles:[],
            enterTarget:null,
            isHidden:false,
            isHovering:false
        };
    },
    props: {
        max: Number,
        uploadMsg: String,
        maxError: String,
        fileError: String,
        options:Object
    },
    components: {
        ImageCard,
        VideoCard,
        PdfCard,
        IconCard,
        Remove,
        Viewer,
        PlusIcon
    },
    
    mounted(){
        this.allOptions = $.extend(true, defaultOptions, this.$props.options)
        this.allOptions.thumbnailWidth = typeof this.allOptions.thumbnailWidth === 'string' ?this.allOptions.thumbnailWidth:this.allOptions.thumbnailWidth+'px'
        this.allOptions.thumbnailHeight = typeof this.allOptions.thumbnailHeight === 'string' ?this.allOptions.thumbnailHeight:this.allOptions.thumbnailHeight+'px'
        this.isHidden = this.allOptions.showOnDrop
        if (this.allOptions.clickable === true) {
            this.clickableElements = [this.$refs.dropzoneElement]
        }else {this.clickableElements = this.getElements(this.allOptions.clickable,"clickable")}
        if (this.clickableElements ) {
            this.clickableElements.forEach((element) => {
            element.classList.add(this.$style.pointer)
            element.addEventListener("click",()=>{
                this.append(element)
            })    
        });
        }

        document.getElementsByTagName('body')[0].appendChild(this.$refs.uploadInput)
        document.getElementsByTagName('body')[0].appendChild(this.$refs.notifications.$el)
        if(this.$refs.viewer) document.getElementsByTagName('body')[0].appendChild(this.$refs.viewer.$el)
        if(this.allOptions.showOnDrop && this.isHidden) this.showOnDrop(this.allOptions.showOnDrop)
            
            
        if (this.allOptions.acceptedFiles ) {
            let acceptedFiles = this.allOptions.acceptedFiles;
            acceptedFiles = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',')
            for(let type of acceptedFiles){
                let val;
                if (mime.getType(type)) this.acceptedFiles.push(type)
                else if (mime.getExtension(type)) this.acceptedFiles.push(type)
                else this.acceptedFiles.push(type+'/*')
                //let val = (mime.getType(type) && (validType.charAt(0) === "." && mime.getExtention(type))  ? mime.getType(type) : type + '/*')
            }
            this.$refs.uploadInput.setAttribute('accept' , this.acceptedFiles)
        }

        this.$refs.uploadInput.addEventListener("change", this.drop, false);
    },
    updated:function(){
        if(this.allOptions.showOnDrop && this.isHidden) this.showOnDrop(this.allOptions.showOnDrop)
        document.getElementsByTagName('body')[0].appendChild(this.$refs.uploadInput)
        document.getElementsByTagName('body')[0].appendChild(this.$refs.notifications.$el)
        if(this.$refs.viewer) document.getElementsByTagName('body')[0].appendChild(this.$refs.viewer.$el)

    },
    watch: {
        files(){
            
        }
    },
    methods: {
        append(e) {
            let files = {...this.files}
            if(this.allOptions.internalCliclable && this.files.length > 0 && e == this.$refs.dropzoneElement) return;
            this.$refs.uploadInput.click();
        },
        show(val){
            this.$notify({
                group: 'error',
                type:'error',
                title: 'Error Message',
                text: val,
                duration:4000
                
            });
            this.$emit('error', val)
            this.error = null
        },
        manuallyAddFile: function(file, fileUrl,thumbnail=null) {

            if (!Array.isArray(file) || typeof file !== 'object') return;
            file.src = fileUrl;
            if(thumbnail) file.thumbnail = thumbnail;

            if(file.type.startsWith("image")) file.thumbnail = fileUrl
            this.files.push(file)  
            this.$emit('files', this.files)

        },
        showViewer(file){
            
            this.viewerFiles.filter((element, index) => { 
                if (element.id == file.id) {
                    this.$refs.viewer.show(index)
                }
             })
        },
        getElements:function (els, name) {
            let el, elements;
            if (els instanceof Array) {
                elements = [];
                try {
                for (el of els) {
                    let element;
                    if (typeof el === "string") {
                        element = document.querySelector(el);
                    } else if (el.nodeType != null) {
                        element = el;
                    }
                    if (element == null) {
                        throw new Error(
                        `Invalid \`${name}\` option provided. Please provide a CSS selector or a plain HTML element.`
                        );
                    }

                    elements.push(element);
                }
                } catch (e) {
                elements = null;
                }
            } else if (typeof els === "string") {
                elements = [];
                for (el of document.querySelectorAll(els)) {
                elements.push(el);
                }
            } else if (els.nodeType != null) {
                elements = [els];
            }

            if (elements == null || !elements.length) {
                throw new Error(
                `Invalid \`${name}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`
                );
            }

            return elements;
        },
        dragEnter(e){
            this.enterTarget = e.target;
            e.stopPropagation();
            e.preventDefault();
            this.$emit('dragEnter', e)
            return false
        },
        dragLeave:function(e){
            if (this.enterTarget == e.target){
                this.dropped = false
                e.stopPropagation();
                e.preventDefault();
            }
            this.$emit('dragLeave', e)
            return false

            
        },
        dragOver(e) {
            this.dropped = true;

            let efct;
            try {
              efct = e.dataTransfer.effectAllowed;
            } catch (error) {}
            e.dataTransfer.dropEffect =
              "move" === efct || "linkMove" === efct ? "move" : "copy";

            e.stopPropagation();
            e.preventDefault();
            this.$emit('dragOver', e)
            return false

        },
        remove_duplicates(a, b) {
            b = Object.values(b)
            b = b.filter( function( item ) {
                for( var i=0, len=a.length; i<len; i++ ){
                    if( a[i].name == item.name ) {
                        return false;
                    }
                }
                return true;
            });

            return b
        },
        drop(e) {
            e.stopPropagation();
            e.preventDefault();
            let files = !this.dropped ? 
                        e.currentTarget.files : 
                        e.dataTransfer.files;
            
            for (let i = 0; i < files.length; i++) {
                files[i]['id'] = this.files.length + i;
            }
            
            files = this.remove_duplicates(this.files,files)
            
            
            if (this.validateFiles(files)) this.$nextTick(() => {this.handleFiles(files)})
            if(this.error) this.show(this.error)
            this.$emit('files', this.files)
            this.$emit('drop', e)
            this.$emit("change", this.files);

            if(this.files.length === 0 && !this.error) this.isHidden = false
            //this.$refs.uploadInput.value = null;
            this.dropped = false;
        },
        showOnDrop(val){
            let elements;
            if (val === true) elements =  this.getElements(['body','body'])
            else {
                var els = typeof val === 'string'? val.split(','):val; 
                elements =  this.getElements(els,"clickable")
            }
            elements[1].appendChild(this.$refs.dropped)

            elements[0].addEventListener('dragenter', this.dragEnter, false);
            elements[0].addEventListener('dragover', this.dragOver, false);
            elements[0].addEventListener('dragleave', this.dragLeave, false);
        },
        async handleFiles(files) {

            for (let file of files) {
                
                if (this.allOptions.maxFilesize && file.size > this.allOptions.maxFilesize * 1024 * 1024) {
                    this.error = this.allOptions.msFileTooBig
                        .replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100)
                        .replace("{{maxFilesize}}", this.options.maxFilesize)
                        .replace("{{fileName}}", file.name);
                    
                }else if (!this.isValidFileType(file,this.acceptedFiles)){
                    this.error = this.allOptions.msgInvalidFileType
                    .replace("{{fileName}}",file.name)
                }else {
                    let dataURI = await this.readAsDataURL(file).then(result => result)
                    if(file.type.startsWith("image")) file.src = URL.createObjectURL(file);
                    else if (file.type.startsWith("video")) {
                        dataURI = await this.readAsDataURLVideo(file);
                    }
                    else if(file.type == "application/pdf"){
                        dataURI = await this.readAsDataURLPDF(file).then(result => result);
                    }else {
                        dataURI = '';
                        file.src = URL.createObjectURL(file)
                    }
                    if(dataURI) {
                        file.thumbnail = this.dataURItoBlob(dataURI);

                    }

                    this.files.push(file)                        
                    
                    if(this.allOptions.internalCliclable) this.$refs.dropzoneElement.classList.remove(this.$style.pointer)
                    let viewerFileType;
                    if (this.allOptions.viewerFileType){
                        viewerFileType = this.allOptions.viewerFileType;
                        if(typeof this.allOptions.viewerFileType == 'string'){
                            viewerFileType = this.allOptions.viewerFileType.split(',');
                        }
                    }else{
                        viewerFileType = this.allOptions.validViewerFileType;
                    }
                    for (let i = 0; i < viewerFileType.length; i++) {
                        if (file.type.startsWith(viewerFileType[i] && this.allOptions.validViewerFileType.find((type)=>viewerFileType[i] ==type ))) {
                                this.viewerFiles.push(file)

                        }
                        
                    }
                }

            }
            
        },
        validateFiles(files){
            if (
                this.allOptions.maxFiles !=null &&
                files.length + this.files.length > this.allOptions.maxFiles
            ) {
                this.error = this.allOptions.msgFilesTooMany
                .replace("{{maxFiles}}",this.allOptions.maxFiles)
                .replace("{{filesCount}}", files.length + this.files.length)

                return false

            }
        
            return true
        },
        isValidFileType(file, acceptedFiles) {
            if (acceptedFiles.length == 0 ) {
                return true;
            } // If there are no accepted mime types, it's OK
            
            let mimeType = file.type;
            let baseMimeType = mimeType.replace(/\/.*$/, "");

            for (let validType of acceptedFiles) {
                validType = validType.trim();
                if (validType.charAt(0) === ".") {
                    if (
                        file.name
                        .toLowerCase()
                        .indexOf(
                            validType.toLowerCase(),
                            file.name.length - validType.length
                        ) !== -1
                    ) {
                        return true;
                    }
                } else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    if (baseMimeType === validType.replace(/\/.*$/, "")) {
                        return true;
                    }
                } else {
                    
                    if (mimeType === validType) {
                        return true;
                    }
                }
            }

            return false;
        },
        readAsDataURL(file) {
            return new Promise(function (resolve, reject) {
                let fr = new FileReader();

                fr.onload = function () {
                    resolve(fr.result);
                };
                fr.onerror = function () {
                reject(fr);
                };
                fr.readAsDataURL(file);
            });
            

        },
        dataURItoBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);

            // create a view into the buffer
            var ia = new Uint8Array(ab);

            // set the bytes of the buffer to the correct values
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var blob = new Blob([ab], {type: mimeString});
            let objectURL = URL.createObjectURL(blob)
            return objectURL;

        },
        readAsDataURLVideo(file){
            var video = document.createElement('video');
            
            let videoMetaData = (file) => {
                return new Promise((resolve) => {
                    let video = document.createElement('video');
                    
                    video.preload = 'metadata';
                    
                    video.addEventListener('loadeddata', (event) => {
                        resolve({
                            video: video,
                            duration: Math.round(video.duration * 1000),
                            height: video.videoHeight,
                            width: video.videoWidth
                        });
                    });
                    
                    let src = URL.createObjectURL(file)
                    video.src = src;
                    var rand = Math.round(Math.random() * 1000) + 1;
                    video.currentTime = rand / 1000;
                    video.controls = true
                    file.src = video.src
                    
                })
            }
            return videoMetaData(file).then(function(value) {
                
                let videoCanvas = document.createElement('canvas');
                videoCanvas.height = value.height;
                videoCanvas.width = value.width;
                videoCanvas.getContext('2d').drawImage(value.video, 0, 0,value.width,value.height);

                
                var snapshot = videoCanvas.toDataURL('image/png');
                
                return snapshot
            })
            
        },
        readAsDataURLPDF(file){
            return new Promise((resolve, reject) => {
            var fr = new FileReader();  

                fr.onload =  () => {
                    var typedarray = new Uint8Array(fr.result);

                    var loadingTask = pdfjsLib.getDocument(typedarray);
                    loadingTask.promise.then((pdf) =>{
                        // you can now use *pdf* here
                        pdf.getPage(1).then((page) =>{
                            // you can now use *page* here
                            var viewport = page.getViewport({ scale: 1.5, });
                            var canvas = document.createElement('canvas');

                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            
                            page.render({
                                canvasContext: canvas.getContext('2d'),
                                viewport: viewport
                            });
                            
                            
                            setTimeout(function(){ 
                                resolve(canvas.toDataURL('image/png'));
                            }, 300);
                            
                            
                            


                        });

                    });
                };
                fr.onerror = function () {
                reject(fr);
                };
                fr.readAsArrayBuffer(file);
            });
            

            
        },
        removeFile(file) {
            var index = this.files.indexOf(file);
            if (index !== -1) {
                this.files.splice(index, 1);
            }
            var j = this.viewerFiles.indexOf(file);
            if (j !== -1) {
                this.viewerFiles.splice(j, 1);
            }
            this.$emit("change", this.files);
            this.$emit('files', this.files)
            this.$refs.uploadInput.value = null;
            if(this.allOptions.internalCliclable&& this.files.length == 0) this.$refs.dropzoneElement.classList.add(this.$style.pointer)
            if(this.allOptions.showOnDrop && this.files == 0 ) this.isHidden = true
        },
        
    },
};
</script>




