export const  getFormattedDate = (inputDate) => {
    var inputDate = new Date(inputDate);
    var month = inputDate.getMonth() + 1;
    var day = inputDate.getDate();
    var year = inputDate.getFullYear();
    return day + "/" + month + "/" + year;
}