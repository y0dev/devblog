<template>
  <div class="work-container">
    <h1>Work</h1>
    <ul class="criteria-list">
      <li v-for="item in criteria" :key="item">
        <FilterTags
          v-on:clicked="criteriaSeletion"
          :type="item"
          :state="selectedType === item"
        />
      </li>
    </ul>
    <div
      class="project-holder"
      v-for="project in filterProject"
      :key="project.index"
    >
      <ProjectModule
        v-on:emitImage="imagePreview"
        :title="project.title"
        :preview="project.preview_links"
        :type="project.category"
        :read="project.article"
        :coverImage="project.image"
        :content="project.content"
        class="module"
      />
    </div>
  </div>
</template>

<script>
import { TimelineLite } from "gsap/dist/gsap";

import ProjectModule from "../components/ProjectModule";
import FilterTags from "../components/FilterTags";

// import project from "../assets/projectData";
import projects from "../assets/json/projects.json"
export default {
  name: "Work",
  components: {
    ProjectModule,
    FilterTags,
  },
  data() {
    return {
      selectedType: "In Production",
      criteria: ["In Production", "Programming"],
    };
  },
  methods: {
    criteriaSeletion(type) {
      this.selectedType = type;
    },
    imagePreview(e) {
      this.$emit('emitImage', e)
    }
  },
  computed: {
    filterProject() {
      return projects.filter((pr) => {
        if (this.selectedType === "In Production") {
          console.log(pr.title)
          return pr.favorite === "Favorites";
        }
        return pr.category === this.selectedType;
      });
    },
  },
  watch: {
    selectedType: function () {
      const project = document.querySelector(".project-holder").firstChild;
      const tl = new TimelineLite();

      tl.from(project, {
        y: 200,
        duration: 0.4,
        opacity: 0,
      });
    },
  },
};
</script>
<style scoped>
.work-container {
  display: flex;
  flex-flow: column;
  align-items: center;
}

h1 {
  font-size: 72px;
  color: #FFFFFF;
  padding: 30px 0;
}
.module {
  margin-bottom: 10em;
  transition: box-shadow 0.4s ease-in-out;
}

.module:hover {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
}

.criteria-list {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 200px));
  width: 70vw;
  max-width: 1000px;
  list-style-type: none;
}

.criteria-list li {
  margin-right: 1em;
  text-align: center;
}

.project-holder {
  margin-top: 2em;
}

@media (max-width: 700px) {
  .criteria-list {
    width: 90vw;
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  .criteria-list li {
    margin-bottom: 1em;
    font-size: 14px;
  }
}
</style>