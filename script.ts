const apiKey = "572846a68b2487e54953a82be8d4e2a6";
const apiUrl = `https://data.fixer.io/api/latest?access_key=${apiKey}`;

document.getElementById("convert")!.addEventListener("click", async () => {
    const amount = parseFloat((document.getElementById("amount") as HTMLInputElement).value);
    const fromCurrency = (document.getElementById("fromCurrency") as HTMLSelectElement).value;
    const toCurrency = (document.getElementById("toCurrency") as HTMLSelectElement).value;
    const resultElement = document.getElementById("result") as HTMLElement;

    if (isNaN(amount) || amount <= 0) {
        resultElement.innerText = "Por favor, insira um valor válido!";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

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
    } catch (error) {
        resultElement.innerText = "Erro ao conectar à API.";
    }
});
