const getToday = () => {
    let time1 = new Date()
    let Y1 = time1.getFullYear()
    let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
    let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
    let today = Y1 + '-' + M1 + '-' + D1 // 当前时间
    return {
        datetime: today
    };
}
export default getToday;