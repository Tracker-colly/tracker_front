export const APP_TEXT = {
    info: {
        text: "text"
    }
}

/**
 * 
 * @param {1|2|3|4|5|6|7|8} type 
 * @param {string} name 
 */
export const inboxMessage = (type, name) => {
    let result = ""
    if (type == "1") {
        result = `${name} 관리자가 추천서 제출을 요청하였으니 제출을 진행해 주세요.`
    } else if (type == "2") {
        result = `${name} 관리자가 인사평가 제출을 요청하였으니 제출을 진행해 주세요.`
    } else if (type == "3") {
        result = `${name}님이 추천서 작성을 요청하였으니 작성을 진행해 주세요.`
    } else if (type == "4") {
        result = `${name}님이 추천서 작성을 완료하였으니 확인해 보세요.`
    } else if (type == "5") {
        result = `${name} 관리자가 인사평가 작성을 완료하였으니 확인해 보세요.`
    } else if (type == "6") {
        result = `${name}님이 인사평가 작성을 요청하였으니 작성을 진행해 주세요. `
    } else if (type == "7") {
        result = `${name}님이 추천서 제출을 완료하였으니 확인해 주세요.`
    } else if (type == "8") {
        result = `${name}님이 인사평가 제출을 완료하였으니 확인해 주세요.`
    }

    return result;
}



export default APP_TEXT