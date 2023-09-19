import moment from "moment/moment"

export const combineDateAndTime = (date, time)=>{
    return moment(`${date} ${time}`).format("DD/MM/YYYY HH:mm:ss");
}


export const getCurrentDate = () =>{
    return moment().format("YYYY-MM-DD");
}

export const formatDateTime = (dateTime) =>{
    return moment(dateTime).format("lll");
}

export const getDate = (dateTime) =>{
    return moment(dateTime).format("YYYY-MM-DD")
} 

export const getTime = (dateTime) =>{
    return moment(dateTime).format("HH:mm")
} 