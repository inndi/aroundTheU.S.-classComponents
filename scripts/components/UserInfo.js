export class UserInfo {
  constructor(selectorName, selectorAbout) {
    this._name = selectorName;
    this._about = selectorAbout;
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