const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

const { v4: uuidv4 } = require('uuid'); // para criar unique keys

// ## Requisitos
// [X] Deve ser possivel criar Uma conta
// [X] Deve ser possivel buscar o extrato bancário do cliente
// [X] Deve ser possivel realizar um depósito
// [X] Deve ser possivel realizar um saque
// [X] Deve ser possivel buscar o extrato bancário do cliente por data
// [X] Deve ser possivel atualizar dados da conta do cliente
// [X] Deve ser possivel obter dados da conta do cliente
// [X] Deve ser possivel deletar uma conta

// ## Regras de negócio
// [X] Não deve ser possivel cadastrar uma conta com CPF já existente
// [X] Não deve ser possivel fazer depósito em uma conta não existente
// [X] Não deve ser p0ssivel buscar extrato em uma conta não existente
// [X] Não deve ser possivel fazer saque em uma conta não existente
// [X] Não deve ser possivel excluir uma conta não existente
// [X] Não deve ser possivel fazer saque quando o saldo for insuficiente

const customers = [];

//midleware
function verifyAccountExistsCPF(req, res, next) {
  // const { cpf } = req.params;
  const { cpf } = req.headers;
  // console.log(cpf);
  const customer = customers.find((c) => c.cpf === cpf);
  if (!customer) {
    return res.status(400).json({ error: 'customer not found' });
  } else {
    req.customer = customer;
    return next();
  }
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

app.post('/account', (req, res) => {
  //usar o body para insesão de dados
  console.log(req.body);
  const { cpf, name } = req.body;
  const customerAlreadyExists = customers.some(
    (custumer) => custumer.cpf === cpf
  );
  if (customerAlreadyExists) {
    return res.status(400).json({
      error: 'Customer already exists',
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
app.get('/statement', verifyAccountExistsCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.get('/statement/date', verifyAccountExistsCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query;
  const dateFormat = new Date(date + ' 00:00');
  const statement = customer.statement.filter(
    (statement) =>
      statement.createDate.toDateString() ===
      new Date(dateFormat).toDateString()
  );
  return res.json(statement);
});

app.post('/deposit', verifyAccountExistsCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;
  const statementOperation = {
    description,
    amount,
    createDate: new Date(),
    type: 'credit',
  };
  customer.statement.push(statementOperation);
  return res.status(201).send();
});

app.post('/withdraw', verifyAccountExistsCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement);
  if (balance < amount) {
    return res
      .status(400)
      .json({ error: 'insufficient founds', error: balance });
  }

  const statementOperation = {
    amount,
    createDate: new Date(),
    type: 'debit',
  };
  customer.statement.push(statementOperation);
  return res.status(201).send();
});

app.put('/account', verifyAccountExistsCPF, (req, res) => {
  const { name } = req.body;
  const { customer } = req;
  if (name === '' || name == undefined)
    return res.status(400).json((erro = 'nome vazio'));
  customer.name = name;
  return res.status(201).send();
});

app.get('/account', verifyAccountExistsCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer);
});

app.delete('/account', verifyAccountExistsCPF, (req, res) => {
  const { customer } = req;
  customers.splice(customer, 1);
  return res.status(200).json(customers);
});

app.get('/balance', verifyAccountExistsCPF, (req, res) => {
  const { customer } = req;
  const balance = getBalance(customer.statement);
  return res.json({ balance });
});

app.listen(3333);
// killall -9 node
