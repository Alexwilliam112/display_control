export default removeTypename = async (input) => {
  if (Array.isArray(input)) {
    return await Promise.all(
      input.map(async (item) => await removeTypename(item))
    );
  } else if (typeof input === "object" && input !== null) {
    const newObj = {};
    const promises = Object.keys(input).map(async (key) => {
      if (key !== "__typename") {
        newObj[key] = await removeTypename(input[key]);
      }
    });
    await Promise.all(promises);
    return newObj;
  }
  return input;
};
