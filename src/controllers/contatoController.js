const Contato = require('../Model/ContatoModel');

exports.index = (req, res) => {
  res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      return req.session.save(() => {
        res.redirect('/contato/index');
      });
    }

    if (!contato.contato) return res.render('404');

    req.flash('success', 'Contato registrado com sucesso.');
    return req.session.save(() => {
      res.redirect(`/contato/index/${contato.contato._id}`);
    });

  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.editIndex = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });

  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      return req.session.save(() => {
        res.redirect(`/contato/edit/${req.params.id}`);
      });
    }

    if (!contato.contato) return res.render('404');

    req.flash('success', 'Contato editado com sucesso.');
    return req.session.save(() => {
      res.redirect(`/contato/index/${contato.contato._id}`);
    });

  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if (!contato) return res.render('404');

    req.flash('success', 'Contato deletado com sucesso.');
    return req.session.save(() => {
      res.redirect('/');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};