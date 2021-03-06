const router = require('express').Router();
const cards = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

router.get('/', (req, res) => {
  cards.getCards(req, res);
});

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
    likes: Joi.array().items(Joi.string()),
  }),
}), (req, res) => {
  cards.postCard(req, res);
});

router.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), (req, res) => {
  cards.deleteCard(req, res);
});

router.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), (req, res) => {
  cards.likeCard(req, res);
});

router.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required(),
  }).options({ allowUnknown: true }),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), (req, res) => {
  cards.unlikeCard(req, res);
});

module.exports = router;
