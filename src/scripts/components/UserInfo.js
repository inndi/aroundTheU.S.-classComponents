export class UserInfo {
  constructor(userName, userAbout) {
    this._name = userName;
    this._about = userAbout;
  }
  getUserInfo() {
    const userInfoList = {};
    userInfoList.name = this._name.textContent;
    userInfoList.about = this._about.textContent;
    return userInfoList;
  }
  setUserInfo(newUserData) {
    this._name.textContent = newUserData.profileName;
    this._about.textContent = newUserData.profileAbout;
  }
}