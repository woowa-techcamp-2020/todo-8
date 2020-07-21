async function createLog(logDTO) {
  return await fetch("/api/log", {
    method: "POST",
    body: JSON.stringify({
      contents: logDTO.contents,
      user_id: logDTO.user_id,
      todoLIst_id: logDTO.todoLIst_id,
    }),
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    let log = response.json();

    return log;
  });
}

export default { createLog };
