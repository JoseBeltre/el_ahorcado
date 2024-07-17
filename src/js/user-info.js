export const storage = {
  get: () => {
    let storedUserInfo = window.localStorage.getItem("userInfo");
    if (!storedUserInfo) {
      let userInfo = {
        wins: 0,
        losses: 0,
        gamesPlayed: 0,
        currentStreak: {
          words: [],
          streak: 0,
        },
        longestStreak: {
          words: [],
          streak: 0,
        },
        wordsGuessed: [],
        wordsFailed: [],
        theme: undefined,
      };
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return userInfo;
    } else {
      return JSON.parse(storedUserInfo);
    }
  },
  update: (user) => {
    try {
      let storedUserInfo = window.localStorage.getItem("userInfo");
      if (storedUserInfo){
        window.localStorage.setItem("userInfo", JSON.stringify(user));
        return true
      } else {
        throw new Error("No user information found");
      }

    } catch (error) {
      console.error(error);
    }
  }
};
