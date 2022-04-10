// Get Route for All Solar Products
// Get Route for All Heat Products
// Get Route for All Wind Products

const router = require('express').Router();
const { Product, User, Review, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get Single Product for Wind, Solar or Heat - Review 

// Post Single Product for Wind, Solar or Heat
// Post Review


// All Products under Category
router.get('/solar') , withAuth, async (req, res) => {

};

router.get('/wind') , withAuth, async (req, res) => {

};

router.get('/heat') , withAuth, async (req, res) => {

};

// Single Products
router.get('/solar/:id') , withAuth, async (req, res) => {

};

router.get('/wind/:id') , withAuth, async (req, res) => {

};

router.get('/heat/:id') , withAuth, async (req, res) => {

};