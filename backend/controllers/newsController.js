const mongoose = require('mongoose');

const News = require('../models/newsModel');
const User = require('../models/userModel');

const getNews = async(req, res) => {
    const news = await News.find().sort({createdAt: -1});

    if(!news){
        return res.status(404).json({error: 'Please refresh to fetch news'})
    }

    if(news.length>50){
        const sendNews = news.slice(0, 50);
        return res.status(200).json(sendNews);
    }
    res.status(200).json(news);
}

const getTopicalNews = async(req, res) => {
    const {topic} = req.params;

    const news = await News.find({categories: topic}).sort({createdAt: -1});

    if(!news){
        return res.status(404).json({error: 'Please refresh to fetch news'});
    }

    if(news.length > 50){
        const sendNews = news.slize(0, 50);
        return res.status(200).json(sendNews);
    }
    return res.status(200).json(news);
}

const getSingleNews = async(req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such news'});
    }
    
    const singleNews = await News.findById(id);
    
    if(!singleNews){
        return res.send(404).json({error: 'Item not available'});
    }
    res.status(200).json(singleNews);
}

const getFeedNews = async(req, res) => {
    const user_id = req.user._id;

    const user = await User.findById(user_id);
    
    if(!user){
        res.status(400).json({error: 'Not a valid user'});
    }

    const topics = user.categories;
    
    let news;

    topics.forEach(topic => {
        news = news + News.find({categories: topic}).sort({createdAt: -1});
    })

    res.status(200).json(news);
}

module.exports = {
    getNews,
    getTopicalNews,
    getSingleNews,
    getFeedNews
}