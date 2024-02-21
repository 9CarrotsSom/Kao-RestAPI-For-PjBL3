module.exports = {
    convertTimestampToTime: (timestamp) =>{
        const timestamp_sec = timestamp / 1000;
        const dateObj = new Date(timestamp_sec * 1000);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        return {
            hours,
            minutes,
            seconds
        }
    }
}