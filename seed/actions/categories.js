/*
__Seed builder__v0.1.8
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Categories extends Action
{
  constructor(fetch)
  {
    if (fetch == null)
      fetch = [
      ];

    super(
      "CATEGORIES",
      "categories",
      (state) => state.categories,
      fetch
    );
  }

  getCategoryList(params = {}, callback)
  {
    return this.getList("", params, callback);
  }

  getCategoryDetails(categoryId, callback)
  {
    return this.getDetails("", categoryId, callback);
  }

  saveCategory(category, callback)
  {
    return this.postData("", category, callback);
  }

  setCategory(categoryId, category, callback)
  {
    return this.putData("", categoryId, category, callback);
  }

  deleteCategory(categoryId, callback)
  {
    return this.deleteData("", categoryId, callback);
  }
}

export default _Categories;
