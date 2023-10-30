const app = require("express").Router();

const { Cartoes } = require("./utils/db");

app.post("/addPoint", async (req, res) => {
    const cartao = await Cartoes.findOne({
        where: {
            cardId: req.body.cardId
        }
    });
    
    Cartoes.update({ pontuacao: cartao.pontuacao+100 }, {
        where: {
            cardId: req.body.cardId
        }
    })
    res.send(Number(cartao.pontuacao+100).toString());
});


app.post("/remPoint", async (req, res) => {
    const cartao = await Cartoes.findOne({
        where: {
            cardId: req.body.cardId
        }
    });

    if(cartao.pontuacao <= 0){
        return res.send("0");
    };
    
    Cartoes.update({ pontuacao: cartao.pontuacao-100 }, {
        where: {
            cardId: req.body.cardId
        }
    })
    res.send(Number(cartao.pontuacao-100).toString());
});

app.post("/delU", async (req, res) => {
    await Cartoes.destroy({
        where: {
            cardId: req.body.cardId
        }
    });
    res.send("DELETADO!");
});


module.exports = app;