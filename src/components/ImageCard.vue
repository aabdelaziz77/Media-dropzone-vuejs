<template>
    <div :class="[$style['d-flex'],$style['position-relative'],$style['flex-column'],$style['flex-grow-1'],$style['flex-shrink-1'],$style['overflow-hidden'],$style.pointer]">

        <div :class="[$style['position-relative'],$style['d-flex'],$style['flex-grow-1'],$style.rounded,$style['align-items-stretch'],$style['align-self-stretch']]">
            <div v-bind:style="{ backgroundImage: 'url(' + image + ')' }" 
                :class="[$style['position-relative'],$style['bg-transparent'],$style['flex-grow-1'],$style['flex-shrink-1'],$style.rounded,$style['border-0'],$style['d-flex'],$style['align-self-stretch']]"
                style="background-position: center center; background-repeat: no-repeat; background-size: cover;"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: String,
    },
}
</script>
<style module src="../style.css">
</style>