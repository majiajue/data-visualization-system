const timeForMat = (count: number) => {
    // 拼接时间
    let time1 = new Date()
    time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
    let Y1 = time1.getFullYear()
    let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
    let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
    let toTime = Y1 + '-' + M1 + '-' + D1 // 当前时间
    let time2 = new Date()
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
    let Y2 = time2.getFullYear()
    let M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
    let D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())
    let startTime = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
    return {
        startTime: startTime,
        toTime: toTime
    }
}
export default timeForMat;