import UserApi from "./user/UserApi";
import CardApi from "./card/CardApi";
import TodoApi from "./todo/TodoApi";
import LogApi from "./log/LogApi";

export default {
  User() {
    return UserApi;
  },
  Card() {
    return CardApi;
  },
  Todo() {
    return TodoApi;
  },
  Log() {
    return LogApi;
  },
};
