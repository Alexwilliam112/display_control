# SCHEMAS

## API Structure
```
[
  {
    "category": "string",
    "subcategory": "string",
    "article": "string",
    "zones": [
      {
        "zone": "string",
        "displayed": "boolean",
        "colors": [
          {
            "color": "string",
            "displayed": "boolean"
          }
        ]
      }
    ]
  }
]
```

## Articles

```
{
  _id: ObjectId
  category: String
  subcategory: String
  article: String
  colors : [String]
}
```

## Zones

```
{
  _id: ObjectId
  zoneName: String
}
```

## DisplaySessions
```
{
  _id: ObjectId
  category: String
  subcategory: String
  article: String
  color: String
  zone: String
  startDate: ISODate
  endDate: ISODate
}
```

## Users

```
{
  _id: ObjectId
  username: String
  password: String
}
```
