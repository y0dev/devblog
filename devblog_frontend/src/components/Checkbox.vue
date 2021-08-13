// Designed using this template
// https://moderncss.dev/pure-css-custom-checkbox-style/
<template>
    <div class="checkbox-wrap">
        <div class="container">
            <label class="checkbox">
                <span class="checkbox__input">
                    <input type="checkbox" name="checkbox" />
                    <span class="checkbox__control">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        d="M1.73 12.91l6.37 6.37L22.79 4.59"
                        />
                    </svg>
                    </span>
                </span>
                <span class="radio__label">{{ category }}</span>
            </label>
        </div>
    </div>
</template>
<script>
export default {
    name:"Checkbox",
    props:["category","checked"],
}
</script>

<style lang="scss" scoped>
:root {
  --color: rebeccapurple;
  --disabled: #959495;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

.checkbox {
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  font-size: 1.5rem;
  color: var(--color);

  &--disabled {
    color: var(--disabled);
  }
}

.checkbox__control {
  display: inline-grid;
  width: 1em;
  height: 1em;
  border-radius: 0.25em;
  border: 0.1em solid currentColor;

  svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: bottom left;
  }
}

.checkbox__input {
  display: grid;
  grid-template-areas: "checkbox";

  > * {
    grid-area: checkbox;
  }

  input {
    opacity: 0;
    width: 1em;
    height: 1em;

    &:focus + .checkbox__control {
      box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
    }

    &:checked + .checkbox__control svg {
      transform: scale(1);
    }

    &:disabled + .checkbox__control {
      color: var(--disabled);
    }
  }
}
</style>