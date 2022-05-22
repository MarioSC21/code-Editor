import './style.css'

const getElemento = (selector) => document.querySelector(selector);

const $js = getElemento('#js');
const $css = getElemento('#css');
const $html = getElemento('#html');

$js.addEventListener('input', update)

$css.addEventListener('input', update)

$html.addEventListener('input', update)

function update () {
  const html = createHtml()
  // console.log(html)
  getElemento('iframe').setAttribute('srcdoc', html)
  console.log(getElemento('iframe'))
}

const createHtml = () => {
  const html = $html.value
  const css = $css.value
  const js = $js.value
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
