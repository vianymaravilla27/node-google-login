/*
__Seed builder__v0.1.8
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _UserTypes extends Action
{
  constructor(fetch)
  {
    if (fetch == null)
      fetch = [
        "user.*",
      ];

    super(
      "USER_TYPES",
      "user_types",
      (state) => state.userTypes,
      fetch
    );
  }

  getUserTypeList(params = {}, callback)
  {
    return this.getList("", params, callback);
  }

  getUserTypeDetails(userTypeId, callback)
  {
    return this.getDetails("", userTypeId, callback);
  }

  saveUserType(userType, callback)
  {
    return this.postData("", userType, callback);
  }

  setUserType(userTypeId, userType, callback)
  {
    return this.putData("", userTypeId, userType, callback);
  }

  deleteUserType(userTypeId, callback)
  {
    return this.deleteData("", userTypeId, callback);
  }
}

export default _UserTypes;