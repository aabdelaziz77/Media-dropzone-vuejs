<template>
    <span :class="[$style['position-absolute'],$style.remove,$style['rtl'],$style['d-flex'],$style['justify-content-center'],$style['align-items-center'],$style.border,$style['rounded-circle'],$style['bg-dark-50']]" 
        @click.stop="removeFile(file)">
        <button :class="[$style['bg-transparent'],$style.pointer,$style['border-0'],$style['d-flex'],$style['justify-content-center'],$style['flex-grow-1'],$style['flex-shrink-1'],$style['text-white']]">
            <CloseIcon :class="[$style['d-flex'],$style['flex-grow-1'],$style['flex-shrink-1'],$style['text-white']]" />
        </button>
    </span>
</template>

<script>
import CloseIcon from './icons/CloseIcon'
export default {
    props: {
        file: [File, Object],
        options: Object,
        removeFile: Function
    },
    data(){
        return {
        }
    },
    components: {
       CloseIcon 
    }
}
</script>
<style module src="../style.css">
</style>