'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5')
const { ERROR, SUCCESS, } = require('../util/util');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ArticleService extends Service {
  async create(article) {
    const {ctx, } = this;
    const { title, content, tag_ids } = ctx.request.body;
    try {
      if (!title || !content) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `数据不完整，收到的数据为: ${JSON.stringify(ctx.request.body)}`,
        });
      }
      const articleDB = await ctx.model.Article.findOne({
        where: {
          title: title,
        },
      });
      if (!articleDB) {
        const res = await this.ctx.model.Article.create(ctx.request.body);
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: res,
        });
      }
      ctx.status = 406;
      return Object.assign(ERROR, {
        msg: '数据已存在！',
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del(id) {
    const { ctx, } = this;
    try {
      const article = await ctx.model.Article.findByPk(id);
      if (!article) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '数据不存在！',
        });
      }
      article.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: article,
      });

    } catch (error) {
      console.log(222, error)
      ctx.throw(500);
    }
  }

  async update({ id, article }) {
    const { ctx, } = this;
    try {
      const articleDB = await ctx.model.Article.findByPk(id);
      if (!articleDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: '用户不存在！',
        });
      }
      const md5Passwd = md5(article.content)
      article = Object.assign(article, {
        content: md5Passwd,
      });
      const res = await articleDB.update(article);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async getArticles({ }) {
    const { ctx, } = this;
    try {
      const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
      const res = await ctx.model.Article.findAll(query);
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const { ctx, } = this;
    try {
      const article = await ctx.model.Article.findByPk(id, {
        include: [{
          model: ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      });
      if (!article) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: '找不到用户！',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: article,
      });

    } catch (error) {
      throw (500);
    }
  }
}

module.exports = ArticleService;
