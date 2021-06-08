<template>
        <div :class="[$style['d-flex'],$style['flex-column'],$style['flex-grow-1'],$style['flex-shrink-1'],$style['overflow-hidden'],$style['justify-content-start'],$style['bg-white'],$style.rounded,$style.pointer]">

            <div :class="[$style['d-flex'],$style['flex-grow-1'],$style['flex-shrink-1'],$style.rounded]" v-bind:style="{ backgroundImage: 'url(' + image + ')' }" style="background-position: center center; background-repeat: no-repeat; background-size: cover;"></div>
            <div :class="[$style['position-absolute'],$style.rounded,$style['top-0'],$style['right-0'],$style['bottom-0'],$style['left-0'],$style['d-flex'],$style['justify-content-center'],$style['align-items-center']]" style="background: linear-gradient(rgba(0,0,0,0.502),rgba(0,0,0,0.502));">
                <span :class="[$style['d-flex'],$style['border-2'],$style['rounded-circle']]" v-bind:style="{width:width,height:height}" style="align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.2);">
                    <VideoIcon :size="24" :class="[$style['d-flex'],$style['align-items-center'],$style['text-white']]" />
                </span>
            </div>
        </div>
        
        
</template>

<script>
import options from '../options'
import VideoIcon from './icons/VideoIcon'
export default {
    props: {
        image: String,
        options: Object
    },
    data() {
        return {
            width: parseInt(this.options.thumbnailWidth) / 3 + 'px',
            height: parseInt(this.options.thumbnailHeight) / 3 + 'px',
        }
    },
    components:{ VideoIcon },
    
}
</script>
<style module src="../style.css">
</style>