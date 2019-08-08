const base = "/api/services/app/";
const API = {
  GET_USER_AREA_FOR_PC: `${base}HydrantUser/GetUserAreaForPC`, //获取已有管辖区ForPC
  GET_AREA_USER_LIST: `${base}HydrantAlarm/GetAreaUserlist`, //获区域管理人列表
  GET_HYRANT_SET: `${base}HydrantAlarm/GetHyrantSet`, //获区消火栓设置
  UPDATE_HYRANT_SET: `${base}HydrantAlarm/UpdateHyrantSet`, //更新消火栓设置
  GET_AREA_HYDRANT: `${base}HydrantAlarm/GetAreaHydrant`, //获取区域消火栓列表
  GET_INFO_BYID: `${base}Hydrant/GetInfoById`, //获取消火栓详情
  GET_HYDRANT_BREATHING_BUBBLE: `${base}BigScreen/GetHydrantBreathingBubble`, //消火栓：地图呼吸气泡层
  GET_NEARBY_ALARMBYID: `${base}Hydrant/GetNearbyAlarmById`, //获取最近30天报警记录
  GET_HYDRANT_PRESS_HISTORY: `${base}BigScreen/GetHydrantPressHistory`, // 消火栓：历史水压
  GET_AREA_HYDRANT_ALARM_LIST: `${base}HydrantAlarm/GetAreaHydrantAlarmlist`, //获区域取消火栓报警列表
  GET_HYDRANT_ALARM_INFO: `${base}HydrantAlarm/GetHydrantAlarmInfo`, //获取警情处理详情
  USER_LOGIN: `${base}HydrantUser/UserLogin`, //      用户登录(PC端)
  USER_LOGOUT: `${base}HydrantUser/UserLogout`, //      注销用户
  GET_VERIFY_CODE: `${base}HydrantUser/GetVerifyCode` //      获取验证码
};
export default API;
