
const handleDate = (date)=>{
    return date.split("/").reverse().join("-");
}

module.exports = handleDate;