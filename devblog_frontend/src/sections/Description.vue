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
      technologies. Currently I'm working on an some api's that will also
       include a chrome extension the will be written in Node and untilizing
       DigitalOcean.
    </p>
    <p>
      If I'm not programming you will find me reading my bible or spending time
      with my family. The bible has brought me so much wisdom when it comes to life
      along with teaching me about the grace of God. My collections of books are 
      growing I believe I'm north of 100 books in my collection. Here's a list of
      my study resources 
      <span ref="gdesign" @mouseenter="uiHighlight" @mouseleave="uiHighlightRemove">
      <a href="https://www.desiringgod.org/">Desiring God</a>, 
      <a href="https://www.gty.org/">Grace To You</a>, and 
      <a href="https://www.truthforlife.org/">Truth for Life</a></span>.
    </p>
    <ul class="grid">
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
import NodeJS from "../assets/icons/node.svg";
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
    uiHighlight() {
      const tl = new TimelineLite();
      const { uidesign } = this.$refs;
      tl.to(uidesign, {
        backgroundColor: "#1a1a1a",
        color: "white",
      });
    },
    uiHighlightRemove() {
      const tl = new TimelineLite();
      const { uidesign } = this.$refs;
      tl.to(uidesign, {
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
a {
  color: #9d9d9d;
}
ul {
  margin-top: 10px;
  list-style-type: none;
  grid-template-columns: repeat(4,1fr);
  flex-flow: row nowrap;
  height: 100px;
  justify-content: center;
  align-content: center;
}
li{
}
.icon {
  height: 40px;
  width: 50px;
  filter: grayscale();
  transition: filter 0.5s ease-in-out;
}
button {
  margin-top: 0;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
  border-radius: 30px;
}

button:hover {
  background-color: #59caff;
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

@media (max-width: 749px) {
  ul {
    grid-template-columns: repeat(1,1fr);
    grid-template-rows: repeat(4,1fr);
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100px;
  }

}
</style>