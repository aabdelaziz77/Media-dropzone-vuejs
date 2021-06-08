<template>
    <transition name="out-in" @afterEnter="enableImageTransition"
      @beforeLeave="disableImageTransition">
        <div
            v-show="viewerShown"
            @click.stop="close"
            ref="container"
            :class="[$style['d-flex'],$style['justify-content-center'],$style['h-100'],$style['w-100'],$style['bg-dark'],$style['position-fixed'],$style['top-0'],$style['left-0']]">
            
            <div v-if="files && files.length > 0" :class="[$style['d-flex'],$style['justify-content-center'],$style['align-items-center']]" @click.stop>
                <transition name="out-in">
                    <img
                        v-if="currentMedia.type.startsWith('image')"
                        :key="currentMedia.src"
                        :src="currentMedia.src"
                        :srcset="currentMedia.srcset || ''"
                        :class="[$style['d-block'],$style.pointer]"
                        style="max-height: 100%; height: auto; margin: 0 auto; max-width: 100%; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;"
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
                    <RightChevronIcon :size="24"/>
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
                    <LeftChevronIcon :size="24"/>
                </div>
            </div>
            <div  
                :class="[controlsHidden?$style.hidden: '',$style['hideable'],$style['position-absolute'],$style['right-0'],$style['top-0'],$style['d-flex'],$style['align-items-center'],$style['justify-content-center'],$style['text-white'],$style.pointer]" 
                style="width: 60px; height: 60px; padding: 12px;"
                @mouseover="isHovered = true"
                @mouseleave="isHovered = false">
                <CloseIcon :size="32"/>
            </div>
            
        </div> 
        
    </transition>
</template>

<script>

import RightChevronIcon from './icons/RightChevronIcon'
import LeftChevronIcon from './icons/LeftChevronIcon'
import CloseIcon from './icons/CloseIcon'

export default {
    components: {RightChevronIcon, LeftChevronIcon, CloseIcon },

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
            viewerShown: false,
            controlsHidden: false,
            isHovered: false,
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
        enableImageTransition() {
      this.handleMouseActivity()
      //this.imageTransitionName = 'vib-image-transition'
    },

    disableImageTransition() {
      //this.imageTransitionName = 'vib-image-no-transition'
    },
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
        },

        handleMouseActivity() {
            let interactionTimer = null
            clearTimeout(interactionTimer);

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
