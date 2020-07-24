var columnRepo = require("../repositories/columnRepository.js");
const moment = require("moment");
const { Column } = require("../models/column.js");

/*
  request -> router -> service -> repo -> db -> CRUD models -> repo -> service -> router -> response
 */

async function createColumn(columnParams) {
  columnParams.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  columnParams.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  let columnDTO = new Column(columnParams);

  let res = await columnRepo.createColumn(columnDTO);
  if (res === "ER_DUP_ENTRY") {
    return { result: "fail", message: "이미 존재하는 리스트입니다." };
  } else {
    let column = await columnRepo.getColumnById(res);
    return { result: "ok", message: "추가 완료", data: column[0] };
  }
}
async function getAllColumns() {
  let columnList = await columnRepo.getAllColumns();
  if (columnList.length == 0) {
    return { result: "fail", message: "데이터가 존재하지 않습니다." };
  } else {
    return { result: "ok", message: "검색 완료", data: columnList };
  }
}

async function getColumnById(id) {
  let column = await columnRepo.getColumnById(id);
  if (column.length == 0) {
    return { result: "fail", message: "존재하지 않는 리스트입니다." };
  } else {
    return { result: "ok", message: "검색 완료", data: column[0] };
  }
}

async function deleteColumn(id) {
  let column = await columnRepo.getColumnById(id);

  if (column.length == 0) {
    return { result: "fail", message: "존재하지 않는 리스트입니다." };
  } else {
    let columnId = column[0].columnId;
    columnRepo.deleteColumn(id);
    return { result: "ok", message: `${columnId} 을 삭제했습니다.` };
  }
}

async function updateColumn(params) {
  let tempColumn = await columnRepo.getColumnById(params.column_id);
  if (tempColumn.length == 0) {
    return { result: "fail", message: "존재하지 않는 리스트입니다." };
  } else {
    let columnDTO = new Column(tempColumn[0]);
    columnDTO.setUpdatedAt(moment().format("YYYY-MM-DD HH:mm:ss"));
    columnDTO.setTitle(params.new_title);

    await columnRepo.updateColumn(columnDTO);

    let column = await columnRepo.getColumnById(columnDTO.getId());
    return {
      result: "ok",
      message: `${columnDTO.getId()} 정보를 수정했습니다.`,
      data: column[0],
    };
  }
}
module.exports = {
  createColumn,
  getAllColumns,
  getColumnById,
  deleteColumn,
  updateColumn,
};
