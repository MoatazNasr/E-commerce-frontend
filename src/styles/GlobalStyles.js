import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
export const GlobalStyles = createGlobalStyle`
/* ----------- */
/* Custom Properties */
/*------------ */

:root {
  /* font-sizes */
  --fs-900: clamp(5rem, 8vw + 1rem, 9.375rem);
  --fs-800: clamp(3.5rem, 5vw + 1rem, 6.25rem);
  --fs-700: clamp(1.5rem, 3.8vw + 1rem, 3.5rem);
  --fs-600: clamp(1.25rem, 3vw + 1rem, 2rem);
  --fs-500: clamp(1rem, 3vw, 1.75rem);
  --fs-400: clamp(0.9375rem, 1vw + 0.4rem, 1.125rem);
  --fs-300: 1rem;
  --fs-200: 0.875rem;
  /* font-families */
  --ff-ibm-plex-sans: "IBM Plex Sans Thai Looped", sans-serif;
  --ff-shadow-light: "Shadows Into Light", cursive;
}
/* clamp sets (min , middle,max ) values , but middle value must be a value that can shrink but not less than min or grow but not more than max  */
/* em not rems or px as safari deals with em as other browsers do in media queries */

/* ----------- */
/* CSS RESET */
/*------------ */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}
/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
  font-weight: 400;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  padding: 0;
}

ul li {
  list-style: none;
  
}
/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}
/* Set core body defaults */
body {
  min-height: 100vh;
  min-width: 100vw;
  font-family: var(--ff-ibm-plex-sans); 
  font-size:var(--fs-400);
  overflow-x: hidden;
  transition:0.5s all;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons as form elements do not inherit font */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* utility classes */
.fs-900 {
  font-size: var(--fs-900);
}
.fs-800 {
  font-size: var(--fs-800);
}
.fs-700 {
  font-size: var(--fs-700);
}
.fs-600 {
  font-size: var(--fs-600);
  object-fit: contain;
}
.fs-500 {
  font-size: var(--fs-500);
}
.fs-400 {
  font-size: var(--fs-400);
}
.fs-300 {
  font-size: var(--fs-300);
}
.fs-200 {
  font-size: var(--fs-200);
}
/* nav-link */
.nav-link {
  text-decoration: none;
  color: white;
  transition: 0.5s all;
  cursor: pointer;
}
.nav-link:hover{
  color: #f3b2c2;  
}
/* status-message */
.status-message {
    position: fixed;
    z-index: 999999999999;
    bottom: 2rem;
    color: black;
    padding: 2rem;
    background: white;
    font-size: var(--fs-400);
    font-weight: 600;
    border-radius: 0.5rem;
    display: grid;
    place-content: center;
  }
  .status-message-show {
    right: 0.2rem;
    animation: statusMessageShow 0.5s ease-in-out;
  }
  .status-message-hide {
    right: -30rem;
    animation: statusMessageHide 0.5s ease-in-out;
  }
  .successful {
    border-left: 6px solid rgb(13, 176, 13);
  }
  .error {
    border-left: 6px solid rgb(176, 13, 13);
  }

  @keyframes statusMessageShow {
    0% {
      right: -30rem;
    }
    100% {
      right: 0.2rem;
    }
  }

  @keyframes statusMessageHide {
    0% {
      right: 0.2rem;
    }
    100% {
      right: -30rem;
    }
  }

  .status-message button {
    background: none;
    position: absolute;
    border:none ;
    top: 0.2rem;
    right: 0.2rem;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.5s all;
  &:hover {
    color: #f3b2c2;
    transform: scale(105%);
  }
`;
