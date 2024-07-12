const { calcularVF, calcularVP } = require("../js/script");

test("deve calcular o valor futuro corretamente", () => {
  const resultado = calcularVF(1000, 5, 12);
  expect(resultado).toBeCloseTo(1283.36, 2);
});

test("deve calcular o valor presente corretamente", () => {
  const resultado = calcularVP(1283.36, 5, 12);
  expect(resultado).toBeCloseTo(1000, 2);
});

test("deve calcular o desconto corretamente", () => {
  const resultado = calcularVP(1283.36, 5, 12);
  const desconto = calcularDesconto(resultado, 10);
  expect(desconto).toBeCloseTo(900, 2);
});

function calcularDesconto(valor, taxaDesconto) {
  return valor * (1 - taxaDesconto / 100);
}
