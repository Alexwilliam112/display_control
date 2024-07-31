db.DisplaySessions.aggregate([
  {
    $lookup: {
      from: "Articles",
      localField: "article",
      foreignField: "article",
      as: "articleData"
    }
  },
  {
    $unwind: "$articleData"
  },
  {
    $lookup: {
      from: "Zones",
      localField: "zone",
      foreignField: "zoneName",
      as: "zoneData"
    }
  },
  {
    $unwind: "$zoneData"
  },
  {
    $group: {
      _id: {
        category: "$category",
        subcategory: "$subcategory",
        article: "$article",
        zone: "$zone",
        color: "$color"
      },
      startDate: { $first: "$startDate" },
      endDate: { $first: "$endDate" },
      articleData: { $first: "$articleData" },
      zoneData: { $first: "$zoneData" }
    }
  },
  {
    $group: {
      _id: {
        category: "$_id.category",
        subcategory: "$_id.subcategory",
        article: "$_id.article",
        zone: "$_id.zone"
      },
      colors: {
        $push: {
          color: "$_id.color",
          displayed: { $cond: { if: { $eq: ["$endDate", null] }, then: true, else: false } }
        }
      },
      articleData: { $first: "$articleData" },
      zoneData: { $first: "$zoneData" }
    }
  },
  {
    $group: {
      _id: {
        category: "$_id.category",
        subcategory: "$_id.subcategory",
        article: "$_id.article"
      },
      zones: {
        $push: {
          zone: "$_id.zone",
          displayed: { $max: "$colors.displayed" },
          colors: "$colors"
        }
      },
      articleData: { $first: "$articleData" }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id.category",
      subcategory: "$_id.subcategory",
      article: "$_id.article",
      zones: 1
    }
  }
]).toArray()
