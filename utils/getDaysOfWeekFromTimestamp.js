module.exports = {
    getDaysOfWeekFromTimestamp: (timestamp) =>{
        const date = new Date(timestamp);

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeekString = daysOfWeek[date.getDay()]; // Get the day of the week as a string

        return dayOfWeekString;
    }
}