function calcularVF(valor, taxa, meses) {
  let val_mes = valor / meses;
  let val_fim = 0;

  for (var i = 0; i < meses; i++) {
    let val_temp = 1;
    for (var j = 1; j <= meses - i; j++) {
      val_temp *= 1 + taxa / 100;
    }
    val_fim += val_mes * val_temp;
  }

  return val_fim;
}

function calcularVP(valor, taxa, meses) {
  let val_temp = 1;
  for (var j = 1; j <= meses; j++) {
    val_temp *= 1 + taxa / 100;
  }
  let val_fim = valor / val_temp;

  return val_fim;
}

module.exports = { calcularVF, calcularVP };

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calculator-form");
  const descontoBox = document.getElementById("desconto-box");
  const valorComDesconto = document.getElementById("valorComDesconto");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const taxa = parseFloat(document.getElementById("taxa").value);
    const meses = parseInt(document.getElementById("meses").value);
    const opcao = document.querySelector('input[name="opcao"]:checked').value;

    let resultado;

    if (opcao === "vf") {
      const val_mes = valor / meses;
      const val_fim = calcularVF(valor, taxa, meses);

      resultado = val_fim / meses;

      document.getElementById(
        "resultado"
      ).textContent = `Valor Parcela: R$ ${resultado.toFixed(2)}`;
      document.getElementById(
        "resultado1"
      ).textContent = `Valor Final: R$ ${val_fim.toFixed(2)}`;

      descontoBox.style.display = "none";
      valorComDesconto.style.display = "none";
      document
        .getElementById("resultado")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      resultado = calcularVP(valor, taxa, meses);

      document.getElementById(
        "resultado"
      ).textContent = `Resultado: R$ ${resultado.toFixed(2)}`;
      document.getElementById("resultado1").textContent = ``;

      descontoBox.style.display = "block";
      valorComDesconto.style.display = "none";
      document
        .getElementById("resultado")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  descontoBox.addEventListener("submit", function (event) {
    event.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const resultado = parseFloat(
      document.getElementById("resultado").textContent.split("R$ ")[1]
    );
    const taxaDesconto = parseFloat(
      document.getElementById("valorDesconto").value
    );

    let val_temp = valor - resultado;
    val_temp *= (100 - taxaDesconto) / 100;

    const valorFinalComDesconto = resultado + val_temp;

    valorComDesconto.textContent = `Valor com desconto: R$ ${valorFinalComDesconto.toFixed(
      2
    )}`;
    valorComDesconto.style.display = "block";
    valorComDesconto.scrollIntoView({ behavior: "smooth" });
  });
});
