
export class UserInfo {
  constructor(userDataFields) {
    this._fieldName = userDataFields.name;
    this._fieldInfo = userDataFields.info;
    this._photoContainer = userDataFields.avatar;
  }

  getUserInfo() {
    const userInfoList = {};
    userInfoList.name = this._fieldName.textContent;
    userInfoList.about = this._fieldInfo.textContent;
    return userInfoList;
  }

  setUserInfo(user) {
    this._userId = user._id;
    this._photoContainer.src = user.avatar;
    this._fieldName.textContent = user.name;
    this._fieldInfo.textContent = user.about;
  }
}