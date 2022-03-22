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
   transition: 0.2s linear;
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
  outline: 1px solid grey;
}
::-webkit-scrollbar {
  width: 9px;
  height: 5px;
  z-index: 100;
  /* display: none;  */
}

::-webkit-scrollbar-track {
   transition: 0.2s linear;
  background: ${({ theme }) => theme.bodyBg};
}

::-webkit-scrollbar-thumb {
  background: #888;
}
b{
  font-weight: bold;
}
.stopScroll{
   overflow: hidden;
}

`;

export default GlobalStyle;
