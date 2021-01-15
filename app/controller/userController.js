// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
   if (typeof str === 'number') return str;
   if (!str) return str;
   return parseInt(str, 10) || 0;
}

class UserController extends Controller {
   async create() {
     const {
       ctx,
     } = this;
     ctx.body = await ctx.service.userService.create(ctx.request.body);
   }
 
   async destroy() {
     const {
       ctx,
     } = this;
     const id = +ctx.params.id;
     ctx.body = await ctx.service.userService.del(id);
   }
 
   async update() {
     const {
       ctx,
     } = this;
     const id = +ctx.params.id;
     const user = ctx.request.body;
     ctx.body = await ctx.service.userService.update({
       id,
       user,
     });
   }
 
   async login() {
     const {
       ctx,
     } = this;
     const {
       username,
       password,
     } = ctx.request.body;
     ctx.body = await ctx.service.userService.login({
       username,
       password,
     });
   }
 
   async find() {
     const {
       ctx,
     } = this;
     const id = +ctx.params.id;
     ctx.body = await ctx.service.userService.find(id);
   }
}

module.exports = UserController;