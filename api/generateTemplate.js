const generateTemplate = bet => {
  const dataPerLocation = groupBy(bet.entries, entry => entry.location)

  let template = `
    <?xml version="1.0" encoding="UTF-8"?>
    <document>
    <align mode="center">
      <bold>
        <text-line size="1:0">${bet.id}</text-line>
      </bold>
    </align>

    <line-feed />

    <align mode="center">
      <bold>
        <text-line size="1:0">${bet.createdAt}</text-line>
      </bold>
    </align>
    <line-feed />
  `

  Object.entries(dataPerLocation).forEach(([location, sortedEntries]) => {
    template += `
      <align mode="left">
        <text-line size="1:1">${location}</text-line>
      </align>
      <line-feed />
      <text-line size="1:0">${fillWithSpaces('Number', 'Amount')}</text-line>
      <line-feed />

    `

    sortedEntries.forEach(entry => {
      template += `
        <text-line size="1:0">${fillWithSpaces(
          entry.number,
          `${entry.amount.toFixed(2)}`,
        )}</text-line>
        <line-feed />
      `
    })
  })

  template += `
      <text-line size="1:0">------------------------</text-line>
      <line-feed />
      <align mode="right">
        <text-line size="1:0">Subtotal: ${bet.total.toFixed(2)}</text-line>
        <line-feed />
        <text-line size="1:0">Tax: 0.00</text-line>
        <line-feed />
        <text-line size="1:0">Total: ${bet.total.toFixed(2)}</text-line>
        <line-feed />
      </align>
      <line-feed />
      <line-feed />
      <align mode="center">
        <qrcode ecl="M">${bet.id}</qrcode>
      </align>
    <paper-cut />

  </document>
  `
  return template
}

const groupBy = (arr, fn) => {
  return arr.reduce((prev, curr) => {
    const groupKey = fn(curr)
    const group = prev[groupKey] || []
    group.push(curr)
    return { ...prev, [groupKey]: group }
  }, {})
}

const fillWithSpaces = (left, right) => {
  const TOTAL_SPACES = 24
  const missingSpaces = TOTAL_SPACES - left.length - right.length
  let spaces = ''
  const space = ' '
  for (let index = 0; index < missingSpaces; index++) {
    spaces += space
  }
  return left + spaces + right
}

module.exports = generateTemplate
