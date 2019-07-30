const base = "/api/services/app/";
const API = {
  GET_USER_AREA_FOR_PC: `${base}HydrantUser/GetUserAreaForPC`, //获取已有管辖区ForPC
  GET_AREA_USER_LIST: `${base}HydrantAlarm/GetAreaUserlist`, //获区域管理人列表
  GET_HYRANT_SET: `${base}HydrantAlarm/GetHyrantSet`, //获区消火栓设置
  UPDATE_HYRANT_SET: `${base}HydrantAlarm/UpdateHyrantSet`, //更新消火栓设置
  GET_AREA_HYDRANT: `${base}HydrantAlarm/GetAreaHydrant`, //获取区域消火栓列表
  GET_AREA_HYDRANT_ALARM_LIST: `${base}HydrantAlarm/GetAreaHydrantAlarmlist` //获区域取消火栓报警列表
};
export default API;
