import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  box-sizing:border-box;
  font: inherit;
  vertical-align: baseline;
   transition: 0.20s linear;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1; 
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.mainFontColour};
  background-color: ${(props) => props.theme.bodyBg};
  height: 100vh;
  line-height: 1.3rem;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  text-decoration: none;
  font: inherit;
  color: inherit;
}
a:visited {
  font: inherit;
  color: inherit;
}
h2 {
  font-size: 1.4rem;
}
h4 {
  font-weight: 900;
}


*:focus {
  outline: none;
}


`;

export default GlobalStyle;
