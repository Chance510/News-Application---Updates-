const axios = require('axios');
const News = require('../models/newsModel');

const topics = ['national', 'business', 'politics', 'sports', 'entertainment', 'world', 'travel', 'fashion']
let urls = [];
topics.forEach(topic=>{
    urls.push(`https://inshorts.me/news/topics/${topic}?limit=2`);
})

const saveController = async(req, res) => {
    axios.all(urls.map(url => axios.get(url)))
        .then(data => {
            data.forEach(async(d) => {
                const articles = d.data.data.articles;
                articles.forEach(async(article) => {
                    const title = article.title;
                    const image = article.imageUrl;
                    const body = article.content;
                    const categories = article.categoryNames;
                    const authorName = article.authorName;
                    await News.findOneAndUpdate({title: title}, {title, authorName, body, categories, image}, {upsert: true}).catch(error => {
                        console.log(error);
                    });
                })
            })
            res.status(200).send(data.data);
        })
}

module.exports = saveController;