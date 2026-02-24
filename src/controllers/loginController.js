const Login = require('../Model/Loginmodel');

exports.index = (req, res) => {
  res.render('login');
};

exports.register = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login/index');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso.');
    req.session.save(function() {
      return res.redirect('back');
    });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login/login');
      });
      return;
    }

    req.flash('success', 'Você fez login com sucesso.');
    req.session.user = login.user;
    req.session.save(function() {
      return res.redirect('/login/login');
    });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};