"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "572846a68b2487e54953a82be8d4e2a6";
const apiUrl = `https://data.fixer.io/api/latest?access_key=${apiKey}`;
document.getElementById("convert").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");
    if (isNaN(amount) || amount <= 0) {
        resultElement.innerText = "Por favor, insira um valor válido!";
        return;
    }
    try {
        const response = yield fetch(apiUrl);
        const data = yield response.json();
        if (!data.success) {
            resultElement.innerText = "Erro ao buscar taxas de câmbio.";
            return;
        }
        const rates = data.rates;
        if (!rates[fromCurrency] || !rates[toCurrency]) {
            resultElement.innerText = "Moeda não suportada.";
            return;
        }
        const conversionRate = rates[toCurrency] / rates[fromCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);
        resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
    catch (error) {
        resultElement.innerText = "Erro ao conectar à API.";
    }
}));
