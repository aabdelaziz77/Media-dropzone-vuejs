<template>
  <aside class="sidebar">
    <h1>
      <a class="app-name-link" style="color: var(--theme-color,#42b983);font-weight: bold;" data-nosearch="" href="/media-dropzone-vuejs/docs/">Media Dropzone</a>
    </h1>

    <hr class="border">
    <div class="sidebar-nav">
      <ul>
        <li v-for="section in sections" :key="section.title">
          <p>{{ section.title}}</p>
          <ul>
            <router-link v-for="page in section.pages" tag="li" active-class="active" :key="page.title" :to="page.to">
              <a>{{page.title}}</a>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: 'Getting started',
          pages: [{ to: 'installation', title: 'Installation & Usage' }]
        },
        {
          title: 'Documentation',
          pages: [
            { to: '/props', title: 'Configuration options' },
            { to: '/events', title: 'Events' },
            { to: '/solts', title: 'Solts' },
            { to: '/demo', title: 'Basic Demo' },

          ]
        },
        
      ]
    };
  }
};
</script>

<style>
.border {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.sidebar li {
  margin: 2px 0 2px 15px;
}

.sideBtn {
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  margin: 20px 0px;
}

.github {
  background: #747b8b;
  padding: 10px 48px;
  margin: 40px 0px;
}

.github:hover {
  background: #00b782;
}

.sidebar .sideBtn a {
  color: white;
  letter-spacing: 0.1rem;
}

.cause .sideBtn a {
  font-weight: 500;
}

.sidebar .github a {
  font-weight: 700;
}

.sidebar .sideBtn a:hover {
  text-decoration: none;
}

.fa {
  vertical-align: middle;
  margin-right: 10px;
}

.center-c {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
