import jsPDF from 'jspdf'

const fetchFont = async (url: string): Promise<string> => {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()

  const buffer = Buffer.from(arrayBuffer)

  return buffer.toString('base64')
}

export const generatePDF = async ({
  content,
  fileName,
}: {
  content: string
  fileName: string
}) => {
  const fontBase64 = await fetchFont('/Roboto-Regular.ttf')
  const doc = new jsPDF()

  doc.addFileToVFS('Roboto-Regular.ttf', fontBase64)
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')
  doc.setFont('Roboto')

  // Set margins
  const margin = 16
  const maxWidth = doc.internal.pageSize.width - 2 * margin
  const maxHeight = doc.internal.pageSize.height - 2 * margin

  // Split the text into lines considering the margins
  const lines = doc.splitTextToSize(content, maxWidth)

  // Track the current Y position
  let currentY = margin

  lines.forEach((line: any, index: number) => {
    if (currentY + 10 > maxHeight) {
      // 10 is approximately the height of a text
      doc.addPage()
      currentY = margin // Reset Y coordinate for new page
    }

    doc.text(line, margin, currentY)
    currentY += 10 // Move to the next line
  })

  doc.save(`${fileName}.pdf`)
}
