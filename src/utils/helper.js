export const  getFormattedDate = (inputDate) => {
    var dateObj = new Date(inputDate);
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    return day + "/" + month + "/" + year;
}