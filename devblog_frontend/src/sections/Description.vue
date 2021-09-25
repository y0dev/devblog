<template>
  <article>
    <h2>A Glisp of Who I Am</h2>
    <p>
      I am a Software Engineer currently working in embedded systems. From the start I started off in iOS development and from there grew to enjoy
      web development both Front-End and Back-End. Who would have known User Interface would be a love/hate relationship. The struggle of coming 
      up with inspiration while at the same time enjoying the finish product. I am proficient in the following languages: 
      <span ref="reactive" @mouseenter="reactiveHighlight" @mouseleave="reactiveHighlightRemove">HTML, CSS, JavaScript, C/C++, and Python</span>
      The frameworks I currently work in is 
      <span ref="gdesign" @mouseenter="gHighlight" @mouseleave="gHighlightRemove">VueJs</span>
      .
    </p>
    <p>
      In my free time I work on cool projects while experimenting with new
      technologies. Currently I'm working on an astronomy discord bot and a
      chrome extension with Node, Firebase and Puppeteer.
    </p>
    <ul>
      <li>
        <VueJS class="icon" />
      </li>
      <li>
        <NodeJS class="icon" />
      </li>
      <li>
        <Python class="icon" />
      </li>
      <li>
        <a :href="pdf" download>
          <button>Resume</button>
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
// import JavaScript from "../assets/icons/js.svg";
import VueJS from "../assets/icons/vuejs.svg";
import NodeJS from "../assets/icons/nodejs.svg";
import Python from "../assets/icons/python.svg";
import { TimelineLite } from "gsap/dist/gsap";
export default {
  name: "Description",
  components: {
    // JavaScript,
    VueJS,
    NodeJS, 
    Python
  },
  data() {
    return {
      pdf: require('../assets/devontae_resume.pdf'),
    };
  },
  methods: {
    reactiveHighlight() {
      const tl = new TimelineLite();
      const { reactive } = this.$refs;
      tl.to(reactive, {
        backgroundColor: "#1a1a1a",
        color: "white",
      });
    },
    reactiveHighlightRemove() {
      const tl = new TimelineLite();
      const { reactive } = this.$refs;
      tl.to(reactive, {
        backgroundColor: "#141414",
        color: "#8d8d8d",
      });
    },
    gHighlight() {
      const tl = new TimelineLite();
      const { gdesign } = this.$refs;
      tl.to(gdesign, {
        backgroundColor: "#1a1a1a",
        color: "white",
      });
    },
    gHighlightRemove() {
      const tl = new TimelineLite();
      const { gdesign } = this.$refs;
      tl.to(gdesign, {
        backgroundColor: "#141414",
        color: "#8d8d8d",
      });
    },
  },
};
</script>

<style scoped>
p {
  font-size: clamp(16px, 1.2vw, 1.2vw);
  line-height: 2;
  color: #9d9d9d;
  margin-bottom: 20px;
}

h2 {
  font-size: clamp(24px, 3vw, 3vw);
  font-weight: 300;
  margin: 0;
}
ul {
  margin-top: clamp(3em, 4vw, 4vw);
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}
li{
  width: 100px;
}
.icon {
  height: 30px;
  filter: grayscale();
  transition: filter 0.2s ease-in-out;
}
button {
  height: 30px;
  border: none;
  font-size: 18px;
  font-weight: 900;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #59ff9c;
}

.icon:hover {
  filter: none;
}

span {
  background-color: #141414;
  margin: 0.3em;
  padding: 0.3em 0.7em;
  color: #8d8d8d;
}

@media (max-width: 700px) {
  .icon,
  button {
    height: 20px;
  }
}
</style>