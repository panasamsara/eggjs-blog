// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
   if (typeof str === 'number') return str;
   if (!str) return str;
   return parseInt(str, 10) || 0;
}

class ArticleController extends Controller {
   async create() {
     const { ctx, } = this;
     ctx.body = await ctx.service.articleService.create(ctx.request.body);
   }
 
   async destroy() {
     const { ctx, } = this;
     const id = +ctx.params.id;
     ctx.body = await ctx.service.articleService.del(id);
   }
 
   async update() {
     const { ctx, } = this;
     ctx.body = await ctx.service.articleService.update(ctx.request.body);
   }
 
   async getArticles() {
     const { ctx, } = this;
     const {} = ctx.request.body;
     ctx.body = await ctx.service.articleService.getArticles({});
   }
 
   async find() {
     const { ctx, } = this;
     const id = +ctx.params.id;
     ctx.body = await ctx.service.articleService.find(id);
   }
}

module.exports = ArticleController;