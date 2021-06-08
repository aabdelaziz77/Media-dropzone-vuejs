import MediaDropzone from "./MediaDropzone";

function plugin(Vue) {
  Vue.component("MediaDropzone", MediaDropzone);
}

// Install by default if using the script tag
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}

export default MediaDropzone;
