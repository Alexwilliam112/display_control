module.exports = {
  excludeNoChanges: (activeDisplays, currentlyDisplayed) => {
    const activeDisplaySet = new Set(
      activeDisplays.map((ad) => `${ad.article}-${ad.color}-${ad.zone}`)
    );

    const result = currentlyDisplayed.filter((el) => {
      return !activeDisplaySet.has(`${el.article}-${el.color}-${el.zone}`);
    });

    return result;
  },

  findCloseDisplay: (activeDisplays, notDisplayed) => {
    const activeDisplaySet = new Set(
      activeDisplays.map((ad) => `${ad.article}-${ad.color}-${ad.zone}`)
    );

    const result = notDisplayed.filter((el) => {
      return activeDisplaySet.has(`${el.article}-${el.color}-${el.zone}`);
    });

    return result;
  },
};
