import { api } from '@utils/api';

/**
 * @desc 完成活动内容,并增加tag
 * @author gao01
 * @date 2022/04/28 23:27:34
 */
export const addActivityComplete = (data) => api.post('/activity/joinCommonActivity','aiyong.activity.common.join',data)

/**
 * @desc 更新redis缓存
 * @author gao01
 * @date 2022/04/28 23:27:34
 */
export const updateRedis = (data) => api.post('/tc/rebuildredis','aiyong.item.redis.refresh',data)
