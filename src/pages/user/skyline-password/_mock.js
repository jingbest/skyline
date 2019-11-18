function getFakeCaptcha(req, res) {
  return res.json('captcha-password');
}

export default {
  'POST  /api/password': (req, res) => {
    const { password, username } = req.body;
    console.log(password, username);
    res.send({
      status: 'ok',
    });
  },
  'GET  /api/password/captcha': getFakeCaptcha,
};
