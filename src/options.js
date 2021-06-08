//import { faFileWord,faFilePdf,faFile } from '@fortawesome/free-solid-svg-icons'
import iconFile from './components/icons/FileIcon.vue'
import iconPdf from './components/icons/PdfIcon.vue'
import iconWord from './components/icons/WordIcon.vue'


export default {

    /**
    * The Displayed Files Direction ( from Right to Left).
    */
    rtl:true,
    /**
    * The maximum filesize (in bytes) that is allowed to be uploaded.
    */
    maxFilesize: 256,
    
    /**
     * If not `null` defines how many files this Dropzone handles. If it exceeds,
     * the event `maxfilesexceeded` will be called. The dropzone element gets the
     * class `dz-max-files-reached` accordingly so you can provide visual
     * feedback.
    */
    maxFiles: null,
    /**
     * If `true`, the dropzone element itself will be clickable, if `false`
     * nothing will be clickable.
     *
     * You can also pass an HTML element, a CSS selector (for multiple elements)
     * or an array of those. In that case, all of those elements will trigger an
     * upload when clicked.
    */
    clickable: true,
    /**
     * If `false`, nothing will be clickable Inside Dropzone 
     * if `true` it will add clickable  Inside dropzone When it is empty of files .
     *
    */
    internalCliclable:false,
    /**
     * The default implementation of `accept` checks the file's mime type or
     * extension against this list. This is a comma separated list of mime
     * types or file extensions.
     *
     * Eg.: `image/*,application/pdf,.psd`
     *
     * If the Dropzone is `clickable` this option will also be used as
     * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
     * parameter on the hidden file input as well.
     */
    acceptedFiles: null,
    /**
     * If `false`, nothing will be. 
     * if `true` Dropzone will disappear and will appear when files are added.
     *
     * You can also pass two HTML element or a CSS selector. 
     * First Element mean Draging Element (default `body`)
     * second Element mean Dropzone Display Element (default `body`)
     * This Element will trigger a appear dropzone inside this Element.
    */
    showOnDrop:false,

    /**
    * this with for file thumbnail.
    */
    thumbnailWidth: 135,

    /**
    * The same as `thumbnailWidth`. 
    */
    thumbnailHeight: 135,

    duplicateCheck:true,
    /**
    * The Displayed Files Icon.
    */
    icons:{
        'default':iconFile,
        'pdf':iconPdf,
        'docx':iconWord,

    },
    validViewerFileType : ['image','video','audio'],

    containerClass:null,
    previewClass: null,
    internalButtonClass:null,
    /**
    * The text used before any files are dropped.
    */
    title: "Drop files here to upload",

    /**
    * The text used before any files are dropped and after title.
    */
    subTitle: null,


    /**
     * If the filesize is too big.
     * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
     */
    msFileTooBig:"File ({{fileName}}) is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
    /**
    * If the file doesn't match the file type.
    */
    msgInvalidFileType: 'Invalid extension for file "{{fileName}}".',

    /**
   * Displayed if `maxFiles` is st and exceeded.
   * The string `{{maxFiles}}` will be replaced by the configuration value.
   */
    msgFilesTooMany: "Number of files selected for upload ({{filesCount}}) exceeds maximum allowed limit of {{maxFiles}}."


} 