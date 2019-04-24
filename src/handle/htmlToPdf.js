import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import signUrl from '../assets/sign.png'

export function pdf (title) {
  if (!title) {
    title = '报价单'
  }
  html2Canvas(document.querySelector('.paper'), {
    allowTaint: true
  }).then((canvas) => {
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    let pageHeight = contentWidth / 595.28 * 841.89
    let leftHeight = contentHeight
    let position = 0
    let imgWidth = 595.28
    let imgHeight = 595.28 / contentWidth * contentHeight
    let img = new Image()
    img.src = signUrl
    let pageData = canvas.toDataURL('image/jpeg', 1.0)
    let PDF = new JsPDF('', 'pt', 'a4')
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      PDF.addImage(img, 'PNG', 60, 75, 80, 70)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        PDF.addImage(img, 'PNG', 60, 75, 80, 70)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    PDF.save(title + '.pdf')
  })
}
