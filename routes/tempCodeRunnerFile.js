router.post('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
});