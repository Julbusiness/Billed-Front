import VerticalLayout from './VerticalLayout.js'

console.log('je suis dans LoadingPage.js de views')


export default () => {

  return (`
    <div class='layout'>
      ${VerticalLayout()}
      <div class='content' id='loading'>
        Loading...
      </div>
    </div>`
  )
}