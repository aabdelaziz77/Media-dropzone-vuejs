<template>
    <div :class="[$style['position-relative'],$style['d-flex'],$style['flex-grow-1'],$style.rounded,$style['align-items-stretch'],$style['align-self-stretch']]">
        <div :class="[$style['d-flex'],$style['flex-column'],$style['flex-grow-1'],$style['flex-shrink-1'],$style['overflow-hidden'],$style['justify-content-start'],$style['bg-white'],$style.rounded,$style.pointer]" >
            <div v-bind:style="{ backgroundImage: 'url(' + image + ')' }" 
                :class="[$style['position-relative'],$style['bg-transparent'],$style['flex-grow-1'],$style['flex-shrink-1'],$style.rounded,$style['border-0'],$style['d-flex'],$style['align-self-stretch']]"
                style="background-position: center center; background-repeat: no-repeat; background-size: cover;">
            </div>
        </div>
            <div :class="[$style['position-absolute'],$style['top-0'],$style['bottom-0'],$style['right-0'],$style['left-0'], $style.rounded,$style['d-flex'],$style['justify-content-center'],$style['align-items-center'],$style['bg-dark-30']]" >
                <span :class="[$style['d-flex'],$style['align-items-center'],$style['justify-content-center']]" v-bind:style="{width:size,height:size}">
                                    
                    <span v-if="options.icons['pdf'] &&  typeof options.icons['pdf'] !== 'object'" 
                        v-html="options.icons['pdf']" 
                        v-bind:style="{fontSize:size,width:size,height:size}" 
                        :class="[
                            $style['d-flex'],
                            $style['flex-grow-1'],$style['flex-shrink-1']
                        ]">
                    </span>
                    <component 
                        v-else
                        :is="options.icons['pdf'] ? 'icon-pdf' : 'icon-default'"
                        :size="parseInt(size)"
                        :class="[$style['d-flex'],$style['flex-grow-1'],$style['flex-shrink-1'],$style['text-white-80']]"
                    />
                </span>
            </div>

        
        
        
    </div>
</template>

<script>
import PdfIcon from './icons/PdfIcon'
export default {
    props: {
        image: String,
        options: Object
    },
    data() {
        return {
            size: parseInt(this.options.thumbnailWidth) / 2 + 'px',
        }
    },
    components:{
        PdfIcon
    }
}
</script>
<style module src="../style.css">
</style>