/*
__Seed builder__v0.1.8
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Businesses extends Action
{
  constructor(fetch)
  {
    if (fetch == null)
      fetch = [
        "user.*",
        "category.*",
      ];

    super(
      "BUSINESSES",
      "businesses",
      (state) => state.businesses,
      fetch
    );
  }

  getBusinessList(params = {}, callback)
  {
    return this.getList("", params, callback);
  }

  getBusinessDetails(businessId, callback)
  {
    return this.getDetails("", businessId, callback);
  }

  saveBusiness(business, callback)
  {
    return this.postData("", business, callback);
  }

  setBusiness(businessId, business, callback)
  {
    return this.putData("", businessId, business, callback);
  }

  deleteBusiness(businessId, callback)
  {
    return this.deleteData("", businessId, callback);
  }
}

export default _Businesses;
