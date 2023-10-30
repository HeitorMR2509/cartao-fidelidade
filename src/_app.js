const express = require("express");
const engine = require("ejs-mate");
const { join } = require("path");

const { Cartoes } = require("./utils/db");
const sequelize = require("sequelize");
const { Op } = sequelize;

const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

function render(b, a, h, o = {}) {
  const e = Object.assign(
    {
      title: "Cartão Pontuação",
      url: b.url,
      routes: [
        {
          title: "Início",
          path: "/",
        },
        {
          title: "Cartões",
          path: "/cartoes",
        },
        { title: "Rank", path: "/rank" },
      ],
    },
    o
  );
  a.render(h, e);
}

const app = express();

app.engine("ejs", engine);

app.set("views", join(__dirname, "..", "assets", "views"));
app.set("view engine", "ejs");

app.use(compression());
app.use(helmet({}));
app.use(cors({
  origin: "*"
}));

app.get("/favicon.png", (_, res) => {
  res.sendFile(join(__dirname, "..", "assets", "public", "favicon.png"));
});
app.use("/css", express.static(join(__dirname, "..", "assets", "css")));
app.use("/scripts", express.static(join(__dirname, "..", "assets", "scripts")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./_api"));

app.get("/", (req, res) => {
  render(req, res, "index", {
    title: "Cartão Fidelidade | Início",
  });
});

const PAG_MAX_CARD = 15;

app.get("/cartoes", async (req, res) => {
  const cartoesLength = await Cartoes.count();
  const numPag = Math.ceil(cartoesLength / PAG_MAX_CARD);
  var cartoes;
  if (req.query.nome) {
    cartoes = await Cartoes.findAll({
      limit: req.query.limit ? req.query.limit : PAG_MAX_CARD,
      offset: req.query.offset ? (req.query.offset - 1) * PAG_MAX_CARD : 0,
      where: {
        nome: {
          [Op.like]: `%${req.query.nome}%`
        }
      },
    });
  } else {
    cartoes = await Cartoes.findAll({
      limit: req.query.limit ? req.query.limit : PAG_MAX_CARD,
      offset: req.query.offset ? (req.query.offset - 1) * PAG_MAX_CARD : 0,
    });
  }
  render(req, res, "cartoes", {
    title: "Cartão Fidelidade | Cartões",
    cartoes,
    numPag,
  });
});

app.get("/cartao", async (req, res) => {
  if (!req.query.cardid) return res.redirect("/");
  try {
    const cartao = await Cartoes.findOne({
      where: {
        cardId: req.query.cardid,
      },
    });

    if (!cartao) throw "Não existe.";

    render(req, res, "cartao", {
      title: "Cartão Fidelidade | Cartão "+req.query.cardid,
      cardid: req.query.cardid,
      cartao,
    });
  } catch (err) {
    res.status(404);
    render(req, res, "cartaoERR", {
      title: "Cartão Fidelidade | Cartão inválido.",
    });
  }
});

app.get("/rank", async (req, res) => {
  const rankCard = await Cartoes.findAll({
    order: [
      ["pontuacao", "DESC"]
    ],
    limit: 15
  });
  render(req, res, "rank", {
    title: "Cartão Fidelidade | Rank",
    rankCard
  })
});

app
  .route("/cartoes/cadastrar")
  .get((req, res) => {
    render(req, res, "cadastro", {
      title: "Cartão Fidelidade | Cadastrar",
    });
  })
  .post((req, res) => {
    const { cardid, name, telefone, cpf } = req.body;
    Cartoes.create({
      cardId: cardid,
      nome: name,
      telefone: telefone,
      cpf: cpf,
    });
    res.redirect("/");
  });

app.use((req, res) => {
  res.status(404).send("Not Found.");
});

module.exports = app;
