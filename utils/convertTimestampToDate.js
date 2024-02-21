module.exports = {
    convertTimestampToDate: (timestamp) =>{
        var date = new Date(timestamp);

        var day = date.getDate();
        var month = date.getMonth() + 1; 
        var year = date.getFullYear();
        
        return {
            day: day, 
            month: month, 
            year: year 
        }
    }
}