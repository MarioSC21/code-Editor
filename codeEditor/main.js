import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64';

const getElemento = (selector) => document.querySelector(selector);

Split({
    columnGutters: [{
        track: 1,
        element: document.querySelector('.gutter-col-1'),
    }],
    rowGutters: [{
        track: 1,
        element: document.querySelector('.gutter-row-1'),
    }]
})

const $js = getElemento('#js');
const $css = getElemento('#css');
const $html = getElemento('#html');

$js.addEventListener('input', update)

$css.addEventListener('input', update)

$html.addEventListener('input', update)

function init(){
  const { pathname } = window.location

  const [rawhtml,rawcss,rawjs] =pathname.slice(1).replace('%7D',"").split('%7C')
  // console.log(pathname.slice(1).split('%7C'))

  const html = `${decode(rawhtml)}`
  const css = `${decode(rawcss)}`
  const js = `${decode(rawjs)}`
  $html.value = html
  $css.value = css
  $js.value = js

  const html2 = createHtml({html,css,js})
  getElemento('iframe').setAttribute('srcdoc', html2)
}

function update () {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const html2 = createHtml({html,js,css})
  getElemento('iframe').setAttribute('srcdoc', html2)
}

const createHtml = ({html,js,css}) => {
  const htmlRender = 
  ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
    </html>  ` 
  return htmlRender
   
}
init()
