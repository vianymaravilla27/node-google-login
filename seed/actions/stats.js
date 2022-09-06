/*
__Seed builder__v0.1.8
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Stats extends Action
{
  constructor(fetch)
  {
    if (fetch == null)
      fetch = [
        "business.*",
        "user.*",
      ];

    super(
      "STATS",
      "stats",
      (state) => state.stats,
      fetch
    );
  }

  getStatList(params = {}, callback)
  {
    return this.getList("", params, callback);
  }

  getStatDetails(statId, callback)
  {
    return this.getDetails("", statId, callback);
  }

  saveStat(stat, callback)
  {
    return this.postData("", stat, callback);
  }

  setStat(statId, stat, callback)
  {
    return this.putData("", statId, stat, callback);
  }

  deleteStat(statId, callback)
  {
    return this.deleteData("", statId, callback);
  }
}

export default _Stats;
