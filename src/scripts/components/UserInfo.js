
export class UserInfo {
  constructor(user, userDataFields) {
    this._userName = user.name;
    this._userAbout = user.about;
    this._userAvatar = user.avatar;
    this._fieldName = userDataFields.name;
    this._fieldInfo = userDataFields.info;
    this._photoContainer = userDataFields.avatar;
    this._popupFieldName = userDataFields.popupFieldName;
    this._popupFieldInfo = userDataFields.popupFieldInfo;
  }
  getUserInfo() {
    const userInfoList = {};
    userInfoList.name = this._userName;
    userInfoList.about = this._userAbout;
    return userInfoList;
  }
  setUserInfo() {
    this._photoContainer.src = this._userAvatar;
    this._fieldName.textContent = this._userName;
    this._fieldInfo.textContent = this._userAbout;
    this._popupFieldName.value = this._userName;
    this._popupFieldInfo.value = this._userAbout;
  }
}