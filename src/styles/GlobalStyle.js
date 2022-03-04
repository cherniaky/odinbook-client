import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
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

* {
  box-sizing: border-box;
  transition: background-color 0.30s linear;
}

*:focus {
  outline: none;
}



`;

export default GlobalStyle;
