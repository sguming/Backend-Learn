项目要求：电影管理系统
基础部分：Movies
• 获取所有电影：支持关键字搜索、按评分排序、分页查询。
• 获取单个电影：通过 ID 获取电影详细信息。
• 添加电影：新增一个电影条目。
• 更新电影：修改电影信息。
• 删除电影：删除指定电影。
扩展部分：Reviews
• 添加评论：给电影添加评论，并记录评分。
• 获取评论：获取某部电影的所有评论。

数据格式

```
const movies = [
	  {
	    id: 1,
	    title: "Inception",
	    description: "A skilled thief steals secrets from dreams.",
	    types: ["Sci-Fi"],
	    averageRating: 4.5,
	    reviews: [
	      { id: 1, content: "Amazing movie!", rating: 5 },
	      { id: 2, content: "Great visuals.", rating: 4 },
	    ],
	  },
];
```

1. 设计 API endpoints （Restful API)
2. 用 express 实现后端 server （只能使用 express.js 作为 dependency）
3. 对接前端页面

获取所有电影：支持关键字搜索、按评分排序、分页查询。
GET /v1/movies - 200
query: sort (rating, -rating)
page
limit (pageSize)
keyword (q)

    获取单个电影：通过 ID 获取电影详细信息。
    GET /V1/movies/:id - 200


    添加电影：新增一个电影条目。
    新添加的电影，应该最先返回
    POST /v1/movies - 201
    body: title
          description
          types (string)


    更新电影：修改电影信息。
    PUT(PATCH) /v1/movies/:id - 200
    body: title
          description
          types (string)

    删除电影：删除指定电影。
    DELETE /v1/movies/:id - 204

扩展部分：Reviews
添加评论：给电影添加评论，并记录评分。
POST /v1/movies/:id/reviews
body: content
rating

    获取评论：获取某部电影的所有评论。
    GET /v1/movies/:id/reviews

// Mason: xxxx
