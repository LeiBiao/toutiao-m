/**
 * 本地存储模块
 */
// 获取
export const getItem = name => {
        const data = window.localStorage.getItem(name)
        try {
            // data可能不是JSON格式字符串,尝试将data转为js对象
            return JSON.parse(data)
        } catch (err) {
            // data不是JSON格式字符串,直接返回原对象
            return data
        }
    }
    // 存储
export const setItem = (name, value) => {
    // 本地存储里面只能存储字符串的数据格式 把我们的数组对象转换为字符串格式JSON.stringify()
    //如果value是对象,就把value转为json格式字符串在存储
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

// 删除
export const removeItem = name => {
    window.localStorage.removeItem(name)
}