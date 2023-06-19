const DATE_UNITS: Record<string, number> = {
  year: 31536000,
  month: 2629800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
} as const

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

export const getRelativeTime = (endDate: Date) => {
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()
  const elapsed = (end - now) / 1000

  for (const unit in DATE_UNITS) {
    const absoluteElapsed = Math.abs(elapsed)

    if (absoluteElapsed > DATE_UNITS[unit] || unit === 'second') {
      return rtf.format(
        Math.round(elapsed / DATE_UNITS[unit]),
        unit as Intl.RelativeTimeFormatUnit
      )
    }
  }

  return ''
}

export const isAvaliablePlan = (endDate: Date) => {
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()
  return end > now
}

export const getMonthTimeDifference = (time: Date) => {
  const date = new Date(time)
  const started = new Date(date).getTime()
  const toExpire = new Date(date.setDate(date.getMonth() + 1)).getTime()

  const difference = toExpire - started
  return {
    started,
    toExpire,
    difference,
  }
}
export const calculate2Weeks = (initDate: Date) => {
  const weekMiliseconds = DATE_UNITS.day * 7 * 1000
  const date = new Date(initDate)
  const nextMonth = new Date(date.getTime() + (weekMiliseconds * 2))
  return nextMonth
}
