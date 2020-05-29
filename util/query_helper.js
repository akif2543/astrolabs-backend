const USER_SELECT = "handle photo firstName lastName -_id";

export default {
  profPop: [
    {
      path: "user",
      select: USER_SELECT,
    },
  ],
  userSelect: USER_SELECT,
  postPop: [
    {
      path: "author",
      select: USER_SELECT,
    },
    {
      path: "likes",
      select: USER_SELECT,
    },
    {
      path: "shares",
      select: USER_SELECT,
    },
    {
      path: "comments.commenter",
      select: USER_SELECT,
    },
    {
      path: "comments.likes",
      select: USER_SELECT,
    },
  ],
};
