function Component({ date }) {
    function parseDate(rawDate) {
      return rawDate
    }

    return <div>Date is {parseDate(date)}</div>
}

function Component1({ date }) {
    return <div>Date is {parseDate(date)}</div>
}

function parseDate(date) {
 return date
}
