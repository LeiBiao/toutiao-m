/**
 * 频道相关请求模块
 */
import request from "@/utils/request"
// 获取所有频道列表
export const getAllChannels = () => {
        return request({
            method: "GET",
            url: "/app/v1_0/channels"
        })
    }
    //添加指定用户频道
export const addUserChannel = data => {
        return request({
            method: "PATCH",
            url: "/app/v1_0/user/channels",
            data
        })
    }
    //删除指定用户频道
export const delUserChannel = channelId => {
    return request({
        method: "DELETE",
        url: `/app/v1_0/user/channels/${channelId}`,

    })
}