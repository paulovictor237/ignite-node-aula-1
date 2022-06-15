const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

const { v4: uuidv4 } = require("uuid"); // para criar unique keys

// ## Requisitos
// [X] Deve ser possivel criar Uma conta
// [X] Deve ser possivel buscar o extrato bancário do cliente
// [ ] Deve ser possivel realizar um depósito
// [ ] Deve ser possivel realizar um saque
// [ ] Deve ser possivel buscar o extrato bancário do cliente por data
// [ ] Deve ser possivel atualizar dados da conta do cliente
// [ ] Deve ser possivel obter dados da conta do cliente
// [ ] Deve ser possivel deletar uma conta

// ## Regras de negócio
// [X] Não deve ser possivel cadastrar uma conta com CPF já existente
// [X] Não deve ser possivel fazer depósito em uma conta não existente
// [ ] Não deve ser p0ssivel buscar extrato em uma conta não existente
// [ ] Não deve ser possivel fazer saque em uma conta não existente
// [ ] Não deve ser possivel excluir uma conta não existente
// [ ] Não deve ser possivel fazer saque quando o saldo for insuficiente

const customers = [];

//midleware
function verifyAccountExistsCPF(req, res, next) {
  const { cpf } = req.params;
  const customer = customers.find((c) => c.cpf === cpf);
  if (!customer) {
    return res.status(400).json({ error: "customer not found" });
  } else {
    req.customer = customer;
    return next();
  }
}

app.post("/account", (req, res) => {
  //usar o body para insesão de dados
  console.log(req.body);
  const { cpf, name } = req.body;
  const customerAlreadyExists = customers.some(
    (custumer) => custumer.cpf === cpf
  );
  if (customerAlreadyExists) {
    return res.status(400).json({
      error: "Customer already exists",
    });
  }

  const statement = [];
  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: [],
  });
  // return res.json("ok");
  return res.status(201).send(); //201 - dado criado com sucesso
});

// app.use(verifyAccountExistsCPF);
app.get("/statement/:cpf", verifyAccountExistsCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.listen(3333);
// killall -9 node
