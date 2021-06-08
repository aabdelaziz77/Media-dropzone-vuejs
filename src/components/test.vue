<template>
    <transition name="out-in">
        <div
            v-if="files && files.length > 0"
            v-show="viewerShown"
            @click.stop="close"
            ref="container"
            :class="[$style['d-flex'],$style['justify-content-center'],$style['h-100'],$style['w-100'],$style['bg-dark'],$style['position-fixed'],$style['top-0'],$style['left-0']]">
            
            <div :class="[$style['d-flex'],$style['justify-content-center'],$style['align-items-center']]" @click.stop>
                <transition name="out-in">
                    <img
                        v-if="currentMedia.type.startsWith('image')"
                        :key="currentMedia.src"
                        :src="currentMedia.src"
                        :srcset="currentMedia.srcset || ''"
                        :class="[$style['d-block'],$style.pointer]"
                        style="max-height: calc(100vh - 60px); height: auto; margin: 0 auto; max-width: 100%; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;"
                        :alt="currentMedia.caption"
                    >
                    <audio controls v-if="currentMedia.type.startsWith('audio')" ref="audio" :key="currentMedia.src">
                        <source :src="currentMedia.src" :type="currentMedia.type">
                        Your browser does not support the audio element.
                    </audio>
                    <video
                        v-else-if="currentMedia.type.startsWith('video')"
                        :key="currentMedia.src"
                        :src="currentMedia.src"
                        ref="video"
                        controls
                        style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; max-height: 100%; max-width: 100%; margin: auto;"
                        >
                    </video>
                </transition>
            </div> 

            <div 
                :class="[$style['position-absolute'],$style['h-100'],$style['top-0'],$style['right-0']]" 
                style="display: inline-block!important; z-index: 42!important; pointer-events: none; width: 60px;">
                <div  
                    :class="[
                        controlsHidden?$style.hidden: '',
                        $style['hideable'],
                        $style['d-flex'],
                        $style['position-absolute'],$style['inset-0'],
                        $style['align-items-center'],$style['justify-content-center'],
                        $style['text-white'],$style['w-100'],$style['h-100'],
                        $style.pointer,$style['bg-transparent'],
                    ]"
                    @mouseover="isHovered = true"
                    @mouseleave="isHovered = false" 
                    @click.stop="next()" 
                    v-if="this.files.indexOf(currentMedia) !== this.files.length - 1 " 
                    style="margin: auto!important; pointer-events: auto; width: 44px; height: 91px;">
                    <font-awesome-icon :icon="right" size="lg" />
                </div>
            </div>
            <div 
                :class="[$style['position-absolute'],$style['h-100'],$style['top-0'],$style['left-0']]" 
                style="display: inline-block!important; z-index: 42!important; pointer-events: none;width: 60px;">
                <div 
                    @click.stop="previous()" 
                    :class="[
                        controlsHidden?$style.hidden: '',
                        $style['hideable'],
                        $style['d-flex'],
                        $style['position-absolute'],$style['inset-0'],
                        $style['align-items-center'],$style['justify-content-center'],
                        $style['text-white'],$style['w-100'],$style['h-100'],
                        $style.pointer,$style['bg-transparent']
                    ]"
                    @mouseover="isHovered = true"
                    @mouseleave="isHovered = false"
                    v-if="this.files.indexOf(currentMedia) !== 0 " 
                    style="margin: auto!important; pointer-events: auto; width: 44px; height: 91px;">
                    <font-awesome-icon :icon="left" size="lg" />
                </div>
            </div>
            
            <div 
                :class="[$style['position-absolute'],$style['w-100'],$style['right-0'],$style['bottom-0'],$style['left-0']]" 
                style="display: inline-block!important;background-color: rgb(13, 13, 13); z-index: 42!important; pointer-events: none;height: 60px;">
                <div 
                    :class="[
                        controlsHidden?$style.hidden: '',
                        $style['hideable'],
                        $style['d-flex'],
                        $style['position-absolute'],$style['inset-0'],
                        $style['align-items-center'],$style['justify-content-center'],
                        $style['text-white'],$style['w-100'],$style['h-100'],
                        $style.pointer,$style['bg-transparent'],$style['text-danger']
                    ]"
                    style="margin: auto!important; pointer-events: auto; width: 44px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
            </div>
            
        </div> 
        
    </transition>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


export default {
    components: { FontAwesomeIcon },

    props: {
        files: {
            type: Array,
            required: true,
        },
        options: Object,
    },

    data() {
        return {
            select: 0,
            right:faChevronRight,
            left: faChevronLeft,
            closeIcon:faTimes,
            viewerShown: false,
            controlsHidden: false,
            isHovered: false,
            trash: faTrashAlt
        }
    },

  computed: {
    currentMedia() {
        
        return this.files[this.select]
    },

  },

  watch: {
    viewerShown(value) {
      // istanbul ignore else
        if (document != null) {
            if (value) document.addEventListener('keydown', this.addKeyEvent)
            else 
                document.removeEventListener('keydown', this.addKeyEvent)
                if (this.$refs.video){ 
                    this.$refs.video.pause()
                    this.$refs.video.currentTime = '0'
                }
                if (this.$refs.audio){ 
                    this.$refs.audio.pause()
                    this.$refs.audio.currentTime = '0'
                }
        }
                
    },


  },

    mounted() {
        
        //this.onToggleLightBox(this.viewerShown)
        console.log(this.$refs.container)
        if (this.$refs.container) {
            this.$refs.container.addEventListener('mousedown', this.handleMouseActivity);
            this.$refs.container.addEventListener('mousemove', this.handleMouseActivity);
            this.$refs.container.addEventListener('touchmove', this.handleMouseActivity);
        }
        
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.addKeyEvent)
        if (this.$refs.container) {
            this.$refs.container.removeEventListener('mousedown', this.handleMouseActivity);
            this.$refs.container.removeEventListener('mousemove', this.handleMouseActivity);
            this.$refs.container.removeEventListener('touchmove', this.handleMouseActivity);
        }
        
    },

    methods: {

        show(index) {
            this.select = index
            this.controlsHidden = false
            this.viewerShown = true

        },

        addKeyEvent(event) {
            switch (event.keyCode) {
                case 37: // left arrow
                    this.previous()
                break
                case 39: // right arrow
                    this.next()
                break
                case 27: // esc
                    this.close()
                break
            }
        },

        close() {
            if (this.$refs.video)
                this.$refs.video.pause();
                this.$set(this, 'viewerShown', false)
        },

        next() {
            if ((this.select) % this.files.length  ==  this.files.length - 1) return; 
            this.$set(this, 'select', (this.select + 1) % this.files.length)
        },

        previous() {
            if ((this.select) % this.files.length == 0) return; 
            this.$set(this, 'select', (this.select + this.files.length - 1) % this.files.length)
        },s

        handleMouseActivity() {
            let interactionTimer = null
            clearTimeout(interactionTimer);
            console.log(111111111111)
            if (this.controlsHidden) {
                this.controlsHidden = false
            }
             if (this.isHovered) {
                interactionTimer = null
            } else {
                interactionTimer = setTimeout(() => {
                    this.controlsHidden = true
                }, 3000)
            }
        },
    },
}
</script>

<style module src="../style.css">
</style>
