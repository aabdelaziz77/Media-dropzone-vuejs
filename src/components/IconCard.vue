<template>
        <div :class="[
            $style['d-flex'],
            $style['flex-column'],
            $style['flex-grow-1'],
            $style['flex-shrink-1'],
            $style['overflow-hidden'],$style['m-2'],$style.rounded]" 
            v-bind:style="{width:options.thumbnailWidth,height:options.thumbnailHeight}" style="
                background-color: rgb(255, 255, 255);">
            <div
                :class="[
                $style['d-flex'],
                $style['justify-content-center'],
                $style['flex-grow-1'],$style['align-items-center']]">

                <span v-if="options.icons[getExtension(file.name)] && typeof options.icons[getExtension(file.name)] !== 'object'" 
                    v-html="options.icons[getExtension(file.name)]" 
                    v-bind:style="{fontSize:width,width:width,height:height}" 
                    :class="[
                        $style['d-flex'],
                        $style['flex-grow-1'],$style['flex-shrink-1']
                    ]">
                </span>
                <component 
                    v-else
                    :is="options.icons[getExtension(file.name)] ? 'icon-'+getExtension(file.name) : 'icon-default'"
                    :key="file.name"
                    :size="parseInt(width)"
                    :class="[
                        $style['d-flex'],
                        $style['flex-grow-1'],$style['flex-shrink-1']
                    ]"
                />


            </div>
            <div dir="auto" :class="[
                    $style['position-relative'],
                    $style['flex-grow-0'],$style['flex-shrink-0'],
                    $style['d-inline'],
                    $style['text-truncate'],
                    $style['mb-1'],
                    $style['justify-content-start'],$style['fs-15'],$style['text-dark'],$style['fw-normal']
                ]">
                {{file.name}}
            </div>
            <div dir="auto" :class="[
                    $style['position-relative'],
                    $style['flex-grow-0'],$style['flex-shrink-0'],
                    $style['d-inline'],
                    $style['text-truncate'],
                    $style['mb-1'],
                    $style['align-self-center'],$style['fs-12'],$style['text-muted'],$style['fw-normal']]" 
                >
                {{getReadableFileSizeString(file.size)}}
            </div>

        </div>
        
</template>

<script>
import Vue from 'vue'
import options from '../options';

Object.entries(options.icons).forEach(([key, value]) => Vue.component('icon-'+key,value));
export default {
    props: {
        file: [File, Object],
        options: Object,
    },
    data() {
        return {
            width: parseInt(this.options.thumbnailWidth) / 3 + 'px',
            height: parseInt(this.options.thumbnailHeight) / 3 + 'px',
    
        }
    },
    
    components:{},
    
    methods:{
        getReadableFileSizeString(fileSizeInBytes) {
            
            /*
            var i = Math.floor( Math.log(size) / Math.log(1024) );
            return ( size / Math.pow(1024, i) ).toFixed(1) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
            */
            var i = -1;
            var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
            do {
                fileSizeInBytes = fileSizeInBytes / 1024;
                i++;
            } while (fileSizeInBytes > 1024);

            return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
        },
        getExtension(fileName){
            return fileName.substr(fileName.lastIndexOf('.') + 1);
        },
        getIcon(fileName){
            console.log(this.options.icons[this.getExtension(fileName)]? this.options.icons[this.getExtension(fileName)] :this.options.icons)
            return this.options.icons[this.getExtension(fileName)] ? this.options.icons[this.getExtension(fileName)] : this.options.icons.default
        }
    }
}
</script>
<style module src="../style.css">
</style>