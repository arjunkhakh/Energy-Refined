const router


router.get('/' async (req,res) => {
    res.render('homepage', {logged_in: req.session.logged_in})
})

module.exports = router