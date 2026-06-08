import {
  getStudentProgress,
  listStudents,
  updateStudentStatus,
} from "./adminRepository.js";

const STATUS_ACTIONS = {
  approve: "approved",
  reject: "rejected",
  block: "blocked",
  unblock: "approved",
};

export { getStudentProgress, listStudents, updateStudentStatus };

export function approveStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.approve);
}

export function rejectStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.reject);
}

export function blockStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.block);
}

export function unblockStudent(id){
  return updateStudentStatus(id, STATUS_ACTIONS.unblock);
}
