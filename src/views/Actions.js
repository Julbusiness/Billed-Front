import eyeBlueIcon from "../assets/svg/eye_blue.js"
import downloadBlueIcon from "../assets/svg/download_blue.js"

console.log('je suis dans action.js de views')


export default (billUrl) => {
  return (
    `<div class="icon-actions">
      <div id="eye" data-testid="icon-eye" data-bill-url=${billUrl}>
      ${eyeBlueIcon}
      </div>
    </div>`
  )
}